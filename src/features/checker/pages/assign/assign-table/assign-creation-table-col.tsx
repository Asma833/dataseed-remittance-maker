// import { Checkbox } from "@/components/ui/checkbox";

export const getAssignCreationColumns = (
  handleSelectionChange: (rowId: string, checked: boolean) => void
) => [
  {
    key: "select",
    id: "select",
    name: "Select",
    className: "50px",
    cell: (value:any,row: any) => (
      <input
        type="checkbox"
        checked={value} // Ensure it reads the correct value
        onChange={(e) => handleSelectionChange(row.partner_order_id, e.target.checked)}
        className={`h-5 w-5 cursor-pointer rounded-sm border-2 transition-all duration-300`}
        style={{  
          accentColor: value ? "red" : "#E53888", //  WebKit color control
          display: "inline-block",
          verticalAlign: "middle",
          position: "relative",
        }}
      />
    ),
  },
  {
    key: "nium_order_id",
    id: "nium_order_id",
    name: "Nium ID",
  },
  {
    key: "partner_order_id",
    id: "partner_order_id",
    name: "BMF ID",
  },
  {
    key: "createdAt",
    id: "createdAt",
    name: "Order Date",
  },
  {
    key: "customer_pan",
    id: "customer_pan",
    name: "Customer PAN",
  },
  {
    key: "transaction_type",
    id: "transaction_type",
    name: "Transaction Type",
  },
  // {
  //   key: "fxCurrency",
  //   id: "fxCurrency",
  //   name: "FX Currency",
  // },
  // {
  //   key: "fxValue",
  //   id: "fxValue",
  //   name: "FX Value",
  // },
  // {
  //   key: "fxRate",
  //   id: "fxRate",
  //   name: "FX Rate",
  // },
  // {
  //   key: "inrRate",
  //   id: "inrRate",
  //   name: "INR Rate",
  // },
  {
    key: "purpose_type",
    id: "purpose_type",
    name: "Purpose Type",
  },
];
