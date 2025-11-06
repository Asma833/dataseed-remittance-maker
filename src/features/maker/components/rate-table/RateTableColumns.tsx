import { cn } from '@/utils/cn';
import { RateTableColumn } from '../transaction/tabs/create-transactions-tab/create-transaction-form/types/rateTable.types';
import { getController } from '@/components/form/utils/get-controller';


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
  editableFields = ['remittanceCharges.agentMarkUp', 'nostroCharges.agentMarkUp', 'otherCharges.agentMarkUp'],
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
      ...commonInputStyles(fieldPath),
    });

  const getDummyValue = (section: string, key: 'niumRate' | 'agentMarkUp' | 'rate'): number => {
    const dummies: Record<string, Partial<Record<'niumRate' | 'agentMarkUp' | 'rate', number>>> = {
      transactionValue: {
        niumRate: 1.0,
        agentMarkUp: 0,
        rate: 1000,
      },
      remittanceCharges: {
        niumRate: 10,
        agentMarkUp: 0,
        rate: 10,
      },
      nostroCharges: {
        niumRate: 5,
        agentMarkUp: 0,
        rate: 5,
      },
      otherCharges: {
        niumRate: 2,
        agentMarkUp: 0,
        rate: 2,
      },
      transactionAmount: {
        rate: 1017,
      },
      gstAmount: {
        rate: 183,
      },
      totalInrAmount: {
        rate: 1200,
      },
      tcs: {
        rate: 120,
      },
    };
    return dummies[section]?.[key] ?? 0;
  };

  const getCellContent = (section: string, key: 'niumRate' | 'agentMarkUp' | 'rate', fieldPath: string) => {
    const relativePath = fieldPath.replace(`${id}.`, '');
    const isEditable = editableFields.includes(relativePath);
    if (isEditable) {
      return getFormField(fieldPath);
    } else {
      const dummy = getDummyValue(section, key);
      return <span className="text-right">{dummy}</span>;
    }
  };

  return [
    {
      id: 'transactionValue',
      cells: {
        invoiceName: () => <span className="text-left">{`Tnx Value`}</span>,
        niumRate: () => getCellContent('transactionValue', 'niumRate', `${id}.transactionValue.niumRate`),
        agentMarkUp: () => getCellContent('transactionValue', 'agentMarkUp', `${id}.transactionValue.agentMarkUp`),
        rate: () => getCellContent('transactionValue', 'rate', `${id}.transactionValue.rate`),
      },
    },
    {
      id: 'remittanceCharges',
      cells: {
        invoiceName: () => <span className="text-left">{`Remittance Charges`}</span>,
        niumRate: () => getCellContent('remittanceCharges', 'niumRate', `${id}.remittanceCharges.niumRate`),
        agentMarkUp: () => getCellContent('remittanceCharges', 'agentMarkUp', `${id}.remittanceCharges.agentMarkUp`),
        rate: () => getCellContent('remittanceCharges', 'rate', `${id}.remittanceCharges.rate`),
      },
    },
    {
      id: 'nostroCharges',
      cells: {
        invoiceName: () => <span className="text-left">{`Nostro Charges: BEN/OUR`}</span>,
        niumRate: () => getCellContent('nostroCharges', 'niumRate', `${id}.nostroCharges.niumRate`),
        agentMarkUp: () => getCellContent('nostroCharges', 'agentMarkUp', `${id}.nostroCharges.agentMarkUp`),
        rate: () => getCellContent('nostroCharges', 'rate', `${id}.nostroCharges.rate`),
      },
    },
    {
      id: 'otherCharges',
      cells: {
        invoiceName: () => <span className="text-left">{`Other Charges`}</span>,
        niumRate: () => getCellContent('otherCharges', 'niumRate', `${id}.otherCharges.niumRate`),
        agentMarkUp: () => getCellContent('otherCharges', 'agentMarkUp', `${id}.otherCharges.agentMarkUp`),
        rate: () => getCellContent('otherCharges', 'rate', `${id}.otherCharges.rate`),
      },
    },
    {
      id: 'transactionAmount',
      cells: {
        invoiceName: () => <span className="text-left font-semibold">{`Transaction Amount`}</span>,
        rate: () => getCellContent('transactionAmount', 'rate', `${id}.transactionAmount.rate`),
      },
    },
    {
      id: 'gstAmount',
      cells: {
        invoiceName: () => (
          <span className="text-left">
            Total GST Amount <br /> <b> CGST IGST/UTGST</b>
          </span>
        ),
        rate: () => getCellContent('gstAmount', 'rate', `${id}.gstAmount.rate`),
      },
    },
    {
      id: 'totalInrAmount',
      cells: {
        invoiceName: () => <span className="text-left font-semibold">{`Total INR Amount`}</span>,
        rate: () => getCellContent('totalInrAmount', 'rate', `${id}.totalInrAmount.rate`),
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
