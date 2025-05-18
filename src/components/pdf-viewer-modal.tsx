import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer, X } from "lucide-react";
import { GeneratedPDF } from "@/types";

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdf: GeneratedPDF | null;
  onDownload: (pdf: GeneratedPDF) => void;
}

const PdfViewerModal = ({ isOpen, onClose, pdf, onDownload }: PdfViewerModalProps) => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (pdf) {
      setContent(pdf.content);
    } else {
      setContent("");
    }
  }, [pdf]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const documentTitle = pdf ? `Case ${pdf.caseNumber} - ${pdf.type === 'fault' ? 'At-Fault' : 'Not-At-Fault'} Driver Letter` : 'Letter';
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${documentTitle}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; }
              h1 { font-size: 24px; margin-bottom: 20px; }
              p { font-size: 14px; margin-bottom: 15px; line-height: 1.5; }
            </style>
          </head>
          <body>
            ${content}
          </body>
        </html>
      `);
      
      printWindow.document.close();
      printWindow.focus();
      
      // Print after content is loaded
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-gray-800">
            {pdf ? `Case ${pdf.caseNumber} - ${pdf.type === 'fault' ? 'At-Fault' : 'Not-At-Fault'} Driver Letter` : 'Letter'}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="p-4 flex-grow overflow-auto border rounded-md">
          {pdf ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <p className="text-gray-500">No content to display</p>
          )}
        </div>
        
        <DialogFooter className="flex justify-end space-x-3 mt-4">
          {pdf && (
            <>
              <Button 
                variant="default"
                className="flex items-center"
                onClick={() => onDownload(pdf)}
              >
                <Download className="h-4 w-4 mr-2" /> Download PDF
              </Button>
              <Button 
                variant="secondary"
                className="flex items-center"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4 mr-2" /> Print
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewerModal;
