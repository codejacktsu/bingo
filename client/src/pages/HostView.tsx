import { useSocket } from '../hooks/useSocket';
import ConnectionStatus from '../components/ConnectionStatus';
import DrawButton from '../components/DrawButton';
import NumberHistory from '../components/NumberHistory';
import BingoBoard from '../components/BingoBoard';

export default function HostView() {
  const {
    connected,
    connectionStatus,
    gameState,
    connectionCount,
    error,
    reconnectAttempt,
    drawNumber,
    resetGame,
  } = useSocket();

  const handleReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset the game? This will clear all drawn numbers.'
      )
    ) {
      resetGame();
    }
  };

  const drawnCount = gameState?.drawnNumbers.length || 0;
  const remainingCount = gameState?.remainingNumbers.length || 75;
  const currentNumber = gameState?.currentNumber;
  const progress = ((drawnCount / 75) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Bingo Game - Host Control</h1>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                {connectionCount > 0 && `${connectionCount} device${connectionCount > 1 ? 's' : ''} connected`}
              </div>
              <ConnectionStatus status={connectionStatus} reconnectAttempt={reconnectAttempt} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Current Number Display */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">Current Number</h2>
          <div
            className="text-15vh font-bold text-blue-600 mb-6"
            style={{ lineHeight: '1' }}
          >
            {currentNumber || '—'}
          </div>

          {/* Control Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <DrawButton
              onClick={drawNumber}
              disabled={!connected || remainingCount === 0}
              remaining={remainingCount}
            />
            <button
              onClick={handleReset}
              disabled={!connected}
              className={`
                px-6 py-3 rounded-lg font-semibold
                transition-all duration-200
                ${
                  connected
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Reset Game
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{drawnCount}</div>
              <div className="text-sm text-gray-600">Drawn</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{remainingCount}</div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{progress}%</div>
              <div className="text-sm text-gray-600">Progress</div>
            </div>
          </div>
        </div>

        {/* Number History */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <NumberHistory
            drawnNumbers={gameState?.drawnNumbers || []}
            currentNumber={currentNumber}
          />
        </div>

        {/* Bingo Board */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <BingoBoard drawnNumbers={gameState?.drawnNumbers || []} />
        </div>
      </main>
    </div>
  );
}
