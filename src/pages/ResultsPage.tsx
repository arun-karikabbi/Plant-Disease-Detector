import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  Info,
  Leaf,
  MessageSquareText,
} from 'lucide-react';
import { ConfidenceBar } from '../components/ConfidenceBar';
import { ResultsSkeleton } from '../components/SkeletonLoaders';
import { StatusBadge } from '../components/StatusBadge';
import { TabPanel } from '../components/TabPanel';
import { useLeafCare } from '../context/LeafCareContext';

export function ResultsPage() {
  const navigate = useNavigate();
  const {
    currentScan,
    isAnalyzing,
    isHistoryLoading,
    setAdvisorContextFromScan,
  } = useLeafCare();
  const [imgError, setImgError] = useState(false);

  if (isAnalyzing || (isHistoryLoading && !currentScan)) {
    return <ResultsSkeleton />;
  }

  if (!currentScan) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-2xl p-6 shadow-sm border border-[#E1EBE2] text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
          <Leaf className="w-7 h-7" aria-hidden="true" />
        </div>
        <h1 className="text-xl font-bold text-[#142216]">No leaf scan open</h1>
        <p className="text-base text-[#4A614D]">
          Take or upload a photo of a plant leaf to view its health report and treatment steps.
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="min-h-[48px] px-6 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#246628] text-white font-semibold text-base inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] cursor-pointer"
        >
          <Camera className="w-5 h-5" aria-hidden="true" />
          <span>Scan a Leaf</span>
        </button>
      </div>
    );
  }

  const isLowConfidence = currentScan.confidence < 60;
  const isHealthy = currentScan.status === 'healthy';

  const handleAskAdvisor = () => {
    setAdvisorContextFromScan(currentScan);
    navigate('/advisor');
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Left column: Leaf photo, diagnosis summary, confidence, top-3 */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#E1EBE2]">
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#E8F5E9]">
              {!imgError && currentScan.imageUrl ? (
                <img
                  src={currentScan.imageUrl}
                  alt={`${currentScan.crop} leaf diagnosed as ${currentScan.disease}`}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#2E7D32]">
                  <Leaf className="w-12 h-12" aria-hidden="true" />
                </div>
              )}
            </div>

            <div className="mt-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#4A614D]">
                  {currentScan.crop}
                </p>
                <h1 className="text-2xl font-bold text-[#142216] leading-tight mt-0.5 text-balance">
                  {currentScan.disease}
                </h1>
              </div>
              <StatusBadge status={currentScan.status} />
            </div>

            <div className="mt-5">
              <ConfidenceBar
                confidence={currentScan.confidence}
                status={currentScan.status}
              />
            </div>

            {/* Low confidence warning (<60%) */}
            {isLowConfidence && (
              <div
                role="alert"
                className="mt-4 rounded-xl bg-[#FFF8E1] border border-[#F9A825]/50 p-3.5 flex items-start gap-2.5"
              >
                <AlertTriangle
                  className="w-5 h-5 text-[#8D5B00] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-[#704700]">
                    Uncertain result
                  </p>
                  <p className="mt-0.5 text-sm text-[#5C3D00] leading-snug">
                    Confidence is below 60%. Please retake the photo in bright daylight or check with a local farm expert.
                  </p>
                </div>
              </div>
            )}

            {/* Healthy leaf variant highlight */}
            {isHealthy && !isLowConfidence && (
              <div className="mt-4 rounded-xl bg-[#E8F5E9] border border-[#2E7D32]/25 p-3.5 flex items-start gap-2.5">
                <CheckCircle2
                  className="w-5 h-5 text-[#1B5E20] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-[#1B5E20]">
                    Your plant looks healthy!
                  </p>
                  <p className="mt-0.5 text-sm text-[#244E27] leading-snug">
                    No treatment spray is needed right now. Keep checking lower leaves weekly.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Top-3 Alternative Predictions */}
          <section
            aria-labelledby="top3-heading"
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#E1EBE2]"
          >
            <h2
              id="top3-heading"
              className="text-base font-semibold text-[#142216] mb-3"
            >
              Top 3 matches
            </h2>
            <ul className="divide-y divide-[#EBF2EC]">
              {currentScan.top3.map((item, idx) => (
                <li
                  key={item.disease}
                  className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-sm sm:text-base"
                >
                  <span
                    className={`truncate ${
                      idx === 0
                        ? 'font-semibold text-[#142216]'
                        : 'text-[#4A614D]'
                    }`}
                  >
                    {idx + 1}. {item.disease}
                  </span>
                  <span
                    className={`tabular-nums shrink-0 ${
                      idx === 0
                        ? 'font-bold text-[#142216]'
                        : 'font-medium text-[#4A614D]'
                    }`}
                  >
                    {item.confidence}%
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right column: Detailed About/Treatment/Prevention Tabs + Actions + Disclaimer */}
        <div className="md:col-span-7 space-y-4">
          <TabPanel info={currentScan.info} />

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleAskAdvisor}
              className="min-h-[50px] px-5 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#246628] text-white font-semibold text-base shadow-sm inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] cursor-pointer"
            >
              <MessageSquareText className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>Ask the Advisor</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="min-h-[50px] px-5 py-3 rounded-xl bg-[#E8F5E9] hover:bg-[#D7EED9] text-[#1B5E20] font-semibold text-base border border-[#2E7D32]/20 inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] cursor-pointer"
            >
              <Camera className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>Scan Another Leaf</span>
            </button>
          </div>

          {/* Always-visible AI disclaimer */}
          <div className="rounded-xl bg-white border border-[#E1EBE2] px-4 py-3 flex items-center gap-2.5 text-sm text-[#4A614D]">
            <Info className="w-4 h-4 text-[#4A614D] shrink-0" aria-hidden="true" />
            <span>AI-generated result. Not a substitute for expert advice.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
