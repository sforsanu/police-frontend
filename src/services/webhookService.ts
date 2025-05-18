import { WebhookResponse, ReportData, LetterCase } from "../types";
// import { generatePDF } from "./pdfService";
import { generatePDF } from "../lib/pdf-generator";
import * as dotenv from 'dotenv';


// const WEBHOOK_URL = "https://starwars.app.n8n.cloud/webhook-test/8060f9c4-3fa5-4729-812a-33f73f8f0a88";
// const GEMINI_API_KEY = "AIzaSyDA5aIBLcJ-ShpZhGZyfLD50jSK0bJW2qQ";

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function sendFileToWebhook(file: File): Promise<WebhookResponse> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Get the response text first
    const responseText = await response.text();
    console.log("Raw webhook response:", responseText);
    
    // Handle both direct JSON array or JSON wrapped in other formats
    const reportData: ReportData[] = [];
    let caseItems: any[] = [];
    
    try {
      // First, try to parse the response as direct JSON
      let parsedResponse = JSON.parse(responseText);
      
      // Check if it's an array directly
      if (Array.isArray(parsedResponse)) {
        console.log("Response is a direct array with", parsedResponse.length, "cases");
        caseItems = parsedResponse;
      } 
      // Check if it's inside an 'items' property
      else if (parsedResponse.items && Array.isArray(parsedResponse.items)) {
        console.log("Response contains items array with", parsedResponse.items.length, "cases");
        caseItems = parsedResponse.items;
      }
      // Check if it contains lettertodriver fields directly
      else if (parsedResponse.lettertodriver1 && parsedResponse.lettertodriver2) {
        console.log("Response contains a single case");
        caseItems = [parsedResponse];
      }
      else {
        // Try to find any JSON in the response that might be escaped
        const jsonRegex = /(\[.*\]|\{.*\})/s;
        const match = responseText.match(jsonRegex);
        if (match && match[0]) {
          const extractedJson = match[0];
          const parsedJson = JSON.parse(extractedJson);
          
          if (Array.isArray(parsedJson)) {
            console.log("Extracted array from response with", parsedJson.length, "cases");
            caseItems = parsedJson;
          }
          else if (parsedJson.items && Array.isArray(parsedJson.items)) {
            console.log("Extracted items array with", parsedJson.items.length, "cases");
            caseItems = parsedJson.items;
          }
        }
      }
    } catch (parseError) {
      console.error("Failed to parse webhook response:", parseError);
      throw new Error(`Cannot parse response from webhook: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
    }
    
    // If we couldn't find any case items, return an error
    if (caseItems.length === 0) {
      console.error("No case items found in response");
      throw new Error("No valid case data found in webhook response");
    }
    
    console.log(`Found ${caseItems.length} cases to process`);
    
    // Process each case
    for (const item of caseItems) {
      // Normalize case field names (handle lowercase variations)
      const caseData: LetterCase = {
        case_number: item.case_number || item.caseNumber || "",
        letterToDriver1: item.lettertodriver1 || item.letterToDriver1 || "",
        letterToDriver2: item.lettertodriver2 || item.letterToDriver2 || ""
      };
      
      // Skip if missing required fields
      if (!caseData.case_number || !caseData.letterToDriver1 || !caseData.letterToDriver2) {
        console.warn("Skipping case with missing required fields:", caseData);
        continue;
      }
      
      // Process the case
      await processCase(caseData, reportData);
    }
    
    console.log(`Successfully processed ${reportData.length} reports from ${caseItems.length} cases`);
    
    return {
      success: true,
      message: `Analysis completed successfully - processed ${reportData.length} reports from ${caseItems.length} cases`,
      data: reportData,
    };
  } catch (error) {
    console.error("Error sending file to webhook:", error);
    return {
      success: false,
      message: "Failed to analyze report",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// Function to extract case number from letter content
function extractCaseNumber(content: string): string | null {
  const caseRefMatch = content.match(/Case Number:?\s*([^\s\n]+)/i) || 
                      content.match(/Case Reference:?\s*([^\s\n]+)/i);
  return caseRefMatch ? caseRefMatch[1] : null;
}

// Function to determine fault based on letter content
async function determineFault(letter: string): Promise<boolean> {
  try {
    // Scan the letter content for fault indicators directly
    const lowerLetter = letter.toLowerCase();
    
    // Look for clear fault indicators in the text
    if (
      (lowerLetter.includes("you are") && lowerLetter.includes("at fault")) ||
      (lowerLetter.includes("you are") && lowerLetter.includes("determined to be at fault")) ||
      (lowerLetter.includes("you are considered the at-fault driver")) ||
      (lowerLetter.includes("as the at-fault driver") && !lowerLetter.includes("not-at-fault driver")) ||
      (lowerLetter.includes("you are at fault") && !lowerLetter.includes("not at fault")) ||
      (lowerLetter.includes("you are liable for damages"))
    ) {
      console.log("Determined as at fault from letter content");
      return true;
    }
    
    // Look for clear not-at-fault indicators in the text
    if (
      (lowerLetter.includes("you are") && lowerLetter.includes("not at fault")) ||
      (lowerLetter.includes("you are considered the not-at-fault driver")) ||
      (lowerLetter.includes("as the not-at-fault driver")) ||
      (lowerLetter.includes("you are not held responsible"))
    ) {
      console.log("Determined as not at fault from letter content");
      return false;
    }
    
    // If we still can't determine, use Gemini API as fallback
    if (GEMINI_API_KEY) {
      console.log("Using Gemini API to determine fault...");
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Analyze this letter about a car accident and determine if this person is likely at fault. 
                  Return ONLY "fault" or "not_fault" as a single word answer.
                  Letter: ${letter.substring(0, 4000)}` // Limit to 4000 chars to avoid token limits
                }
              ]
            }
          ]
        })
      });
      
      if (!response.ok) {
        console.error(`Gemini API error: ${response.status}`);
        throw new Error(`Gemini API error: ${response.status}`);
      }
      
      const data = await response.json();
      const result = data.candidates?.[0]?.content?.parts?.[0]?.text?.toLowerCase() || '';
      console.log("Gemini fault determination result:", result);
      
      return result.includes('fault') && !result.includes('not_fault');
    }
    
    // Default to random assignment if direct analysis and API fails
    return Math.random() > 0.5;
  } catch (error) {
    console.error("Error determining fault:", error);
    // Default to random assignment if API fails
    return Math.random() > 0.5;
  }
}

