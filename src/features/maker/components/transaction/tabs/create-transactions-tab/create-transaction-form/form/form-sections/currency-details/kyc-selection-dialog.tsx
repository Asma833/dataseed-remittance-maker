
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';

interface KycSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactionRefNo: string;
  onShareLink?: (url: string) => void;
  onUploadNow?: () => void;
}

export function KycSelectionDialog({
  open,
  onOpenChange,
  transactionRefNo,
  onShareLink,
  onUploadNow,
}: KycSelectionDialogProps) {
  const [kycType, setKycType] = useState<'online' | 'upload'>('upload');
  const [linkUrl, setLinkUrl] = useState('');

  const handleShare = () => {
    if (kycType === 'online' && onShareLink) {
      onShareLink(linkUrl);
    } else if (kycType === 'upload' && onUploadNow) {
        onUploadNow();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden gap-0">
        <div className="flex justify-between items-start p-6 pb-2">
            <div>
                 <DialogTitle >Order is generated</DialogTitle>
                 <p className="text-sm text-gray-500 mt-1">Tnx Reference No - {transactionRefNo}</p>
            </div>
            {/* Close button is automatically added by DialogContent usually, but matching specific design if needed */}
        </div>

        <div className="flex justify-center p-6 ">
          <Button 
            className="hover:bg-[#ad144d] text-white rounded-md px-8 h-10 w-32"
            variant="secondary"
            onClick={handleShare}
          >
             Upload Document
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
