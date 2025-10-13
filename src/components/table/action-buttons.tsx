import { TooltipButton } from '@/components/common/tooltip-button';
import { ActionButtonsProps } from './types';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete, AiOutlineStop } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';

export function ActionButtons<T>({ row, onEdit, onDelete, onView,onInactivate }: ActionButtonsProps<T>) {
  return (
    <div className="flex items-center justify-center gap-2">
      {onView && (
        <TooltipButton
          type="button"
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onView(row);
          }}
          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
          tooltip="View"
        >
          <AiOutlineEye className="h-4 w-4" />
        </TooltipButton>
      )}
      {onEdit && (
        <TooltipButton
          type="button"
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(row);
          }}
          className="h-8 w-8 p-0 bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-800"
          tooltip="Edit"
        >
          <MdEdit className="h-4 w-4" />
        </TooltipButton>
      )}
      {onDelete && (
        <TooltipButton
          type="button"
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(row);
          }}
          className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
          tooltip="Delete"
        >
          <AiOutlineDelete className="h-4 w-4" />
        </TooltipButton>
      )}
      {onInactivate && (
        <TooltipButton
          type="button"
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onInactivate(row);
          }}
          className="h-8 w-8 p-0 bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-800"
          tooltip="Inactivate"
        >
          <AiOutlineStop className="h-4 w-4" />
        </TooltipButton>
      )}
    </div>
  );
}

