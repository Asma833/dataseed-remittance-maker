# EBIX Remittance Maker - Complete User Guide

## Overview

The EBIX Web Agent Portal is a comprehensive platform for EBIX agents to manage international remittance transactions. This guide covers all major functionalities including transaction creation, KYC document management, payment processing, and transaction monitoring.

## Getting Started

### Accessing the Portal
1. Log in to the EBIX Web Agent Portal using your credentials
2. Navigate to the "Transaction" section from the main menu
3. Choose from four main transaction management tabs:
   - **Create Transactions**: Create new remittance transactions
   - **KYC Upload**: Manage customer identity documents
   - **Payment Status**: Monitor payment processing
   - **View All Transactions**: Comprehensive transaction overview

---

## 1. CREATE TRANSACTIONS

### Transaction Creation Process

#### Step 1: Transaction Details (Applicant Information)

**Required Information:**
- **Purpose**: Select transaction reason (Personal Visit, Education, Medical Treatment, etc.)
- **FX Currency**: Choose foreign currency (USD, EUR, GBP, etc.)
- **FX Amount**: Enter amount to be sent in selected currency
- **Company Settlement Rate**: Base exchange rate (auto-populated)
- **Add Margin**: Agent's margin percentage
- **Customer Rate**: Final rate for customer (calculated automatically)

**Applicant Details:**
- **Applicant Name**: Full name of sender
- **PAN Number**: Indian Permanent Account Number (mandatory, format: ABCDE1234F)
- **Date of Birth**: Applicant's birth date
- **Email**: Valid email address
- **Mobile Number**: 10-digit Indian number (starting with 6-9)
- **Source of Funds**: Select funding source (Self, Father, Mother, etc.)

**Passport Information (Mandatory):**
- **Passport Number**: Indian passport number (format: A1234567)
- **Issue Date**: Passport issue date
- **Expiry Date**: Passport expiry date (must be future date)
- **Place of Issue**: City of issuance

**Address Details (Mandatory):**
- **Address**: Complete residential address
- **City, State, Country**: Complete location details
- **Postal Code**: 6-digit Indian PIN code

#### Step 2: Beneficiary Details (Recipient Information)

**Banking Information:**
- **Beneficiary Name**: Full name of recipient
- **Account/IBAN Number**: Recipient's bank account or IBAN
- **SWIFT Code**: Bank's SWIFT/BIC code (8-11 characters)
- **Bank Name**: Recipient's bank name
- **Bank Address**: Complete bank address
- **SORT/BSB/ABA Code**: Bank's routing code


**Additional Fields:**
- **Message to Beneficiary**: Payment instructions
- **Purpose**: Detailed transaction purpose

#### Step 3: Currency Details (Rate Calculations)

**Interactive Rate Table:**
- **Transaction Value**: Base amount × exchange rate + agent markup
- **Remittance Charges**: EBIX fees + agent markup
- **Nostro Charges**: Bank's nostro account fees + agent markup
- **Other Charges**: Additional fees + agent markup

**Automatic Calculations:**
- **GST Amount**: Goods and Services Tax (calculated via API)
- **TCS Amount**: Tax Collected at Source (based on purpose and amount)
- **Total INR Amount**: Final amount in Indian Rupees

**Features:**
- Real-time calculations update instantly
- Editable markup fields for agent customization
- Rate validation prevents unrealistic values

### Form Actions

#### Update Transaction
- Modify existing transactions in view mode
- Limited field editing based on transaction status
- Confirmation dialog prevents accidental changes

#### Cancel Transaction
- Discard current transaction with confirmation
- Warns about unsaved changes
- Returns to transaction list

#### PDF Export
- Download complete transaction details
- Includes all sections and rate breakdown
- Useful for records and customer communication

### Validation Rules

**Required Field Validation:**
- Red error indicators for missing information
- Form blocks submission until all requirements met

**Data Format Validation:**
- PAN: ABCDE1234F format
- Mobile: 10 digits, starts with 6-9
- Email: Valid email format
- Passport: A1234567 format
- Postal Code: 6 digits

**Business Rules:**
- Passport expiry > current date
- Issue date < expiry date
- Positive transaction amounts
- Realistic exchange rates

---

## 2. KYC UPLOAD

### Document Management Overview

The KYC Upload feature manages customer identity verification documents required for regulatory compliance.

### Accessing KYC Upload
1. Navigate to "Transaction" → "KYC Upload" tab
2. View transactions requiring document uploads
3. Click "Upload" to manage documents for specific transactions

### Transaction List View

