import React from "react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/utils/clipboard";

interface SignLinkButtonProps {
  e_sign_link: string;
}

export const SignLinkButton: React.FC<SignLinkButtonProps> = ({ e_sign_link }) => {
  const handleCopyLink = () => {
    copyToClipboard(e_sign_link, "E-sign link copied successfully!");
  };

  return (
    <Button 
      onClick={handleCopyLink}
      variant="outline"
      size="sm"
    >
      Copy E-Sign Link
    </Button>
  );
};
