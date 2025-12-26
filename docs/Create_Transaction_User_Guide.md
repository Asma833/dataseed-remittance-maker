# EBIX Remittance Maker - Create Transaction User Guide

## Overview

The Create Transaction feature allows EBIX agents to create and manage international money transfer transactions. This guide provides step-by-step instructions for creating new transactions through the web portal.

## Getting Started

### Accessing Create Transaction
1. Log in to the EBIX Web Agent Portal
2. Navigate to the "Transaction" section
3. Click on the "Create Transactions" tab
4. The transaction creation form will open with three main sections

## Transaction Creation Process

### Step 1: Transaction Details

This section captures basic information about the transaction and the applicant (sender).

#### Required Information:

**Transaction Purpose**
- Select the reason for the remittance from the dropdown
- Options include: Personal Visit, Education, Medical Treatment, etc.

**Currency Information**
- **FX Currency**: Choose the foreign currency for the transaction
- **FX Amount**: Enter the amount to be sent in the selected currency

**Settlement Details**
- **Company Settlement Rate**: The base exchange rate (auto-populated)
- **Add Margin**: Agent's margin percentage
- **Customer Rate**: Final rate shown to customer (calculated automatically)

**Applicant Information**
- **Applicant Name**: Full name of the person sending money
- **PAN Number**: Indian Permanent Account Number (mandatory)
- **Date of Birth**: Applicant's birth date
- **Email**: Applicant's email address
- **Mobile Number**: 10-digit Indian mobile number

**Source of Funds**
- Select how the money will be funded
- Options: Self, Father, Mother, Husband, Wife, etc.

**Passport Details** (Mandatory)
- **Passport Number**: Indian passport number
- **Issue Date**: When passport was issued
- **Expiry Date**: When passport expires
- **Place of Issue**: City where passport was issued

**Address Information** (Mandatory)
- **Address**: Complete residential address
- **City**: City name
- **State**: State name
- **Country**: Country name
- **Postal Code**: 6-digit PIN code

**Additional Details**
- **Paid By**: Who is paying for the transaction (optional)
- **Payee Name**: Name as per PAN (optional)
- **Payee PAN**: PAN of the person receiving money (optional)

### Step 2: Beneficiary Details

This section captures information about the recipient (person receiving the money).

#### Required Information:

**Beneficiary Information**
- **Beneficiary Name**: Full name of the recipient
- **Account/IBAN Number**: Bank account number or IBAN
- **SWIFT Code**: Bank's SWIFT/BIC code
- **Bank Name**: Name of the recipient's bank
- **Bank Address**: Complete address of the recipient's bank
- **City**: Bank city
- **Country**: Bank country
- **SORT/BSB/ABA Code**: Bank's routing code

**Intermediary Bank** (Optional)
- Check "Yes" if funds need to go through an intermediary bank
- If Yes, provide:
  - Intermediary Bank Name
  - Intermediary Bank Address
  - Intermediary SWIFT Code

**Additional Information**
- **Message to Beneficiary**: Instructions for the recipient
- **Purpose**: Transaction purpose details

### Step 3: Currency Details

This section shows the detailed breakdown of charges and final calculations.

#### Rate Table Information

The rate table displays a comprehensive breakdown of all charges:

**Transaction Value**
- **Company Rate**: Base rate from EBIX
- **Agent Markup**: Additional margin added by agent
- **Rate**: Total transaction rate (Company Rate + Agent Markup)

**Remittance Charges**
- **Company Rate**: EBIX's remittance fee
- **Agent Markup**: Agent's additional fee
- **Rate**: Total remittance charges

**Nostro Charges**
- **Company Rate**: Bank's nostro account charges
- **Agent Markup**: Agent's markup on nostro charges
- **Rate**: Total nostro charges

**Other Charges**
- **Company Rate**: Any additional charges
- **Agent Markup**: Agent's markup on other charges
- **Rate**: Total other charges

**Final Calculations**
- **Transaction Amount**: Sum of all charges
- **GST Amount**: Goods and Services Tax (calculated automatically)
- **TCS Amount**: Tax Collected at Source (calculated automatically)
- **Total INR Amount**: Final amount in Indian Rupees

#### Key Features in Currency Details

**Real-time Calculations**
- GST and TCS are calculated automatically based on transaction amount
- All amounts update instantly when you change rates or margins

**Editable Fields**
- Agent can modify markup percentages for different charge types
- Changes reflect immediately in total calculations

**Rate Validation**
- System ensures rates are within acceptable ranges
- Prevents negative or unrealistic rate entries

## Form Actions

### Save Transaction
- Click "Save" to create a draft transaction
- All required fields must be filled before saving
- Transaction will be saved but not submitted for processing

### Update Transaction
- In view mode, click "Update" to modify existing transactions
- Only certain fields can be modified after creation

### Cancel Transaction
- Click "Cancel" to discard the current transaction
- You will be asked to confirm before losing unsaved changes

### Navigation
- Use "Back" button to return to previous screen
- System will warn if you have unsaved changes

## Validation and Error Handling

### Required Field Validation
- Red error messages appear for missing required information
- Form cannot be submitted until all required fields are completed

### Data Validation
- PAN numbers must follow Indian format (ABCDE1234F)
- Mobile numbers must be 10 digits starting with 6-9
- Email addresses must be valid format
- Passport numbers must be valid Indian format
- Postal codes must be 6 digits

### Business Rule Validation
- Passport expiry date must be future date
- Issue date must be before expiry date
- Transaction amounts must be positive
- Exchange rates must be realistic values

## PDF Export

### Transaction Details PDF
- Click "Share Transaction Details PDF" to download complete transaction information
- PDF includes all transaction details, beneficiary information, and rate breakdown
- Useful for record keeping and customer communication

## Common Scenarios

### Personal Remittance
1. Select "Personal Visit / Leisure Travel" as purpose
2. Enter applicant and beneficiary details
3. System calculates TCS based on PAN and amount
4. Review final amount and save

### Education Loan Payment
1. Select "Education" as purpose
2. Additional field for loan amount appears
3. Provide education loan declaration details
4. TCS calculation considers education exemption rules

### Medical Treatment
1. Select "Medical Treatment" as purpose
2. Provide medical documentation details
3. System applies appropriate tax calculations

## Troubleshooting

### Cannot Save Transaction
- Check all required fields are filled (marked with red asterisks)
- Verify data format (PAN, mobile, email, etc.)
- Ensure beneficiary bank details are complete

### Rate Calculations Not Updating
- Check internet connection for real-time GST/TCS calculation
- Verify transaction amount is entered correctly
- Refresh the page if calculations seem stuck

### PDF Not Downloading
- Check browser pop-up blocker settings
- Ensure Adobe Reader or PDF viewer is installed
- Try again after a few seconds

## Best Practices

### Data Entry
- Double-check PAN and passport numbers for accuracy
- Use complete addresses for better verification
- Enter realistic exchange rates and margins

### Transaction Review
- Always review the final INR amount before saving
- Verify beneficiary details match bank records
- Check GST and TCS calculations are reasonable

### Record Keeping
- Download PDF copies of important transactions
- Keep track of transaction reference numbers
- Maintain customer communication records

## Support

For technical issues or questions:
- Contact EBIX support team
- Email: support@ebix.com
- Phone: [Support phone number]

---

**Document Version**: 1.0
**Last Updated**: December 26, 2025
**Target Audience**: EBIX Agents and Business Users</content>
