import { useEffect, useRef } from 'react';

interface NumberHistoryProps {
  drawnNumbers: number[];
  currentNumber?: number | null;
}

export default function NumberHistory({ drawnNumbers, currentNumber }: NumberHistoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest number
  useEffect(() => {
    if (containerRef.current && drawnNumbers.length > 0) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [drawnNumbers]);

  if (drawnNumbers.length === 0) {
    return (
      <div className="w-full p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-center text-gray-500 text-sm">
          No numbers drawn yet. Click &quot;Draw Number&quot; to start!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        Number History ({drawnNumbers.length} drawn)
      </h3>
      <div
        ref={containerRef}
        className="flex gap-2 overflow-x-auto pb-2 scroll-smooth"
        style={{ scrollbarWidth: 'thin' }}
      >
        {drawnNumbers.map((number, index) => {
          const isCurrent = number === currentNumber;
          return (
            <div
              key={`${number}-${index}`}
              className={`
                flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14
                flex items-center justify-center
                rounded-lg font-bold text-lg
                transition-all duration-200
                ${
                  isCurrent
                    ? 'bg-blue-500 text-white scale-110 shadow-lg ring-2 ring-blue-300'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              {number}
            </div>
          );
        })}
      </div>
    </div>
  );
}
