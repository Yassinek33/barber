// Simple Web Audio API Synthesizer for Barbershop ASMR ambience

class BarberAudioSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private volume = 0.25;
  private intervalId: number | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    if (this.isPlaying) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.isPlaying = true;

      // Play soft scissor snip rhythm every ~2.5 seconds
      this.intervalId = window.setInterval(() => {
        if (!this.isPlaying || !this.ctx) return;
        this.playScissorSnip();
      }, 2400);

      this.playScissorSnip();
    } catch (err) {
      console.warn("Audio Context error:", err);
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private playScissorSnip() {
    if (!this.ctx) return;
    
    // High frequency metallic snip sound simulation
    const now = this.ctx.currentTime;
    
    // Noise buffer for scissor metallic clash
    const bufferSize = this.ctx.sampleRate * 0.08; // 80ms
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    // Highpass filter for crisp metallic snip
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3200, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.volume * 0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(now);
  }
}

export const audioSynth = new BarberAudioSynth();
