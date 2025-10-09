import React, { useState } from 'react';
import { DataTable, TableData, staticConfig } from '@/components/table';
import { TableTitle } from '@/features/auth/components/table-title';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import GetCorporateOnboardingColumns, { CorporateData } from './CorporateOnboardingColumns';
import { OnboardCorporateDialog } from '../components/OnboardCorporateDialog';
import { OnboardCorporateFormData } from '../agent-admin-creation.schema';
import { CreateAgentCorporateRequest } from '../../../types/agentCorporate.types';
import { useGetAgentCorporates } from '../../../hooks/useAgentCorporates';

export const CorporateOnboardingStep: React.FC<{ agentId?: string }> = ({ agentId }) => {
  console.log("CorporateOnboardingStep")
  const [isOnboardDialogOpen, setIsOnboardDialogOpen] = useState(false);
  const [editData, setEditData] = useState<CorporateData | null>(null);

  // Fetch agent corporates from API
  const { data: corporates = [], isLoading } = useGetAgentCorporates();

  const handleEdit = (corporate: CorporateData) => {
    setEditData(corporate);
    setIsOnboardDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOnboardDialogOpen(false);
    setEditData(null);
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
          onClick={() => {
            setEditData(null);
            setIsOnboardDialogOpen(true);
          }}
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
        onClose={handleCloseDialog}
        agentId={agentId!}
        {...(editData && {
          editData: {
            id: editData.id,
            entityName: editData.entity_name,
            panNumber: editData.pan_number,
            dateOfIncorporation: editData.date_of_incorporation,
            entityType: editData.entity_type,
            cin: editData.cin,
            address: editData.address,
          }
        })}
      />
    </div>
  );
};
