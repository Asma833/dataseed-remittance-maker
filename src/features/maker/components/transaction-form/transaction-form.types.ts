export type DocumentConfig = {
  id: string;
  label: string;
  required: boolean;
  maxFiles: number;
  description?: string;
  helpText?: string;
};

export type OptionType = {
  label: string;
  value: string;
};

export type Option = { typeId: string; label: string; value: string };

export type FormControllerMetaOptions = {
  transactionTypes?: OptionType[];
  purposeTypes?: OptionType[];
};

export enum TransactionMode {
  CREATE = 'create',
  EDIT = 'edit',
  VIEW = 'view',
  UPDATE = 'update',
}

export type TransactionFormProps = {
  mode?: TransactionMode;
};
