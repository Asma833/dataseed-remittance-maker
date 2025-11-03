import FieldWrapper from '@/components/form/wrapper/FieldWrapper';
import { Button } from '@/components/ui/button';

export type ActionConfig = {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link';
  disabled?: boolean;
  loading?: boolean;
  hidden?: boolean;
};

type CreateTransactionActionsProps = {
  // Core navigation actions
  handleNext?: () => void;
  handlePrevious?: () => void;
  handleCancel?: () => void;

  // Transaction-specific actions
  handleSave?: () => void;
  handleEdit?: () => void;
  handleValidatePanAndSave?: () => void;

  // State flags
  isLoading?: boolean;
  isSaving?: boolean;
  isEditing?: boolean;
  isValidating?: boolean;

  // Control which actions to show
  showNext?: boolean;
  showPrevious?: boolean;
  showSave?: boolean;
  showEdit?: boolean;
  showCancel?: boolean;
  showValidatePanAndSave?: boolean;

  // Custom actions
  customActions?: ActionConfig[];
};

const Actions = ({
  handleNext,
  handlePrevious,
  handleCancel,
  handleSave,
  handleEdit,
  handleValidatePanAndSave,
  isLoading = false,
  isSaving = false,
  isEditing = false,
  isValidating = false,
  showNext = true,
  showPrevious = true,
  showSave = true,
  showEdit = true,
  showCancel = true,
  showValidatePanAndSave = true,
  customActions = [],
}: CreateTransactionActionsProps) => {
  // Build actions array based on props
  const actions: ActionConfig[] = [
    {
      label: 'Previous',
      onClick: handlePrevious || (() => {}),
      hidden: !showPrevious || !handlePrevious,
      disabled: isLoading,
    },
    {
      label: 'Cancel',
      onClick: handleCancel || (() => {}),
      variant: 'outline' as const,
      hidden: !showCancel || !handleCancel,
      disabled: isLoading,
    },
    {
      label: 'Validate Pan & Save',
      onClick: handleValidatePanAndSave || (() => {}),
      hidden: !showValidatePanAndSave || !handleValidatePanAndSave,
      disabled: isLoading,
      loading: isValidating,
    },
    {
      label: 'Save',
      onClick: handleSave || (() => {}),
      hidden: !showSave || !handleSave,
      disabled: isLoading,
      loading: isSaving,
    },
    {
      label: 'Edit',
      onClick: handleEdit || (() => {}),
      hidden: !showEdit || !handleEdit,
      disabled: isLoading,
    },
    ...customActions,
    {
      label: 'Next',
      onClick: handleNext || (() => {}),
      hidden: !showNext || !handleNext,
      disabled: isLoading,
    },
  ].filter((action) => !action.hidden);

  return (
    <div>
      <div className="accordianActionButtonWrapper flex items-center justify-between mt-4 gap-4">
        {actions.map((action, index) => (
          <FieldWrapper key={`${action.label}-${index}`} className="flex-1">
            <Button
              className="primaryBtn accordianActionPrimary w-full"
              onClick={action.onClick}
              disabled={action.disabled || action.loading}
              variant={action.variant}
            >
              {action.loading ? 'Loading...' : action.label}
            </Button>
          </FieldWrapper>
        ))}
      </div>
    </div>
  );
};

export default Actions;
