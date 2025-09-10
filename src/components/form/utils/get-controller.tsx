import { ShadCnText } from '@/components/form/controller/ShadCnText';
import { ShadCnSelect } from '@/components/form/controller/ShadCnSelect';
import { ShadCnDatePicker } from '@/components/form/controller/ShadCnDatePicker';
import { ShadCnRadioGroup } from '@/components/form/controller/ShadCnRadioGroup';
import { ShadCnEmail } from '@/components/form/controller/ShadCnEmail';
import { ShadCnFile } from '@/components/form/controller/ShadCnFile';
import { ShadCnCheckbox } from '@/components/form/controller/ShadCnCheckbox';
import { ShadCnNumber } from '@/components/form/controller/ShadCnNumber';
import { ShadCnPhone } from '@/components/form/controller/ShadCnPhone';
import { ShadCnIndianPhone } from '@/components/form/controller/ShadCnIndianPhone';
import ShadCnPassword from '@/components/form/controller/ShadCnPassword';
import { ShadCnTextArea } from '../controller/ShadCnTextArea';
import { ShadCnFileUpload } from '../controller/ShadCnFileUpload';
import { ShadCnFileUploadWithView } from '../controller/ShadCnFileUploadWithView';
import { ShadCnFileUploadWithButton } from '../controller/ShadCnFileUploadWithButton';

export const getController = (field: any) => {
  const baseProps = {
    name: field.name,
    label: field.label,
    disabled: field.disabled,
    forcedValue: field.forcedValue,
    className: field.className,
    required: field.required,
    placeholder: field.placeholder,
    errors: field.errors
  };

  switch (field.type) {
    case 'text':
      return (
        <ShadCnText
          {...baseProps}
          placeholder={field.placeholder}
          uppercase={field.uppercase}
          onInputChange={field.onInputChange}
        />
      );
    case 'textarea':
      return (
        <ShadCnTextArea
          {...baseProps}
          rows={field.rows}
          maxRows={field.maxRows}
          minRows={field.minRows}
          placeholder={field.placeholder}
          onInputChange={field.onInputChange}
        />
      );
    case 'email':
      return <ShadCnEmail {...baseProps} />;
    case 'number':
      return <ShadCnNumber {...baseProps} min={field.min} step={field.step} />;
    case 'phone':
      return <ShadCnPhone {...baseProps} />;
    case 'indian_phone':
      return <ShadCnIndianPhone {...baseProps} />;
    case 'file':
      return <ShadCnFile {...baseProps} />;
    case 'fileupload':
      return (
        <ShadCnFileUpload
          {...baseProps}
          maxFiles={field.maxFiles}
          description={field.description}
          helpText={field.helpText}
          accept={field.accept}
          multiple={field.maxFiles > 1}
          handleFileChange={field.handleFileChange}
          styleType={field.styleType}
        />
      );
    case 'fileupload_view':
      return (
        <ShadCnFileUploadWithView
          {...baseProps}
          maxFiles={field.maxFiles}
          description={field.description}
          helpText={field.helpText}
          accept={field.accept}
          multiple={field.maxFiles > 1}
          handleFileChange={field.handleFileChange}
          viewFile={field.viewFile}
        />
      );
    case 'fileupload_with_button':
      return (
        <ShadCnFileUploadWithButton
          name={field.name}
          label={field.label}
          onUpload={field.onUpload}
          disabled={field.disabled}
          required={field.required}
        />
      );
    case 'checkbox':
      return (
        <ShadCnCheckbox
          {...baseProps}
          options={field.options}
          handleCheckboxChange={field.handleCheckboxChange}
          isMulti={field.isMulti}
          defaultSelected={field.defaultSelected}
          variant={field.variant}
          size={field.size}
          classNames={field.classNames}
          orientation={field.orientation}
        />
      );
    case 'select':
      return <ShadCnSelect {...baseProps} options={field.options} placeholder={field.placeholder} />;
    case 'date':
      return <ShadCnDatePicker {...baseProps} placeholder={field.placeholder} />;
    case 'radio':
      // Find the default checked option
      const defaultRadioValue = Object.keys(field.options).find(key => field.options[key].checked);
      const radioProps = { ...baseProps, options: field.options, onChange: field.onChange, orientation: field.orientation };
      if (defaultRadioValue) {
        (radioProps as any).defaultValue = defaultRadioValue;
      }
      return <ShadCnRadioGroup {...radioProps} />;
    case 'password':
      return <ShadCnPassword {...baseProps} uppercase={field.uppercase} />;
    default:
      return null;
  }
};
