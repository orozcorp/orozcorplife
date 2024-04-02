"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
function CopyText({ text, buttonText, ...rest }) {
  const { toast } = useToast();
  const copyTextFromElement = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied",
        description: `Text copied `,
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button onClick={copyTextFromElement} {...rest}>
      {buttonText}
    </Button>
  );
}

export default CopyText;