**Table Information:**
- **Reference Numbers**: Company and agent reference numbers
- **Applicant Details**: Customer name and PAN
- **Transaction Status**: Current processing status
- **KYC Status**: Document verification status
- **Created Date**: Transaction creation date


### Document Upload Process

#### Dynamic Document Requirements
System determines required documents based on:
- **Transaction Purpose**: Different purposes need different documents
- **Transaction Amount**: Higher amounts require more verification
- **Destination Country**: Country-specific requirements

#### Common Document Types
- **Passport**: Front and back pages
- **PAN Card**: Permanent Account Number
- **Aadhaar Card**: National identity proof
- **Bank Statements**: Source of funds proof
- **Address Proof**: Utility bills, rental agreements
- **Education Documents**: For education transactions
- **Medical Documents**: For medical treatment

#### Upload Specifications
- **Formats**: PDF, JPG, JPEG, PNG
- **Size Limit**: Maximum 5MB per document
- **Quality**: Clear, readable, well-lit images
- **Validity**: Current, non-expired documents

### Upload Workflow

1. **Select Transaction**: Choose from pending list
2. **Review Requirements**: System shows required documents
3. **Upload Files**: Drag-and-drop or browse for files
4. **Verify Quality**: Ensure documents are readable
5. **Submit**: Complete upload process

### Handling Rejections

#### Understanding Rejection Reasons
- **Unclear Image**: Document not readable
- **Expired Document**: Validity expired
- **Incomplete Information**: Missing required details
- **Mismatched Data**: Doesn't match transaction information
- **Wrong Document**: Incorrect document type


---

## 3. PAYMENT STATUS

### Payment Processing Overview

Monitor and manage payment processing for all transactions, including status tracking and proof-of-payment uploads.

### Payment Dashboard

#### Transaction Table Information
- **Reference Numbers**: Transaction identifiers
- **Customer Details**: Applicant name and PAN
- **Transaction Amounts**: FX amount, settlement rate, customer rate
- **Payment Status**: Current payment processing status
- **KYC Status**: Document verification status
- **Order & Expiry Dates**: Creation and payment deadlines


### Payment Processing Workflow

#### 1. Review Pending Payments
- Identify transactions awaiting payment
- Check expiry dates for urgent processing
- Verify KYC status before payment acceptance

#### 2. Upload Payment Proof
- Click upload icon for transactions with completed payments
- Select payment method (bank transfer, etc.)
- Upload payment screenshot or challan

#### 3. Monitor Processing
- Track status changes in real-time
- Receive notifications for status updates
- Address any payment verification issues

#### 4. Handle Issues
- **Payment Not Received**: Verify with customer, check bank records
- **Incorrect Amount**: Confirm transaction amount matches payment
- **Wrong Reference**: Ensure correct transaction reference used
- **Expired Transactions**: Handle according to policy

### Advanced Features

#### Search & Filtering
- **Global Search**: Find by reference, name, PAN
- **Date Range**: Filter by order date or expiry date

#### Export Capabilities
- **CSV Export**: Download filtered payment data
- **Report Generation**: Payment status and processing reports
- **Date-based Reports**: Custom date range exports


---

## 4. VIEW ALL TRANSACTIONS

### Comprehensive Transaction Overview

Complete dashboard for monitoring all transactions across the entire portfolio with advanced analytics and reporting.

### Dashboard Features

#### Complete Transaction Information
- **Identifiers**: Reference numbers, creation dates, expiry dates
- **Customer Data**: Applicant name, PAN, contact details
- **Transaction Details**: Type, purpose, amounts, rates, currencies
- **Status Overview**: KYC, payment, and transaction status
- **Processing Timeline**: Order to completion tracking

#### Status Categories
- **KYC Status**: Document verification progress
- **Payment Status**: Payment processing status
- **Transaction Status**: Overall transaction lifecycle status

### Advanced Search & Analytics

#### Powerful Filtering
- **Multi-field Search**: Search across all transaction data
- **Date Range Filtering**: Filter by creation or expiry dates

### Export & Reporting

#### Data Export Options
- **CSV Downloads**: Filtered or complete datasets


---

## COMMON FEATURES & WORKFLOWS

### Status Management

#### Transaction Status Flow

### File Upload Standards

#### Document Requirements
- **Formats**: PDF, JPG, JPEG, PNG
- **Quality Standards**: Clear, readable, well-lit

---

**Document Version**: 1.0 - Consolidated Complete User Guide
**Last Updated**: December 26, 2025
**Target Audience**: EBIX Agents, Managers, and Support Staff
**Coverage**: Complete EBIX Remittance Maker Application</content>
