import CreateTransactionsAccordion from '../components/CreateTransactionsAccordion';
import { accordionItems } from '../config/accordionConfig';

type Props = {};

const CreateTransactionForm = (props: Props) => {
  return (
    <div>
      <CreateTransactionsAccordion accordionItems={accordionItems} />
    </div>
  );
};

export default CreateTransactionForm;
