import { ReportData } from "@/types";
import { jsPDF } from "jspdf";
import LifeAmoreLogo from "@/components/LifeAmore_logo.png";

// Function to generate PDF from content
export const generatePDF = async (pdf: ReportData, customFileName?: string): Promise<ReportData> => {
  return new Promise((resolve) => {
    try {
      // --- Company Info ---
      const companyName = "LifeAmore";
      const companyAddress = "256 Government Ave, Capital City, 11221";
      const companyContact = "Phone: (555) 123-4567 | Email: info@lifeamore.gov";
      // const logoSrc = "https://lifeamore.com/cdn/shop/files/LifeAmore_transparent.png?v=1702355471";
      const logoSrc = LifeAmoreLogo;
      // --- Letter Content ---
      const content = pdf.content || "";
      const date = pdf.timestamp ? new Date(pdf.timestamp).toLocaleDateString() : new Date().toLocaleDateString();
      const caseNumber = pdf.caseNumber ? pdf.caseNumber : "";
      const recipient = pdf.title ? pdf.title : "";
      const subject = `Police Report - Case ${caseNumber}`;
      const body = formatLetterContent(content);

      // --- Professional Letterhead HTML ---
      const htmlContent = `
        <div style="padding: 8px; font-family: 'Times New Roman', Times, serif; color: #222; max-width: 900px; width: 100%; box-sizing: border-box; white-space: normal; word-break: break-word; min-height: 1000px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 0; margin-bottom: 8px;">
              <img src='${logoSrc}' alt='LifeAmore Logo' style='height: 48px; width: auto; background: #fff; border-radius: 4px; margin-bottom: 6px; margin-left: 0;' />
              <div style="font-size: 0.85rem; color: #444; line-height: 1.2; text-align: left; margin-bottom: 1px;">${companyAddress}</div>
              <div style="font-size: 0.85rem; color: #444; line-height: 1.2; text-align: left;">${companyContact}</div>
            </div>
            <hr style="border: 1px solid #0a2463; margin-bottom: 14px; margin-top: 10px;" />
            <div style="font-size: 0.95rem; margin-bottom: 4px;"><strong>Date:</strong> ${date}</div>
            <div style="font-size: 0.95rem; margin-bottom: 4px;"><strong>To:</strong> ${recipient}</div>
            <div style="font-size: 0.95rem; margin-bottom: 10px;"><strong>Subject:</strong> ${subject}</div>
            <div style="font-size: 1rem; line-height: 1.5; margin-bottom: 18px;">${body}</div>
            <div style="margin-top: 24px; font-size: 0.95rem;">
              <div>Sincerely,</div>
              <div style="margin-top: 18px; font-weight: bold;">${companyName} Department of Public Safety</div>
            </div>
          </div>
          <div style="margin-top: auto;">
            <hr style="border: 0.5px solid #bbb; margin: 24px 0 6px 0;" />
            <div style="font-size: 0.75rem; color: #666; text-align: left;">
              Official Document &mdash; ${companyName} &mdash; ${companyAddress} &mdash; ${companyContact}
            </div>
          </div>
        </div>
      `;

      // Add HTML content to PDF
      const doc = new jsPDF();
      const element = document.createElement('div');
      element.innerHTML = htmlContent;
      document.body.appendChild(element);
      doc.html(element, {
        callback: function(pdfDoc) {
          document.body.removeChild(element);
          const pdfBlob = pdfDoc.output('blob');
          const blobUrl = URL.createObjectURL(pdfBlob);
          resolve({
            ...pdf,
            blobUrl
          });
        },
        x: 6,
        y: 6,
        width: 190, // wider printable area
        windowWidth: 900 // match max-width in HTML
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      resolve(pdf); // Return original PDF if generation fails
    }
  });
};

// Helper function to format letter content with proper HTML
function formatLetterContent(content: string): string {
  let formatted = content.replace(/\n/g, '<br>');
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/\b(N\/A|placeholder)\b/gi, '');
  return formatted;
}
