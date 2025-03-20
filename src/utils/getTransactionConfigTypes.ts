import { transactionTypeMapping, purposeType } from "./transactionTypesConfig";

export const determineBuySell = (transactionTypeId: string): string | null => {
  console.log("transactionTypeId:", transactionTypeId);
  const foundType = transactionTypeMapping.find(
    (type) => type.id === transactionTypeId
  );
  return foundType ? foundType.buySell : "Buy"; // Default to Buy if not found
};

export const determinePurposeType = (purposeTypeId: string): string => {
  console.log("purposeTypeId:", purposeTypeId);
  const foundPurpose = purposeType.find((type) => type.id === purposeTypeId);
  return foundPurpose ? foundPurpose.text : ""; // Return empty string if not found
};

export const determineTransactionType = (transactionTypeId: string): string => {
  console.log("transactionTypeId:", transactionTypeId);
  const foundType = transactionTypeMapping.find(
    (type) => type.id === transactionTypeId
  );
  return foundType ? foundType.text : ""; // Return empty string if not found
};