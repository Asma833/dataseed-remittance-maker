import { getController } from '@/components/form/utils/get-controller';
import { RateTableColumn } from '../transaction/tabs/create-transactions-tab/create-transaction-form/types/rateTable.types';
import { cn } from '@/utils/cn';
import { formatINR } from '@/utils/form-helpers';

type CommonInputStyles = {
  className: string;
  inputProps: {
    className: string;
  };
};

export const GetRateTableColumns = ({
  id = 'rateTable',
  mode = 'edit',
  editableFields = [] as string[],
  invoiceData,
}: {
  id?: string;
  mode?: 'edit' | 'view';
  editableFields?: string[];
  invoiceData?: any;
}): Partial<RateTableColumn>[] => {
  const fieldMappings: Record<string, string> = {
    transaction_value: 'transaction_value',
    remittance_charges: 'remittance_charges',
    nostro_charges: 'nostro_charges',
    other_charges: 'other_charges',
    transaction_amount: 'transaction_amount',
    gst_amount: 'gst_amount',
    total_inr_amount: 'total_inr_amount',
    tcs: 'tcs',
  };

  const valueMappings: Record<string, string> = {
    companyRate: 'company_rate',
    agentMarkUp: 'agent_mark_up',
    rate: 'rate',
  };

  const commonInputStyles = (fieldPath: string): CommonInputStyles => {
    return {
      className: cn('rateTableInputCellWrap !h-[30px] !min-h-0 flex items-center justify-center', {
        editable: mode === 'edit' && editableFields.includes(fieldPath.replace(`${id}.`, '')),
      }),
      inputProps: {
        className: 'rateTableInputCell !h-[30px] !min-h-0 !text-right',
      },
    };
  };

  const getFormField = (fieldPath: string) =>
    getController({
      name: fieldPath,
      type: 'number',
      disabled: mode === 'view' || !editableFields.includes(fieldPath.replace(`${id}.`, '')),
      ...commonInputStyles(fieldPath),
    });

  const getCellContent = (section: string, columnKey: 'companyRate' | 'agentMarkUp' | 'rate') => {
    const mappedSection = fieldMappings[section] || section;
    const mappedKey = valueMappings[columnKey] || columnKey;
    const fieldPath = `${id}.${mappedSection}.${mappedKey}`;
    const relativePath = fieldPath.replace(`${id}.`, '');
    const isEditable = editableFields.includes(relativePath);
    if (isEditable) {
      return getFormField(fieldPath);
    } else {
      const dataKey = valueMappings[columnKey] || columnKey;
      const value = invoiceData?.[section]?.[dataKey] ?? 0;
      return <span className="!text-right">{formatINR(value)}</span>;
    }
  };

  return [
    {
      id: 'transaction_value',
      cells: {
        invoiceName: () => <span className="text-left">{`Transaction Value`}</span>,
        companyRate: () => getCellContent('transaction_value', 'companyRate'),
        // agentMarkUp: () => getCellContent('transaction_value', 'agentMarkUp'),
        rate: () => getCellContent('transaction_value', 'rate'),
      },
    },
    {
      id: 'remittance_charges',
      cells: {
        invoiceName: () => <span className="text-left">{`Remittance Charges`}</span>,
        companyRate: () => getCellContent('remittance_charges', 'companyRate'),
        agentMarkUp: () => getCellContent('remittance_charges', 'agentMarkUp'),
        rate: () => getCellContent('remittance_charges', 'rate'),
      },
    },
    {
      id: 'nostro_charges',
      cells: {
        invoiceName: () => <span className="text-left">{`Nostro Charges`}</span>,
        companyRate: () => getCellContent('nostro_charges', 'companyRate'),
        agentMarkUp: () => getCellContent('nostro_charges', 'agentMarkUp'),
        rate: () => getCellContent('nostro_charges', 'rate'),
      },
    },
    {
      id: 'other_charges',
      cells: {
        invoiceName: () => <span className="text-left">{`Other Charges`}</span>,
        companyRate: () => getCellContent('other_charges', 'companyRate'),
        agentMarkUp: () => getCellContent('other_charges', 'agentMarkUp'),
        rate: () => getCellContent('other_charges', 'rate'),
      },
    },
    {
      id: 'transaction_amount',
      cells: {
        invoiceName: () => <span className="text-left font-semibold">{`Transaction Amount`}</span>,
        rate: () => getCellContent('transaction_amount', 'rate'),
      },
    },
    {
      id: 'gst_amount',
      cells: {
        invoiceName: () => <span className="text-left">GST Amount</span>,
        rate: () => getCellContent('gst_amount', 'rate'),
      },
    },
    {
      id: 'total_inr_amount',
      cells: {
        invoiceName: () => <span className="text-left font-semibold">{`Total INR Amount`}</span>,
        rate: () => getCellContent('total_inr_amount', 'rate'),
      },
    },
    {
      id: 'tcs',
      cells: {
        invoiceName: () => <span className="text-left">{`TCS`}</span>,
        rate: () => getCellContent('tcs', 'rate'),
      },
    },
  ];
};
