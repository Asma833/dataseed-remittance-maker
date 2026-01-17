import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/cn';
import { StatusCategory, StatusKeywords } from '../types/update-transaction.types';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  if (!status || status === '-') return <span>-</span>;

  const isSuccess = StatusKeywords[StatusCategory.SUCCESS].some((s) => status.toLowerCase().includes(s));
  const isError = StatusKeywords[StatusCategory.ERROR].some((s) => status.toLowerCase().includes(s));
  const isPending = StatusKeywords[StatusCategory.PENDING].some((s) => status.toLowerCase().includes(s));
  const isUploaded = StatusKeywords[StatusCategory.UPLOADED].some((s) => status.toLowerCase().includes(s));
  const isUploading = StatusKeywords[StatusCategory.UPLOADING].some((s) => status.toLowerCase().includes(s));

  return (
    <Badge
      variant="outline"
      className={cn(
        isError ? 'bg-red-100 hover:bg-red-200 border-transparent px-3 py-[2px]' : '',
        isSuccess ? 'bg-green-100 hover:bg-green-200 border-transparent px-3 py-[2px]' : '',
        isPending ? 'bg-blue-100 hover:bg-blue-200 border-transparent px-3 py-[2px]' : '',
        isUploaded || isUploading ? 'bg-orange-100 hover:bg-orange-200 border-transparent px-3 py-[2px]' : '',
        className
      )}
    >
      {status}
    </Badge>
  );
};
