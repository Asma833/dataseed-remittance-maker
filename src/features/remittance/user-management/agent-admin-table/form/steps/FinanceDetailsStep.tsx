import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { agentAdminCreationConfig } from '../agent-admin-creation.config';
import { getController } from '@/components/form/utils/get-controller';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { AddBankDialog } from '../components/AddBankDialog';
import { BankTable } from '../components/BankTable';


export interface BankAccount {
  id: string;
  bankName: string;
  branchName: string;
  accountHolder: string;
  accountNumber: string;
  ifscCode: string;
}

export const FinanceDetailsStep: React.FC = () => {
  const { control, formState: { errors }, watch, setValue } = useFormContext();
  const config = agentAdminCreationConfig();
  const [isAddBankOpen, setIsAddBankOpen] = useState(false);
  const [editingBank, setEditingBank] = useState<BankAccount | null>(null);

  const bankAccounts = watch('bankAccounts') || [];

  const handleAddBank = (bankData: Omit<BankAccount, 'id'>) => {
    const newBank = {
      ...bankData,
      id: Date.now().toString(),
    };
    const updatedBanks = [...bankAccounts, newBank];
    setValue('bankAccounts', updatedBanks);
    setIsAddBankOpen(false);
  };

  const handleEditBank = (id: string, bankData: Omit<BankAccount, 'id'>) => {
    const updatedBanks = bankAccounts.map((bank: BankAccount) =>
      bank.id === id ? { ...bankData, id } : bank
    );
    setValue('bankAccounts', updatedBanks);
    setEditingBank(null);
  };

  const handleDeleteBank = (id: string) => {
    const updatedBanks = bankAccounts.filter((bank: BankAccount) => bank.id !== id);
    setValue('bankAccounts', updatedBanks);
  };

  const openEditDialog = (bank: BankAccount) => {
    setEditingBank(bank);
  };

  const closeEditDialog = () => {
    setEditingBank(null);
  };

  return (
    <div className="space-y-6">
      {/* Financial SPOC Details */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Financial SPOC Details</h3>
        <FormFieldRow className="mb-4" rowCols={3}>
          {(['financeSpocName', 'financeSpocEmail', 'financeSpocPhoneNo'] as const).map((fieldName) => {
            const field = config.fields.financeDetails[fieldName];
            return (
              <FieldWrapper key={fieldName}>
                {getController({
                  ...(typeof field === 'object' && field !== null ? field : {}),
                  name: fieldName,
                  control,
                  errors,
                })}
              </FieldWrapper>
            );
          })}
        </FormFieldRow>
      </div>

      {/* Bank Accounts Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">You can add up to 3 accounts</p>
          <Button
            type="button"
            onClick={() => setIsAddBankOpen(true)}
            disabled={bankAccounts.length >= 3}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Bank
          </Button>
        </div>

        <BankTable
          bankAccounts={bankAccounts}
          onEdit={openEditDialog}
          onDelete={handleDeleteBank}
        />
      </div>

      {/* Add Bank Dialog */}
      <AddBankDialog
        isOpen={isAddBankOpen}
        onClose={() => setIsAddBankOpen(false)}
        onAdd={handleAddBank}
      />

      {/* Edit Bank Dialog */}
      {editingBank && (
        <AddBankDialog
          isOpen={!!editingBank}
          onClose={closeEditDialog}
          editData={editingBank}
          onEdit={(bankData: Omit<BankAccount, 'id'>) => handleEditBank(editingBank.id, bankData)}
        />
      )}
    </div>
  );
};