interface BingoBoardProps {
  drawnNumbers: number[];
}

export default function BingoBoard({ drawnNumbers }: BingoBoardProps) {
  const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
  const drawnSet = new Set(drawnNumbers);

  return (
    <div className="w-full">
      <h3 id="number-grid-heading" className="text-lg font-semibold mb-3 text-gray-800">
        Number Grid
      </h3>
      <div
        className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 gap-1 sm:gap-2"
        role="grid"
        aria-labelledby="number-grid-heading"
        aria-describedby="number-grid-description"
      >
        <span id="number-grid-description" className="sr-only">
          Bingo number grid showing all numbers 1-75. Green numbers have been drawn, gray numbers have not been drawn.
        </span>
        {allNumbers.map((number) => {
          const isDrawn = drawnSet.has(number);
          return (
            <div
              key={number}
              role="gridcell"
              aria-label={isDrawn ? `Number ${number} - drawn` : `Number ${number} - not drawn`}
              className={`
                aspect-square flex items-center justify-center
                rounded text-sm sm:text-base font-semibold
                transition-all duration-200
                ${
                  isDrawn
                    ? 'bg-green-500 text-white scale-105 shadow-lg'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
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
