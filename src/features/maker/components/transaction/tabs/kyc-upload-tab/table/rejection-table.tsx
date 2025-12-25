import { DataTable } from "@/components/table/data-table";
import { RejectionTableColumnsConfig } from "./rejection-table-columns";
import { useMemo } from 'react';

import { toast } from 'sonner';
import { useRejectionSummary } from "../../../hooks/useRejectionSummary";

interface RejectionTableProps {
  transactionId?: string;
}

const RejectionTable = ({ transactionId }: RejectionTableProps) => {
  const { data, isLoading, isError, error } = useRejectionSummary(transactionId);

  const columns = RejectionTableColumnsConfig();

  const tableData = useMemo(() => {
    const documents = data?.documents ?? [];
    return documents.flatMap((doc:any) => {
      const latest = doc.history?.[0];
      if (!latest) {
        return [
          {
            user: '-',
            document: doc.document_name,
            rejection_date: '-',
            reason: '-',
          },
        ];
      }
      return [
        {
          user: latest.rejected_by,
          document: doc.document_name,
          rejection_date: latest.created_at,
          reason: latest.rejection_reason,
        },
      ];
    });
  }, [data]);

  if (!transactionId) return null;

  if (isError) {
    console.error('Failed to load rejection summary:', error);
    toast.error('Failed to load rejection summary');
  }

  return (
    <div className="rejection-table-wrap">
      {isLoading ? (
        <div className="px-2">Loading rejection summary...</div>
      ) : null}
      <DataTable
        columns={columns}
        data={tableData}
        config={{
          search: { enabled: false, searchMode: "static" },
          pagination: { enabled: false, pageSize: 10, pageSizeOptions: [5, 10, 20, 50, 100], showPageSizeSelector: true },
          sorting: { enabled: true, multiSort: false, sortMode: "static" },
          filters: {
            enabled: true,
            filterMode: "static",
            columnFilters: true,
            globalFilter: true,
          },
          export: { enabled: false },
        }}
      />
    </div>
  );
};

export default RejectionTable;