import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const onboardCorporateSchema = z.object({
  entityName: z.string().min(1, 'Entity Name is required'),
  panNumber: z.string().min(1, 'PAN Number is required'),
  dateOfIncorporation: z.string().min(1, 'Date of Incorporation is required'),
  entityType: z.string().min(1, 'Entity Type is required'),
  cin: z.string().optional(),
  address: z.string().optional(),
});

type OnboardCorporateFormData = z.infer<typeof onboardCorporateSchema>;

interface OnboardCorporateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: OnboardCorporateFormData) => void;
}

export const OnboardCorporateDialog: React.FC<OnboardCorporateDialogProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OnboardCorporateFormData>({
    resolver: zodResolver(onboardCorporateSchema),
  });

  const onSubmit = (data: OnboardCorporateFormData) => {
    onCreate(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle style={{ color: 'var(--color-title)' }}>
            Onboard New Corporate
          </DialogTitle>
          <p className="text-muted-foreground">Please fill all the required fields</p>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="entityName">Entity Name*</Label>
              <Input
                id="entityName"
                {...register('entityName')}
                placeholder="Enter Entity Name"
              />
              {errors.entityName && (
                <p className="text-sm text-red-600">{errors.entityName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="panNumber">PAN Number*</Label>
              <Input
                id="panNumber"
                {...register('panNumber')}
                placeholder="Enter PAN Number"
              />
              {errors.panNumber && (
                <p className="text-sm text-red-600">{errors.panNumber.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateOfIncorporation">Date of Incorporation*</Label>
              <Input
                id="dateOfIncorporation"
                type="date"
                {...register('dateOfIncorporation')}
              />
              {errors.dateOfIncorporation && (
                <p className="text-sm text-red-600">{errors.dateOfIncorporation.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="entityType">Entity Type*</Label>
              <Input
                id="entityType"
                {...register('entityType')}
                placeholder="Enter Entity Type"
              />
              {errors.entityType && (
                <p className="text-sm text-red-600">{errors.entityType.message}</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="cin">CIN</Label>
            <Input
              id="cin"
              {...register('cin')}
              placeholder="Enter CIN"
            />
            {errors.cin && (
              <p className="text-sm text-red-600">{errors.cin.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              {...register('address')}
              placeholder="Enter Address"
              rows={3}
            />
            {errors.address && (
              <p className="text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Back
            </Button>
            <Button type="submit">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};