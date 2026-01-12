
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';
import { X } from 'lucide-react';
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
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden gap-0">
        <div className="flex justify-between items-start p-6 pb-2">
            <div>
                 <DialogTitle >Order is generated</DialogTitle>
                 <p className="text-sm text-gray-500 mt-1">Tnx Reference No - {transactionRefNo}</p>
            </div>
            {/* Close button is automatically added by DialogContent usually, but matching specific design if needed */}
        </div>
        
        <div className="px-6 pb-4">
          <h3 className="font-semibold text-lg mb-2">KYC</h3>
          <p className="text-sm text-gray-500 mb-4 border-b border-gray-200 pb-2">Please select KYC Type</p>
          <RadioGroup value={kycType} onValueChange={(v) => setKycType(v as 'online' | 'upload')} className="flex gap-6 mb-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="online" id="online" className="peer sr-only" disabled />
              <Label
                htmlFor="online"
                className={cn(
                  "flex items-center gap-2 cursor-pointer text-black font-normal opacity-50 cursor-not-allowed",
                   kycType === 'online' && "font-medium"
                )}
              >
                <div className={cn(
                    "w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center",
                    kycType === 'online' && "bg-primary border-primary"
                )}>
                    {kycType === 'online' && <Check className="w-3 h-3 text-white" />}
                </div>
                Online KYC
              </Label>
            </div>
            
             <div className="flex items-center space-x-2">
              <RadioGroupItem value="upload" id="upload" className="peer sr-only" />
              <Label
                htmlFor="upload"
                className={cn(
                  "flex items-center gap-2 cursor-pointer text-black font-normal",
                   kycType === 'upload' && "font-medium"
                )}
              >
                  <div className={cn(
                    "w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center",
                    kycType === 'upload' && "bg-primary border-primary"
                )}>
                    {kycType === 'upload' && <Check className="w-3 h-3 text-white" />}
                </div>
                Upload Now
              </Label>
            </div>
          </RadioGroup>

          {kycType === 'online' && (
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-1">Link URL</p>
              <Input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://www........................"
                className="border-b border-t-0 border-x-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary border-gray-300 border-dashed"
              />
            </div>
          )}
        </div>

        <div className="flex justify-center p-6 pt-0">
          <Button 
            className="hover:bg-[#ad144d] text-white rounded-md px-8 h-10 w-32"
            variant="secondary"
            onClick={handleShare}
          >
            {kycType === 'online' ? 'Share Link' : 'Upload Document'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