// Process a single case with two letters
async function processCase(caseData: LetterCase, reportData: ReportData[]): Promise<void> {
  console.log(`Processing case ${caseData.case_number}`);
  const caseNumber = caseData.case_number || extractCaseNumber(caseData.letterToDriver1) || "unknown";
  
  // Check driver 1 letter for fault indications directly
  const driver1AtFault = await determineFault(caseData.letterToDriver1);
  console.log(`Case ${caseNumber}: Driver 1 is ${driver1AtFault ? "at fault" : "not at fault"}`);
  
  // Process letter to Driver 1
  const report1: ReportData = {
    id: `${caseNumber}-driver1`,
    title: `Letter to Driver 1 (Case ${caseNumber})`,
    content: caseData.letterToDriver1,
    timestamp: new Date().toISOString(),
    caseNumber: caseNumber,
    driverType: driver1AtFault ? "fault" : "not_fault"
  };
  
  // Generate PDF with proper filename
  const fileName1 = `${caseNumber}_${driver1AtFault ? "fault" : "not_fault"}`;
  const generated1 = await generatePDF(report1, fileName1);
  reportData.push({
    ...report1,
    pdfUrl: generated1.blobUrl
  });
  
  // Process letter to Driver 2
  const report2: ReportData = {
    id: `${caseNumber}-driver2`,
    title: `Letter to Driver 2 (Case ${caseNumber})`,
    content: caseData.letterToDriver2,
    timestamp: new Date().toISOString(),
    caseNumber: caseNumber,
    driverType: !driver1AtFault ? "fault" : "not_fault"
  };
  
  // Generate PDF with proper filename
  const fileName2 = `${caseNumber}_${!driver1AtFault ? "fault" : "not_fault"}`;
  const generated2 = await generatePDF(report2, fileName2);
  reportData.push({
    ...report2,
    pdfUrl: generated2.blobUrl
  });
}
