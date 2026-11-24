import { useEffect, useRef } from 'react';
import { Leaf } from 'lucide-react';
import { ChatBubble } from '../components/ChatBubble';
import { ChatInput } from '../components/ChatInput';
import { AdvisorTypingSkeleton } from '../components/SkeletonLoaders';
import { useLeafCare } from '../context/LeafCareContext';

const DISEASE_SUGGESTIONS = [
  'What should I spray?',
  'How do I stop it spreading?',
  'Is it safe to harvest?',
];

const HEALTHY_SUGGESTIONS = [
  'Do I need to spray anything?',
  'How do I prevent leaf spots?',
  'Is it safe to harvest?',
];

export function AdvisorPage() {
  const {
    advisorMessages,
    advisorContextScan,
    history,
    isAdvisorTyping,
    askAdvisor,
    setAdvisorContextFromScan,
  } = useLeafCare();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [advisorMessages.length, isAdvisorTyping]);

  const suggestions =
    advisorContextScan?.status === 'healthy'
      ? HEALTHY_SUGGESTIONS
      : DISEASE_SUGGESTIONS;

  const handleContextChange = (scanId: string) => {
    if (scanId === 'general') {
      setAdvisorContextFromScan(null);
      return;
    }
    const found = history.find((item) => item.id === scanId) || null;
    setAdvisorContextFromScan(found);
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-10.5rem)] md:h-[calc(100dvh-8.5rem)] min-h-[460px]">
      {/* Context Chip & Switcher Header */}
      <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#E1EBE2] flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-9 h-9 rounded-xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center shrink-0">
            <Leaf className="w-5 h-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#4A614D]">
              Active plant topic
            </p>
            <p className="text-base font-semibold text-[#142216] truncate">
              {advisorContextScan
                ? `${advisorContextScan.crop} · ${advisorContextScan.disease}`
                : 'General Crop Care'}
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <div className="shrink-0">
            <label htmlFor="advisor-context-select" className="sr-only">
              Switch plant context
            </label>
            <select
              id="advisor-context-select"
              value={advisorContextScan?.id || 'general'}
              onChange={(e) => handleContextChange(e.target.value)}
              className="min-h-[40px] px-3 py-1.5 rounded-xl bg-[#F7FAF7] border border-[#D7E4D9] text-sm font-medium text-[#142216] focus:outline-none focus-visible:outline-2 focus-visible:outline-[#2E7D32] cursor-pointer max-w-[190px]"
            >
              <option value="general">General Crop Care</option>
              {history.map((scan) => (
                <option key={scan.id} value={scan.id}>
                  {scan.crop} · {scan.disease}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Scrollable Chat History */}
      <div
        className="flex-1 overflow-y-auto py-4 space-y-4 pr-1"
        role="log"
        aria-live="polite"
        aria-label="Conversation with LeafCare Advisor"
      >
        {advisorMessages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isAdvisorTyping && <AdvisorTypingSkeleton />}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Question Chips + Input */}
      <div className="pt-2 space-y-2.5 shrink-0">
        <div
          className="flex items-center gap-2 overflow-x-auto pb-1"
          aria-label="Suggested farming questions"
        >
          {suggestions.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => askAdvisor(question)}
              disabled={isAdvisorTyping}
              className="min-h-[40px] px-3.5 py-2 rounded-xl bg-white hover:bg-[#E8F5E9] border border-[#D7E4D9] text-sm font-medium text-[#1B5E20] whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] cursor-pointer disabled:opacity-50"
            >
              {question}
            </button>
          ))}
        </div>

        <ChatInput onSend={askAdvisor} disabled={isAdvisorTyping} />
      </div>
    </div>
  );
}
