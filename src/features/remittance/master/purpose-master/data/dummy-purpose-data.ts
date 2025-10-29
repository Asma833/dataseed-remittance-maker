import { PurposeData } from '@/features/admin/types/purpose.types';

// Extended interface for dummy data with additional fields
interface ExtendedPurposeData extends PurposeData {
  transaction_type_id?: string;
  mapped_documents?: string;
  status?: string;
}

export const dummyPurposeData: ExtendedPurposeData[] = [
  {
    id: '0c370147-3a5e-4e20-b1f5-2b74fb170431',
    purpose_name: 'Immigration',
    purpose_code: 'IMG',
    transaction_type_id: 'a033d4a4-8a5f-4f7a-a6b7-2e3e86cc9865',
    mapped_documents: 'Immigration Documents',
    mappedTransactionTypes: ['card', 'currency'],
    status: 'Active',
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '1774d770-a393-4b77-9467-dd91aa69a30b',
    purpose_name: 'Test Purpose',
    purpose_code: 'TP',
    transaction_type_id: 'b144c5b5-9b6g-5g8b-b7c8-3f4f87dd9976',
    mapped_documents: 'Test Documents',
    mappedTransactionTypes: ['card', 'remittance'],
    status: 'Active',
    is_active: true,
    created_at: '2024-01-16T11:30:00Z',
    updated_at: '2024-01-16T11:30:00Z',
  },
  {
    id: 'bb52085b-b45f-4e3c-bafe-96e343f2fd79',
    purpose_name: 'Business Travel ',
    purpose_code: 'BT1',
    transaction_type_id: 'c255d6c6-ac7h-6h9c-c8d9-4g5g98eeaa87',
    mapped_documents: 'Business Travel Documents',
    mappedTransactionTypes: ['currency', 'remittance'],
    status: 'Active',
    is_active: true,
    created_at: '2024-01-17T14:20:00Z',
    updated_at: '2024-01-17T14:20:00Z',
  },
  {
    id: 'eb6df145-b161-4ceb-bcbc-95a1e05b3099',
    purpose_name: 'Medical Treatment ',
    purpose_code: 'M1',
    transaction_type_id: 'd366e7d7-bd8i-7i0d-d9e0-5h6h09ffbb98',
    mapped_documents: 'Medical Documents',
    mappedTransactionTypes: ['card', 'currency', 'remittance'],
    status: 'Active',
    is_active: true,
    created_at: '2024-01-18T09:15:00Z',
    updated_at: '2024-01-18T09:15:00Z',
  },
  {
    id: 'e094afaf-b88d-4e50-b4d9-ba5f917f4e02',
    purpose_name: 'Education',
    purpose_code: 'Ed1',
    transaction_type_id: 'e477f8e8-ce9j-8j1e-eaf1-6i7i10ggcc09',
    mapped_documents: 'Education Documents',
    mappedTransactionTypes: ['remittance'],
    status: 'Active',
    is_active: true,
    created_at: '2024-01-19T16:45:00Z',
    updated_at: '2024-01-19T16:45:00Z',
  },
];