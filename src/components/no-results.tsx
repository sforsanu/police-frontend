import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface NoResultsProps {
  onReset: () => void;
}

const NoResults = ({ onReset }: NoResultsProps) => {
  return (
    <Card className="bg-white rounded-lg shadow-md p-8 mb-8 text-center fade-in">
      <CardContent className="flex flex-col items-center justify-center p-6">
        <AlertTriangle className="h-12 w-12 text-warning-500 mb-4" />
        <h3 className="text-xl font-medium text-gray-800 mb-2">No Results Found</h3>
        <p className="text-gray-600 mb-4">We couldn't find any valid accident report data in the uploaded file.</p>
        <Button onClick={onReset}>
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoResults;
