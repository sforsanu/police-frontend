import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const LoadingIndicator = () => {
  return (
    <Card className="bg-white rounded-lg shadow-md p-8 mb-8 text-center">
      <CardContent className="flex flex-col items-center justify-center p-6">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <h3 className="text-xl font-medium text-gray-800 mb-2">Processing Your Data</h3>
        <p className="text-gray-600">Please wait while we analyze your accident reports and generate letters...</p>
      </CardContent>
    </Card>
  );
};

export default LoadingIndicator;
