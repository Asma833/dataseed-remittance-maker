import { Control, FieldErrors, useWatch } from "react-hook-form";
import FieldWrapper from "@/components/form/wrapper/field-wrapper";
import { getController } from "@/components/form/utils/get-controller";
import { FieldType } from "@/types/enums";

interface ProductTransactionSelectorProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  productFieldName: string;      // e.g. "productPurpose.chooseProductType"
  transactionFieldName: string;  // e.g. "productPurpose.transactionType"
  productOptions?: Record<string, { label: string; checked?: boolean }>;
  showTransactionFor?: ("card" | "currency")[];
}

export const ProductTransactionSelector = ({
  control,
  errors,
  productFieldName,
  transactionFieldName,
  productOptions = {
    card: { label: "Card" },
    currency: { label: "Currency" },
    remittance: { label: "Remittance" },
    referral: { label: "Referral" },
  },
  showTransactionFor = ["card", "currency"],
}: ProductTransactionSelectorProps) => {
  const productTypeObj =
    (useWatch({ control, name: productFieldName }) as Record<string, boolean>) || {};

  // list of selected products we care about (in provided order)
  const selected = showTransactionFor.filter((p) => !!productTypeObj?.[p]);
  const bothSelected =
    selected.includes("card") && selected.includes("currency");

  // margin-top rule per your requirements
  const getMtClass = (p: "card" | "currency", idx: number) => {
    if (bothSelected) {
      return idx === 0 ? "mt-2" : "mt-[-35px]";
    }
    if (p === "currency") return "mt-10"; // only currency selected
    return "mt-3"; // only card selected
  };

  return (
    <div className="grid md:grid-cols-[30%_65%] lg:grid-cols-[15%_35%_auto] md:gap-6 relative">
      {/* LEFT: Product Type */}
      <FieldWrapper>
        {getController({
          name: productFieldName,
          label: "Product Type",
          type: FieldType.Checkbox,
          required: true,
          options: productOptions,
          variant: "circle_check_filled",
          isMulti: true,
          control,
          errors,
        })}
      </FieldWrapper>

      {/* MIDDLE: Transaction Type for selected products */}
      <div className="grid items-start">
        {selected.map((p, idx) => (
          <FieldWrapper
            key={`txn-${p}`}
            className={[
              "relative overflow-visible self-start [height:fit-content]",
              "rounded-lg bg-gray-100/70 px-3 py-2",
              // left notch
              "before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-4",
              "before:content-[''] before:border-solid",
              "before:[border-right-width:16px] before:[border-top-width:6.5px] before:[border-bottom-width:6.5px]",
              "before:border-y-transparent before:[border-right-color:#D8D8D8]",
              "after:absolute after:top-1/2 after:-translate-y-1/2 after:left-[-17px]",
              "after:content-[''] after:border-solid",
              "after:[border-right-width:17px] after:[border-top-width:7.5px] after:[border-bottom-width:7.5px]",
              "after:border-y-transparent after:[border-right-color:#D1D5DB]",
              getMtClass(p, idx),
            ].join(" ")}
          >
            {/* single-row alignment */}
            <div
              className={[
                "grid grid-cols-[auto_1fr] items-center gap-3",
                "[&_[data-slot='form-item']]:m-0",
                "[&_[data-slot='form-item']]:grid",
                "[&_[data-slot='form-item']]:grid-cols-[auto_auto]",
                "[&_[data-slot='form-item']]:items-center",
                "[&_[data-slot='form-item']>label]:m-0",
                "[&_[data-slot='form-item']>div]:m-0",
                "[&_.flex]:flex-row [&_.flex]:items-center",
                "[&_[data-slot='form-item']>p]:hidden",
              ].join(" ")}
            >
              <div className="text-sm mx-2 leading-[12px]">
                Choose Transaction Type <span className="text-destructive">*</span>
              </div>
              <div className="flex items-center leading-none">
                {getController({
                  type: FieldType.Checkbox,
                  variant: "circle_check_filled",
                  options: {
                    buy: { label: "Buy" },
                    sell: { label: "Sell" },
                  },
                  required: true,
                  isMulti: false,
                  name: `${transactionFieldName}.${p}`,
                  control,
                  errors,
                })}
              </div>
            </div>
          </FieldWrapper>
        ))}
      </div>

      {/* RIGHT: Error messages */}
      <div className="flex flex-col">
        {selected.map((p, idx) => {
          const parts = transactionFieldName.split(".");
          const fieldError = parts.reduce((acc: any, part) => acc?.[part], errors)?.[p];
          return fieldError ? (
            <p
              key={`error-${p}`}
              className={`text-sm font-medium text-destructive ${getMtClass(p, idx)}`}
            >
              {String(fieldError.message || "")}
            </p>
          ) : null;
        })}
      </div>
    </div>
  );
};
