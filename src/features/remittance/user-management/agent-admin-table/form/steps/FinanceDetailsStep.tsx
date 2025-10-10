import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { agentAdminCreationConfig } from '../agent-admin-creation.config';
import { getController } from '@/components/form/utils/get-controller';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import GetBankTableColumns from '../components/bank-table-coulumn';
import { GenericTable } from '../components/generic-table';
import SubTitle from '../components/sub-title';
import {
  useGetBankAccounts,
  useCreateBankAccount,
  useUpdateBankAccount,
  useDeleteBankAccount,
} from '../../../hooks/useBankAccounts';
import { BankAccount } from '../../../api/bankAccounts';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { AddBankDialog } from '../components/AddBankDialog';

export const FinanceDetailsStep: React.FC<{ agentId?: string }> = ({ agentId }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const config = agentAdminCreationConfig();

  // State for add bank dialog
  const [isAddBankOpen, setIsAddBankOpen] = useState(false);
  const [editData, setEditData] = useState<BankAccount | undefined>(undefined);

  // Fetch bank accounts if agentId is provided
  const { data: fetchedBankAccounts = [] } = useGetBankAccounts(agentId || '');

  // Hooks for bank account operations
  const createBankAccountMutation = useCreateBankAccount();
  const updateBankAccountMutation = useUpdateBankAccount();
  const deleteBankAccountMutation = useDeleteBankAccount();

  const handleEditBank = (bank: BankAccount) => {
    setEditData(bank);
    setIsAddBankOpen(true);
  };

  const handleDeleteBank = (id: string) => {
    if (agentId) {
      deleteBankAccountMutation.mutate({ id, ownerId: agentId });
    }
  };

  const columns = GetBankTableColumns({
    handleEdit: handleEditBank,
    handleDelete: handleDeleteBank,
  });

  const handleAddBank = (bankData: any) => {
    if (agentId) {
      createBankAccountMutation.mutate({
        ...bankData,
        owner_id: agentId,
        owner_type: 'agent_admin',
      });
    }
  };

  const handleEditBankSubmit = (bankData: any) => {
    if (editData && agentId) {
      updateBankAccountMutation.mutate({
        id: editData.id,
        ...bankData,
        owner_id: agentId,
        owner_type: 'agent_admin',
      });
    }
  };
  return (
    <div className="space-y-6">
      {/* Financial SPOC Details */}
      <div>
        <SubTitle title="Financial SPOC Details" />
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
      {agentId && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">You can add up to 3 accounts</p>
            <Button
              type="button"
              onClick={() => setIsAddBankOpen(true)}
              disabled={fetchedBankAccounts.length >= 3}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Add Bank
            </Button>
          </div>
          <div>
            <SubTitle title="Bank Accounts" />
            <GenericTable columns={columns} data={fetchedBankAccounts} />
          </div>
        </div>
      )}

      {/* Add Bank Dialog */}
      <AddBankDialog
        isOpen={isAddBankOpen}
        onClose={() => {
          setIsAddBankOpen(false);
          setEditData(undefined);
        }}
        onAdd={handleAddBank}
        {...(editData && { editData, onEdit: handleEditBankSubmit })}
      />
    </div>
  );
};
