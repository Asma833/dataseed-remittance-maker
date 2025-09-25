// libraries
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

// configuration & utils
import { commissionDetailsConfig } from "./commission-details.config";
import { FieldType } from "@/types/enums";
import { getController } from "@/components/form/utils/get-controller";
import { cn } from "@/utils/cn";

const hCard = "rounded-xl bg-gray-50";
const cardHeader = "px-4 pt-3 bg-muted/40 rounded-t-xl";
const cardBody = "p-4 md:p-5";

const labelH = "text-[13px] font-semibold text-[#D11E47]"; // pink section titles per figma
const row = "flex items-center gap-3";
const inlineRow = "flex items-center gap-4 flex-wrap";
const inputH = "h-10"; // unify height

export default function CommissionDetailsPage() {
  const { control, formState: { errors }, watch, setValue } = useFormContext();

  // --- product margin state & effects ---
  const isAllCurrencyChecked__product =
    watch("commission_details.product_margin.all_currency")?.ALL_CURRENCY;
  const allMargin_product = watch("commission_details.product_margin.all_currency_margin");

  // State for disabled to force re-render
  const [isAllCurrencyDisabled_product, setIsAllCurrencyDisabled_product] = useState(true);
  useEffect(() => {
    setIsAllCurrencyDisabled_product(!isAllCurrencyChecked__product);
  }, [isAllCurrencyChecked__product]);

  // --- nostro charges state & effects ---
  const isAllCurrencyChecked__nostro =
    watch("commission_details.nostro_charges.all_currency")?.ALL_CURRENCY;
  const allMargin_nostro = watch("commission_details.nostro_charges.all_currency_margin");

  // State for disabled to force re-render
  const [isAllCurrencyDisabled_nostro, setIsAllCurrencyDisabled_nostro] = useState(true);
  useEffect(() => {
    setIsAllCurrencyDisabled_nostro(!isAllCurrencyChecked__nostro);
  }, [isAllCurrencyChecked__nostro]);

  // currency lists from config
  const pmCurrencies = commissionDetailsConfig.fields.product_margin.currency_list.currencies;
  const nsCurrencies = commissionDetailsConfig.fields.nostro_charges.currency_list.currencies;

  // split into two columns evenly
  const splitCurrencies = (arr: { currency_code: string }[]) => {
    const mid = Math.ceil(arr.length / 2);
    return [arr.slice(0, mid), arr.slice(mid)];
  };
  const [pmLeft, pmRight] = useMemo(() => splitCurrencies(pmCurrencies), [pmCurrencies]);
  const [nsLeft, nsRight] = useMemo(() => splitCurrencies(nsCurrencies), [nsCurrencies]);

  // Clear product all-currency margin when checkbox unchecked
  useEffect(() => {
    if (!isAllCurrencyChecked__product && allMargin_product) {
      setValue("commission_details.product_margin.all_currency_margin", "", { shouldDirty: true, shouldValidate: true });
      setValue("commissionDetails.product_margin.all_currency_margin", "", { shouldDirty: true, shouldValidate: true });
    }
  }, [isAllCurrencyChecked__product, allMargin_product, setValue]);

  // Auto fill / clear individual currency margins for Product Margin
  useEffect(() => {
    if (isAllCurrencyChecked__product) {
      if (allMargin_product !== undefined && allMargin_product !== null && allMargin_product !== "") {
        pmCurrencies.forEach(({ currency_code }) => {
          setValue(`commission_details.product_margin.currency_list.${currency_code}`, allMargin_product, { shouldDirty: true, shouldValidate: true });
          setValue(`commissionDetails.product_margin.currency_list.${currency_code}`, allMargin_product, { shouldDirty: true, shouldValidate: true });
        });
      } else {
        pmCurrencies.forEach(({ currency_code }) => {
          setValue(`commission_details.product_margin.currency_list.${currency_code}`, "", { shouldDirty: true, shouldValidate: true });
          setValue(`commissionDetails.product_margin.currency_list.${currency_code}`, "", { shouldDirty: true, shouldValidate: true });
        });
      }
    }
  }, [isAllCurrencyChecked__product, allMargin_product, pmCurrencies, setValue]);

  // Auto fill / clear individual currency margins for Nostro Charges
  useEffect(() => {
    if (isAllCurrencyChecked__nostro) {
      if (allMargin_nostro !== undefined && allMargin_nostro !== null && allMargin_nostro !== "") {
        nsCurrencies.forEach(({ currency_code }) => {
          setValue(`commission_details.nostro_charges.currency_list.${currency_code}`, allMargin_nostro, { shouldDirty: true, shouldValidate: true });
          setValue(`commissionDetails.nostro_charges.currency_list.${currency_code}`, allMargin_nostro, { shouldDirty: true, shouldValidate: true });
        });
      } else {
        nsCurrencies.forEach(({ currency_code }) => {
          setValue(`commission_details.nostro_charges.currency_list.${currency_code}`, "", { shouldDirty: true, shouldValidate: true });
          setValue(`commissionDetails.nostro_charges.currency_list.${currency_code}`, "", { shouldDirty: true, shouldValidate: true });
        });
      }
    }
  }, [isAllCurrencyChecked__nostro, allMargin_nostro, nsCurrencies, setValue]);

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
                  ...commissionDetailsConfig.fields.commission_product_type,
                  name: commissionDetailsConfig.fields.commission_product_type.name,
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
                  ...commissionDetailsConfig.fields.commission_type,
                  name: commissionDetailsConfig.fields.commission_type.name,
                  control,
                  errors,
                  classNames: {
                    wrapper: "",
                    formGroup: "flex !flex-row gap-5 items-center",
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
        <section className={hCard}>
          <header className={cardHeader}>
            <h3 className={labelH}>Rate Margin</h3>
          </header>
          <div className={cardBody}>
            {/* Agent Fixed Markup (INR / Percentage) */}
            <div className="mb-4">
              {/* <p className="text-sm text-muted-foreground mb-2">Agent Fixed Markup</p> */}
              <div className={inlineRow}>
                {getController({
                  ...commissionDetailsConfig.fields.product_margin.agent_fixed_margin,
                  name: commissionDetailsConfig.fields.product_margin.agent_fixed_margin.name,
                  control,
                  errors,
                  classNames: { formGroup: "flex !flex-row gap-5 items-center" },
                })}
              </div>
            </div>

            {/* All Currency checkbox + input */}
            <div className="mb-5 grid grid-cols-[auto_1fr] gap-3 items-center">
              <div>
                {getController({
                  ...commissionDetailsConfig.fields.product_margin.all_currency_checkbox,
                  name: commissionDetailsConfig.fields.product_margin.all_currency_checkbox.name,
                  control,
                  errors,
                })}
              </div>
              <div className="max-w-[220px]">
                {getController({
                  name: "commission_details.product_margin.all_currency_margin",
                  type: FieldType.Number,
                  disabled: isAllCurrencyDisabled_product,
                  control,
                  errors,
                  className: inputH,
                  placeholder: "Enter Value",
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
                      <label
                        htmlFor={`commission_details.product_margin.currency_list.${currency_code}`}
                        className="text-sm text-muted-foreground"
                      >
                        {currency_code}
                      </label>
                      {getController({
                        ...commissionDetailsConfig.fields.product_margin.currency_list,
                        name: `commission_details.product_margin.currency_list.${currency_code}`,
                        control,
                        errors,
                        placeholder: `Enter ${currency_code} value`,
                        className: inputH,
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= MIDDLE BIG CARD ================= */}
        <section className={hCard}>
          <header className={cardHeader}>
            <h3 className={labelH}>Nostro Charges</h3>
          </header>
          <div className={cardBody}>
            {/* Type (FX / INR) */}
            <div className="mb-4">
              {/* <p className="text-sm text-muted-foreground mb-2">Type</p> */}
              <div className={inlineRow}>
                {getController({
                  ...commissionDetailsConfig.fields.nostro_charges.type,
                  name: commissionDetailsConfig.fields.nostro_charges.type.name,
                  control,
                  errors,
                  classNames: { formGroup: "flex !flex-row gap-5 items-center" },
                })}
              </div>
            </div>

            {/* All Currency + input */}
            <div className="mb-5 grid grid-cols-[auto_1fr] gap-3 items-center">
              <div>
                {getController({
                  ...commissionDetailsConfig.fields.nostro_charges.all_currency_checkbox,
                  name: commissionDetailsConfig.fields.nostro_charges.all_currency_checkbox.name,
                  control,
                  errors,
                })}
              </div>
              <div className="max-w-[220px]">
                {getController({
                  name: "commission_details.nostro_charges.all_currency_margin",
                  type: FieldType.Number,
                  disabled: isAllCurrencyDisabled_nostro,
                  control,
                  errors,
                  className: inputH,
                  placeholder: "Enter Value",
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
                      <label
                        htmlFor={`commission_details.nostro_charges.currency_list.${currency_code}`}
                        className="text-sm text-muted-foreground"
                      >
                        {currency_code}
                      </label>
                      {getController({
                        ...commissionDetailsConfig.fields.nostro_charges.currency_list,
                        name: `commission_details.nostro_charges.currency_list.${currency_code}`,
                        control,
                        errors,
                        placeholder: `Enter ${currency_code} value`,
                        className: inputH,
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= RIGHT SIDEBAR CARDS ================= */}
        <div className="grid gap-4 self-start">
          {/* TT Charges */}
          <section className={cn("pb-5",hCard)}>
            <header className={cardHeader}>
              <h3 className={labelH}>TT Charges</h3>
            </header>
            <div className={cardBody}>
              <div className="max-w-[260px]">
                {getController({
                  // ensure these exist in config; fall back to plain number field if not
                  ...(commissionDetailsConfig.fields.tt_charges?.rate ?? {}),
                  name: "commission_details.tt_charges.rate",
                  type: (commissionDetailsConfig.fields.tt_charges?.rate?.type as FieldType) ?? FieldType.Number,
                  control,
                  errors,
                  placeholder: "Enter Value",
                  className: inputH,
                })}
              </div>
            </div>
          </section>

          {/* Other Charges */}
          <section className={cn("pb-5",hCard)}>
            <header className={cardHeader}>
              <h3 className={labelH}>Other Charges</h3>
            </header>
            <div className={cardBody}>
              <div className="max-w-[260px]">
                {getController({
                  ...(commissionDetailsConfig.fields.other_charges?.rate ?? {}),
                  name: "commission_details.other_charges.rate",
                  type: (commissionDetailsConfig.fields.other_charges?.rate?.type as FieldType) ?? FieldType.Number,
                  control,
                  errors,
                  placeholder: "Enter Value",
                  className: inputH,
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
