import { cn } from '@/utils/cn';
import { RateTableColumn } from '../transaction/tabs/create-transactions-tab/create-transaction-form/types/rateTable.types';
import { getController } from '@/components/form/utils/get-controller';
import type { UseFormSetValue } from 'react-hook-form';

export type ColumnKey = 'invoiceName' | 'niumRate' | 'agentMarkUp' | 'rate';

export type ColumnKeyConfig = {
  className: string;
  label: string;
};

export type CommonInputStyles = {
  className: string;
  inputProps: {
    className: string;
  };
};

export const columnKeys: Record<ColumnKey, ColumnKeyConfig> = {
  invoiceName: {
    className: 'text-left',
    label: 'Particulars',
  },
  niumRate: {
    className: 'text-center',
    label: 'Rate (₹)',
  },
  agentMarkUp: {
    className: 'text-center',
    label: 'Agent Mark Up (₹)',
  },
  rate: {
    className: '',
    label: 'Amount (₹)',
  },
} as const;

const GetRateTableColumns = ({
  id = 'rateTable',
  mode = 'edit',
  editableFields = ['remittance_charges.agent_mark_up', 'nostro_charges.agent_mark_up', 'other_charges.agent_mark_up'],
  setValue,
}: {
  id?: string;
  mode?: 'edit' | 'view';
  editableFields?: string[];
  setValue?: UseFormSetValue<Record<string, any>>;
}): Partial<RateTableColumn>[] => {
  const commonInputStyles = (fieldPath: string): CommonInputStyles => {
    return {
      className: cn('rateTableInputCellWrap !h-[30px] !min-h-0', {
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
      type: 'text',
      disabled: mode === 'view' || !editableFields.includes(fieldPath.replace(`${id}.`, '')),
      onInputChange: (value?: string) => {
        if (value == null || !setValue) return;
        // Remove spaces and hyphens
        let newValue = value.replace(/[\s-]/g, '');
        // Ensure only one dot and digits
        const parts = newValue.split('.');
        if (parts.length > 2) {
          newValue = parts[0] + '.' + parts.slice(1).join('');
        }
        setValue(fieldPath, newValue);
      },
      ...commonInputStyles(fieldPath),
    });

  const getDummyValue = (section: string, columnKey: 'niumRate' | 'agentMarkUp' | 'rate'): number => {
    const sectionMap: Record<string, string> = {
      transaction_value: 'transaction_value',
      remittance_charges: 'remittance_charges',
      nostro_charges: 'nostro_charges',
      other_charges: 'other_charges',
      transaction_amount: 'transaction_amount',
      gst_amount: 'gst_amount',
      total_inr_amount: 'total_inr_amount',
      tcs: 'tcs',
    };
    const mappedSection = sectionMap[section] || section;

    const keyMap: Record<'niumRate' | 'agentMarkUp' | 'rate', string> = {
      niumRate: 'company_rate',
      agentMarkUp: 'agent_mark_up',
      rate: 'rate',
    };
    const mappedKey = keyMap[columnKey];

    const dummies: Record<string, Partial<Record<string, number>>> = {
      transaction_value: {
        company_rate: 1.0,
        agent_mark_up: 0,
        rate: 1000,
      },
      remittance_charges: {
        company_rate: 10,
        agent_mark_up: 0,
        rate: 10,
      },
      nostro_charges: {
        company_rate: 5,
        agent_mark_up: 0,
        rate: 5,
      },
      other_charges: {
        company_rate: 2,
        agent_mark_up: 0,
        rate: 2,
      },
      transaction_amount: {
        rate: 1017,
      },
      gst_amount: {
        rate: 183,
      },
      total_inr_amount: {
        rate: 1200,
      },
      tcs: {
        rate: 120,
      },
    };
    return dummies[mappedSection]?.[mappedKey] ?? 0;
  };

  const getCellContent = (section: string, columnKey: 'niumRate' | 'agentMarkUp' | 'rate', fieldPath: string) => {
    const relativePath = fieldPath.replace(`${id}.`, '');
    const isEditable = editableFields.includes(relativePath);
    if (isEditable) {
      return getFormField(fieldPath);
    } else {
      const dummy = getDummyValue(section, columnKey);
      if (setValue) {
        setValue(fieldPath, dummy.toString());
      }
      return <span className="text-right">{dummy}</span>;
    }
  };

  return [
    {
      id: 'transaction_value',
      cells: {
        invoiceName: () => <span className="text-left">{`Tnx Value`}</span>,
        niumRate: () => getCellContent('transaction_value', 'niumRate', `${id}.transaction_value.company_rate`),
        agentMarkUp: () => getCellContent('transaction_value', 'agentMarkUp', `${id}.transaction_value.agent_mark_up`),
        rate: () => getCellContent('transaction_value', 'rate', `${id}.transaction_value.rate`),
      },
    },
    {
      id: 'remittance_charges',
      cells: {
        invoiceName: () => <span className="text-left">{`Remittance Charges`}</span>,
        niumRate: () => getCellContent('remittance_charges', 'niumRate', `${id}.remittance_charges.company_rate`),
        agentMarkUp: () =>
          getCellContent('remittance_charges', 'agentMarkUp', `${id}.remittance_charges.agent_mark_up`),
        rate: () => getCellContent('remittance_charges', 'rate', `${id}.remittance_charges.rate`),
      },
    },
    {
      id: 'nostro_charges',
      cells: {
        invoiceName: () => <span className="text-left">{`Nostro Charges: BEN/OUR`}</span>,
        niumRate: () => getCellContent('nostro_charges', 'niumRate', `${id}.nostro_charges.company_rate`),
        agentMarkUp: () => getCellContent('nostro_charges', 'agentMarkUp', `${id}.nostro_charges.agent_mark_up`),
        rate: () => getCellContent('nostro_charges', 'rate', `${id}.nostro_charges.rate`),
      },
    },
    {
      id: 'other_charges',
      cells: {
        invoiceName: () => <span className="text-left">{`Other Charges`}</span>,
        niumRate: () => getCellContent('other_charges', 'niumRate', `${id}.other_charges.company_rate`),
        agentMarkUp: () => getCellContent('other_charges', 'agentMarkUp', `${id}.other_charges.agent_mark_up`),
        rate: () => getCellContent('other_charges', 'rate', `${id}.other_charges.rate`),
      },
    },
    {
      id: 'transaction_amount',
      cells: {
        invoiceName: () => <span className="text-left font-semibold">{`Transaction Amount`}</span>,
        rate: () => getCellContent('transaction_amount', 'rate', `${id}.transaction_amount.rate`),
      },
    },
    {
      id: 'gst_amount',
      cells: {
        invoiceName: () => (
          <span className="text-left">
            Total GST Amount <br /> <b> CGST IGST/UTGST</b>
          </span>
        ),
        rate: () => getCellContent('gst_amount', 'rate', `${id}.gst_amount.rate`),
      },
    },
    {
      id: 'total_inr_amount',
      cells: {
        invoiceName: () => <span className="text-left font-semibold">{`Total INR Amount`}</span>,
        rate: () => getCellContent('total_inr_amount', 'rate', `${id}.total_inr_amount.rate`),
      },
    },
    {
      id: 'tcs',
      cells: {
        invoiceName: () => <span className="text-left">{`TCS`}</span>,
        rate: () => getCellContent('tcs', 'rate', `${id}.tcs.rate`),
      },
    },
  ];
};

export default GetRateTableColumns;
