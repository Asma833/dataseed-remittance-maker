import { Button } from '@/components/ui/button';
import { ActionButtonsProps } from './types';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import edit from '@/assets/icons/edit.svg'

export function ActionButtons<T>({ row, onEdit, onDelete, onView }: ActionButtonsProps<T>) {
  return (
    <div className="flex items-center gap-2">
      {onView && (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onView(row);
          }}
          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
        >
          <AiOutlineEye className="h-4 w-4" />
        </Button>
      )}
      {onEdit && (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(row);
          }}
          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
        >
          {/* <AiOutlineEdit className="h-4 w-4" /> */}
          <img src={edit} />
        </Button>
      )}
      {onDelete && (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(row);
          }}
          className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
        >
          <AiOutlineDelete className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
