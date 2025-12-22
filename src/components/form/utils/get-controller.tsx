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
import { ShadCnFileUploadWithButton } from '../controller/ShadCnFileUploadWithButton';
import FileUploadWithView from '../controller/FileUploadWithView';
import { MuiDateRangePicker } from '../controller/MuiDateRangePicker';
import { FieldType } from '@/types/enums';
import FileUploadWithOutView from '../controller/FileUploadWithOutView';

export const getController = (field: any) => {
  const baseProps = {
    name: field.name,
    label: field.label,
    disabled: field.disabled,
    forcedValue: field.forcedValue,
    className: field.className,
    required: field.required,
    placeholder: field.placeholder,
    errors: field.errors,
  };

  switch (field.type) {
    case FieldType.Text:
    case 'text':
      return (
        <ShadCnText
          {...baseProps}
          placeholder={field.placeholder}
          uppercase={field.uppercase}
          onInputChange={field.onInputChange}
        />
      );
    case FieldType.TextArea:
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
    case FieldType.Email:
    case 'email':
      return <ShadCnEmail {...baseProps} />;
    case FieldType.Number:
    case 'number':
      return <ShadCnNumber {...baseProps} min={field.min} step={field.step} />;
    case FieldType.Phone:
    case 'phone':
      return <ShadCnPhone {...baseProps} />;
    case FieldType.IndianPhone:
    case 'indian_phone':
      return <ShadCnIndianPhone {...baseProps} />;
    case 'file':
      return <ShadCnFile {...baseProps} />;
    case FieldType.FileUpload:
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
    case FieldType.Fileupload_View:
    case 'fileupload_view':
      return (
        <FileUploadWithView
          {...baseProps}
          className={field.className}
          maxFiles={field.maxFiles}
          description={field.description}
          helpText={field.helpText}
          accept={field.accept}
          multiple={field.maxFiles > 1}
          viewFile={field.viewFile}
        />
      );
    case 'fileuploadwithoutview':
      return (
        <FileUploadWithOutView
          {...baseProps}
          className={field.className}
          maxFiles={field.maxFiles}
          description={field.description}
          helpText={field.helpText}
          accept={field.accept}
          multiple={field.maxFiles > 1}
          viewFile={field.viewFile}
        />
      );
    case FieldType.FileUploadWithButton:
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
    case FieldType.Checkbox:
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
    case FieldType.Select:
    case 'select':
      return (
        <ShadCnSelect {...baseProps} options={field.options} placeholder={field.placeholder} isMulti={field.isMulti} />
      );
    case FieldType.Date:
    case 'date':
      return <ShadCnDatePicker {...baseProps} placeholder={field.placeholder} />;
    case FieldType.DateRange:
    case 'daterange':
      return (
        <MuiDateRangePicker
          {...baseProps}
          placeholder={field.placeholder}
          startLabel={field.startLabel || 'From Date'}
          endLabel={field.endLabel || 'To Date'}
        />
      );
    case FieldType.Radio:
    case 'radio':
      // Find the default checked option
      const defaultRadioValue = Object.keys(field.options).find((key) => field.options[key].checked);
      const radioProps = {
        ...baseProps,
        options: field.options,
        onChange: field.onChange,
        orientation: field.orientation,
      };
      if (defaultRadioValue) {
        (radioProps as any).defaultValue = defaultRadioValue;
      }
      return <ShadCnRadioGroup {...radioProps} />;
    case FieldType.Password:
    case 'password':
      return <ShadCnPassword {...baseProps} uppercase={field.uppercase} />;
    default:
      return null;
  }
};
