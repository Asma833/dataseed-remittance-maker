import React, { useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { z } from 'zod';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

const agentSchema = z.object({
  agentEonCode: z.string().min(1, 'Agent EON Code is required'),
  primaryAgentName: z.string().min(1, 'Primary Agent Name is required'),
  primaryAgentEmail: z.string().email('Invalid email format'),
  branchUserName: z.string().min(1, 'Branch User Name is required'),
  branchUserEmail: z.string().email('Invalid email format'),
  branchName: z.string().min(1, 'Branch Name is required'),
  branchCity: z.string().min(1, 'Branch City is required'),
  branchState: z.string().min(1, 'Branch State is required'),
  branchRegion: z.string().min(1, 'Branch Region is required'),
  niumRmUsername: z.string().min(1, 'NIUM RM Username is required'),
  niumRmBranchName: z.string().min(1, 'NIUM RM Branch Name is required'),
  niumRmBranchRegion: z.string().min(1, 'NIUM RM Branch Region is required'),
  role: z.enum(['maker', 'checker']),
});
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF0088",
    },
  },
  components: {},
  defaultColorScheme: 'light',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#FF0088",
        },
      },
    },
  },
});
interface AgentType extends z.infer<typeof agentSchema> {}

const AgentRegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState<AgentType>({
    agentEonCode: '',
    primaryAgentName: '',
    primaryAgentEmail: '',
    branchUserName: '',
    branchUserEmail: '',
    branchName: '',
    branchCity: '',
    branchState: '',
    branchRegion: '',
    niumRmUsername: '',
    niumRmBranchName: '',
    niumRmBranchRegion: '',
    role: 'maker'
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  
 
  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = agentSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <ThemeProvider theme={theme}>
    <div className="flex items-start justify-center  overflow-y-auto">
      <div className="rounded-lg w-full max-w-4xl">
        <div className="">
          <h2 className="text-lg font-semibold mb-6">Agent Branch User Create</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
       
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[{ label: 'Agent EON Code', name: 'agentEonCode', placeholder: 'Enter Agent EON Code' },
                { label: 'Primary Agent Name', name: 'primaryAgentName', placeholder: 'Enter Primary Agent Name' },
                { label: 'Primary Agent Email', name: 'primaryAgentEmail', type: 'email', placeholder: 'Enter Primary Agent Email' },
                { label: 'Branch User Name', name: 'branchUserName', placeholder: 'Enter Branch User Name' },
                { label: 'Branch User Email', name: 'branchUserEmail', type: 'email', placeholder: 'Enter Branch User Email' },
                { label: 'Branch Name', name: 'branchName', placeholder: 'Enter Branch Name' },
                { label: 'NIUM RM Username', name: 'niumRmUsername', placeholder: 'Enter NIUM RM Username' },
                { label: 'NIUM RM Branch Name', name: 'niumRmBranchName', placeholder: 'Enter NIUM RM Branch Name' },
              ].map(({ label, name, type, placeholder }) => (
                <TextField
                  key={name}
                  label={label}
                  name={name}
                  type={type || 'text'}
                  value={formData[name as keyof AgentType]}
                  onChange={handleInputChange}
                  variant="outlined"
                  color="primary"
                  fullWidth
                  placeholder={placeholder}
                  error={!!errors[name]}
                  helperText={errors[name]}
                />
              ))}

                {[{ label: 'Branch City', name: 'branchCity', placeholder:'Select Branch City'}, { label: 'Branch State', name: 'branchState', placeholder:'Select Branch State' }, { label: 'Branch Region', name: 'branchRegion',placeholder:'Select Branch Region' }, { label: 'NIUM RM Branch Region', name: 'niumRmBranchRegion' ,placeholder:'Select NIUM RM Branch Region'}].map(({ label, name, placeholder }) => (
                <FormControl key={name} fullWidth variant="outlined" >
                  {formData[name as keyof AgentType] ?<InputLabel>{label}</InputLabel> : ''}
                  <Select name={name} value={formData[name as keyof AgentType]} 
                  color="primary"
                  onChange={handleSelectChange} 
                  onOpen={() => setFocusedField(name)}
                  onClose={() => setFocusedField(null)}
                  label={ formData[name as keyof AgentType] ? label : ''}
                  displayEmpty
                   renderValue={(selected) => selected ? selected : focusedField === name ? <p>{placeholder}</p> : label }> 
                    <MenuItem value={"region1"}>Region 1</MenuItem>
                    <MenuItem value={"region2"}>Region 2</MenuItem>
                  </Select>
                  {errors[name] && <FormHelperText>{errors[name]}</FormHelperText>}  
                </FormControl>
              
              ))}

              
            </div>

            <FormControl>
              <FormLabel>Role</FormLabel>
              <RadioGroup row name="role" value={formData.role} onChange={handleSelectChange}>
                <FormControlLabel value="maker" control={<Radio />} label="Maker" />
                <FormControlLabel value="checker" control={<Radio />} label="Checker" />
              </RadioGroup>
            </FormControl>

            <div className="flex justify-end space-x-2">
              <Button variant="outlined" onClick={() => setFormData(agentSchema.parse({}))}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            </div>
        
          </form>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
};

export default AgentRegistrationForm;
