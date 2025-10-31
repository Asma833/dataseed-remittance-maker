import { useMemo, useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCreateDocumentTransactionMap } from '@/features/remittance/master/document-mapping/hooks/useCreateDocumentTransactionMap';
import { useDeleteDocumentMapping } from '@/features/remittance/master/document-mapping/hooks/useDeleteDocumentMapping';
import { API } from '@/core/constant/apis';
import { useGetData } from '@/hooks/useGetData';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import { DataTable } from '@/components/table';
import { DocumentsResponse } from '../types/document.type';
import { FormContentWrapper } from '@/components/form/wrapper/form-content-wrapper';
import { DocumentMappingTableConfig } from './document-mapping-table.config';
import { queryKeys } from '@/core/constant/query-keys';
import useGetDocByTransPurpose from '../hooks/useGetDocByTransPurpose';
import { TransactionPurposeMap } from '../types/transaction-form.types';
import { DocumentFormConfig } from './document-form.config';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import DocumentMappingDialog from '../form/document-dialog';

const DocumentMappingTable = () => {
  const { mutate, isPending: isDeleting } = useDeleteDocumentMapping();
  const [rowData, setRowData] = useState(null);
  const [isProcessingSelection, setIsProcessingSelection] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('Map New Document');

  const {
    data: mappedPurposeTransactionTypesData,
    isLoading: userLoading,
    error: userError,
    refetch: refetchMappingData,
  } = useGetData({
    endpoint: API.PURPOSE.TRANSACTION_MAPPING,
    queryKey: queryKeys.masters.documentMapping,
    dataPath: 'data',
  });

  const methods = useForm();
  const {
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = methods;

  // Watch for transaction_type changes
  const selectedTransactionType = watch('transaction_type');
  const selectedPurposeType = watch('purpose_type');

  // Get the mapping ID for the selected transaction and purpose types
  // useMemo is used here to:
  // 1) Avoid running an O(n) array search on every render when inputs haven't changed.
  // 2) Keep the selected mapping object reference stable as long as the dependencies are the same,
  //    which helps prevent unnecessary downstream effects/re-renders (e.g., data fetching hooks or effects
  //    that depend on the mapping id).
  // 3) Early return null when either transaction or purpose isn't selected to keep consumers simple and safe.
  const selectedMapping = useMemo(() => {
    if (
      !selectedTransactionType ||
      !selectedPurposeType ||
      !mappedPurposeTransactionTypesData ||
      !Array.isArray(mappedPurposeTransactionTypesData)
    ) {
      return null;
    }
    return (mappedPurposeTransactionTypesData as TransactionPurposeMap[]).find(
      (item) => item.transactionType.id === selectedTransactionType && item.purpose.id === selectedPurposeType
    );
  }, [selectedTransactionType, selectedPurposeType, mappedPurposeTransactionTypesData]);

  // Fetch mapped documents for the selected transaction-purpose combination
  const {
    docsByTransPurpose: mappedDocuments,
    isLoading: mappedDocsLoading,
    refetch: refetchMappedDocs,
  } = useGetDocByTransPurpose({
    mappedDocPurposeId: selectedMapping?.id,
  });

  // Clear purpose_type when transaction_type changes
  const { setValue } = methods;
  const [previousTransactionType, setPreviousTransactionType] = useState<string | null>(null);

  useEffect(() => {
    // Only clear purpose_type if transaction_type actually changed (not on initial load)
    if (selectedTransactionType && selectedTransactionType !== previousTransactionType) {
      setValue('purpose_type', '');
    }
    setPreviousTransactionType(selectedTransactionType);
  }, [selectedTransactionType, setValue, previousTransactionType]);

  const config = DocumentFormConfig({
    mappedPurposeTransactionTypesData: (mappedPurposeTransactionTypesData as TransactionPurposeMap[]) || [],
    selectedTransactionTypeId: selectedTransactionType,
  });
  // Refetch mapped documents when selectedMapping changes
  useEffect(() => {
    if (selectedMapping?.id && refetchMappedDocs) {
      refetchMappedDocs();
    }
  }, [selectedMapping?.id, refetchMappedDocs]);

  const {
    data,
    isLoading,
    error,
    refetch: refreshData,
  } = useGetData<DocumentsResponse>({
    endpoint: API.DOCUMENT_MASTER.GET_DOCUMENTS,
    queryKey: ['getDocumentsList'],
  });

  const [formattedDataArray, setformattedDataArray] = useState<any[]>([]);

  useEffect(() => {
    const documentArray = data?.data;

    if (!documentArray || !Array.isArray(documentArray)) {
      setformattedDataArray([]);
      return;
    }

    // Filter out null items and merge with mapped document data
    const baseDocuments = documentArray.filter((item) => item != null);

    // If we have mapped documents, update the base documents with mapping info
    if (mappedDocuments && mappedDocuments.length > 0) {
      // Create a map to handle duplicate document_ids by taking the most recent or preferred mapping
      const documentMappingMap = new Map();

      mappedDocuments.forEach((mappedDoc: any) => {
        const existingMapping = documentMappingMap.get(mappedDoc.document_id);

        if (!existingMapping) {
          // First occurrence of this document_id
          documentMappingMap.set(mappedDoc.document_id, mappedDoc);
        } else {
          // Handle duplicate document_id - you can customize this logic
          // For now, we'll merge the requirements (OR operation for boolean values)
          const mergedMapping = {
            ...mappedDoc,
            is_mandatory: existingMapping.is_mandatory || mappedDoc.is_mandatory,
            is_back_required: existingMapping.is_back_required || mappedDoc.is_back_required,
            // Keep the first mapping ID for reference
            id: existingMapping.id,
          };
          documentMappingMap.set(mappedDoc.document_id, mergedMapping);
        }
      });

      const updatedDocuments = baseDocuments.map((doc) => {
        // Find if this document is mapped using the deduplicated map
        const mappedDoc = documentMappingMap.get(doc.id);

        if (mappedDoc) {
          return {
            ...doc,
            isSelected: true,
            requirement: mappedDoc.is_mandatory,
            backRequirement: mappedDoc.is_back_required,
            mappingId: mappedDoc.id, // Store the mapping ID for potential updates
          };
        }

        return {
          ...doc,
          isSelected: false,
          requirement: false,
          backRequirement: false,
          mappingId: null,
        };
      });

      setformattedDataArray(updatedDocuments);
    } else {
      // No mapped documents, reset all to unselected
      const resetDocuments = baseDocuments.map((doc) => ({
        ...doc,
        isSelected: false,
        requirement: false,
        backRequirement: false,
        mappingId: null,
      }));

      setformattedDataArray(resetDocuments);
    }
  }, [data, mappedDocuments]);

  const isPaginationDynamic = false;

  const handleDeleteConfirm = async (selectedItem: any, onError?: () => void) => {
    if (!selectedItem?.mappingId) {
      toast.error('Invalid item selected for deletion');
      if (onError) onError();
      return;
    }

    mutate(selectedItem.mappingId, {
      onSuccess: () => {
        // Refetch mapped documents and mapping data to reflect changes
        if (refetchMappedDocs) {
          refetchMappedDocs();
        }
        if (typeof refetchMappingData === 'function') {
          refetchMappingData();
        }
        setIsProcessingSelection(false);
        toast.success('Document mapping deleted successfully!');
      },
      onError: (error: unknown) => {
        toast.error('Failed to delete document mapping');
        console.error('Delete error:', error);
        if (onError) onError();
      },
    });
  };
 
  const handleSelectionChange = (rowId: string, isSelected: boolean) => {
    // Prevent interaction if already processing a selection
    if (isProcessingSelection || isSavingDocument || isUpdatingDocument || isDeleting) {
      return;
    }

    const selectedRowIndex = formattedDataArray.findIndex((doc) => doc.id === rowId);

    if (selectedRowIndex !== -1) {
      const UpdatedFormattedArray = [...formattedDataArray];
      const selectedItem = UpdatedFormattedArray[selectedRowIndex];

      // Store original state for potential rollback
      const originalState = {
        isSelected: selectedItem.isSelected,
        requirement: selectedItem.requirement,
        backRequirement: selectedItem.backRequirement,
      };

      // Update selection State
      selectedItem.isSelected = isSelected;

      // Update the state with the modified data
      setformattedDataArray(UpdatedFormattedArray);
      setIsProcessingSelection(true);

      if (isSelected) {
        // Ensure form values are set before saving
        if (selectedTransactionType && selectedPurposeType) {
          handleSaveDocuments(selectedItem, () => {
            // On error callback - revert the selection
            const revertedArray = [...formattedDataArray];
            const itemToRevert = revertedArray[selectedRowIndex];
            itemToRevert.isSelected = originalState.isSelected;
            itemToRevert.requirement = originalState.requirement;
            itemToRevert.backRequirement = originalState.backRequirement;
            setformattedDataArray(revertedArray);
            setIsProcessingSelection(false);
          });
        } else {
          toast.error('Please select both Transaction Type and Purpose Type before saving.');
          // Revert selection immediately
          selectedItem.isSelected = originalState.isSelected;
          setformattedDataArray([...UpdatedFormattedArray]);
          setIsProcessingSelection(false);
        }
      } else {
        handleDeleteConfirm(selectedItem, () => {
          // On error callback - revert the selection
          const revertedArray = [...formattedDataArray];
          const itemToRevert = revertedArray[selectedRowIndex];
          itemToRevert.isSelected = originalState.isSelected;
          itemToRevert.requirement = originalState.requirement;
          itemToRevert.backRequirement = originalState.backRequirement;
          setformattedDataArray(revertedArray);
          setIsProcessingSelection(false);
        });
      }
    } else {
      toast.error('Selected Item not found.');
    }
  };

  const handleMandatoryChange = (rowId: string, isChecked: boolean) => {
    // Prevent interaction if already processing a selection
    if (isProcessingSelection || isSavingDocument || isUpdatingDocument || isDeleting) {
      return;
    }

    // Update the mandatory value for the specific document
    const updatedData = formattedDataArray.map((doc) => {
      if (doc.id === rowId) {
        return { ...doc, requirement: isChecked, isSelected: isChecked || doc.backRequirement };
      }
      return doc;
    });
    editMapDocument(updatedData.find((doc) => doc.id === rowId)?.mappingId);
    // Update the state with the modified data
    setformattedDataArray(updatedData);
  };

  const handleBackMandatoryChange = (rowId: string, isChecked: boolean) => {
    // Prevent interaction if already processing a selection
    if (isProcessingSelection || isSavingDocument || isUpdatingDocument || isDeleting) {
      return;
    }

    // Update the back mandatory value for the specific document
    const updatedData = formattedDataArray.map((doc) => {
      if (doc.id === rowId) {
        return { ...doc, backRequirement: isChecked, isSelected: isChecked || doc.requirement };
      }
      return doc;
    });
    editMapDocument(updatedData.find((doc) => doc.id === rowId)?.mappingId);
    // Update the state with the modified data
    setformattedDataArray(updatedData);
  };
  const isTypeSelectionIncomplete = !selectedTransactionType || !selectedPurposeType;

  const tableColumns = DocumentMappingTableConfig({
    handleSelectionChange,
    handleMandatoryChange,
    handleBackMandatoryChange,
    disabled: isTypeSelectionIncomplete,
  });

  // State and handlers for DeleteConfirmationDialog

  const { mutate: mapDocument, isLoading: isSavingDocument } = useCreateDocumentTransactionMap({
    onCreateSuccess: () => {
      setIsProcessingSelection(false);
      // Refetch mapped documents to update the UI with new mappings
      if (refetchMappedDocs) {
        refetchMappedDocs();
      }
      toast.success('Document mapping saved successfully!');
    },
  });

  const { mutate: editMapDocument, isLoading: isUpdatingDocument } = useDeleteDocumentMapping({
    onDeleteSuccess: () => {
      setIsProcessingSelection(false);
      // Refetch mapped documents to update the UI with updated mappings
      if (refetchMappedDocs) {
        refetchMappedDocs();
      }
      toast.success('Document mapping updated successfully!');
    },
  });

  // Calculate disabled state after all hooks are defined
  const isTableDisabled =
    isTypeSelectionIncomplete || isProcessingSelection || isSavingDocument || isUpdatingDocument || isDeleting;

  // Update table columns with the correct disabled state
  const tableColumnsWithLoading = DocumentMappingTableConfig({
    handleSelectionChange,
    handleMandatoryChange,
    handleBackMandatoryChange,
    disabled: isTableDisabled,
  });

  const handleSaveDocuments = (specificDocument?: any, onError?: () => void) => {
    // Find the selected mapping from the data
    const mappingData = mappedPurposeTransactionTypesData as TransactionPurposeMap[];
    const selectedMappingData = mappingData?.find(
      (item: TransactionPurposeMap) =>
        item.transactionType.id === selectedTransactionType && item.purpose.id === selectedPurposeType
    );

    if (!selectedMappingData?.id) {
      toast.error('Please select both Transaction Type and Purpose Type.');
      if (onError) onError();
      return;
    }

    // If specificDocument is provided, only process that document
    // Otherwise, process all selected documents (for backward compatibility)
    let documentsToProcess;

    if (specificDocument) {
      documentsToProcess = [
        {
          transaction_purpose_map_id: selectedMappingData.id,
          document_id: specificDocument.id,
          isBackRequired: specificDocument.backRequirement ?? false,
          is_mandatory: specificDocument.requirement ?? false,
        },
      ];
    } else {
      documentsToProcess = formattedDataArray
        .filter((doc) => doc.isSelected)
        .map((doc) => ({
          transaction_purpose_map_id: selectedMappingData.id,
          document_id: doc.id,
          isBackRequired: doc.backRequirement ?? false,
          is_mandatory: doc.requirement ?? false,
        }));
    }

    if (documentsToProcess.length === 0) {
      toast.error('Please select at least one document.');
      if (onError) onError();
      return;
    }

    mapDocument(documentsToProcess, {
      onSuccess: () => {
        // Success is already handled in the hook's onCreateSuccess
      },
      onError: (error: unknown) => {
        console.error('Save error:', error);
        if (onError) onError();
      },
    });
  };
  const tableActions = {
    onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => {
      //console.log('Pagination changed:', pagination);
      // Here you would typically make an API call
      //  setLoading(true);
      setTimeout(() => {
        // setLoading(false);
      }, 1000);
    },
  };
  // Bulk save function for backward compatibility or future use
  const handleBulkSaveDocuments = handleSubmit((formValues) => {
    handleSaveDocuments(); // Call without specific document to process all selected
  });

  const leftsideRenderAction = () => {
    // Calculate unique mapped documents count
    const uniqueMappedDocsCount = mappedDocuments
      ? new Set(mappedDocuments.map((doc: any) => doc.document_id)).size
      : 0;

    return (
      <div className="flex items-center space-x-2">
        <p className="pl-3 font-semibold">Required Documents</p>
        {selectedMapping && (
          <span className="text-sm text-muted-foreground bg-blue-100 px-2 py-1 rounded">
            {uniqueMappedDocsCount} mapped
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="dynamic-table-wrap relative">
      {/* Loading overlay */}
      {isTableDisabled && (isProcessingSelection || isSavingDocument || isUpdatingDocument || isDeleting) && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-lg">
            <div className="w-6 h-6 border-2 border-dashed rounded-full animate-spin border-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              {isDeleting ? 'Removing document...' : 'Saving changes...'}
            </span>
          </div>
        </div>
      )}

      <FormProvider {...methods}>
        <FormContentWrapper className="mt-0 rounded-lg mr-auto bg-transparent w-full">
          <FormFieldRow className="mt-0" rowCols={4}>
            {Object.entries(config.documentField).map(([name, field]) => (
              <FieldWrapper key={name}>
                {getController({
                  ...(typeof field === 'object' && field !== null ? field : {}),
                  name,
                  control,
                  errors,
                })}
              </FieldWrapper>
            ))}
          </FormFieldRow>
        </FormContentWrapper>
      </FormProvider>
      <DataTable
        columns={tableColumnsWithLoading}
        data={formattedDataArray}
        config={{
          search: {
            placeholder: 'Search...',
            enabled: true,
            searchMode: 'static' as const,
            rightElement: (
              <Button size="sm" className="ml-2" onClick={() => setIsModalOpen(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Map New Document
              </Button>
            ),
          },
          export: { enabled: true, fileName: 'mapped-documents.csv', includeHeaders: true },
        }}
        actions={tableActions}
      />

      <DocumentMappingDialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        dialogTitle={dialogTitle}
        setDialogTitle={setDialogTitle}
        rowData={rowData}
        setRowData={setRowData}
      />
    </div>
  );
};

export default DocumentMappingTable;
