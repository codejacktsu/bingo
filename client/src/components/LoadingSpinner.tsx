interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  theme?: 'light' | 'dark';
}

export default function LoadingSpinner({ size = 'md', text, theme = 'light' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const borderColor = theme === 'dark' ? 'border-white' : 'border-blue-600';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-600';

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`
          ${sizeClasses[size]}
          ${borderColor} border-t-transparent
          rounded-full animate-spin
        `}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className={`${textColor} ${textSizeClasses[size]}`}>
          {text}
        </p>
      )}
    </div>
  );
}
