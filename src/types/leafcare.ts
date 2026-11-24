export type HealthStatus = 'healthy' | 'caution' | 'urgent';

export type CauseType = 'Fungal' | 'Bacterial' | 'Viral' | 'Pest' | 'Healthy';

export interface TopPrediction {
  disease: string;
  confidence: number;
}

export interface DiseaseInfo {
  id: string;
  crop: string;
  disease: string;
  status: HealthStatus;
  cause: CauseType;
  severity: string;
  description: string;
  symptoms: string[];
  treatment: string[];
  culturalSteps: string[];
  organicSteps: string[];
  chemicalSteps: string[];
  safetyNote: string;
  prevention: string[];
}

export interface ScanResult {
  id: string;
  diseaseId: string;
  crop: string;
  disease: string;
  confidence: number;
  status: HealthStatus;
  timestamp: string;
  imageUrl: string;
  top3: TopPrediction[];
  info: DiseaseInfo;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'advisor';
  text: string;
  timestamp: string;
  source?: {
    title: string;
    snippet: string;
  };
}

export type AppErrorType =
  | 'no_internet'
  | 'upload_failed'
  | 'unsupported_image'
  | 'non_leaf';

export interface AppErrorState {
  type: AppErrorType;
  title: string;
  message: string;
}

export interface PendingImage {
  file: File | null;
  previewUrl: string;
  fileName: string;
  sampleKey?: string;
}
