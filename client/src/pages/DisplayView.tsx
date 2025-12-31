import { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import AudioPlayer from '../components/AudioPlayer';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DisplayView() {
  const { connectionStatus, gameState, connected } = useSocket();
  const [showFullscreenHint, setShowFullscreenHint] = useState(true);

  const currentNumber = gameState?.currentNumber;
  const drawnNumbers = gameState?.drawnNumbers || [];

  // Hide fullscreen hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFullscreenHint(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Request fullscreen on button click
  const enterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
      setShowFullscreenHint(false);
    }
  };

  // Connection indicator color
  const getConnectionColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'bg-green-500';
      case 'disconnected':
        return 'bg-red-500';
      case 'reconnecting':
        return 'bg-yellow-500 animate-pulse';
      default:
        return 'bg-gray-500';
    }
  };

  // Show loading state while connecting and waiting for initial game state
  if (connectionStatus === 'connecting' || (connected && !gameState)) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" theme="dark" text="" />
          <p className="text-white text-2xl mt-6">Connecting to game server...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Hidden Audio Player - plays sound when number drawn */}
      <div className="hidden">
        <AudioPlayer trigger={currentNumber} />
      </div>

      {/* Connection Status Indicator */}
      <div className="absolute top-4 right-4 z-10">
        <div
          className={`w-4 h-4 rounded-full ${getConnectionColor()}`}
          title={connectionStatus}
        />
      </div>

      {/* Fullscreen Hint */}
      {showFullscreenHint && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-black bg-opacity-90 p-4 text-center">
          <p className="text-white text-lg mb-2">Press F11 for fullscreen or</p>
          <button
            onClick={enterFullscreen}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors"
          >
            Enter Fullscreen
          </button>
        </div>
      )}

      {/* Main Display */}
      <div className="flex-1 flex flex-col justify-center items-center px-8">
        {/* Current Number */}
        <div className="mb-12 text-center">
          <div
            className={`
              text-25vh font-extrabold text-gold
              transition-all duration-500 ease-out
              ${currentNumber ? 'opacity-100 scale-100' : 'opacity-50 scale-90'}
            `}
            style={{
              lineHeight: '1',
              textShadow: '0 0 40px rgba(255, 215, 0, 0.5)',
            }}
          >
            {currentNumber || '—'}
          </div>
          {!currentNumber && (
            <p className="text-2xl text-gray-400 mt-6">Waiting for first number...</p>
          )}
        </div>
      </div>

      {/* Number History at Bottom */}
      {drawnNumbers.length > 0 && (
        <div className="bg-gray-900 bg-opacity-80 px-8 py-6 border-t border-gray-700">
          <h3 className="text-2xl font-semibold text-gray-300 mb-4 text-center">
            Called Numbers
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-h-32 overflow-y-auto">
            {drawnNumbers.map((number, index) => {
              const isCurrent = number === currentNumber;
              return (
                <div
                  key={`${number}-${index}`}
                  className={`
                    w-16 h-16 flex items-center justify-center
                    rounded-lg font-bold text-2xl
                    transition-all duration-300
                    ${
                      isCurrent
                        ? 'bg-gold text-black scale-110 shadow-lg'
                        : 'bg-gray-700 text-white'
                    }
                  `}
                >
                  {number}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
