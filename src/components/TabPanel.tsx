import { useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  Droplets,
  Leaf,
  ShieldCheck,
  Sprout,
} from 'lucide-react';
import type { DiseaseInfo } from '../types/leafcare';

interface TabPanelProps {
  info: DiseaseInfo;
}

type ResultTab = 'about' | 'treatment' | 'prevention';

const TABS: { id: ResultTab; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'treatment', label: 'Treatment' },
  { id: 'prevention', label: 'Prevention' },
];

export function TabPanel({ info }: TabPanelProps) {
  const [activeTab, setActiveTab] = useState<ResultTab>('about');

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#E1EBE2]">
      <div
        role="tablist"
        aria-label="Disease details and care guide"
        className="grid grid-cols-3 gap-1.5 p-1 bg-[#EFF5F0] rounded-xl"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[44px] px-2 py-2 rounded-lg text-sm sm:text-base font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] ${
                isActive
                  ? 'bg-white text-[#142216] shadow-sm'
                  : 'text-[#4A614D] hover:text-[#142216]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'about' && (
        <div
          id="panel-about"
          role="tabpanel"
          aria-labelledby="tab-about"
          className="mt-5 space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4 border-b border-[#EBF2EC]">
            <div>
              <p className="text-sm text-[#4A614D]">Cause</p>
              <p className="mt-0.5 text-base font-semibold text-[#142216]">
                {info.cause}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#4A614D]">Severity</p>
              <p className="mt-0.5 text-base font-semibold text-[#142216]">
                {info.severity}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#142216] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#2E7D32]" aria-hidden="true" />
              <span>What this means</span>
            </h3>
            <p className="mt-2 text-base text-[#2B3D2D] leading-relaxed">
              {info.description}
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#142216] flex items-center gap-2">
              <Leaf className="w-4 h-4 text-[#2E7D32]" aria-hidden="true" />
              <span>Key signs to look for</span>
            </h3>
            <ul className="mt-2.5 space-y-2.5">
              {info.symptoms.map((symptom, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 text-base text-[#2B3D2D] leading-relaxed"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] mt-2.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'treatment' && (
        <div
          id="panel-treatment"
          role="tabpanel"
          aria-labelledby="tab-treatment"
          className="mt-5 space-y-5"
        >
          <div>
            <h3 className="text-base font-semibold text-[#142216] flex items-center gap-2">
              <Sprout className="w-4 h-4 text-[#2E7D32]" aria-hidden="true" />
              <span>Step 1 · Field &amp; Plant Care (Cultural)</span>
            </h3>
            <ul className="mt-2.5 space-y-2.5">
              {info.culturalSteps.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-base text-[#2B3D2D] leading-relaxed"
                >
                  <span className="font-semibold text-[#2E7D32] tabular-nums shrink-0">
                    {idx + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-[#EBF2EC]">
            <h3 className="text-base font-semibold text-[#142216] flex items-center gap-2">
              <Droplets className="w-4 h-4 text-[#2E7D32]" aria-hidden="true" />
              <span>Step 2 · Organic Options</span>
            </h3>
            <ul className="mt-2.5 space-y-2.5">
              {info.organicSteps.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-base text-[#2B3D2D] leading-relaxed"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] mt-2.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-[#EBF2EC]">
            <h3 className="text-base font-semibold text-[#142216]">
              Step 3 · Targeted Spray (If Needed)
            </h3>
            <ul className="mt-2.5 space-y-2.5">
              {info.chemicalSteps.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-base text-[#2B3D2D] leading-relaxed"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#4A614D] mt-2.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-[#FFF8E1] border border-[#F9A825]/40 p-4 flex items-start gap-3">
            <AlertCircle
              className="w-5 h-5 text-[#8D5B00] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-semibold text-[#704700]">Safety Note</p>
              <p className="mt-1 text-sm sm:text-base text-[#5C3D00] leading-relaxed">
                {info.safetyNote}
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'prevention' && (
        <div
          id="panel-prevention"
          role="tabpanel"
          aria-labelledby="tab-prevention"
          className="mt-5 space-y-4"
        >
          <h3 className="text-base font-semibold text-[#142216] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2E7D32]" aria-hidden="true" />
            <span>Protect next season&apos;s crop</span>
          </h3>
          <ul className="space-y-3">
            {info.prevention.map((tip, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 pb-3 border-b last:border-b-0 border-[#EBF2EC] text-base text-[#2B3D2D] leading-relaxed"
              >
                <span className="w-6 h-6 rounded-full bg-[#E8F5E9] text-[#1B5E20] text-sm font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                  {idx + 1}
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
