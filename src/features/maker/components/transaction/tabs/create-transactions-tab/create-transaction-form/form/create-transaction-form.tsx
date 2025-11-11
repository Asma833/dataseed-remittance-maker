import CreateTransactionsAccordion from '../components/create-transactions-accordion';
import { accordionItems } from '../config/accordion-config';
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
