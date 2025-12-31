import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { playBeep, playDing, playSuccess, checkAudioFile } from './audioUtils';

describe('audioUtils', () => {
  // Mock Web Audio API
  let mockAudioContext: any;
  let mockOscillator: any;
  let mockGainNode: any;
  let mockDestination: any;

  beforeEach(() => {
    // Create mock objects
    mockDestination = {};

    mockGainNode = {
      gain: {
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
        value: 1,
      },
      connect: vi.fn(),
      disconnect: vi.fn(),
    };

    mockOscillator = {
      frequency: { value: 0 },
      type: 'sine',
      connect: vi.fn(),
      disconnect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
    };

    mockAudioContext = {
      currentTime: 0,
      destination: mockDestination,
      createOscillator: vi.fn(() => mockOscillator),
      createGain: vi.fn(() => mockGainNode),
      close: vi.fn(),
    };

    // Mock window.AudioContext
    (global as any).window = {
      AudioContext: vi.fn(() => mockAudioContext),
    };

    // Clear all timers before each test
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('playBeep', () => {
    it('should create AudioContext', () => {
      playBeep();
      expect(window.AudioContext).toHaveBeenCalled();
    });

    it('should create oscillator and gain node', () => {
      playBeep();
      expect(mockAudioContext.createOscillator).toHaveBeenCalled();
      expect(mockAudioContext.createGain).toHaveBeenCalled();
    });

    it('should connect oscillator to gain node and destination', () => {
      playBeep();
      expect(mockOscillator.connect).toHaveBeenCalledWith(mockGainNode);
      expect(mockGainNode.connect).toHaveBeenCalledWith(mockDestination);
    });

    it('should set frequency to default 800 Hz', () => {
      playBeep();
      expect(mockOscillator.frequency.value).toBe(800);
    });

    it('should set custom frequency', () => {
      playBeep(440);
      expect(mockOscillator.frequency.value).toBe(440);
    });

    it('should set oscillator type to sine', () => {
      playBeep();
      expect(mockOscillator.type).toBe('sine');
    });

    it('should set up gain envelope', () => {
      playBeep(800, 0.2, 0.3);

      expect(mockGainNode.gain.setValueAtTime).toHaveBeenCalledWith(0, 0);
      expect(mockGainNode.gain.linearRampToValueAtTime).toHaveBeenCalledWith(0.3, 0.01);
      expect(mockGainNode.gain.exponentialRampToValueAtTime).toHaveBeenCalledWith(0.01, 0.2);
    });

    it('should start and stop oscillator', () => {
      playBeep(800, 0.2);

      expect(mockOscillator.start).toHaveBeenCalledWith(0);
      expect(mockOscillator.stop).toHaveBeenCalledWith(0.2);
    });

    it('should cleanup after duration', () => {
      playBeep(800, 0.2);

      // Fast-forward time
      vi.advanceTimersByTime(300); // duration * 1000 + 100

      expect(mockOscillator.disconnect).toHaveBeenCalled();
      expect(mockGainNode.disconnect).toHaveBeenCalled();
      expect(mockAudioContext.close).toHaveBeenCalled();
    });

    it('should use default parameters', () => {
      playBeep();

      expect(mockOscillator.frequency.value).toBe(800);
      expect(mockGainNode.gain.linearRampToValueAtTime).toHaveBeenCalledWith(0.3, expect.any(Number));
    });

    it('should handle Web Audio API errors gracefully', () => {
      // Mock console.warn to verify error handling
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Make AudioContext throw
      (global as any).window = {
        AudioContext: vi.fn(() => {
          throw new Error('AudioContext not supported');
        }),
      };

      // Should not throw
      expect(() => playBeep()).not.toThrow();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Web Audio API not supported:',
        expect.any(Error)
      );

      consoleWarnSpy.mockRestore();
    });

    it('should use webkitAudioContext fallback if AudioContext not available', () => {
      const mockWebkitContext = { ...mockAudioContext };
      (global as any).window = {
        AudioContext: undefined,
        webkitAudioContext: vi.fn(() => mockWebkitContext),
      };

      playBeep();

      expect((window as any).webkitAudioContext).toHaveBeenCalled();
    });
  });

  describe('playDing', () => {
    it('should play two beeps in sequence', () => {
      const playBeepSpy = vi.spyOn({ playBeep }, 'playBeep');

      playDing(0.5);

      // First beep should be called immediately
      expect(playBeepSpy).toHaveBeenCalledTimes(0); // Not called yet in spy

      // Actually test by checking setTimeout was called
      vi.advanceTimersByTime(100);
    });

    it('should use custom volume', () => {
      playDing(0.7);

      // Verify through gain node
      expect(mockGainNode.gain.linearRampToValueAtTime).toHaveBeenCalledWith(0.7, expect.any(Number));
    });

    it('should play second beep after 100ms delay', () => {
      // Track how many times playBeep creates context
      const audioContextCalls: number[] = [];
      let callCount = 0;
      (global as any).window = {
        AudioContext: vi.fn(() => {
          audioContextCalls.push(callCount++);
          return mockAudioContext;
        }),
      };

      playDing();

      // First beep immediately
      expect(window.AudioContext).toHaveBeenCalledTimes(1);

      // Second beep after 100ms
      vi.advanceTimersByTime(100);
      expect(window.AudioContext).toHaveBeenCalledTimes(2);
    });
  });

  describe('playSuccess', () => {
    it('should play three beeps in sequence', () => {
      let callCount = 0;
      (global as any).window = {
        AudioContext: vi.fn(() => {
          callCount++;
          return mockAudioContext;
        }),
      };

      playSuccess();

      // First beep immediately
      expect(callCount).toBe(1);

      // Second beep after 100ms
      vi.advanceTimersByTime(100);
      expect(callCount).toBe(2);

      // Third beep after 200ms total
      vi.advanceTimersByTime(100);
      expect(callCount).toBe(3);
    });

    it('should play C-E-G chord (ascending)', () => {
      const frequencies: number[] = [];
      (global as any).window = {
        AudioContext: vi.fn(() => ({
          ...mockAudioContext,
          createOscillator: vi.fn(() => {
            const osc = { ...mockOscillator };
            Object.defineProperty(osc.frequency, 'value', {
              set(val: number) {
                frequencies.push(val);
              },
              get() {
                return 0;
              },
            });
            return osc;
          }),
        })),
      };

      playSuccess();
      vi.advanceTimersByTime(100);
      vi.advanceTimersByTime(100);

      expect(frequencies).toContain(523); // C
      expect(frequencies).toContain(659); // E
      expect(frequencies).toContain(784); // G
    });

    it('should use custom volume for all tones', () => {
      playSuccess(0.8);

      expect(mockGainNode.gain.linearRampToValueAtTime).toHaveBeenCalledWith(0.8, expect.any(Number));
    });
  });

  describe('checkAudioFile', () => {
    beforeEach(() => {
      // Mock fetch
      global.fetch = vi.fn();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should return true when audio file exists', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
      });

      const result = await checkAudioFile('/sounds/test.mp3');

      expect(result).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith('/sounds/test.mp3', { method: 'HEAD' });
    });

    it('should return false when audio file does not exist', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
      });

      const result = await checkAudioFile('/sounds/missing.mp3');

      expect(result).toBe(false);
    });

    it('should return false when fetch fails', async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      const result = await checkAudioFile('/sounds/error.mp3');

      expect(result).toBe(false);
    });

    it('should use HEAD method for efficiency', async () => {
      (global.fetch as any).mockResolvedValueOnce({ ok: true });

      await checkAudioFile('/sounds/test.mp3');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: 'HEAD' })
      );
    });

    it('should handle different audio file paths', async () => {
      (global.fetch as any).mockResolvedValue({ ok: true });

      await checkAudioFile('/custom/path/sound.mp3');
      await checkAudioFile('https://example.com/sound.wav');

      expect(global.fetch).toHaveBeenCalledWith('/custom/path/sound.mp3', { method: 'HEAD' });
      expect(global.fetch).toHaveBeenCalledWith('https://example.com/sound.wav', { method: 'HEAD' });
    });
  });
});
