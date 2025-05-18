import React, { useState, useEffect } from 'react';
import { ReportData, WebhookResponse } from '@/types';
import { sendFileToWebhook } from '@/services/webhookService';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { useAuth } from '@/hooks/use-auth';

// import Header from '@/components/Header';
import FileUpload from '@/components/FileUpload';
import ResultsDisplay from '@/components/ResultsDisplay';

const Upload: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<ReportData[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const { toast } = useToast();
  const { user } = useAuth();

  // Restore results from localStorage on mount, but clear if not logged in
  useEffect(() => {
    if (!user) {
      localStorage.removeItem('uploadResults');
      setResults(undefined);
      return;
    }
    const saved = localStorage.getItem('uploadResults');
    if (saved) {
      setResults(JSON.parse(saved));
    }
  }, [user]);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(undefined);
    setResults(undefined);
    localStorage.removeItem('uploadResults'); // Clear previous results
    
    try {
      console.log("Sending file to webhook:", file.name);
      const response: WebhookResponse = await sendFileToWebhook(file);
      
      console.log("Webhook response:", response);
      
      if (response.success && response.data && response.data.length > 0) {
        console.log(`Setting results with ${response.data.length} reports`);
        setResults(response.data);
        localStorage.setItem('uploadResults', JSON.stringify(response.data));
        
        // --- Store PDFs for case management ---
        const prev = localStorage.getItem('casePdfs');
        let allPdfs: ReportData[] = prev ? JSON.parse(prev) : [];
        // Merge, avoiding duplicates by id
        const newIds = new Set(response.data.map((r: ReportData) => r.id));
        allPdfs = [...allPdfs.filter((r: ReportData) => !newIds.has(r.id)), ...response.data];
        localStorage.setItem('casePdfs', JSON.stringify(allPdfs));
        // ---
        
        // Count unique case numbers
        const uniqueCases = new Set(response.data.map(report => report.caseNumber));
        
        toast({
          title: "Analysis Complete",
          description: `Successfully analyzed ${uniqueCases.size} cases with ${response.data.length} letters.`,
        });
      } else {
        console.error("Error from webhook:", response.error);
        setError(response.error || "An unknown error occurred. No reports found in the response.");
        toast({
          title: "Analysis Failed",
          description: response.error || "Failed to analyze the report. No reports found.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      console.error("Error handling file upload:", errorMessage);
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-police-primary">Upload Police Report</h2>
            <p className="text-gray-600">Upload an Excel file to analyze police report data</p>
          </div>
          
          <FileUpload onFileUpload={handleFileUpload} isLoading={isLoading} />
          
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-police-primary mb-4">Analysis Results</h2>
            <ResultsDisplay 
              data={results} 
              isLoading={isLoading} 
              error={error} 
            />
          </div>
        </div>
      </main>
      
      <footer className="bg-police-primary text-white py-4 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Police Report Analyser &copy; {new Date().getFullYear()} | Secure Data Analysis Platform
          </p>
        </div>
      </footer>
    </div>
    </DashboardLayout>
  );
};

export default Upload;
