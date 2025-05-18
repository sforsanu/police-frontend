import { Card, CardContent } from "@/components/ui/card";

const ExecutiveSummary = () => {
  return (
    <Card className="bg-white rounded-lg shadow-md mb-8 slide-up">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Executive Summary</h2>
        <p className="text-gray-700 mb-4">
          Our Agentic AI-powered accident report automation platform is designed to revolutionize how law offices process, analyze, and communicate information from police accident reports. By automating the extraction of key details, analyzing fault and injury status, and generating personalized communications, our solution empowers legal professionals to work more efficiently, accurately, and effectively.
        </p>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">What Does the Solution Do?</h3>
        <p className="text-gray-700 mb-4">
          Our platform automates the end-to-end handling of police accident reports. Users upload an Excel file with accident details. The system's AI agent then analyzes each case, determines fault and injury status, and generates personalized letters for the involved parties.
        </p>
      </CardContent>
    </Card>
  );
};

export default ExecutiveSummary;
