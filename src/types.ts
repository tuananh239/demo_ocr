export interface BatchFile {
  id: string;
  name: string;
  type: 'pdf' | 'image';
  status: 'pending' | 'processing' | 'completed' | 'error';
  extractedData?: ExtractedData;
}

export interface ExtractedData {
  invoiceNumber: string;
  date: string;
  vendor: string;
  totalAmount: string;
  confidence: 'high' | 'medium' | 'low';
}
