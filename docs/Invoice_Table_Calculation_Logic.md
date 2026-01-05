# Invoice Table & Calculation Documentation

## 1. Overview

The Invoice Table (Rate Table) is the core financial engine of the EBIX Remittance Maker. It dynamically computes the total INR (Indian Rupee) amount payable by an applicant based on the foreign currency (FX) amount, exchange rates, service charges, and government taxes (GST/TCS).

---

## 2. Key Input Variables

| Variable          | Source       | Description                                     |
| :---------------- | :----------- | :---------------------------------------------- |
| `FX Amount`       | User Input   | The amount in foreign currency to be sent.      |
| `Settlement Rate` | API / Config | The base exchange rate provided by the company. |
| `Add Margin`      | Agent Input  | The additional markup added to the base rate.   |
| `Customer Rate`   | Calculated   | `Settlement Rate` + `Add Margin`.               |

---

## 3. Calculation Methodology

### 3.1 Line Item Calculations

Each row in the particulars table consists of a **Company Rate** and an **Agent Margin**, summing up to a **Final Rate/Amount**.

#### A. Transaction Value

This represents the base cost of the foreign currency in INR.

- **Formula**: `FX Amount` × `Customer Rate`
- **Example**: 1000 USD × 83.50 INR = 83,500.00 INR

#### B. Service Charges

There are three types of service charges, each follow the same additive logic:

- **Remittance Charges**: `Company Remittance Fee` + `Agent Mark-up`
- **Nostro Charges**: `Company Nostro Fee` + `Agent Mark-up`
- **Other Charges**: `Company Miscellaneous Fee` + `Agent Mark-up`

### 3.2 Sub-Totals (Transaction Amount)

The **Transaction Amount** is the sum of all the line items above before taxes.

- **Formula**: `Transaction Value` + `Remittance Charges` + `Nostro Charges` + `Other Charges`

---

## 4. Tax Calculations (GST & TCS)

### 4.1 GST (Goods and Services Tax)

GST is calculated based on the **Transaction Amount** using a slab-based logic defined by Indian Tax Laws for foreign exchange.

- **Trigger**: Automatic API call (`useGstCalculation`) triggered when Transaction Amount > 0.
- **Logic**: Follows statutory service tax slabs for Forex.

### 4.2 TCS (Tax Collected at Source)

TCS is calculated on the amount inclusive of GST.

- **Base for TCS**: `Transaction Amount` + `GST Amount`
- **Trigger**: Automatic API call (`useTcsCalculation`).
- **Dependency**: Requires PAN, Purpose of Remittance, and Source of Funds.
- **Slabs**:
  - **Education**: Typically 0.5% (if loan) or 5% (above 7L).
  - **Travel/Others**: Up to 20% depending on thresholds.

---

## 5. Final Payable Calculation

| Component               | Operation | Result                               |
| :---------------------- | :-------- | :----------------------------------- |
| **Transaction Amount**  | (+)       | Sum of Value + All Charges           |
| **GST Amount**          | (+)       | Derived from Transaction Amount      |
| **TCS Amount**          | (+)       | Derived from (Transaction Amt + GST) |
| **TOTAL PAYABLE (INR)** | (=)       | **Total Amount in INR**              |

---

## 6. Beneficiary Credit (FX Value)

The amount the recipient actually receives after subtracting specific fees (like Nostro) that are deducted from the principal.

- **Formula**: `(Transaction Amount - Nostro Charges) / Customer Rate`
- **Purpose**: Displays what the overseas beneficiary will get in their local currency.

---

## 7. Implementation Highlights

- **Debounced Updates**: Tax calculations (GST/TCS) are debounced by **2000ms** to prevent excessive API calls while the user is typing.
- **Real-time Sync**: The `RateTable` is synced with `react-hook-form` via `useWatch` and `setValue`, ensuring that any edit in the table immediately reflects in the global state and PDF exports.
- **Rounding**: All financial values are handled as Numbers and formatted to 2 decimal places in the UI using `formatINR`.
