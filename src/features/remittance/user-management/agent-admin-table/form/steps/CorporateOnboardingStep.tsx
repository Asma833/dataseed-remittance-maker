import React, { useState } from 'react';
import { DataTable, TableData, staticConfig } from '@/components/table';
import { TableTitle } from '@/features/auth/components/table-title';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import GetCorporateOnboardingColumns, { CorporateData } from './CorporateOnboardingColumns';
import { OnboardCorporateDialog } from '../components/OnboardCorporateDialog';
import { OnboardCorporateFormData } from '../agent-admin-creation.schema';
import { useGetAgentCorporates } from '../../../hooks/useAgentCorporates';

export const CorporateOnboardingStep: React.FC = () => {
  console.log("CorporateOnboardingStep")
  const [isOnboardDialogOpen, setIsOnboardDialogOpen] = useState(false);

  // Fetch agent corporates from API
  const { data: corporates = [], isLoading } = useGetAgentCorporates();

  const handleEdit = (corporate: CorporateData) => {
    // TODO: Implement edit functionality
    console.log('Edit corporate:', corporate);
  };

  const handleCreateCorporate = (data: Record<string, any>) => {
    // Transform camelCase to snake_case for API
    const newCorporate: Omit<CorporateData, 'id' | 'created_by' | 'updated_by' | 'created_at' | 'updated_at' | 'owner_id' | 'owner_type'> = {
      entity_name: data.entityName,
      pan_number: data.panNumber,
      date_of_incorporation: data.dateOfIncorporation,
      entity_type: data.entityType,
      cin: data.cin || '',
      address: data.address || '',
    };
    // Note: In a real implementation, you would call a create API here
    // For now, we'll just close the dialog
    console.log('Create corporate:', newCorporate);
  };

  const columns = GetCorporateOnboardingColumns({ handleEdit });

  const tableData: TableData<CorporateData> = {
    data: corporates,
    totalCount: corporates.length,
    currentPage: 1,
  };

  console.log("CorporateOnboardingStep rendering");
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mt-2">
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
