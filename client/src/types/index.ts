// export interface Case {
//   row_number: number;
//   case_number: string;
//   lettertodriver1: string;
//   lettertodriver2: string;
// }

// export interface GeneratedPDF {
//   caseNumber: string;
//   type: 'fault' | 'not_fault';
//   content: string;
//   blobUrl?: string;
// }

// export interface ApiResponse {
//   cases: Case[];
//   error?: string;
// }



export interface LetterCase {
  case_number: string;
  letterToDriver1: string;
  letterToDriver2: string;
}

export interface ReportData {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  pdfUrl?: string;
  caseNumber?: string;
  driverType?: string; // 'fault' or 'not_fault'
  [key: string]: any; // For any additional fields that might come back from the webhook
}

export interface WebhookResponse {
  success: boolean;
  message: string;
  data?: ReportData[];
  error?: string;
}
