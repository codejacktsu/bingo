interface DrawButtonProps {
  onClick: () => void;
  disabled?: boolean;
  remaining: number;
}

export default function DrawButton({ onClick, disabled = false, remaining }: DrawButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full sm:w-auto px-8 py-4 rounded-lg
        text-xl font-bold uppercase tracking-wide
        transition-all duration-200 transform
        ${
          disabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
        }
      `}
      aria-label={disabled ? 'No numbers remaining' : `Draw number (${remaining} remaining)`}
    >
      {disabled ? 'All Numbers Drawn' : `Draw Number (${remaining})`}
    </button>
  );
}
