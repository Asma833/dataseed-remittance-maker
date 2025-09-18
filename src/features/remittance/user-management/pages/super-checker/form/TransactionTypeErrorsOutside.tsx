import { useFormContext } from "react-hook-form";

type Props = {
  /** e.g. "checkerDetails.transactionTypeMap" */
  nameBase: string;
  /** e.g. { card: true, currency: false, remittance: false, referral: false } */
  selectedProducts: Record<string, boolean>;
  /** default: ["card","currency"] -> which keys to check for per-key errors */
  keysToCheck?: Array<"card" | "currency">;
  /** reserve lines when there is no error; default true */
  reserveSpace?: boolean;
  /** tailwind for height; default "min-h-4" (~16px) */
  lineHeightClass?: string;
};

export const TransactionTypeErrorsOutside = ({
  nameBase,
  selectedProducts,
  keysToCheck = ["card", "currency"],
  reserveSpace = true,
  lineHeightClass = "min-h-4",
}: Props) => {
  const { getFieldState, formState } = useFormContext();

  // 1) parent-level error (if your schema attaches it to the object)
  const parentMsg = getFieldState(nameBase, formState)?.error?.message;

  // 2) per-key messages (only for visible keys)
  const visibleKeys = keysToCheck.filter((k) => selectedProducts?.[k]);
  const perKeyMsgs = visibleKeys.map((k) => ({
    k,
    msg: getFieldState(`${nameBase}.${k}`, formState)?.error?.message,
  }));

  // Decide what to render:
  // - If parent has an error, show that as a single line
  // - Else show per-key messages (one line per visible key)
  if (parentMsg) {
    return (
      <p className={`text-xs text-destructive ${lineHeightClass}`}>
        {parentMsg || (reserveSpace ? "\u00A0" : null)}
      </p>
    );
  }

  // If no visible keys, still reserve one blank line if requested
  if (perKeyMsgs.length === 0) {
    return reserveSpace ? (
      <p className={`text-xs text-destructive ${lineHeightClass}`}>&nbsp;</p>
    ) : null;
  }

  return (
    <ul className="space-y-1">
      {perKeyMsgs.map(({ k, msg }) => (
        <li key={k} className={`text-xs text-destructive ${lineHeightClass}`}>
          {msg || (reserveSpace ? "\u00A0" : null)}
        </li>
      ))}
    </ul>
  );
};
