import CreateTransactionsAccordion from '../components/CreateTransactionsAccordion';
import { accordionItems } from '../config/accordionConfig';
import { Button } from '@/components/ui/button';

type Props = {
  onCancel?: () => void;
};

const CreateTransactionForm = ({ onCancel }: Props) => {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
      <CreateTransactionsAccordion accordionItems={accordionItems} />
    </div>
  );
};

export default CreateTransactionForm;
