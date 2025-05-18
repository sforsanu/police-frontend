import DashboardLayout from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const faqs = [
  { q: 'How do I upload a report?', a: 'Go to the Upload page and select your Excel file. The system will process and generate PDFs for each case.' },
  { q: 'Where can I find my generated PDFs?', a: 'All generated PDFs are available in the Case Management section after upload.' },
  { q: 'Who can I contact for technical support?', a: 'Use the contact form below or email support@policereportanalyzer.com.' },
];

export default function HelpSupportPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Help & Support</h1>
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {faqs.map((faq, i) => (
                <li key={i}>
                  <strong className="block text-lg mb-1">{faq.q}</strong>
                  <span className="text-gray-700">{faq.a}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-green-600 font-semibold">Thank you! Your message has been sent.</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <Input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
                <Input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
                <Textarea name="message" placeholder="How can we help you?" value={form.message} onChange={handleChange} required />
                <Button type="submit">Send Message</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 