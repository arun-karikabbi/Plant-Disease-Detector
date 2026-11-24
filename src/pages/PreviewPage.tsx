import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import { ErrorStateCard } from '../components/ErrorStateCard';
import { ImagePreview } from '../components/ImagePreview';
import { useLeafCare } from '../context/LeafCareContext';

export function PreviewPage() {
  const navigate = useNavigate();
  const {
    pendingImage,
    isAnalyzing,
    errorState,
    clearPendingImage,
    analyzePendingImage,
    clearError,
  } = useLeafCare();

  const handleRetake = () => {
    clearError();
    clearPendingImage();
    navigate('/');
  };

  const handleAnalyze = async () => {
    const result = await analyzePendingImage();
    if (result) {
      navigate('/results');
    }
  };

  if (!pendingImage) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-2xl p-6 shadow-sm border border-[#E1EBE2] text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
          <Camera className="w-7 h-7" aria-hidden="true" />
        </div>
        <h1 className="text-xl font-bold text-[#142216]">No photo selected</h1>
        <p className="text-base text-[#4A614D]">
          Take a photo or choose one from your gallery first to check your leaf.
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="min-h-[48px] px-6 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#246628] text-white font-semibold text-base inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Go to Home</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleRetake}
          disabled={isAnalyzing}
          aria-label="Back to photo upload"
          className="min-w-[44px] min-h-[44px] rounded-xl bg-white border border-[#E1EBE2] hover:bg-[#E8F5E9] text-[#142216] flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] cursor-pointer disabled:opacity-50"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#142216]">
            Check leaf photo
          </h1>
          <p className="text-sm text-[#4A614D]">
            Make sure the leaf is clear and centered
          </p>
        </div>
      </div>

      {errorState && (
        <ErrorStateCard
          error={errorState}
          onRetry={handleAnalyze}
          onDismiss={handleRetake}
          retryLabel="Try Analyze Again"
        />
      )}

      <ImagePreview
        imageUrl={pendingImage.previewUrl}
        fileName={pendingImage.fileName}
        isAnalyzing={isAnalyzing}
        onRetake={handleRetake}
        onAnalyze={handleAnalyze}
      />
    </div>
  );
}
