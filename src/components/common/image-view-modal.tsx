import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, X, Loader2 } from 'lucide-react';

interface ImageViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title?: string;
  alt?: string;
  isPdf?: boolean;
}

export const ImageViewModal: React.FC<ImageViewModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  title = 'Image View',
  alt = 'Image',
  isPdf = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [imageSrc, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] [&>button]:hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
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
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0" title="Close">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="flex justify-center w-full min-h-[50vh] relative">
           {isLoading && (
             <div className="absolute inset-0 flex items-center justify-center">
               <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
             </div>
           )}
           {hasError ? (
             <div className="flex flex-col items-center justify-center h-[70vh] text-center">
               <p className="text-gray-600 mb-4">Unable to display PDF in viewer.</p>
               <Button
                 variant="outline"
                 onClick={() => window.open(imageSrc, '_blank')}
               >
                 Open PDF in New Tab
               </Button>
             </div>
           ) : imageSrc?.split('?')[0].toLowerCase().endsWith('.pdf') ||
           isPdf ? (
             <embed
               src={`${imageSrc}#toolbar=0&navpanes=0&scrollbar=0`}
               type="application/pdf"
               width="100%"
               height="100%"
               className={`w-full h-[70vh] ${isLoading ? 'invisible' : 'visible'}`}
               title={title}
               onLoad={() => setIsLoading(false)}
               onError={() => {
                 setIsLoading(false);
                 setHasError(true);
               }}
             />
           ) : (
             <img
               src={imageSrc}
               alt={alt}
               className={`max-w-full max-h-[70vh] object-contain ${isLoading ? 'invisible' : 'visible'}`}
               onLoad={() => setIsLoading(false)}
               onError={(e) => {
                 console.error('Failed to load image:', imageSrc);
                 setIsLoading(false);
               }}
             />
           )}
         </div>
      </DialogContent>
    </Dialog>
  );
};
