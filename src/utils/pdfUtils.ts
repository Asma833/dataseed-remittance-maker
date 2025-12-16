import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Interface for the invoice rate table structure
interface InvoiceRateTable {
  transactionValue: {
    niumRate?: number | string;
    agentMarkUp?: number | string;
    rate?: number | string;
  };
  remittanceCharges: {
    niumRate?: string;
    agentMarkUp?: string;
    rate?: string;
  };
  nostroCharges: {
    niumRate?: string;
    agentMarkUp?: string;
    rate?: string;
  };
  otherCharges: {
    niumRate?: string;
    agentMarkUp?: string;
    rate?: string;
  };
  transactionAmount: {
    rate?: string;
  };
  gstAmount: {
    rate?: string;
  };
  totalInrAmount: {
    rate?: string;
  };
  tcs: {
    rate?: string;
  };
}

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
  const head = [['Particulars', 'Rate (₹)', 'Agent Mark Up (₹)', 'Amount (₹)']];

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
    formatValue(invoiceRateTable.transactionValue.niumRate),
    formatValue(invoiceRateTable.transactionValue.agentMarkUp),
    formatValue(invoiceRateTable.transactionValue.rate),
  ]);

  // Remittance Charges
  body.push([
    'Remittance Charges',
    formatValue(invoiceRateTable.remittanceCharges.niumRate),
    formatValue(invoiceRateTable.remittanceCharges.agentMarkUp),
    formatValue(invoiceRateTable.remittanceCharges.rate),
  ]);

  // Nostro Charges
  body.push([
    'Nostro Charges: BEN/OUR',
    formatValue(invoiceRateTable.nostroCharges.niumRate),
    formatValue(invoiceRateTable.nostroCharges.agentMarkUp),
    formatValue(invoiceRateTable.nostroCharges.rate),
  ]);

  // Other Charges
  body.push([
    'Other Charges',
    formatValue(invoiceRateTable.otherCharges.niumRate),
    formatValue(invoiceRateTable.otherCharges.agentMarkUp),
    formatValue(invoiceRateTable.otherCharges.rate),
  ]);

  // Transaction Amount
  body.push(['Transaction Amount', '', '', formatValue(invoiceRateTable.transactionAmount.rate)]);

  // GST Amount
  body.push(['Total GST Amount\nCGST IGST/UTGST', '', '', formatValue(invoiceRateTable.gstAmount.rate)]);

  // Total INR Amount
  body.push(['Total INR Amount', '', '', formatValue(invoiceRateTable.totalInrAmount.rate)]);

  // TCS
  body.push(['TCS', '', '', formatValue(invoiceRateTable.tcs.rate)]);

  // Footer
  const foot = [
    ['Total Payable Amount', '', '', totalAmount.toString()],
    ['Beneficiary Amount (In Fx Value)', '', '', totalAmount.toString()],
  ];

  // Add title
  doc.text('Transaction Details', 14, 20);

  // Generate table
  autoTable(doc, {
    head: head,
    body: body,
    foot: foot,
    startY: 30,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 3,
      halign: 'center',
      valign: 'middle',
    },
    headStyles: {
      fillColor: [158, 158, 158],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    footStyles: {
      fillColor: [244, 244, 244],
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { halign: 'left', cellWidth: 60 },
      1: { halign: 'right', cellWidth: 30 },
      2: { halign: 'right', cellWidth: 40 },
      3: { halign: 'right', cellWidth: 35 },
    },
    margin: { top: 30, left: 14, right: 14 },
  });

  // Save the PDF
  doc.save(`${filename}-${new Date().toISOString().split('T')[0]}.pdf`);
};
