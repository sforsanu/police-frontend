import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Folder, Eye, Download } from "lucide-react";
import { Case, GeneratedPDF } from "@/types";

interface CaseItemProps {
  caseItem: Case;
  onViewPdf: (pdf: GeneratedPDF) => void;
  onDownloadPdf: (pdf: GeneratedPDF) => void;
}

const CaseItem = ({ caseItem, onViewPdf, onDownloadPdf }: CaseItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleViewPdf = (type: 'fault' | 'not_fault') => {
    const content = type === 'fault' ? caseItem.lettertodriver1 : caseItem.lettertodriver2;
    onViewPdf({
      caseNumber: caseItem.case_number,
      type,
      content
    });
  };

  const handleDownloadPdf = (type: 'fault' | 'not_fault') => {
    const content = type === 'fault' ? caseItem.lettertodriver1 : caseItem.lettertodriver2;
    onDownloadPdf({
      caseNumber: caseItem.case_number,
      type,
      content
    });
  };

  return (
    <Card className="border border-gray-200 rounded-lg overflow-hidden">
      <div 
        className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="flex items-center">
          <Folder className="h-5 w-5 text-primary mr-3" />
          <span className="font-mono font-medium text-lg">{caseItem.case_number}</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-4">2 letters generated</span>
          <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} />
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <h4 className="font-medium text-gray-800 mb-2">At-Fault Driver Letter</h4>
              <p className="text-sm text-gray-600 mb-4">Letter to the driver determined to be at fault in the accident.</p>
              <div className="flex justify-between">
                <Button 
                  variant="ghost" 
                  className="text-primary hover:text-primary-foreground hover:bg-primary flex items-center"
                  onClick={() => handleViewPdf('fault')}
                >
                  <Eye className="h-4 w-4 mr-1" /> Preview
                </Button>
                <Button 
                  variant="default"
                  className="flex items-center"
                  onClick={() => handleDownloadPdf('fault')}
                >
                  <Download className="h-4 w-4 mr-1" /> Download PDF
                </Button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <h4 className="font-medium text-gray-800 mb-2">Not-At-Fault Driver Letter</h4>
              <p className="text-sm text-gray-600 mb-4">Letter to the driver determined not to be at fault in the accident.</p>
              <div className="flex justify-between">
                <Button 
                  variant="ghost" 
                  className="text-primary hover:text-primary-foreground hover:bg-primary flex items-center"
                  onClick={() => handleViewPdf('not_fault')}
                >
                  <Eye className="h-4 w-4 mr-1" /> Preview
                </Button>
                <Button 
                  variant="default"
                  className="flex items-center"
                  onClick={() => handleDownloadPdf('not_fault')}
                >
                  <Download className="h-4 w-4 mr-1" /> Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CaseItem;
