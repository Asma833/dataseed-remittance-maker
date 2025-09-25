import React, { useState } from 'react';
import { DataTable, TableData, staticConfig } from '@/components/table';
import { TableTitle } from '@/features/auth/components/table-title';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import GetCorporateOnboardingColumns, { CorporateData } from './CorporateOnboardingColumns';
import { OnboardCorporateDialog } from '../components/OnboardCorporateDialog';
import { OnboardCorporateFormData } from '../agent-admin-creation.schema';

const sampleCorporateData: CorporateData[] = [
  {
    id: '1',
    entityName: 'ABC Corp',
    panNumber: 'AAACA1234A',
    dateOfIncorporation: '2020-01-15',
    entityType: 'Private Limited',
    cin: 'U12345MH2020PTC123456',
    address: '123 Business Street, Mumbai, Maharashtra',
  },
  {
    id: '2',
    entityName: 'XYZ Ltd',
    panNumber: 'BBBAB5678B',
    dateOfIncorporation: '2019-05-20',
    entityType: 'Public Limited',
    cin: 'U67890DL2019PLC123456',
    address: '456 Corporate Avenue, Delhi',
  },
];

export const CommissionStep: React.FC = () => {
  console.log("CommissionStep")
  const [corporates, setCorporates] = useState<CorporateData[]>(sampleCorporateData);
  const [isOnboardDialogOpen, setIsOnboardDialogOpen] = useState(false);

  const handleEdit = (corporate: CorporateData) => {
    // TODO: Implement edit functionality
    console.log('Edit corporate:', corporate);
  };

  const handleCreateCorporate = (data: OnboardCorporateFormData) => {
    const newCorporate: CorporateData = {
      ...data,
      id: Date.now().toString(),
      cin: data.cin || '',
      address: data.address || '',
    };
    setCorporates([...corporates, newCorporate]);
  };

  const columns = GetCorporateOnboardingColumns({ handleEdit });

  const tableData: TableData<CorporateData> = {
    data: corporates,
    totalCount: corporates.length,
    currentPage: 1,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <TableTitle title="Corporate List" />
        <Button
          type="button"
          onClick={() => setIsOnboardDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Onboard New Corporate
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={tableData}
        {...staticConfig}
      />
      <OnboardCorporateDialog
        isOpen={isOnboardDialogOpen}
        onClose={() => setIsOnboardDialogOpen(false)}
        onCreate={handleCreateCorporate}
      />
    </div>
  );
};
export default CommissionStep;