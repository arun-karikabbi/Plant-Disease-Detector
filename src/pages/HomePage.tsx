import { useNavigate } from 'react-router-dom';
import { Leaf, Square, Sun } from 'lucide-react';
import { ErrorStateCard } from '../components/ErrorStateCard';
import { UploadCard } from '../components/UploadCard';
import { useLeafCare } from '../context/LeafCareContext';
import { SAMPLE_LEAF_IMAGES, SUPPORTED_CROPS } from '../services/api.js';

const PHOTO_TIPS = [
  {
    Icon: Leaf,
    title: 'Single leaf',
    description: 'Focus closely on one leaf showing the spots or color change.',
  },
  {
    Icon: Sun,
    title: 'Good daylight',
    description: 'Take the photo outdoors in bright natural light without flash.',
  },
  {
    Icon: Square,
    title: 'Plain background',
    description: 'Hold paper, soil, or a plain cloth behind the leaf.',
  },
];

const SAMPLE_PRESETS = [
  {
    key: 'tomato_early_blight',
    label: 'Tomato · Early Blight',
    image: SAMPLE_LEAF_IMAGES.tomato_early_blight,
  },
  {
    key: 'potato_late_blight',
    label: 'Potato · Late Blight',
    image: SAMPLE_LEAF_IMAGES.potato_late_blight,
  },
  {
    key: 'tomato_healthy',
    label: 'Tomato · Healthy Leaf',
    image: SAMPLE_LEAF_IMAGES.tomato_healthy,
  },
  {
    key: 'corn_common_rust',
    label: 'Corn · Common Rust',
    image: SAMPLE_LEAF_IMAGES.corn_common_rust,
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const {
    selectFileForPreview,
    selectSampleForPreview,
    errorState,
    clearError,
  } = useLeafCare();

  const handleFileSelected = (file: File) => {
    const res = selectFileForPreview(file);
    if (res.ok) {
      navigate('/preview');
    }
  };

  const handleSampleClick = (sample: (typeof SAMPLE_PRESETS)[number]) => {
    selectSampleForPreview(sample.key, sample.image, sample.label);
    navigate('/preview');
  };

  return (
    <div className="space-y-6">
      {/* Greeting Header */}
      <section className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#142216] tracking-tight text-balance">
          Check your plant&apos;s health
        </h1>
        <p className="text-base text-[#374B39] leading-relaxed max-w-xl">
          Take or upload a clear photo of one leaf to check for disease and get practical care steps.
        </p>
      </section>

      {errorState && (
        <ErrorStateCard
          error={errorState}
          onDismiss={clearError}
          onRetry={clearError}
          retryLabel="Okay, Got It"
        />
      )}

      {/* Responsive 2-column layout on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        <div className="md:col-span-7 space-y-5">
          <UploadCard onFileSelected={handleFileSelected} />

          {/* Quick-try sample leaves for instant field preview */}
          <section
            aria-labelledby="sample-leaves-heading"
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#E1EBE2]"
          >
            <div className="flex items-baseline justify-between gap-2 mb-3">
              <h2
                id="sample-leaves-heading"
                className="text-base font-semibold text-[#142216]"
              >
                Or try a sample leaf
              </h2>
              <span className="text-xs text-[#4A614D]">Tap to preview</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {SAMPLE_PRESETS.map((sample) => (
                <button
                  key={sample.key}
                  type="button"
                  onClick={() => handleSampleClick(sample)}
                  className="group min-h-[56px] p-2 rounded-xl bg-[#F7FAF7] hover:bg-[#E8F5E9] border border-[#E1EBE2] hover:border-[#2E7D32]/30 flex items-center gap-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] cursor-pointer"
                >
                  <img
                    src={sample.image}
                    alt={sample.label}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-lg object-cover shrink-0 bg-[#E8F5E9]"
                  />
                  <span className="text-sm font-medium text-[#142216] group-hover:text-[#1B5E20] leading-snug">
                    {sample.label}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="md:col-span-5 space-y-5">
          {/* Tips for a good photo */}
          <section
            aria-labelledby="photo-tips-heading"
            className="bg-white rounded-2xl p-5 shadow-sm border border-[#E1EBE2]"
          >
            <h2
              id="photo-tips-heading"
              className="text-lg font-semibold text-[#142216]"
            >
              Tips for a good photo
            </h2>

            <ul className="mt-4 space-y-4">
              {PHOTO_TIPS.map(({ Icon, title, description }) => (
                <li key={title} className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-base font-semibold text-[#142216]">
                      {title}
                    </p>
                    <p className="text-sm text-[#4A614D] leading-snug mt-0.5">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Supported Crops */}
          <section
            aria-labelledby="supported-crops-heading"
            className="bg-white rounded-2xl p-5 shadow-sm border border-[#E1EBE2]"
          >
            <h2
              id="supported-crops-heading"
              className="text-base font-semibold text-[#142216]"
            >
              Supported crops
            </h2>
            <p className="mt-1 text-sm text-[#4A614D]">
              Best accuracy on leaves from these crops:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SUPPORTED_CROPS.map((crop) => (
                <span
                  key={crop}
                  className="inline-flex items-center px-3 py-1.5 rounded-xl bg-[#E8F5E9] text-[#1B5E20] text-sm font-medium"
                >
                  {crop}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
