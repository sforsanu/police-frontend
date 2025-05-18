import React, { useState, useEffect } from 'react';
import { FileText, AlertCircle, Download, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReportData } from '@/types';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ResultsDisplayProps {
  data: ReportData[] | undefined;
  isLoading: boolean;
  error: string | undefined;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ data, isLoading, error }) => {
  const [groupedData, setGroupedData] = useState<Record<string, ReportData[]>>({});
  const [expandedCases, setExpandedCases] = useState<Record<string, boolean>>({});
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [openPdfDialog, setOpenPdfDialog] = useState(false);

  // Group data by case number when data changes
  useEffect(() => {
    if (data && data.length > 0) {
      const grouped: Record<string, ReportData[]> = {};
      
      // Group reports by case number
      data.forEach(report => {
        const caseNumber = report.caseNumber || 'unknown';
        if (!grouped[caseNumber]) {
          grouped[caseNumber] = [];
        }
        grouped[caseNumber].push(report);
      });
      
      setGroupedData(grouped);
      
      // Expand all cases by default
      const allExpanded: Record<string, boolean> = {};
      Object.keys(grouped).forEach(caseNum => {
        allExpanded[caseNum] = true;
      });
      setExpandedCases(allExpanded);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Card className="w-full bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-police-primary flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Processing Results
          </CardTitle>
        </CardHeader>
        <CardContent className="py-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-full max-w-md">
              <Progress value={75} className="h-2" />
            </div>
            <p className="text-lg font-medium text-police-primary">Analyzing report data...</p>
            <p className="text-sm text-gray-500">This may take a few minutes to complete as the n8n workflow processes your file.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full bg-white shadow-md border-red-200">
        <CardHeader className="bg-red-50 border-b border-red-200">
          <CardTitle className="text-red-700 flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" />
            Analysis Error
          </CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <div className="p-4 rounded-md bg-red-50 text-red-800">
            <p className="font-medium">There was an error processing your report:</p>
            <p className="mt-2">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  const handleDownload = (pdfUrl: string, report: ReportData) => {
    // Create an anchor element and trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
    
    // Use case number and fault status for filename if available
    const fileName = report.caseNumber 
      ? `${report.caseNumber}_${report.driverType || 'report'}.pdf`
      : `${report.title || 'police-report'}.pdf`.replace(/\s+/g, '-').toLowerCase();
      
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleViewPdf = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
    setOpenPdfDialog(true);
  };

  // Helper to determine if content is a short code or full letter
  const isFullLetter = (content: string) => content && content.length > 100;

  // Helper to get a preview of the letter content
  const getLetterPreview = (content: string) => {
    // Extract case reference if available
    const caseRefMatch = content.match(/Case Number:\s*([^\n]+)/);
    const caseRef = caseRefMatch ? caseRefMatch[1] : '';
    
    // Extract date if available
    const dateMatch = content.match(/Date of Notice:\s*([^\n]+)/);
    const date = dateMatch ? dateMatch[1] : '';
    
    return (
      <div className="space-y-2">
        <p className="font-medium">{content.split('\n')[0]}</p>
        {caseRef && <p><strong>Case Number:</strong> {caseRef.trim()}</p>}
        {date && <p><strong>Date:</strong> {date.trim()}</p>}
      </div>
    );
  };

  const toggleCaseExpanded = (caseNumber: string) => {
    setExpandedCases(prev => ({
      ...prev,
      [caseNumber]: !prev[caseNumber]
    }));
  };

  // Minimalistic, mobile-friendly results UI
  return (
    <div className="w-full max-w-2xl mx-auto space-y-2">
          {Object.entries(groupedData).map(([caseNumber, reports]) => (
        <div key={caseNumber} className="rounded-lg bg-white/80 shadow-sm border border-gray-100">
          <button
            className="w-full flex items-center justify-between px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 rounded-lg"
                onClick={() => toggleCaseExpanded(caseNumber)}
            aria-expanded={!!expandedCases[caseNumber]}
            aria-controls={`case-details-${caseNumber}`}
          >
            <span className="font-semibold text-indigo-700 text-base">Case {caseNumber}</span>
            <span className="text-xs text-gray-500">{reports.length} letter{reports.length !== 1 ? 's' : ''}</span>
            <span className="ml-2">{expandedCases[caseNumber] ? '▾' : '▸'}</span>
          </button>
              {expandedCases[caseNumber] && (
            <div id={`case-details-${caseNumber}`} className="px-4 pb-3 pt-1 space-y-2 animate-fade-in">
              {reports.map((report, idx) => (
                <div key={report.id || idx} className="flex flex-col gap-1 border-l-2 border-indigo-100 pl-3 mb-2 last:mb-0">
                  <span className="text-sm font-medium text-gray-800">{report.title || `Letter ${idx + 1}`}</span>
                            {report.driverType && (
                    <span className={`text-xs rounded px-2 py-0.5 ${report.driverType === 'fault' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>{report.driverType === 'fault' ? 'At Fault' : 'Not At Fault'}</span>
                            )}
                          {report.timestamp && (
                    <span className="text-xs text-gray-400">{new Date(report.timestamp).toLocaleString()}</span>
                          )}
                          {report.pdfUrl && (
                    <a
                      href={report.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-500 underline mt-1"
                    >
                                View PDF
                    </a>
                  )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
  );
};

export default ResultsDisplay;
