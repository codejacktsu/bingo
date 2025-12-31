import type { ConnectionStatus as Status } from '@shared/types/game.types';

interface ConnectionStatusProps {
  status: Status;
  reconnectAttempt?: number;
}

export default function ConnectionStatus({ status, reconnectAttempt = 0 }: ConnectionStatusProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'bg-green-500';
      case 'disconnected':
        return 'bg-red-500';
      case 'reconnecting':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'disconnected':
        return 'Disconnected';
      case 'reconnecting':
        return `Reconnecting... (${reconnectAttempt})`;
      default:
        return 'Unknown';
    }
  };

  const shouldPulse = status === 'reconnecting';

  return (
    <div className="flex items-center gap-2 text-sm">
      <div
        className={`w-3 h-3 rounded-full ${getStatusColor()} ${
          shouldPulse ? 'animate-pulse' : ''
        }`}
        title={getStatusText()}
      />
      <span className="text-gray-700 dark:text-gray-300">{getStatusText()}</span>
    </div>
  );
}
