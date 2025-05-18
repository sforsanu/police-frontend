import { jsPDF } from "jspdf";
import { ReportData } from "../types";

export async function generatePDF(reportData: ReportData, customFileName?: string): Promise<string> {
  return new Promise((resolve) => {
    try {
      // --- LifeAmore Company Info ---
      const companyName = "LifeAmore";
      const companyAddress = "123 Government Ave, Capital City, 10001";
      const companyContact = "Phone: (555) 123-4567 | Email: info@lifeamore.gov";
      const logoSrc = "https://lifeamore.com/cdn/shop/files/LifeAmore_transparent.png?v=1702355471";
      
      // --- Letter Content ---
      const content = reportData.content || "";
      const date = reportData.timestamp ? new Date(reportData.timestamp).toLocaleDateString() : new Date().toLocaleDateString();
      const caseNumber = reportData.caseNumber ? reportData.caseNumber : "";
      const recipient = reportData.title ? reportData.title : "";
      const subject = `Police Report - Case ${caseNumber}`;
      const body = formatLetterContent(content);
      
      // --- Professional Letterhead HTML ---
      const htmlContent = `
        <div style="padding: 16px 12px 12px 12px; font-family: 'Times New Roman', Times, serif; color: #222; max-width: 650px; white-space: normal; word-break: break-word;">
          <div style="display: flex; align-items: flex-start; gap: 16px; margin-bottom: 8px;">
            <img src='${logoSrc}' alt='LifeAmore Logo' style='height: 48px; width: auto; margin-top: 2px;' />
            <div style="display: flex; flex-direction: column; align-items: flex-start;">
              <div style="font-size: 1.2rem; font-weight: bold; color: #0a2463; line-height: 1.2;">${companyName}</div>
              <div style="font-size: 0.85rem; color: #444; line-height: 1.2;">123 Government Ave, Capital City,</div>
              <div style="font-size: 0.85rem; color: #444; line-height: 1.2;">10001</div>
              <div style="font-size: 0.85rem; color: #444; line-height: 1.2;">Phone: (555) 123-4567 | Email: info@lifeamore.gov</div>
            </div>
          </div>
          <hr style="border: 1px solid #0a2463; margin-bottom: 10px; margin-top: 4px;" />
          <div style="font-size: 0.95rem; margin-bottom: 4px;"><strong>Date:</strong> ${date}</div>
          <div style="font-size: 0.95rem; margin-bottom: 4px;"><strong>To:</strong> ${recipient}</div>
          <div style="font-size: 0.95rem; margin-bottom: 10px;"><strong>Subject:</strong> ${subject}</div>
          <div style="font-size: 1rem; line-height: 1.5; margin-bottom: 18px;">${body}</div>
          <div style="margin-top: 24px; font-size: 0.95rem;">
            <div>Sincerely,</div>
            <div style="margin-top: 18px; font-weight: bold;">${companyName} Department of Public Safety</div>
          </div>
          <hr style="border: 0.5px solid #bbb; margin: 18px 0 6px 0;" />
          <div style="font-size: 0.75rem; color: #666; text-align: center;">
            Official Document &mdash; ${companyName} &mdash; ${companyAddress} &mdash; ${companyContact}
          </div>
        </div>
      `;
      
      // Add HTML content to PDF
      const doc = new jsPDF();
      const element = document.createElement('div');
      element.innerHTML = htmlContent;
      document.body.appendChild(element);
      doc.html(element, {
        callback: function(pdf) {
          document.body.removeChild(element);
          const pdfBlob = pdf.output('blob');
          const pdfUrl = URL.createObjectURL(pdfBlob);
          resolve(pdfUrl);
        },
        x: 6,
        y: 6,
        width: 170, // slightly smaller to fit more content
        windowWidth: 900 // larger windowWidth to help fit all content
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      resolve("");
    }
  });
}

// Helper function to format letter content with proper HTML
function formatLetterContent(content: string): string {
  // Replace new lines with HTML line breaks
  let formatted = content.replace(/\n/g, '<br>');
  // Highlight certain sections in the letter
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Remove any placeholder text (N/A, placeholder, etc.)
  formatted = formatted.replace(/\b(N\/A|placeholder)\b/gi, '');
  return formatted;
}
