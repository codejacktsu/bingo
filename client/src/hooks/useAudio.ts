import { useEffect, useState, useCallback } from 'react';

export interface AudioSettings {
  enabled: boolean;
  volume: number;
  muted: boolean;
}

const STORAGE_KEY = 'bingo-audio-settings';

/**
 * Custom hook for managing audio playback
 * Handles volume control, mute state, and audio settings persistence
 */
export function useAudio(audioUrl: string) {
  const [audio] = useState(() => {
    if (typeof window !== 'undefined') {
      const audioElement = new Audio(audioUrl);
      audioElement.preload = 'auto';
      return audioElement;
    }
    return null;
  });

  const [settings, setSettings] = useState<AudioSettings>(() => {
    // Load settings from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // Invalid JSON, use defaults
        }
      }
    }
    return {
      enabled: true,
      volume: 0.8,
      muted: false,
    };
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings]);

  // Update audio element volume when settings change
  useEffect(() => {
    if (audio) {
      audio.volume = settings.muted ? 0 : settings.volume;
    }
  }, [audio, settings.volume, settings.muted]);

  const play = useCallback(() => {
    if (audio && settings.enabled && !settings.muted) {
      // Reset to beginning and play
      audio.currentTime = 0;
      audio.play().catch((error) => {
        console.warn('Audio playback failed:', error);
      });
    }
  }, [audio, settings.enabled, settings.muted]);

  const setVolume = useCallback((volume: number) => {
    setSettings((prev) => ({
      ...prev,
      volume: Math.max(0, Math.min(1, volume)), // Clamp between 0 and 1
    }));
  }, []);

  const toggleMute = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      muted: !prev.muted,
    }));
  }, []);

  const setEnabled = useCallback((enabled: boolean) => {
    setSettings((prev) => ({
      ...prev,
      enabled,
    }));
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, [audio]);

  return {
    play,
    settings,
    setVolume,
    toggleMute,
    setEnabled,
  };
}
