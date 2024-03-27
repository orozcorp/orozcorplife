"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
function CopyButton({ elementId, buttonText, ...rest }) {
  const { toast } = useToast();
  const copyTextFromElement = async () => {
    try {
      // Get the element by ID
      const element = document.getElementById(elementId);
      if (element) {
        // Get the text content from the element
        const textToCopy = element.textContent || element.value;
        // Use the Clipboard API to copy the text
        await navigator.clipboard.writeText(textToCopy);
        toast({
          title: "Copied",
          description: `Text copied from element with ID ${elementId}`,
        });
      } else {
        toast({
          title: "Error",
          description: `Element with ID ${elementId} not found`,
        });
      }
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

export default CopyButton;
