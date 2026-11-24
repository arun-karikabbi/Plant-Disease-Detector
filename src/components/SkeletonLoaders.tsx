export function ResultsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse" aria-label="Loading result">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EDE6]">
        <div className="w-full h-56 bg-[#E6EFE7] rounded-xl" />
        <div className="mt-4 flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-4 w-24 bg-[#E6EFE7] rounded" />
            <div className="h-7 w-48 bg-[#DCE8DE] rounded" />
          </div>
          <div className="h-8 w-24 bg-[#E6EFE7] rounded-lg" />
        </div>
        <div className="mt-5 h-3 w-full bg-[#E6EFE7] rounded-full" />
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EDE6] space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="h-11 bg-[#E6EFE7] rounded-xl" />
          <div className="h-11 bg-[#E6EFE7] rounded-xl" />
          <div className="h-11 bg-[#E6EFE7] rounded-xl" />
        </div>
        <div className="h-4 w-full bg-[#E6EFE7] rounded" />
        <div className="h-4 w-5/6 bg-[#E6EFE7] rounded" />
        <div className="h-4 w-4/6 bg-[#E6EFE7] rounded" />
      </div>
    </div>
  );
}

export function HistorySkeleton() {
  return (
    <div className="space-y-3 animate-pulse" aria-label="Loading scan history">
      {[1, 2, 3].map((idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#E5EDE6] flex items-center gap-3.5"
        >
          <div className="w-16 h-16 rounded-xl bg-[#E6EFE7] shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-40 bg-[#DCE8DE] rounded" />
            <div className="h-4 w-28 bg-[#E6EFE7] rounded" />
          </div>
          <div className="h-7 w-20 bg-[#E6EFE7] rounded-lg shrink-0" />
        </div>
      ))}
    </div>
  );
}

export function AdvisorTypingSkeleton() {
  return (
    <div className="flex items-start gap-2.5" aria-label="Advisor is typing">
      <div className="w-9 h-9 rounded-full bg-[#E8F5E9] border border-[#2E7D32]/20 flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-[#2E7D32]">AI</span>
      </div>
      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-sm border border-[#E5EDE6]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#2E7D32]/60 animate-bounce [animation-delay:-0.2s]" />
          <span className="w-2 h-2 rounded-full bg-[#2E7D32]/60 animate-bounce [animation-delay:-0.1s]" />
          <span className="w-2 h-2 rounded-full bg-[#2E7D32]/60 animate-bounce" />
          <span className="ml-2 text-sm text-[#4A614D]">Thinking...</span>
        </div>
      </div>
    </div>
  );
}
