import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onReset: () => void;
}

const ErrorMessage = ({ message, onReset }: ErrorMessageProps) => {
  return (
    <Card className="bg-white rounded-lg shadow-md p-8 mb-8 text-center fade-in">
      <CardContent className="flex flex-col items-center justify-center p-6">
        <XCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-xl font-medium text-gray-800 mb-2">Processing Error</h3>
        <p className="text-gray-600 mb-4">{message || "There was an error processing your file. Please check the format and try again."}</p>
        <Button onClick={onReset}>
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
};

export default ErrorMessage;
