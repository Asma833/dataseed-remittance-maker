# Requirement Specification: EBIX Remittance Maker Application

## 1. Introduction

### 1.1 Purpose
The purpose of this document is to specify the functional and non-functional requirements for the **EBIX Remittance Maker** application. This portal is designed to streamline international money transfers for EBIX branch agents, ensuring compliance, accuracy, and efficiency in transaction processing.

### 1.2 Project Scope
The application is a web-based portal that allows authorized agents to create remittance transactions, manage KYC (Know Your Customer) documents, track payment statuses, and monitor transaction history. It integrates real-time tax calculations (GST/TCS) and provides document generation capabilities.

---

## 2. Product Overview

### 2.1 Product Perspective
EBIX Remittance Maker is a frontend-heavy React application that interacts with a central backend API to process financial transactions. It replaces or augments manual processes with a digital, type-safe, and validated workflow.

### 2.2 Target Audience
- **Branch Agent Maker**: Responsible for initiating transactions and uploading necessary documentation.
- **System Administrators**: (Future) Responsible for monitoring and configuration.

### 2.3 Key Business Objectives
- Reduce manual errors in currency and tax calculations.
- Ensure 100% compliance with KYC data collection.
- Provide real-time visibility into transaction statuses.
- Standardize the remittance process across all EBIX branches.

---

## 3. User Roles and Permissions

| Role | Description | Key Permissions |
| :--- | :--- | :--- |
| **Branch Agent Maker** | Primary operator in the branch. | Create Transactions, Upload KYC, Upload Payment Challans, View Dashboard, Export Reports. |
| **Branch Agent Checker** | Approver (Future Scope). | Verify Transactions, Approve/Reject KYC, Finalize Remittance. |

---

## 4. Functional Requirements

### 4.1 Authentication & Authorization
- **Login**: Users must authenticate via a secure login screen using credentials.
- **Session Management**: JWT-based session management with automatic logout or token expiration.
- **Role-Based Access**: Restrict access to specific modules based on assigned roles (e.g., Maker vs. Checker).

### 4.2 Transaction Management (Core Module)

#### 4.2.1 Create Transaction
- **Multi-Step Workflow**: Implement an accordion-based or tabbed interface for:
    1. **Applicant Details**: Name, PAN (validated), Passport (validated), address, mobile number, and purpose of remittance.
    2. **Beneficiary Details**: Recipient name, Bank name, Account/IBAN, SWIFT/BIC code, and Intermediary bank details (if applicable).
    3. **Currency & Rates**: FX currency selection, amount, settlement rate, agent margin, and final customer rate.
- **Real-time Calculations**:
    - Automatic calculation of **GST** based on transaction value.
    - Automatic calculation of **TCS** (Tax Collected at Source) based on PAN status, purpose, and annual limits.
- **Dynamic Validation**: Fields must adapt based on the selected "Purpose" (e.g., Education, Medical, Personal).

#### 4.2.2 KYC Management
- **Document Upload**: Support for PDF, JPG, and PNG formats.
- **Validation**: File size limit (e.g., 5MB) and type checking.
- **Status Tracking**: Track the lifecycle of KYC (Pending, Verified, Rejected).

#### 4.2.3 Payment Processing
- **Challan Upload**: Ability to upload payment proof (Challans).
- **Status Updates**: Real-time feedback on payment confirmation from the backend.

#### 4.2.4 Transaction Dashboard (View All)
- **Search & Filter**: Search by Transaction ID, Applicant Name, or Date Range.
- **Status Badges**: Visual indicators for transaction states (e.g., Draft, Submitted, Paid, Completed).
- **Detail View**: View comprehensive transaction logs and history.

### 4.3 Reporting and Exports
- **PDF Generation**: Generate a professional PDF receipt/summary for every transaction.
- **Excel Export**: Export filtered transaction lists for audit and accounting purposes.

---

## 5. Non-Functional Requirements

### 5.1 Performance
- **Response Time**: UI must remain responsive during large calculations (GST/TCS).
- **Loading States**: Use skeletons or spinners for all API-driven content.
- **Optimization**: Implement debouncing for real-time validation and API calls.

### 5.2 Security
- **Data Encryption**: Sensitive data (like PAN) must be transmitted over HTTPS.
- **Authentication**: Secure JWT storage (HttpOnly cookies or encrypted local storage).
- **Input Sanitization**: Prevent XSS and Injection attacks through rigorous validation.

### 5.3 Reliability & Availability
- **Error Handling**: Graceful degradation using React Error Boundaries.
- **Persistence**: Save draft transactions to prevent data loss on page refresh (using Redux Persist).

### 5.4 Usability (UX/UI)
- **Theme Support**: Dark and Light mode options for user preference.
- **Responsiveness**: Support for Desktop (primary) and Tablet viewports.
- **Accessibility**: Compliance with WCAG standards (keyboard navigation, ARIA labels).

---

## 6. Technical Stack

- **Framework**: React 19 (Concurrent Mode)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS & Shadcn/UI (Radix UI)
- **State Management**: Redux Toolkit & React Query
- **Form Handling**: React Hook Form with Zod Validation
- **Build Tool**: Vite
- **Utilities**: Axios (API), Day.js (Dates), jsPDF (Exports)

---

## 7. Data Requirements

- **KYC Documents**: Mandatory documents based on purpose (e.g., Passport for foreign travel, University Offer Letter for education).
- **PAN Validation**: Mandatory Indian PAN format validation.
- **Bank Details**: Standardized SWIFT and IBAN validation for international transfers.

---

## 8. External Interface Requirements

- **Backend API**: RESTful endpoints for CRUD, KYC upload, and Tax calculations.
- **Payment Gateway**: (Optional/Future) Integration for direct online payments.
- **Document Storage**: Integration with S3 or similar for KYC file persistence.
