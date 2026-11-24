import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Leaf } from 'lucide-react';
import type { ChatMessage } from '../types/leafcare';

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const [sourceOpen, setSourceOpen] = useState(false);
  const isUser = message.sender === 'user';

  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (isUser) {
    return (
      <div className="flex flex-col items-end">
        <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tr-sm bg-[#2E7D32] text-white px-4 py-3 shadow-sm">
          <p className="text-base leading-relaxed whitespace-pre-wrap">
            {message.text}
          </p>
        </div>
        <span className="mt-1 text-xs text-[#556B57] tabular-nums">
          {formattedTime}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5">
      <div
        className="w-9 h-9 rounded-full bg-[#E8F5E9] border border-[#2E7D32]/25 flex items-center justify-center shrink-0 mt-0.5"
        aria-hidden="true"
      >
        <Leaf className="w-4 h-4 text-[#2E7D32]" />
      </div>

      <div className="max-w-[85%] sm:max-w-[78%] flex flex-col items-start">
        <div className="rounded-2xl rounded-tl-sm bg-white text-[#142216] px-4 py-3 shadow-sm border border-[#E1EBE2]">
          <p className="text-base leading-relaxed whitespace-pre-wrap">
            {message.text}
          </p>

          {message.source && (
            <div className="mt-3 pt-2.5 border-t border-[#EBF2EC]">
              <button
                type="button"
                onClick={() => setSourceOpen((prev) => !prev)}
                aria-expanded={sourceOpen}
                className="min-h-[36px] inline-flex items-center gap-1.5 text-sm font-medium text-[#2E7D32] hover:text-[#1B5E20] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] rounded"
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Source: {message.source.title}</span>
                {sourceOpen ? (
                  <ChevronUp className="w-4 h-4 shrink-0" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-4 h-4 shrink-0" aria-hidden="true" />
                )}
              </button>

              {sourceOpen && (
                <p className="mt-1.5 text-sm text-[#4A614D] leading-relaxed bg-[#F7FAF7] rounded-lg p-2.5 border border-[#E5EDE6]">
                  {message.source.snippet}
                </p>
              )}
            </div>
          )}
        </div>
        <span className="mt-1 text-xs text-[#556B57] tabular-nums">
          Advisor · {formattedTime}
        </span>
      </div>
    </div>
  );
}
