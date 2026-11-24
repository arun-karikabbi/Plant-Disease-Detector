import type { DiseaseInfo, ScanResult } from '../types/leafcare';

export const API_BASE_URL: string;
export const STORAGE_KEY: string;
export const STORAGE_INIT_KEY: string;

export const SAMPLE_LEAF_IMAGES: Record<string, string>;
export const SUPPORTED_CROPS: string[];
export const DISEASE_DATABASE: Record<string, DiseaseInfo>;

export interface PredictOptions {
  sampleKey?: string;
  confidenceOverride?: number;
  previewUrl?: string;
  fileName?: string;
  simulateError?: string;
}

export function predictDisease(
  imageFile: File | null,
  options?: PredictOptions
): Promise<ScanResult>;

export function getDiseaseInfo(id: string): Promise<DiseaseInfo>;

export function sendChatMessage(
  message: string,
  diseaseContext?: ScanResult | null
): Promise<{
  reply: string;
  source?: {
    title: string;
    snippet: string;
  };
}>;

export function getScans(): Promise<ScanResult[]>;
export function saveScanToLocalHistory(scan: ScanResult): ScanResult[];
export function deleteScanFromLocalHistory(scanId: string): ScanResult[];
export function clearLocalHistory(): ScanResult[];
