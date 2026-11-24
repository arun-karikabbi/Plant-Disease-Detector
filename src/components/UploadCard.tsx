import React, { useRef, useState } from 'react';
import { Camera, ImagePlus } from 'lucide-react';

interface UploadCardProps {
  onFileSelected: (file: File) => void;
}

export function UploadCard({ onFileSelected }: UploadCardProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelected(file);
    }
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileSelected(file);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`bg-white rounded-2xl p-5 sm:p-6 shadow-sm border transition-colors ${
        isDragging
          ? 'border-[#2E7D32] bg-[#E8F5E9]/40'
          : 'border-[#E1EBE2]'
      }`}
    >
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/jpeg,image/png"
        capture="environment"
        onChange={handleInputChange}
        className="sr-only"
        aria-label="Take a photo of a plant leaf with camera"
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleInputChange}
        className="sr-only"
        aria-label="Upload a plant leaf photo from gallery"
      />

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          className="w-full min-h-[54px] px-5 py-3.5 rounded-xl bg-[#2E7D32] hover:bg-[#246628] active:scale-[0.99] text-white font-semibold text-base shadow-sm flex items-center justify-center gap-3 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] cursor-pointer"
        >
          <Camera className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>Take Photo</span>
        </button>

        <button
          type="button"
          onClick={() => galleryInputRef.current?.click()}
          className="w-full min-h-[52px] px-5 py-3 rounded-xl bg-[#E8F5E9] hover:bg-[#D7EED9] active:scale-[0.99] text-[#1B5E20] font-semibold text-base border border-[#2E7D32]/20 flex items-center justify-center gap-3 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] cursor-pointer"
        >
          <ImagePlus className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>Upload from Gallery</span>
        </button>
      </div>

      <p className="mt-3.5 text-center text-sm text-[#4A614D]">
        JPG or PNG photo · Up to 5 MB
      </p>
    </div>
  );
}
