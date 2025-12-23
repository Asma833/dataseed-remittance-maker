// src/features/maker/components/transaction/tabs/kyc-upload-tab/form/kyc-form.test.tsx
// We recommend installing an extension to run vitest tests.

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom';
import KYCForm from './kyc-form';
import { vi } from 'vitest';
import useGetDocumentTypes from '@/hooks/useGetDocumentTypes';

// Mock the kycDocumentsConfig with only base fields; documents are dynamic now.
vi.mock('./kyc-form.config', () => {
  const fields = {
    company_reference_number: {},
    agent_reference_number: {},
    applicant_name: {},
  };
  return { kycDocumentsConfig: { fields } };
});

// Mock zodResolver to be a no-op so validation won't block handleSubmit
vi.mock('@hookform/resolvers/zod', () => {
  return {
    zodResolver: () => undefined,
  };
});

// Mock the document types hook by default to return no documents
vi.mock('@/hooks/useGetDocumentTypes', () => {
  return {
    default: vi.fn(() => ({
      documentTypes: [],
      loading: false,
      error: null,
      refetch: vi.fn(async () => ({})),
      enable: true,
    })),
  };
});

// Mock getController to return an input wired to react-hook-form via useFormContext().register
vi.mock('@/components/form/utils/get-controller', async () => {
  const React = await import('react');
  const { useFormContext } = await import('react-hook-form');

  return {
    getController: (opts: { name: string }) => {
      const name = opts.name;
      // Return a React component so hooks can be used properly
      return React.createElement(function ControllerInput() {
        const { register } = useFormContext();
        return React.createElement('input', {
          'data-testid': name,
          ...register(name),
        });
      });
    },
  };
});

describe('KYCForm', () => {
  const fieldNames = [
    'company_reference_number',
    'agent_reference_number',
    'applicant_name',
  ];

  it('renders all configured fields', () => {
    render(<KYCForm onFormSubmit={vi.fn()} onCancel={vi.fn()} />);
    for (const name of fieldNames) {
      expect(screen.getByTestId(name)).toBeInTheDocument();
    }
  });

  it('calls onFormSubmit when Submit is clicked', async () => {
    const onFormSubmit = vi.fn();
    render(<KYCForm onFormSubmit={onFormSubmit} onCancel={vi.fn()} />);
    const user = userEvent.setup();

    // Click submit button
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(onFormSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('resets inputs when Cancel is clicked', async () => {
    render(<KYCForm onFormSubmit={vi.fn()} onCancel={vi.fn()} />);
    const user = userEvent.setup();

    const target = screen.getByTestId('company_reference_number') as HTMLInputElement;
    // Type a value and assert it is present
    await user.type(target, 'ABC123');
    expect(target).toHaveValue('ABC123');

    // Click Cancel and assert the value is reset to default (empty string)
    await user.click(screen.getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(target).toHaveValue('');
    });
  });

  it('renders dynamic fields when hook returns documents', async () => {
    const mockedUseGetDocumentTypes = vi.mocked(useGetDocumentTypes);
    mockedUseGetDocumentTypes.mockReturnValueOnce({
      documentTypes: [
        {
          id: 'dbb29ac9-0f5d-4596-b940-c9220646fe80',
          document_id: '9e3c9e05-cd9b-4f84-beae-38373128497f',
          name: 'Valid Passport Photo Page',
          display_name: 'Valid Passport Photo Page',
          code: 'PP1',
          is_mandatory: false,
          is_back_required: false,
        },
      ],
      loading: false,
      error: null,
      refetch: vi.fn(async () => ({})),
      enable: true,
    });

    render(
      <KYCForm
        onFormSubmit={vi.fn()}
        onCancel={vi.fn()}
        transaction={{ transaction_purpose_map_id: "58efd638-7dcf-44f3-aff5-de5e034c3286" }}
      />,
    );

    // dynamic doc field should be rendered and available by test id
    expect(await screen.findByTestId('document_dbb29ac9-0f5d-4596-b940-c9220646fe80')).toBeInTheDocument();
  });
});