// libraries
import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

// configuration & utils
import { agentAdminCreationConfig } from '../../agent-admin-creation.config';
import { FieldType } from '@/types/enums';
import { getController } from '@/components/form/utils/get-controller';
import { cn } from '@/utils/cn';
import SubTitle from '../sub-title';

const hCard = 'rounded-xl bg-gray-50';
const cardBody = 'p-4 md:p-5';
const row = 'flex items-center gap-3';
const inlineRow = 'flex items-center gap-4 flex-wrap';
const inputH = 'h-10'; // unify height

export default function CommissionDetailsPage() {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  // Watch product purpose add-on margin fields
  const addOnForexMargin = watch('productPurpose.addOnForexMargin');
  const addOnNostroMargin = watch('productPurpose.addOnNostroMargin');
  const addOnTTMargin = watch('productPurpose.addOnTTMargin');
  const addOnOtherChargersMargin = watch('productPurpose.addOnOtherChargersMargin');
  // Watch commission product type
  const commissionProductType = watch('commission_details.commission_product_type');

  // Watch all_currency checkboxes
  const productMarginAllCurrency = watch('commission_details.product_margin.all_currency');
  const nostroChargesAllCurrency = watch('commission_details.nostro_charges.all_currency');

  // Watch all_currency_margin
  const productMarginAllCurrencyMargin = watch('commission_details.product_margin.all_currency_margin');
  const nostroChargesAllCurrencyMargin = watch('commission_details.nostro_charges.all_currency_margin');

  // Set all_currency to SPECIFIC if not checked, reset margin and currency list
  useEffect(() => {
    if (productMarginAllCurrency !== 'ALL_CURRENCY') {
      setValue('commission_details.product_margin.all_currency', 'SPECIFIC');
      setValue('commission_details.product_margin.all_currency_margin', '');
      const currencies = agentAdminCreationConfig().fields.commission.product_margin.currency_list.currencies;
      currencies.forEach(({ currency_code }) => {
        setValue(`commission_details.product_margin.currency_list.${currency_code}`, '');
      });
    }
  }, [productMarginAllCurrency, setValue]);

  useEffect(() => {
    if (nostroChargesAllCurrency !== 'ALL_CURRENCY') {
      setValue('commission_details.nostro_charges.all_currency', 'SPECIFIC');
      setValue('commission_details.nostro_charges.all_currency_margin', '');
      const currencies = agentAdminCreationConfig().fields.commission.nostro_charges.currency_list.currencies;
      currencies.forEach(({ currency_code }) => {
        setValue(`commission_details.nostro_charges.currency_list.${currency_code}`, '');
      });
    }
  }, [nostroChargesAllCurrency, setValue]);

  // When all_currency is ALL_CURRENCY, set all currency_list values to all_currency_margin
  useEffect(() => {
    if (productMarginAllCurrency === 'ALL_CURRENCY' && productMarginAllCurrencyMargin !== undefined) {
      const currencies = agentAdminCreationConfig().fields.commission.product_margin.currency_list.currencies;
      currencies.forEach(({ currency_code }) => {
        setValue(`commission_details.product_margin.currency_list.${currency_code}`, productMarginAllCurrencyMargin);
      });
    }
  }, [productMarginAllCurrency, productMarginAllCurrencyMargin, setValue]);

  useEffect(() => {
    if (nostroChargesAllCurrency === 'ALL_CURRENCY' && nostroChargesAllCurrencyMargin !== undefined) {
      const currencies = agentAdminCreationConfig().fields.commission.nostro_charges.currency_list.currencies;
      currencies.forEach(({ currency_code }) => {
        setValue(`commission_details.nostro_charges.currency_list.${currency_code}`, nostroChargesAllCurrencyMargin);
      });
    }
  }, [nostroChargesAllCurrency, nostroChargesAllCurrencyMargin, setValue]);

  // currency lists from config
  const pmCurrencies = agentAdminCreationConfig().fields.commission.product_margin.currency_list.currencies;
  const nsCurrencies = agentAdminCreationConfig().fields.commission.nostro_charges.currency_list.currencies;

  // split into two columns evenly
  const splitCurrencies = (arr: { currency_code: string }[]) => {
    const mid = Math.ceil(arr.length / 2);
    return [arr.slice(0, mid), arr.slice(mid)];
  };
  const [pmLeft, pmRight] = useMemo(() => splitCurrencies(pmCurrencies), [pmCurrencies]);
  const [nsLeft, nsRight] = useMemo(() => splitCurrencies(nsCurrencies), [nsCurrencies]);

  return (
    <div className="w-full">
      {/* TOP ROW: Product Type + Commission Type */}
      <div className={`${hCard} mb-4`}>
        <div className={cardBody}>
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center justify-center">
            {/* Product Type */}
            <div>
              <p className="text-sm text-muted-foreground">Product Type</p>
              <div className={row}>
                {getController({
                  ...agentAdminCreationConfig().fields.commission.commission_product_type,
                  name: agentAdminCreationConfig().fields.commission.commission_product_type.name,
                  control,
                  errors,
                  className: `min-w-[280px] ${inputH}`,
                })}
              </div>
            </div>

            {/* Selection Commission Type */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Selection Commission Type</p>
              <div className={inlineRow}>
                {getController({
                  ...agentAdminCreationConfig().fields.commission.commission_type,
                  name: agentAdminCreationConfig().fields.commission.commission_type.name,
                  control,
                  errors,
                  classNames: {
                    wrapper: '',
                    formGroup: 'flex !flex-row gap-5 items-center',
                  },
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr_0.7fr]">
        {/* ================= LEFT BIG CARD ================= */}
        {addOnForexMargin === 'Yes' && commissionProductType === 'Remittance' && (
          <section className={hCard}>
            <SubTitle title="Rate Margin" className="px-4 pt-4" />
            <div className={cardBody}>
              {/* Agent Fixed Markup (INR / Percentage) */}
              <div className="mb-4">
                {/* <p className="text-sm text-muted-foreground mb-2">Agent Fixed Markup</p> */}
                <div className={inlineRow}>
                  {getController({
                    ...agentAdminCreationConfig().fields.commission.product_margin.agent_fixed_margin,
                    name: agentAdminCreationConfig().fields.commission.product_margin.agent_fixed_margin.name,
                    control,
                    errors,
                    classNames: { formGroup: 'flex !flex-row gap-5 items-center' },
                  })}
                </div>
              </div>

              {/* All Currency checkbox + input */}
              <div className="mb-5 grid grid-cols-[auto_1fr] gap-3 items-center">
                <div>
                  {getController({
                    ...agentAdminCreationConfig().fields.commission.product_margin.all_currency,
                    name: agentAdminCreationConfig().fields.commission.product_margin.all_currency.name,
                    control,
                    errors,
                  })}
                </div>
                <div className="max-w-[220px]">
                  {getController({
                    name: 'commission_details.product_margin.all_currency_margin',
                    type: FieldType.Number,
                    disabled: productMarginAllCurrency !== 'ALL_CURRENCY',
                    control,
                    errors,
                    className: inputH,
                    placeholder: 'Enter Value',
                  })}
                </div>
              </div>

              {/* Remittance currency grid */}
              <p className="mb-2 text-sm text-muted-foreground">Remittance</p>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {[pmLeft, pmRight].map((col, i) => (
                  <div key={i} className="space-y-3">
                    {col.map(({ currency_code }) => (
                      <div key={currency_code} className="grid grid-cols-[48px_1fr] items-center gap-2">
                        <label className="text-sm text-muted-foreground m-0 text-center pt-3">{currency_code}</label>
                        {getController({
                          ...agentAdminCreationConfig().fields.commission.product_margin.currency_list,
                          name: `commission_details.product_margin.currency_list.${currency_code}`,
                          control,
                          errors,
                          className: inputH,
                          disabled: productMarginAllCurrency === 'ALL_CURRENCY',
                        })}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================= MIDDLE BIG CARD ================= */}
        {addOnNostroMargin === 'Yes' && commissionProductType === 'Remittance' && (
          <section className={hCard}>
            <SubTitle title="Nostro Charges" className="px-4 pt-4" />
            <div className={cardBody}>
              {/* Type (FX / INR) */}
              <div className="mb-4">
                {/* <p className="text-sm text-muted-foreground mb-2">Type</p> */}
                <div className={inlineRow}>
                  {getController({
                    ...agentAdminCreationConfig().fields.commission.nostro_charges.type,
                    name: agentAdminCreationConfig().fields.commission.nostro_charges.type.name,
                    control,
                    errors,
                    classNames: { formGroup: 'flex !flex-row gap-5 items-center' },
                  })}
                </div>
              </div>

              {/* All Currency + input */}
              <div className="mb-5 grid grid-cols-[auto_1fr] gap-3 items-center">
                <div>
                  {getController({
                    ...agentAdminCreationConfig().fields.commission.nostro_charges.all_currency,
                    name: agentAdminCreationConfig().fields.commission.nostro_charges.all_currency.name,
                    control,
                    errors,
                  })}
                </div>
                <div className="max-w-[220px]">
                  {getController({
                    name: 'commission_details.nostro_charges.all_currency_margin',
                    type: FieldType.Number,
                    disabled: nostroChargesAllCurrency !== 'ALL_CURRENCY',
                    control,
                    errors,
                    className: inputH,
                    placeholder: 'Enter Value',
                  })}
                </div>
              </div>

              {/* Remittance currency grid */}
              <p className="mb-2 text-sm text-muted-foreground">Remittance</p>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {[nsLeft, nsRight].map((col, i) => (
                  <div key={i} className="space-y-3">
                    {col.map(({ currency_code }) => (
                      <div key={currency_code} className="grid grid-cols-[48px_1fr] items-center gap-2">
                        <label className="text-sm text-muted-foreground m-0 text-center pt-3">{currency_code}</label>
                        {getController({
                          ...agentAdminCreationConfig().fields.commission.nostro_charges.currency_list,
                          name: `commission_details.nostro_charges.currency_list.${currency_code}`,
                          control,
                          errors,
                          className: inputH,
                          disabled: nostroChargesAllCurrency === 'ALL_CURRENCY',
                        })}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================= RIGHT SIDEBAR CARDS ================= */}
        <div className="grid gap-4 self-start">
          {/* TT Charges */}
          {addOnTTMargin === 'Yes' && commissionProductType === 'Remittance' && (
            <section className={cn('pb-5', hCard)}>
              <SubTitle title="TT Charges" className="px-4 pt-4" />
              <div className={cardBody}>
                <div className="max-w-[260px]">
                  {getController({
                    // ensure these exist in config; fall back to plain number field if not
                    ...(agentAdminCreationConfig().fields.commission.tt_charges?.rate ?? {}),
                    name: 'commission_details.tt_charges.rate',
                    type:
                      (agentAdminCreationConfig().fields.commission.tt_charges?.rate?.type as FieldType) ??
                      FieldType.Number,
                    control,
                    errors,
                    placeholder: 'Enter Value',
                    className: inputH,
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Other Charges */}
          {addOnOtherChargersMargin === 'Yes' && commissionProductType === 'Remittance' && (
            <section className={cn('pb-5', hCard)}>
              <SubTitle title="Other Charges" className="px-4 pt-4" />
              <div className={cardBody}>
                <div className="max-w-[260px]">
                  {getController({
                    ...(agentAdminCreationConfig().fields.commission.other_charges?.rate ?? {}),
                    name: 'commission_details.other_charges.rate',
                    type:
                      (agentAdminCreationConfig().fields.commission.other_charges?.rate?.type as FieldType) ??
                      FieldType.Number,
                    control,
                    errors,
                    placeholder: 'Enter Value',
                    className: inputH,
                  })}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
