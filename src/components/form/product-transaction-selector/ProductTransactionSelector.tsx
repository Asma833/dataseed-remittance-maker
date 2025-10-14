import { Control, FieldErrors, useWatch } from 'react-hook-form';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import { FieldType } from '@/types/enums';
import { cn } from '@/utils/cn';

interface ProductTransactionSelectorProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  /** e.g. "productPurpose.chooseProductType" (object of booleans) */
  productFieldName: string;
  /** e.g. "productPurpose.transactionType" (object with keys card|currency -> "buy"|"sell") */
  transactionFieldName: string;
  productOptions?: Record<string, { label: string; checked?: boolean }>;
  /** which products should show a Transaction Type bubble (in this order) */
  showTransactionFor?: ('card' | 'currency')[];
}

export const ProductTransactionSelector = ({
  control,
  errors,
  productFieldName,
  transactionFieldName,
  productOptions = {
    card: { label: 'Card' },
    currency: { label: 'Currency' },
    remittance: { label: 'Remittance' },
    referral: { label: 'Referral' },
  },
  showTransactionFor = ['card', 'currency'],
}: ProductTransactionSelectorProps) => {
  // watch selected product types (object of booleans)
  const productTypeObj = (useWatch({ control, name: productFieldName }) as Record<string, boolean>) || {};

  // selected products (preserve provided order)
  const selected = showTransactionFor.filter((p) => !!productTypeObj?.[p]);
  const bothSelected = selected.includes('card') && selected.includes('currency');

  /** spacing rule applied to BOTH the middle bubble AND the right-column error */
  const getRowMt = (p: 'card' | 'currency', idx: number) => {
    if (bothSelected) return idx === 0 ? 'mt-3' : 'mt-[-50px]';
    return p === 'currency' ? 'mt-10' : 'mt-3';
  };
  /** spacing rule applied to BOTH the middle bubble AND the right-column error */
  const getRowError = (p: 'card' | 'currency', idx: number) => {
    if (bothSelected) return idx === 0 ? 'mt-3' : 'mt-[-40px]';
    return p === 'currency' ? 'mt-10' : 'mt-3';
  };

  /** read nested error object for a product key */
  const getTxnError = (prodKey: string) => {
    const parts = transactionFieldName.split('.');
    const node = parts.reduce((acc: any, part) => acc?.[part], errors);
    return node?.[prodKey];
  };

  return (
    // 3 columns: LEFT product type | MIDDLE bubbles | RIGHT external errors
    <div className="grid md:grid-cols-[30%_55%_auto] lg:grid-cols-[15%_40%_auto] md:gap-6">
      {/* LEFT: Product Type (multi-select) */}
      <FieldWrapper>
        {getController({
          name: productFieldName,
          label: 'Product Type',
          type: FieldType.Checkbox,
          required: true,
          options: productOptions,
          orientation:"vertical",
          variant: 'circle_check_filled',
          isMulti: true,
          control,
          errors,
        })}
      </FieldWrapper>

      {/* MIDDLE: per-selected product "bubble" (internal errors are hidden) */}
      <div className="grid items-start">
        {selected.map((p, idx) => {
          const rowMt = getRowMt(p, idx);
          return (
            <FieldWrapper
              key={`txn-${p}`}
              className={cn(
                'relative overflow-visible self-start [height:fit-content]',
                'rounded-lg bg-gray-100/70 px-3 py-2',
                // left notch
                'before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-4',
                "before:content-[''] before:border-solid",
                'before:[border-right-width:16px] before:[border-top-width:6.5px] before:[border-bottom-width:6.5px]',
                'before:border-y-transparent before:[border-right-color:#D8D8D8]',
                'after:absolute after:top-1/2 after:-translate-y-1/2 after:left-[-17px]',
                "after:content-[''] after:border-solid",
                'after:[border-right-width:17px] after:[border-top-width:7.5px] after:[border-bottom-width:7.5px]',
                'after:border-y-transparent after:[border-right-color:#D1D5DB]',
                rowMt
              )}
            >
              {/* single-row layout; hide any internal error <p> from getController */}
              <div
                className={cn(
                  'grid grid-cols-[auto_1fr] items-center gap-3',
                  // zero the inner form-item paddings/margins
                  "[&_[data-slot='form-item']]:m-0",
                  "[&_[data-slot='form-item']>label]:m-0",
                  "[&_[data-slot='form-item']>div]:m-0",
                  '[&_.flex]:flex-row [&_.flex]:items-center',
                  // HIDE internal error paragraphs no matter how primitives render them
                  "[&_[data-slot='form-item']_p]:hidden",
                  '[&_.text-destructive]:hidden',
                  '[&>p]:hidden'
                )}
              >
                <div className="text-sm mx-2 leading-[12px]">
                  Choose Transaction Type <span className="text-red-700">*</span>
                </div>
                <div className="flex items-center leading-none">
                  {getController({
                    type: FieldType.Checkbox,
                    variant: 'circle_check_filled',
                    options: { buy: { label: 'Buy' }, sell: { label: 'Sell' } },
                    required: true,
                    isMulti: false,
                    name: `${transactionFieldName}.${p}`,
                    control,
                    errors,
                    // if your getController supports classNames, also hide via API:
                    classNames: {
                      error: 'hidden', // optional: if supported, silences internal error slot
                    } as any,
                  })}
                </div>
              </div>
            </FieldWrapper>
          );
        })}
      </div>

      {/* RIGHT: external errors aligned with bubbles (mirrors the same row margin) */}
      <div className="grid items-start">
        {selected.map((p, idx) => {
          const err = getTxnError(p);
          const rowMt = getRowError(p, idx);

          return err ? (
            <p key={`error-${p}`} className={cn('text-sm font-medium text-destructive', rowMt)}>
              {String(err.message || '')}
            </p>
          ) : (
            // spacer ensures rows keep same vertical rhythm when an error is absent
            <span key={`spacer-${p}`} className={rowMt} aria-hidden />
          );
        })}
      </div>
    </div>
  );
};
