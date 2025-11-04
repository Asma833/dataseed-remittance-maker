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
    label: '',
  },
  niumRate: {
    className: '',
    label: 'NIUM Rate',
  },
  agentMarkUp: {
    className: '',
    label: 'Agent Mark Up',
  },
  rate: {
    className: '',
    label: 'Rate',
  },
} as const;

const GetRateTableColumns = ({
  id = 'rateTable',
  mode = 'edit',
  editableFields = [] as string[],
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

  return [
    {
      id: 'transactionValue',
      cells: {
        invoiceName: () => <span className="text-left">{`Tnx Value`}</span>,
        niumRate: () => getFormField(`${id}.transactionValue.niumRate`),
        agentMarkUp: () => getFormField(`${id}.transactionValue.agentMarkUp`),
        rate: () => getFormField(`${id}.transactionValue.rate`),
      },
    },
    {
      id: 'remittanceCharges',
      cells: {
        invoiceName: () => <span className="text-left">{`Remittance Charges`}</span>,
        niumRate: () => getFormField(`${id}.remittanceCharges.niumRate`),
        agentMarkUp: () => getFormField(`${id}.remittanceCharges.agentMarkUp`),
        rate: () => getFormField(`${id}.remittanceCharges.rate`),
      },
    },
    {
      id: 'nostroCharges',
      cells: {
        invoiceName: () => <span className="text-left">{`Nostro Charges: BEN/OUR`}</span>,
        niumRate: () => getFormField(`${id}.nostroCharges.niumRate`),
        agentMarkUp: () => getFormField(`${id}.nostroCharges.agentMarkUp`),
        rate: () => getFormField(`${id}.nostroCharges.rate`),
      },
    },
    {
      id: 'otherCharges',
      cells: {
        invoiceName: () => <span className="text-left">{`Other Charges`}</span>,
        niumRate: () => getFormField(`${id}.otherCharges.niumRate`),
        agentMarkUp: () => getFormField(`${id}.otherCharges.agentMarkUp`),
        rate: () => getFormField(`${id}.otherCharges.rate`),
      },
    },
    {
      id: 'transactionAmount',
      cells: {
        invoiceName: () => <span className="text-left font-semibold">{`Transaction Amount`}</span>,
        rate: () => getFormField(`${id}.transactionAmount.rate`),
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
        rate: () => getFormField(`${id}.gstAmount.rate`),
      },
    },
    {
      id: 'totalInrAmount',
      cells: {
        invoiceName: () => <span className="text-left font-semibold">{`Total INR Amount`}</span>,
        rate: () => getFormField(`${id}.totalInrAmount.rate`),
      },
    },
    {
      id: 'tcs',
      cells: {
        invoiceName: () => <span className="text-left">{`TCS`}</span>,
        rate: () => getFormField(`${id}.tcs.rate`),
      },
    },
  ];
};

export default GetRateTableColumns;
