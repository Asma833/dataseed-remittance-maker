import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { InvoiceRateTable } from '@/features/maker/components/transaction/types/create-transaction.types';

/**
 * Generates a PDF for the rate table based on form data
 * @param invoiceRateTable - The invoice rate table data from the form
 * @param totalAmount - The total payable amount
 * @param filename - Name for the PDF file
 */
export const generateRateTablePdf = (
  invoiceRateTable: InvoiceRateTable,
  totalAmount: number,
  filename: string = 'transaction-details'
) => {
  const doc = new jsPDF();

  // Headers
  const head = [['Particulars', 'Rate', 'Agent Mark Up', 'Amount']];

  // Body rows
  const body: string[][] = [];

  // Helper to format value as string
  const formatValue = (value: number | string | undefined): string => {
    if (value === undefined || value === null || value === '') return '';
    return typeof value === 'number' ? value.toString() : value.toString();
  };

  // Transaction Value
  body.push([
    'Tnx Value',
    formatValue(invoiceRateTable.transaction_value.company_rate),
    formatValue(invoiceRateTable.transaction_value.agent_mark_up),
    formatValue(invoiceRateTable.transaction_value.rate),
  ]);

  // Remittance Charges
  body.push([
    'Remittance Charges',
    formatValue(invoiceRateTable.remittance_charges.company_rate),
    formatValue(invoiceRateTable.remittance_charges.agent_mark_up),
    formatValue(invoiceRateTable.remittance_charges.rate),
  ]);

  // Nostro Charges
  body.push([
    'Nostro Charges: BEN/OUR',
    formatValue(invoiceRateTable.nostro_charges.company_rate),
    formatValue(invoiceRateTable.nostro_charges.agent_mark_up),
    formatValue(invoiceRateTable.nostro_charges.rate),
  ]);

  // Other Charges
  body.push([
    'Other Charges',
    formatValue(invoiceRateTable.other_charges.company_rate),
    formatValue(invoiceRateTable.other_charges.agent_mark_up),
    formatValue(invoiceRateTable.other_charges.rate),
  ]);

  // Transaction Amount
  body.push(['Transaction Amount', '', '', formatValue(invoiceRateTable.transaction_amount.rate)]);

  // GST Amount
  body.push(['Total GST Amount\nCGST IGST/UTGST', '', '', formatValue(invoiceRateTable.gst_amount.rate)]);

  // Total INR Amount
  body.push(['Total INR Amount', '', '', formatValue(invoiceRateTable.total_inr_amount.rate)]);

  // TCS
  body.push(['TCS', '', '', formatValue(invoiceRateTable.tcs.rate)]);

  // Add footer rows to body to make them look like regular rows
  body.push(['Total Payable Amount', '', '', totalAmount.toString()]);
  body.push(['Beneficiary Amount (In Fx Value)', '', '', totalAmount.toString()]);

  // Add title
  doc.text('Transaction Details', 14, 20);

  // Generate table
  autoTable(doc, {
    head: head,
    body: body,
    startY: 30,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 3,
      halign: 'left',
      valign: 'middle',
    },
    headStyles: {
      fillColor: [0, 123, 255],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { halign: 'left', cellWidth: 60 },
      1: { halign: 'left', cellWidth: 30 },
      2: { halign: 'left', cellWidth: 40 },
      3: { halign: 'left', cellWidth: 35 },
    },
    margin: { top: 30, left: 14, right: 14 },
  });

  // Save the PDF
  doc.save(`${filename}-${new Date().toISOString().split('T')[0]}.pdf`);
};
