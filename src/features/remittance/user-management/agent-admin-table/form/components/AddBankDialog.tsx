import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BankAccount } from '../../../api/bankAccounts';

interface BankFormData {
  bank_name: string;
  bank_branch: string;
  account_holder_name: string;
  account_number: string;
  ifsc_code: string;
}

interface AddBankDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (bankData: BankFormData) => void;
  editData?: BankAccount;
  onEdit?: (bankData: BankFormData & { id: string }) => void;
}

export const AddBankDialog: React.FC<AddBankDialogProps> = ({
  isOpen,
  onClose,
  onAdd,
  editData,
  onEdit
}) => {
  const [formData, setFormData] = useState({
    bankName: '',
    branchName: '',
    accountHolder: '',
    accountNumber: '',
    ifscCode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editData) {
      setFormData({
        bankName: editData.bank_name || '',
        branchName: editData.bank_branch || '',
        accountHolder: editData.account_holder_name || '',
        accountNumber: editData.account_number || '',
        ifscCode: editData.ifsc_code || '',
      });
    } else {
      setFormData({
        bankName: '',
        branchName: '',
        accountHolder: '',
        accountNumber: '',
        ifscCode: '',
      });
    }
  }, [editData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.bankName.trim()) newErrors.bankName = 'Bank Name is required';
    if (!formData.branchName.trim()) newErrors.branchName = 'Branch Name is required';
    if (!formData.accountHolder.trim()) newErrors.accountHolder = 'Account Holder is required';
    if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account Number is required';
    if (!formData.ifscCode.trim()) newErrors.ifscCode = 'IFSC Code is required';
    else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      newErrors.ifscCode = 'Invalid IFSC Code format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const bankData = {
        bank_name: formData.bankName,
        bank_branch: formData.branchName,
        account_holder_name: formData.accountHolder,
        account_number: formData.accountNumber,
        ifsc_code: formData.ifscCode,
      };
      if (editData && onEdit) {
        onEdit({ ...bankData, id: editData.id });
      } else if (onAdd) {
        onAdd(bankData);
      }
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      bankName: '',
      branchName: '',
      accountHolder: '',
      accountNumber: '',
      ifscCode: '',
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editData ? 'Edit Bank Account' : 'Add Bank Account'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bankName" className="text-right">
                Bank Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="bankName"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                  placeholder="Enter Bank Name"
                />
                {errors.bankName && <p className="text-sm text-red-500 mt-1">{errors.bankName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="branchName" className="text-right">
                Branch Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="branchName"
                  value={formData.branchName}
                  onChange={(e) => handleInputChange('branchName', e.target.value)}
                  placeholder="Enter Branch Name"
                />
                {errors.branchName && <p className="text-sm text-red-500 mt-1">{errors.branchName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountHolder" className="text-right">
                Account Holder
              </Label>
              <div className="col-span-3">
                <Input
                  id="accountHolder"
                  value={formData.accountHolder}
                  onChange={(e) => handleInputChange('accountHolder', e.target.value)}
                  placeholder="Enter Account Holder Name"
                />
                {errors.accountHolder && <p className="text-sm text-red-500 mt-1">{errors.accountHolder}</p>}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountNumber" className="text-right">
                Account Number
              </Label>
              <div className="col-span-3">
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  placeholder="Enter Account Number"
                />
                {errors.accountNumber && <p className="text-sm text-red-500 mt-1">{errors.accountNumber}</p>}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ifscCode" className="text-right">
                IFSC Code
              </Label>
              <div className="col-span-3">
                <Input
                  id="ifscCode"
                  value={formData.ifscCode}
                  onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                  placeholder="Enter IFSC Code"
                />
                {errors.ifscCode && <p className="text-sm text-red-500 mt-1">{errors.ifscCode}</p>}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editData ? 'Update' : 'Add'} Bank
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};