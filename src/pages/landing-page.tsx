import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { 
  FileText, 
  Shield, 
  UserCheck, 
  FileUp, 
  BarChart, 
  Mail, 
  Phone, 
  ChevronRight, 
  Check, 
  Car, 
  FileSearch, 
  Scale,
  MessageCircle,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

export default function LandingPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  const features = [
    {
      icon: <FileSearch className="h-10 w-10 text-primary" />,
      title: "Intelligent Report Analysis",
      description: "Our AI analyzes police reports to automatically identify accident details and determine fault."
    },
    {
      icon: <FileUp className="h-10 w-10 text-primary" />,
      title: "Excel Upload & Processing",
      description: "Simply upload your Excel file, and our system extracts and processes all relevant case information."
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Automatic PDF Generation",
      description: "Generate customized letters for at-fault and not-at-fault parties with a single click."
    },
    {
      icon: <UserCheck className="h-10 w-10 text-primary" />,
      title: "Role-Based Access",
      description: "Secure access controls for attorneys, insurance agencies, and medical professionals."
    },
  ];

  const testimonials = [
    {
      quote: "This system has revolutionized our case intake process. What took hours now takes minutes.",
      author: "Sarah Johnson",
      role: "Managing Attorney"
    },
    {
      quote: "The automated letter generation has improved our client response time by 75%.",
      author: "Michael Rodriguez",
      role: "Paralegal Supervisor"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="text-primary h-8 w-8" />
            <h1 className="text-2xl font-bold text-gray-800">AcciJustice</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild>
              <Link href="/auth">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Transform Police Reports into Actionable Case Files
              </h1>
              <p className="text-lg opacity-90 mb-8">
                Our AI-powered platform revolutionizes how law offices process accident reports. 
                Upload Excel data, analyze fault determinations, and generate personalized 
                communications automatically.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100"
                  asChild
                >
                  <Link href="/auth">Get Started</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-black hover:bg-white/10"
                  asChild
                >
                  <Link href="/workflow">How It Works</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative bg-white/10 p-6 rounded-lg backdrop-blur-sm shadow-xl">
                <div className="absolute -top-4 -right-4 bg-secondary text-black text-sm py-1 px-3 rounded-full font-semibold">
                  AI-Powered
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Check className="h-4 w-4" />
                    </div>
                    <p>Automated fault analysis</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Check className="h-4 w-4" />
                    </div>
                    <p>Personalized letter generation</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Check className="h-4 w-4" />
                    </div>
                    <p>Role-based access controls</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Check className="h-4 w-4" />
                    </div>
                    <p>Secure data management</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Check className="h-4 w-4" />
                    </div>
                    <p>Multi-format export options</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Streamline Your Case Management</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform saves you time and reduces errors by automating the most tedious aspects of accident case processing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Efficient Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform handles the entire workflow from data intake to document generation.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
                  <FileUp className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">1. File Upload</h3>
                  <p className="text-gray-600 mb-3">
                    Legal staff or administrators upload the daily Excel file containing police report data 
                    (including driver/passenger details, injury status, fault status, and report URLs).
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
                  <FileSearch className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">2. Automated Data Extraction</h3>
                  <p className="text-gray-600 mb-3">
                    The Agentic AI reads the file and extracts all relevant information - names, addresses, 
                    contact details, injury and fault status, and more.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
                  <Scale className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">3. Accident Analysis</h3>
                  <p className="text-gray-600 mb-3">
                    The AI reviews each report, determines who is at fault, and provides a clear, 
                    human-readable explanation based on the standardized police report format and your firm's guidelines.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">4. Personalized Letter Generation</h3>
                  <p className="text-gray-600 mb-3">
                    <strong>For Non-At-Fault Drivers and Passengers:</strong> The system creates a letter explaining their status, 
                    rights (including the right to pursue a lawsuit), and how the Law Office can assist.
                  </p>
                  <p className="text-gray-600 mb-3">
                    <strong>For At-Fault Drivers:</strong> The system generates a letter outlining the findings, 
                    offering legal support for corrections if needed, and, if injured, inviting them to schedule a 
                    medical evaluation with an expert doctor.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">5. Follow-up & Case Management</h3>
                  <p className="text-gray-600 mb-3">
                    All generated letters are displayed for easy review. Staff can download, print, 
                    or email the letters directly to clients, while the system helps manage follow-up communications 
                    and lead conversion.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild>
                <Link href="/workflow">
                  View Complete Workflow <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Law firms across the country use our platform to streamline their case processing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="mb-4 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary">★</span>
                    ))}
                  </div>
                  <p className="text-lg mb-6 italic">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <div className="bg-gray-200 h-12 w-12 rounded-full flex items-center justify-center mr-4">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Case Processing?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Join law firms nationwide who are saving time, reducing errors, and providing better 
            client service with our Police Report Analyzer.
          </p>
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
              className="border-white text-black hover:bg-white/10"
              asChild
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="text-primary h-8 w-8" />
                <h3 className="text-xl font-bold text-white">Accijustice</h3>
              </div>
              <p className="text-gray-400">
                Transforming police reports into actionable case files with AI-powered analysis and document generation.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/workflow" className="hover:text-primary transition-colors">Workflow</Link></li>
                <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/compliance" className="hover:text-primary transition-colors">Compliance</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" /> info@policereportanalyzer.com
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" /> +1 (555) 123-4567
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Accijustice. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}