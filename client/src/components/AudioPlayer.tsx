import { useEffect, useState } from 'react';
import { useAudio } from '../hooks/useAudio';
import { playDing, checkAudioFile } from '../utils/audioUtils';

interface AudioPlayerProps {
  /** Trigger to play the sound (e.g., current number changes) */
  trigger?: number | null;
  /** Audio file URL */
  audioUrl?: string;
}

/**
 * AudioPlayer component - plays sound effects when triggered
 * Manages its own audio state via useAudio hook
 * Falls back to Web Audio API if audio file not found
 */
export default function AudioPlayer({ trigger, audioUrl = '/sounds/draw.mp3' }: AudioPlayerProps) {
  const { play, settings, setVolume, toggleMute } = useAudio(audioUrl);
  const [useFileAudio, setUseFileAudio] = useState(false);

  // Check if audio file exists on mount
  useEffect(() => {
    checkAudioFile(audioUrl).then((exists) => {
      setUseFileAudio(exists);
      if (exists) {
        console.info('Audio file found, using file audio');
      } else {
        console.info('Audio file not found, using Web Audio API fallback');
      }
    });
  }, [audioUrl]);

  // Play sound when trigger changes (e.g., new number drawn)
  useEffect(() => {
    if (trigger !== null && trigger !== undefined) {
      console.log('🔊 Audio trigger:', trigger, 'useFile:', useFileAudio, 'settings:', settings);
      if (useFileAudio) {
        play();
      } else {
        // Fallback to Web Audio API
        if (settings.enabled && !settings.muted) {
          console.log('🔊 Playing Web Audio API beep at volume:', settings.volume);
          playDing(settings.volume);
        } else {
          console.log('🔇 Audio disabled or muted');
        }
      }
    }
  }, [trigger, play, useFileAudio, settings.enabled, settings.muted, settings.volume]);

  return (
    <div className="flex items-center gap-4">
      {/* Mute Toggle */}
      <button
        onClick={toggleMute}
        className="p-2 hover:bg-gray-100 rounded transition-colors"
        title={settings.muted ? 'Unmute' : 'Mute'}
      >
        {settings.muted ? (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>

      {/* Volume Slider */}
      <div className="flex items-center gap-2 flex-1">
        <span className="text-sm text-gray-600">Volume:</span>
        <input
          type="range"
          min="0"
          max="100"
          value={settings.volume * 100}
          onChange={(e) => setVolume(parseInt(e.target.value) / 100)}
          disabled={settings.muted}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
          style={{
            background: settings.muted
              ? '#e5e7eb'
              : `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${settings.volume * 100}%, #e5e7eb ${settings.volume * 100}%, #e5e7eb 100%)`,
          }}
        />
        <span className="text-sm text-gray-600 w-12 text-right">
          {Math.round(settings.volume * 100)}%
        </span>
      </div>
    </div>
  );
}
