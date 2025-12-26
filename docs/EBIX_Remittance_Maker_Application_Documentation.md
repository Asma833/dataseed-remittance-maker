# EBIX Remittance Maker Application Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Application Overview](#application-overview)
3. [Technology Stack](#technology-stack)
4. [Architecture](#architecture)
5. [Project Structure](#project-structure)
6. [Key Features](#key-features)
7. [User Roles and Permissions](#user-roles-and-permissions)
8. [Setup and Installation](#setup-and-installation)
9. [Configuration](#configuration)
10. [API Integration](#api-integration)
11. [Component Library](#component-library)
12. [Testing](#testing)
13. [Deployment](#deployment)
14. [Troubleshooting](#troubleshooting)
15. [Knowledge Transfer](#knowledge-transfer)

## Introduction

The EBIX Web Agent Portal is a modern React-based web application designed for EBIX agents to manage remittance transactions. The application provides a comprehensive platform for creating, managing, and tracking international money transfer transactions with features like KYC upload, payment processing, and transaction monitoring.

## Application Overview

### Purpose
The application serves as a digital portal for EBIX branch agents to:
- Create and manage remittance transactions
- Upload KYC documents
- Track payment statuses
- View transaction history
- Generate transaction reports

### Target Users
- Branch Agent Makers (primary users)
- Administrative users (future expansion)

### Key Business Flows
1. **Transaction Creation**: Multi-step form process for creating remittance transactions
2. **KYC Management**: Document upload and verification process
3. **Payment Processing**: Integration with payment systems and challan uploads
4. **Transaction Monitoring**: View and track all transaction statuses

## Technology Stack

### Frontend Framework
- **React 19.1.1**: Modern React with concurrent features
- **TypeScript 5.9.2**: Type-safe JavaScript
- **Vite 7.1.4**: Fast build tool and development server

### State Management
- **Redux Toolkit 2.9.0**: Global state management
- **React Query 5.85.9**: Server state management and caching
- **Redux Persist 6.0.0**: State persistence

### UI/UX Libraries
- **Shadcn/UI**: Modern component library built on Radix UI
- **Material-UI 7.3.6**: Additional UI components
- **Tailwind CSS 4.1.12**: Utility-first CSS framework
- **Framer Motion 12.23.12**: Animation library
- **Lucide React**: Icon library

### Form Handling
- **React Hook Form 7.62.0**: Efficient form management
- **Zod 4.1.5**: Schema validation
- **@hookform/resolvers**: Form validation integration

### HTTP Client & Utilities
- **Axios 1.11.0**: HTTP client for API calls
- **Day.js 1.11.19**: Date manipulation
- **CryptoJS 4.2.0**: Encryption utilities
- **JWT Decode 4.0.0**: JWT token handling
- **Lodash 4.17.21**: Utility functions

### PDF and File Handling
- **jsPDF 3.0.3**: PDF generation
- **File Saver 2.0.5**: File download functionality
- **XLSX**: Excel file processing

### Development Tools
- **ESLint 9.34.0**: Code linting
- **Prettier 3.6.2**: Code formatting
- **TypeScript ESLint**: TypeScript linting rules

## Architecture

### Application Architecture
The application follows a modern React architecture with:
- **Feature-based organization**: Code organized by business features
- **Component composition**: Reusable UI components
- **Separation of concerns**: Clear separation between UI, business logic, and data layers

### State Management Architecture
- **Global State**: Redux for user authentication and app-wide state
- **Server State**: React Query for API data caching and synchronization
- **Local State**: React hooks for component-level state

### Routing Architecture
- **React Router 7.9.5**: Client-side routing
- **Protected Routes**: Role-based access control
- **Nested Routes**: Hierarchical routing for complex UIs

### Form Architecture
- **Multi-step Forms**: Accordion-based form sections
- **Schema Validation**: Zod schemas for type-safe validation
- **Progressive Disclosure**: Conditional fields based on user input

## Project Structure

```
src/
├── assets/                 # Static assets (fonts, icons, images)
├── components/             # Reusable UI components
│   ├── cell/              # Table cell components
│   ├── common/            # Shared components (dialogs, buttons, etc.)
│   ├── error-boundary/    # Error handling components
│   ├── filter/            # Filter components
│   ├── form/              # Form-related components
│   ├── ui/                # Base UI components (shadcn/ui)
├── core/                  # Application core
│   ├── constant/          # Application constants
│   ├── routes/            # Routing configuration
│   ├── services/          # API services and utilities
├── features/              # Feature-based modules
│   └── maker/             # Agent maker features
│       └── components/
│           └── transaction/  # Transaction management
├── hooks/                 # Custom React hooks
├── layouts/               # Page layouts
├── pages/                 # Route components
├── providers/             # React context providers
├── store/                 # Redux store configuration
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── App.tsx               # Main application component
```

## Key Features

### 1. Transaction Creation
**Location**: `src/features/maker/components/transaction/tabs/create-transactions-tab/`

**Components**:
- Multi-step accordion form
- Transaction details (applicant info, passport, address)
- Beneficiary details (banking information)
- Currency details (FX rates, calculations)
- Rate table with editable fields

**Key Functionality**:
- Real-time GST and TCS calculations
- Dynamic form validation
- PDF generation for transaction details
- Progressive form sections

### 2. KYC Upload
**Location**: `src/features/maker/components/transaction/tabs/kyc-upload-tab/`

**Features**:
- Document upload interface
- File validation and preview
- KYC status tracking
- Bulk upload capabilities

### 3. Payment Status
**Location**: `src/features/maker/components/transaction/tabs/payment-tab/`

**Features**:
- Payment status monitoring
- Challan upload functionality
- Payment verification workflow

### 4. Transaction Dashboard
**Location**: `src/features/maker/components/transaction/tabs/view-all-tab/`

**Features**:
- Transaction history view
- Status filtering and search
- Export capabilities
- Transaction details modal

## User Roles and Permissions

### Branch Agent Maker
- Create new transactions
- Upload KYC documents
- View transaction status
- Upload payment challans
- Generate transaction reports

### Future Roles
- Checker (approval workflow)
- Admin (system administration)

## Setup and Installation

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Installation Steps

1. **Clone Repository**
   ```bash
   git clone [repository-url]
   cd ebix-remittance-maker
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create `.env` file with required variables:
   ```bash
   VITE_API_BASE_URL=https://api.example.com
   VITE_ENV=development
   ```

4. **Development Server**
   ```bash
   npm run dev
   ```
   Application runs on http://localhost:8000

### Build for Production
```bash
npm run build
npm run preview
```

## Configuration

### Environment Variables
- `VITE_API_BASE_URL`: Backend API base URL
- `VITE_ENV`: Environment identifier (development/production)

### Build Configuration
- **Vite Config**: `vite.config.ts` - Build optimization and plugins
- **TypeScript Config**: `tsconfig.json` - TypeScript compilation settings
- **ESLint Config**: `eslint.config.js` - Code quality rules

### Theme Configuration
- Light/Dark mode support via `next-themes`
- Custom color schemes and gradients
- Responsive design breakpoints

## API Integration

### HTTP Client Setup
- Axios instance with interceptors
- Request/response logging
- Error handling and retries

### Key API Endpoints
- Transaction CRUD operations
- File upload endpoints
- Currency rate APIs
- GST/TCS calculation services
- Payment processing APIs

### Caching Strategy
- React Query for server state caching
- Cache invalidation on mutations
- Optimistic updates for better UX

## Component Library

### Base Components (shadcn/ui)
- Button, Input, Select, Dialog, Alert
- Form components with validation
- Data table with sorting/filtering
- Toast notifications

### Custom Components
- **ConfirmationAlert**: Reusable confirmation dialogs
- **GenericDialog**: Modal wrapper component
- **FormFieldRow**: Form layout component
- **RateTable**: Complex rate calculation table

### Form Components
- Multi-step form with accordion
- Conditional field rendering
- Real-time validation feedback
- File upload with preview

## Testing

### Testing Framework
- Jest for unit testing
- React Testing Library for component testing

### Test Categories
- Unit tests for utilities and hooks
- Component tests for UI interactions
- Integration tests for API calls
- E2E tests for critical user flows

### Running Tests
```bash
npm run test
```

## Deployment

### Build Process
1. Type checking: `npm run type-check`
2. Linting: `npm run lint`
3. Build: `npm run build`

### Deployment Checklist
- [ ] Environment variables configured
- [ ] API endpoints updated
- [ ] Build successful
- [ ] Static assets optimized
- [ ] Error boundaries tested

### CI/CD Pipeline
- Automated testing on commits
- Build artifacts generation
- Deployment to staging/production

## Troubleshooting

### Common Issues

#### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check TypeScript compilation errors

#### Runtime Errors
- Check browser console for errors
- Verify API endpoints are accessible
- Check network connectivity

#### Form Validation Issues
- Ensure Zod schemas match form fields
- Check conditional validation logic
- Verify required field configurations

### Debug Mode
- React Query DevTools enabled in development
- Redux DevTools for state debugging
- Browser developer tools for UI debugging

## Knowledge Transfer

### Code Organization Principles
1. **Feature-based structure**: Related code grouped by business features
2. **Component composition**: Small, reusable components
3. **Type safety**: Comprehensive TypeScript usage
4. **Separation of concerns**: Clear boundaries between layers

### Development Workflow
1. Feature branch creation
2. Code implementation with tests
3. Code review process
4. Merge to main branch
5. Automated deployment

### Key Technical Concepts
- **React Query patterns**: Query keys, mutations, cache management
- **Form validation**: Zod schemas with React Hook Form
- **State management**: Redux for global state, React Query for server state
- **Component patterns**: Compound components, render props, hooks

### Best Practices
- Use TypeScript interfaces for all data structures
- Implement proper error boundaries
- Follow consistent naming conventions
- Write comprehensive tests for critical paths
- Use React Query for all API interactions

### Maintenance Guidelines
- Regular dependency updates
- Code refactoring for technical debt
- Performance monitoring and optimization
- Security updates and patches

---

**Document Version**: 1.0
**Last Updated**: December 2025
**Prepared for**: QA Team and Knowledge Transfer