import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = 'Ask about sprays, watering, or harvest...',
}: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-sm border border-[#D7E4D9]"
    >
      <label htmlFor="advisor-question-input" className="sr-only">
        Ask the farming advisor
      </label>
      <input
        id="advisor-question-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className="flex-1 min-w-0 min-h-[44px] px-3 py-2 text-base text-[#142216] placeholder:text-[#637866] bg-transparent focus:outline-none"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        aria-label="Send message"
        className="min-w-[48px] min-h-[48px] px-4 rounded-xl bg-[#2E7D32] hover:bg-[#246628] disabled:bg-[#BFD6C1] text-white font-semibold inline-flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] cursor-pointer disabled:cursor-not-allowed shrink-0"
      >
        <Send className="w-5 h-5" aria-hidden="true" />
      </button>
    </form>
  );
}
