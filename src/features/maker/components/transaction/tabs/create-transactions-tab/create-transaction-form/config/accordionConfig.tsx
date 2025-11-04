import { AccordionItem } from '../types/createTransactionForm.types';
import BeneficiaryDetails from '../form/form-sections/BeneficiaryDetails';
import CurrencyDetails from '../form/form-sections/CurrencyDetails';
import TransactionBasicDetails from '../form/form-sections/TransactionBasicDetails';

export const accordionItems: AccordionItem[] = [
  {
    id: 'panel1',
    title: 'Create Transaction',
    content: (props) => <TransactionBasicDetails {...props} />,
  },
  {
    id: 'panel2',
    title: 'Beneficiary Details',
    content: (props) => <BeneficiaryDetails {...props} />,
  },
  {
    id: 'panel3',
    title: 'Currency Details',
    content: (props) => <CurrencyDetails {...props} />,
  },
];

export const accordionConfig = {
  defaultExpanded: 'panel1',
  disableGutters: true,
  square: true,
  elevation: 0,
  className: 'accordianWrapper',
  classes: {
    root: 'accordianRoot',
    expanded: 'accordianExpanded',
    region: 'accordianRegion',
    rounded: 'accordianRounded',
  },
  controlTabs: true,
};
