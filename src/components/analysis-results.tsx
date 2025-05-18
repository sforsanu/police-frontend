import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Case, GeneratedPDF } from "@/types";
import CaseItem from "@/components/case-item";
// import { generatePDF } from "@/lib/pdf-generator";
import { generatePDF } from "@/services/pdfService";

interface AnalysisResultsProps {
  cases: Case[];
  onViewPdf: (pdf: GeneratedPDF) => void;
  onDownloadPdf: (pdf: GeneratedPDF) => void;
  onGeneratedPdfs: (pdfs: GeneratedPDF[]) => void;
}

const AnalysisResults = ({ 
  cases,
  onViewPdf,
  onDownloadPdf,
  onGeneratedPdfs
}: AnalysisResultsProps) => {

  useEffect(() => {
    const generateAllPdfs = async () => {
      const generatedPdfs: GeneratedPDF[] = [];

      for (const caseItem of cases) {
        // Generate at-fault PDF
        const atFaultPdf = await generatePDF({
          caseNumber: caseItem.case_number,
          type: 'fault',
          content: caseItem.lettertodriver1
        }, `${caseItem.case_number}_at_fault`);
        
        // Generate not-at-fault PDF
        const notAtFaultPdf = await generatePDF({
          caseNumber: caseItem.case_number,
          type: 'not_fault',
          content: caseItem.lettertodriver2
        }, `${caseItem.case_number}_not_at_fault`);
        
        generatedPdfs.push(atFaultPdf, notAtFaultPdf);
      }
      
      onGeneratedPdfs(generatedPdfs);
    };

    generateAllPdfs();
  }, [cases, onGeneratedPdfs]);

  return (
    <Card className="bg-white rounded-lg shadow-md mb-8 fade-in">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Analysis Results</h2>
        <div className="mb-4">
          <p className="text-gray-600 mb-2 flex items-center">
            <CheckCircle className="h-5 w-5 text-accent mr-2" /> 
            Your data has been successfully processed. Review and download generated letters below.
          </p>
        </div>
        
        <div className="space-y-4">
          {cases.map((caseItem) => (
            <CaseItem 
              key={caseItem.case_number}
              caseItem={caseItem}
              onViewPdf={onViewPdf}
              onDownloadPdf={onDownloadPdf}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisResults;
