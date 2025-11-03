import { useState, useEffect } from 'react';

const initialData = [
  { id: 1, name: 'Tnx Value', niumRate: 0, agentMarkup: 0 },
  { id: 2, name: 'Remittance Charges', niumRate: 250, agentMarkup: 100 },
  { id: 3, name: 'Nostro Charges: BEN/OUR', niumRate: 1000, agentMarkup: 1500 },
  { id: 4, name: 'Other Charges', niumRate: 100, agentMarkup: 200 },
];
const columns = [
  { label: 'Item', className: 'border-b p-2 text-start' },
  { label: 'NIUM Rate', className: 'border-b p-2' },
  { label: 'Agent Markup', className: 'border-b p-2' },
  { label: 'Rate', className: 'border-b p-2 text-start' },
];

const ChargesTable = () => {
  const [rows, setRows] = useState(initialData);
  const [gst, setGst] = useState(1500);
  const [tcs, setTcs] = useState(0);
  const [totals, setTotals] = useState({
    transactionAmount: 0,
    totalINR: 0,
    totalPayable: 0,
  });

  useEffect(() => {
    const transactionAmount = rows.reduce(
      (acc, item) => acc + item.niumRate + item.agentMarkup,
      0
    );
    const totalINR = transactionAmount + gst;
    const totalPayable = totalINR + tcs;

    setTotals({
      transactionAmount,
      totalINR,
      totalPayable,
    });
  }, [rows, gst, tcs]);

  const handleChange = (id: number, field: 'niumRate' | 'agentMarkup', value: string) => {
    const updatedRows = rows.map(row =>
      row.id === id
        ? { ...row, [field]: parseFloat(value) || 0 }
        : row
    );
    setRows(updatedRows);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-300">
         <tr>
          {columns.map((col) => (
            <th key={col.label} className={col.className}>
              {col.label}
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              <td className="border-b p-2">{row.name}</td>
              <td className="border-b p-2">
                <span>{row.niumRate}</span>
              </td>
              <td className="border-b p-2">
                <input
                  type="number"
                  value={row.agentMarkup}
                  onChange={e => handleChange(row.id, 'agentMarkup', e.target.value)}
                  className="w-20 border rounded p-1"
                />
              </td>
              <td className="border-b p-2">
                {(row.niumRate + row.agentMarkup).toFixed(2)}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={3} className="border-b p-2 font-semibold">Transaction Amount</td>
            <td colSpan={3} className="border-b p-2">{totals.transactionAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="border-b p-2">Total GST Amount</td>
            <td colSpan={2} className="border-b p-2">
              SGST CGST IGST/UTGST
            </td>
            <td className="border-b p-2">
            
              <span>{gst}</span>
            </td>
          </tr>
          <tr>
            <td colSpan={3} className="border-b p-2 font-semibold">Total INR Amount</td>
            <td colSpan={3} className="border-b p-2">{totals.totalINR.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={3} className="border-b p-2">TCS</td>
            <td colSpan={3} className="border-b p-2">
            
              <span>{tcs}</span>
            </td>
          </tr>
          <tr className="bg-gray-300 font-semibold">
            <td colSpan={3} className="border-b p-2">Total Payable Amount</td>
            <td colSpan={3} className="border-b p-2">{totals.totalPayable.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChargesTable;
