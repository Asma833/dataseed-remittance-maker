import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, X } from 'lucide-react';

interface ImageViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title?: string;
  alt?: string;
}

export const ImageViewModal: React.FC<ImageViewModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  title = 'Image View',
  alt = 'Image',
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto [&>button]:hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DialogTitle>{title}</DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(imageSrc, '_blank')}
                className="h-6 w-6 p-0 bg-gray-100 hover:bg-gray-200 scale-75"
                title="Open in new tab"
              >
                <ExternalLink className="h-1 w-1" />
              </Button>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0" title="Close">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="flex justify-center">
          <img
            src={imageSrc}
            alt={alt}
            className="max-w-full max-h-[70vh] object-contain"
            onError={(e) => {
              console.error('Failed to load image:', imageSrc);
              // Could show an error message here
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
