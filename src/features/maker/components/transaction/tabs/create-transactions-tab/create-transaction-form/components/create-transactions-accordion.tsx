import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { AccordionItem } from '../types/createTransactionForm.types';
import { useAccordionStateProvider } from '../context/accordion-control-context';

export default function CreateTransactionsAccordion({ accordionItems, viewMode, paymentData }: { accordionItems: AccordionItem[], viewMode?: boolean, paymentData?: any }) {
  const { accordionState, setAccordionState } = useAccordionStateProvider();
  const [expanded, setExpanded] = useState<string | false>(accordionState.currentActiveTab);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setExpanded(accordionState.currentActiveTab);
  }, [accordionState.currentActiveTab]);

  return (
    <div>
      {accordionItems.map((item) => (
        <Accordion
          key={item.id}
          expanded={expanded === item.id}
          className="bg-background!"
          sx={{ boxShadow: 'none' }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown />}
            aria-controls={`${item.id}bh-content`}
            id={`${item.id}bh-header`}
            className="bg-transparent!"
          >
            <Typography component="span" className="w-1/3 shrink-0 bg-transparent text-foreground">
              {item.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="mt-4 bg-transparent text-foreground">
            {typeof item.content === 'function' ? (
              item.content({ setAccordionState, viewMode, paymentData })
            ) : (
              <Typography>{item.content}</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
