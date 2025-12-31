/**
 * Audio utility functions for generating sounds programmatically
 * Used as fallback when audio files are not available
 */

/**
 * Generates a simple beep sound using Web Audio API
 * @param frequency - Frequency in Hz (default: 800)
 * @param duration - Duration in seconds (default: 0.2)
 * @param volume - Volume from 0 to 1 (default: 0.3)
 */
export function playBeep(frequency = 800, duration = 0.2, volume = 0.3): void {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Create oscillator for tone
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    // Envelope: fade in and out
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);

    // Cleanup
    setTimeout(() => {
      oscillator.disconnect();
      gainNode.disconnect();
      audioContext.close();
    }, duration * 1000 + 100);
  } catch (error) {
    console.warn('Web Audio API not supported:', error);
  }
}

/**
 * Plays a pleasant "ding" sound (two-tone chime)
 * Good for number drawing notifications
 */
export function playDing(volume = 0.3): void {
  playBeep(800, 0.15, volume);
  setTimeout(() => playBeep(600, 0.15, volume), 100);
}

/**
 * Plays a success sound (ascending tones)
 */
export function playSuccess(volume = 0.3): void {
  playBeep(523, 0.1, volume); // C
  setTimeout(() => playBeep(659, 0.1, volume), 100); // E
  setTimeout(() => playBeep(784, 0.2, volume), 200); // G
}

/**
 * Checks if audio files are available
 * @param audioUrl - URL to check
 * @returns Promise that resolves to true if file exists
 */
export async function checkAudioFile(audioUrl: string): Promise<boolean> {
  try {
    const response = await fetch(audioUrl, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}
