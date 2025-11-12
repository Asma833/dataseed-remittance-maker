import CreateTransactionsAccordion from '../components/create-transactions-accordion';
import { accordionItems } from '../config/accordion-config';
import { Button } from '@/components/ui/button';
import { useAccordionStateProvider } from '../context/accordion-control-context';

type Props = {
  onCancel?: () => void;
};

const CreateTransactionForm = ({ onCancel }: Props) => {
  const { accordionState, setAccordionState } = useAccordionStateProvider();
  const currentTab = accordionState.currentActiveTab;

  const handlePrevious = () => {
    if (currentTab === 'panel2') {
      setAccordionState({ currentActiveTab: 'panel1' });
    } else if (currentTab === 'panel3') {
      setAccordionState({ currentActiveTab: 'panel2' });
    }
  };

  const handleNext = () => {
    if (currentTab === 'panel1') {
      setAccordionState({ currentActiveTab: 'panel2' });
    } else if (currentTab === 'panel2') {
      setAccordionState({ currentActiveTab: 'panel3' });
    }
  };

  const showPrevious = currentTab !== 'panel1';
  const showNext = currentTab !== 'panel3';

  return (
    <div>
      <div className="flex justify-between mb-4 gap-2">
        <Button variant="light" onClick={onCancel}>
          Cancel
        </Button>
        <div className="flex gap-2">
          {showPrevious && (
            <Button variant="light" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {showNext && (
            <Button onClick={handleNext} className='w-24'>
              Next
            </Button>
          )}
        </div>
      </div>
      <CreateTransactionsAccordion accordionItems={accordionItems} />
    </div>
  );
};

export default CreateTransactionForm;
