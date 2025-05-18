import React, { useState, useRef } from 'react';
import { Upload, AlertCircle, FileSpreadsheet, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface FileUploadProps {
  onFileUpload: (file: File) => Promise<void>;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isLoading }) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    // Check if the file is an Excel file
    const validExtensions = ['.xlsx', '.xls', '.csv'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!validExtensions.includes(fileExtension)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload only Excel files (.xlsx, .xls) or CSV files.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select an Excel file to analyze.",
        variant: "destructive",
      });
      return;
    }

    try {
      await onFileUpload(selectedFile);
    } catch (error) {
      console.error("Error in file upload:", error);
    }
  };

  const openFileSelector = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <Card className="w-full bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-50 shadow-lg border-0">
      <CardContent className="p-8">
        <div 
          className={`drop-area rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer ${dragActive ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300 bg-white'} ${selectedFile ? 'border-green-500 bg-green-50' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileSelector}
          tabIndex={0}
          aria-label="File upload area"
          role="button"
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && openFileSelector()}
        >
          <input 
            ref={inputRef}
            type="file" 
            className="hidden" 
            accept=".xlsx,.xls,.csv" 
            onChange={handleChange}
          />
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            {selectedFile ? (
              <>
                <FileSpreadsheet className="h-14 w-14 text-green-500" />
                <div className="text-center">
                  <p className="text-lg font-semibold text-green-700">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </>
            ) : (
              <>
                <Upload className="h-14 w-14 text-indigo-500" />
                <div className="text-center">
                  <p className="text-xl font-bold text-indigo-700">Upload Police Report</p>
                  <p className="text-sm text-gray-600">Drag & drop or click to select a file</p>
                  <p className="text-xs text-gray-400 mt-1">Accepted: .xlsx, .xls, .csv &middot; Max 10MB</p>
                </div>
                {/* <Button
                  type="button"
                  variant="outline"
                  className="mt-2 text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                  onClick={e => { e.stopPropagation(); window.open('/sample-police-report.xlsx', '_blank'); }}
                  tabIndex={-1}
                >
                  Download Sample File
                </Button> */}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
          <Button 
            onClick={handleSubmit}
            disabled={!selectedFile || isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg text-lg font-semibold shadow-md"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>Analyze Report</>
            )}
          </Button>
          <div className="text-xs text-gray-500 mt-2 md:mt-0">Your data is secure & confidential</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
