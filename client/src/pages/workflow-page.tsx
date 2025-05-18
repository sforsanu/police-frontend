import { Link } from "wouter";
import { 
  FileText, 
  FileUp, 
  FileSearch, 
  Scale, 
  MessageCircle,
  Clock,
  ArrowDown,
  BadgeAlert,
  Users,
  Book,
  Car,
  Stethoscope,
  Award,
  AlertTriangle,
  Search,
  ChevronRight,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function WorkflowPage() {
  const coreSteps = [
    {
      icon: <FileUp className="h-10 w-10 text-primary" />,
      title: "File Upload",
      description: "Legal staff or administrators upload the daily Excel file containing police report data (including driver/passenger details, injury status, fault status, and report URLs)."
    },
    {
      icon: <FileSearch className="h-10 w-10 text-primary" />,
      title: "Automated Data Extraction",
      description: "The Agentic AI reads the file and extracts all relevant information - names, addresses, contact details, injury and fault status, and more."
    },
    {
      icon: <Scale className="h-10 w-10 text-primary" />,
      title: "Accident Analysis",
      description: "The AI reviews each report, determines who is at fault, and provides a clear, human-readable explanation based on the standardized police report format and your firm's guidelines."
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Personalized Letter Generation",
      description: "The system creates personalized letters for both at-fault and not-at-fault parties, explaining their status, legal rights, and next steps."
    },
    {
      icon: <MessageCircle className="h-10 w-10 text-primary" />,
      title: "Follow-up & Lead Conversion",
      description: "The system facilitates follow-up communications and helps convert potential clients into active cases."
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <FileText className="text-primary h-8 w-8" />
              <h1 className="text-2xl font-bold text-gray-800">Accijustice</h1>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
            <Button asChild>
              <Link href="/auth">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Step-by-Step Workflow</h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Our comprehensive workflow transforms police reports into actionable case files 
            with automated analysis and personalized communications.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Overview */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Complete Process Overview</h2>
            
            <div className="space-y-12">
              {coreSteps.map((step, index) => (
                <div key={index} className="relative">
                  {index < coreSteps.length - 1 && (
                    <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-200"></div>
                  )}
                  <div className="flex gap-6">
                    <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0 z-10">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Detailed Steps */}
          <div className="max-w-5xl mx-auto mt-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Detailed Process Breakdown</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <BadgeAlert className="mr-2 h-5 w-5 text-primary" />
                    <span>Initial Accident Identification</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-7 space-y-3">
                    <p className="text-gray-700">
                      Our system begins with the identification of accidents within the limits of the law. This involves:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Scanning official police reports for relevant accident information</li>
                      <li>Identifying all parties involved in the accident</li>
                      <li>Understanding the regulatory governance applicable to each case</li>
                      <li>Applying state laws and county regulations to the context of the accident</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <FileUp className="mr-2 h-5 w-5 text-primary" />
                    <span>File Upload Process</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-7 space-y-3">
                    <p className="text-gray-700">
                      Legal staff or administrators upload the daily Excel file containing police report data through our secure interface:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Upload Excel files with driver and passenger details</li>
                      <li>Include injury status information for all parties</li>
                      <li>Document fault status as determined by responding officers</li>
                      <li>Add links to official report URLs for reference</li>
                      <li>System validates the file format and data structure</li>
                    </ul>
                    <div className="bg-gray-50 p-4 rounded-md mt-3">
                      <p className="text-sm text-gray-600 italic">
                        Our system supports various Excel formats and can be configured to match your 
                        specific police report data structure.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <FileSearch className="mr-2 h-5 w-5 text-primary" />
                    <span>Automated Data Extraction</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-7 space-y-3">
                    <p className="text-gray-700">
                      Our Agentic AI reads the file and extracts all relevant information with remarkable accuracy:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Personal identification details for all involved parties</li>
                      <li>Complete contact information including addresses, phone numbers, and email addresses</li>
                      <li>Vehicle information including make, model, year, and insurance details</li>
                      <li>Injury status classifications and severity indicators</li>
                      <li>Preliminary fault determinations from responding officers</li>
                      <li>Accident location data and environmental conditions</li>
                    </ul>
                    <div className="bg-gray-50 p-4 rounded-md mt-3">
                      <p className="text-sm text-gray-600 italic">
                        Our extraction algorithms are trained on thousands of real police reports to ensure
                        maximum accuracy and data completeness.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <Scale className="mr-2 h-5 w-5 text-primary" />
                    <span>Accident Analysis</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-7 space-y-3">
                    <p className="text-gray-700">
                      The AI reviews each report, determines fault status, and provides clear explanations:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Reviews officer narratives and witness statements</li>
                      <li>Applies traffic laws specific to the accident jurisdiction</li>
                      <li>Considers contributing factors like speeding, intoxication, or distracted driving</li>
                      <li>Compares facts to your firm's case acceptance criteria</li>
                      <li>Generates human-readable explanations of fault determinations</li>
                      <li>Flags potential liability issues or contested fault cases</li>
                    </ul>
                    <div className="bg-gray-50 p-4 rounded-md mt-3">
                      <p className="text-sm text-gray-600 italic">
                        The system can be trained on your firm's specific legal standards and case precedents 
                        to align with your practice's approach to accident law.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    <span>Personalized Letter Generation</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-7 space-y-5">
                    <div>
                      <h4 className="font-semibold mb-1">For Non-At-Fault Drivers and Passengers:</h4>
                      <p className="text-gray-700 mb-2">
                        The system creates specialized communications for victims:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Clearly explains their non-fault status with supporting details</li>
                        <li>Outlines their rights to pursue compensation under applicable law</li>
                        <li>Details potential damages they may recover (medical expenses, lost wages, pain and suffering)</li>
                        <li>Explains how your law office can assist with their claim</li>
                        <li>Provides next steps and contact information for your office</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-1">For At-Fault Drivers:</h4>
                      <p className="text-gray-700 mb-2">
                        The system creates appropriate communications for at-fault parties:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Presents the fault determination in clear, non-accusatory language</li>
                        <li>Explains their right to contest or seek clarification of the fault finding</li>
                        <li>Offers legal support if they believe the determination is incorrect</li>
                        <li>If injured, encourages medical evaluation with partner doctors (when appropriate)</li>
                        <li>Provides information about navigating insurance claims and legal responsibilities</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-600 italic">
                        All letters are fully customizable with your firm's branding, tone of voice, and preferred
                        legal language. The system maintains version history and can A/B test different approaches.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Follow-up & Agentic Conversations</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-7 space-y-3">
                    <p className="text-gray-700">
                      The system facilitates ongoing communication and follow-up:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Schedules automated follow-up communications at strategic intervals</li>
                      <li>Tracks client responses and engagement with previous communications</li>
                      <li>Enables staff to monitor case progress and contact status</li>
                      <li>Provides conversation templates for common client questions</li>
                      <li>Integrates with your CRM and case management systems</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-primary" />
                    <span>Lead Conversion</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-7 space-y-3">
                    <p className="text-gray-700">
                      Converting potential clients into active cases:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Streamlines the intake process for new clients</li>
                      <li>Provides qualification criteria to identify high-value cases</li>
                      <li>Tracks conversion rates and identifies optimization opportunities</li>
                      <li>Enables staff to focus on high-potential leads</li>
                      <li>Automates routine documentation and paperwork</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <Search className="mr-2 h-5 w-5 text-primary" />
                    <span>Accident Radar & Reporting</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-7 space-y-3">
                    <p className="text-gray-700">
                      Proactive accident identification and reporting:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Incentivizes reporting through Good Samaritan badges and recognition</li>
                      <li>Enables reporting of accidents with license plate information</li>
                      <li>Captures details about parties involved</li>
                      <li>Documents medical assistance needs (none, later, or emergency)</li>
                      <li>Interfaces with your lead generation system</li>
                    </ul>
                    <div className="bg-gray-50 p-4 rounded-md mt-3">
                      <p className="text-sm text-gray-600 italic">
                        This module ethically identifies potential cases while respecting privacy laws and 
                        professional conduct requirements.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          {/* Role-Based Access */}
          <div className="max-w-5xl mx-auto mt-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Role-Based System Access</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Our platform provides tailored access and features for different stakeholders in the accident case process.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader className="pb-2">
                  <div className="mb-2 text-primary">
                    <Users className="h-8 w-8" />
                  </div>
                  <CardTitle>Administrator</CardTitle>
                  <CardDescription>System management and user control</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Complete system configuration and customization</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>User account management and role assignment</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Activity monitoring and system performance tracking</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Template management for letters and communications</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="mb-2 text-primary">
                    <Scale className="h-8 w-8" />
                  </div>
                  <CardTitle>Attorney</CardTitle>
                  <CardDescription>Legal case management and oversight</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Case review and approval of legal communications</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Client contact management and follow-up</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Document generation and editing capabilities</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Detailed case analytics and outcome tracking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="mb-2 text-primary">
                    <AlertTriangle className="h-8 w-8" />
                  </div>
                  <CardTitle>Insurance Agency</CardTitle>
                  <CardDescription>Claim management and coordination</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Access to relevant policy and claim information</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Communication coordination with legal team</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Status updates and claim progression tracking</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Document sharing and collaborative review</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="mb-2 text-primary">
                    <Stethoscope className="h-8 w-8" />
                  </div>
                  <CardTitle>Doctor</CardTitle>
                  <CardDescription>Medical assessment and treatment coordination</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Patient referral management and scheduling</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Medical record sharing (with appropriate authorization)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Treatment plan documentation and updates</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Secure communication with legal and insurance teams</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* CTA */}
          <div className="max-w-4xl mx-auto mt-20 text-center">
            <Card className="bg-primary text-white border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Ready to transform your accident case processing?</CardTitle>
                <CardDescription className="text-white/80">
                  Join law firms nationwide who are saving time and improving client service.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-primary hover:bg-gray-100"
                    asChild
                  >
                    <Link href="/auth">Get Started Now</Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10"
                    asChild
                  >
                    <Link href="/contact">
                      Contact Sales <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <FileText className="text-primary h-6 w-6" />
              <span className="text-white font-semibold">Accijustice</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <Link href="/workflow" className="hover:text-primary transition-colors">How It Works</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
            </div>
          </div>
          <div className="text-center mt-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Accijustice. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}