// Procedural Web Audio Engine for INA.EXE Indie Game Experience
// Generates ambient music, environmental wind, footsteps, and UI feedback without external audio files.

class SoundEngine {
  private ctx: AudioContext | null = null
  private muted: boolean = false
  private masterVolume: number = 0.8
  private bgmVolume: number = 0.5
  private sfxVolume: number = 0.7

  private masterGain: GainNode | null = null
  private sfxGain: GainNode | null = null
  private bgmGain: GainNode | null = null

  // Ambient BGM scheduler state
  private isBgmPlaying: boolean = false
  private bgmTimer: number | null = null
  private windSource: AudioBufferSourceNode | null = null
  private windGain: GainNode | null = null

  // Step throttling
  private lastStepTime: number = 0

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass()

        // Master routing tree: Source -> sfxGain/bgmGain -> masterGain -> destination
        this.masterGain = this.ctx.createGain()
        this.masterGain.gain.setValueAtTime(this.muted ? 0 : this.masterVolume, this.ctx.currentTime)
        this.masterGain.connect(this.ctx.destination)

        this.sfxGain = this.ctx.createGain()
        this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime)
        this.sfxGain.connect(this.masterGain)

        this.bgmGain = this.ctx.createGain()
        this.bgmGain.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime)
        this.bgmGain.connect(this.masterGain)
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
    return this.ctx
  }

  // --- Volume & Mute Controls ---
  public setMuted(muted: boolean): void {
    this.muted = muted
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime
      this.masterGain.gain.cancelScheduledValues(now)
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.masterVolume, now)
    }
  }

  public isMuted(): boolean {
    return this.muted
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted)
    if (!this.muted) {
      this.playClick()
    }
    return this.muted
  }

  public setMasterVolume(vol: number): void {
    this.masterVolume = Math.max(0, Math.min(1, vol))
    if (this.masterGain && this.ctx && !this.muted) {
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime)
    }
  }

  public getMasterVolume(): number {
    return this.masterVolume
  }

  public setBgmVolume(vol: number): void {
    this.bgmVolume = Math.max(0, Math.min(1, vol))
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime)
    }
  }

  public getBgmVolume(): number {
    return this.bgmVolume
  }

  public setSfxVolume(vol: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, vol))
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime)
    }
  }

  public getSfxVolume(): number {
    return this.sfxVolume
  }

  // --- Background Ambient Music & Wind Generator ---
  public startAmbientBgm(): void {
    if (this.isBgmPlaying) return
    const ctx = this.initCtx()
    if (!ctx) return

    this.isBgmPlaying = true
    this.startWindAmbience(ctx)
    this.scheduleNextChords()
  }

  public stopAmbientBgm(): void {
    this.isBgmPlaying = false
    if (this.bgmTimer) {
      window.clearTimeout(this.bgmTimer)
      this.bgmTimer = null
    }
    if (this.windSource) {
      try {
        this.windSource.stop()
        this.windSource.disconnect()
      } catch {
        // Ignored
      }
      this.windSource = null
    }
  }

  // Soft atmospheric wind whisper
  private startWindAmbience(ctx: AudioContext): void {
    try {
      // 2 seconds of pinkish noise looped
      const bufferSize = ctx.sampleRate * 2
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      let b0 = 0, b1 = 0, b2 = 0
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        b0 = 0.997 * b0 + white * 0.05
        b1 = 0.985 * b1 + white * 0.1
        b2 = 0.95 * b2 + white * 0.2
        output[i] = (b0 + b1 + b2) * 0.08
      }

      this.windSource = ctx.createBufferSource()
      this.windSource.buffer = noiseBuffer
      this.windSource.loop = true

      // Bandpass filter to create wind resonance
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(320, ctx.currentTime)
      filter.Q.setValueAtTime(1.5, ctx.currentTime)

      this.windGain = ctx.createGain()
      this.windGain.gain.setValueAtTime(0.04, ctx.currentTime)

      this.windSource.connect(filter)
      filter.connect(this.windGain)
      if (this.bgmGain) {
        this.windGain.connect(this.bgmGain)
      } else {
        this.windGain.connect(ctx.destination)
      }

      this.windSource.start(0)
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Calming, gentle indie game chord progression (Fmaj7 -> G6 -> Em7 -> Am7)
  private scheduleNextChords(): void {
    if (!this.isBgmPlaying) return
    const ctx = this.initCtx()
    if (!ctx) return

    const progressions = [
      [261.63, 329.63, 392.0, 493.88], // Cmaj7 (C4, E4, G4, B4)
      [220.0, 261.63, 329.63, 392.0],  // Am7 (A3, C4, E4, G4)
      [174.61, 261.63, 329.63, 349.23],// Fmaj7 (F3, C4, E4, F4)
      [196.0, 246.94, 293.66, 392.0],  // G6 (G3, B3, D4, G4)
    ]

    const chordIndex = Math.floor(Math.random() * progressions.length)
    const notes = progressions[chordIndex]
    const now = ctx.currentTime

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      osc.type = i % 2 === 0 ? 'sine' : 'triangle'
      osc.frequency.setValueAtTime(freq, now)

      // Warm low-pass filter
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(800, now)

      // Slow dreamy envelope
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.linearRampToValueAtTime(0.015, now + 1.2)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.8)

      osc.connect(filter)
      filter.connect(gain)

      if (this.bgmGain) {
        gain.connect(this.bgmGain)
      } else {
        gain.connect(ctx.destination)
      }

      osc.start(now + i * 0.08)
      osc.stop(now + 5.2)
    })

    // Schedule next chord cluster in 4.5 seconds
    this.bgmTimer = window.setTimeout(() => {
      this.scheduleNextChords()
    }, 4500)
  }

  // --- Sound Effects (SFX) ---

  // Tactile footstep on wooden deck / terrain
  public playFootstep(isSprinting: boolean = false): void {
    if (this.muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const now = ctx.currentTime
    const minInterval = isSprinting ? 0.28 : 0.42
    if (now - this.lastStepTime < minInterval) return
    this.lastStepTime = now

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = 'sine'
    // Subtle pitch variation
    const baseFreq = isSprinting ? 85 : 72
    const freq = baseFreq + (Math.random() * 12 - 6)
    osc.frequency.setValueAtTime(freq, now)
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.06)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(140, now)

    gain.gain.setValueAtTime(0.035, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06)

    osc.connect(filter)
    filter.connect(gain)

    if (this.sfxGain) {
      gain.connect(this.sfxGain)
    } else {
      gain.connect(ctx.destination)
    }

    osc.start(now)
    osc.stop(now + 0.06)
  }

  // Object Inspection Chime
  public playInspect(): void {
    if (this.muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const notes = [440, 554.37, 659.25, 880] // A4, C#5, E5, A5
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.05
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now)

      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35)

      osc.connect(gain)
      if (this.sfxGain) {
        gain.connect(this.sfxGain)
      } else {
        gain.connect(ctx.destination)
      }

      osc.start(now)
      osc.stop(now + 0.35)
    })
  }

  // Waypoint / Island Arrival Harmonic Swell
  public playLocationTransition(): void {
    if (this.muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const notes = [329.63, 392.0, 493.88, 587.33] // E4, G4, B4, D5
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.08
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, now)

      gain.gain.setValueAtTime(0.045, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5)

      osc.connect(gain)
      if (this.sfxGain) {
        gain.connect(this.sfxGain)
      } else {
        gain.connect(ctx.destination)
      }

      osc.start(now)
      osc.stop(now + 0.5)
    })
  }

  // UI Hover tick
  public playHover(): void {
    if (this.muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(900, now)
    osc.frequency.exponentialRampToValueAtTime(1300, now + 0.035)

    gain.gain.setValueAtTime(0.025, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035)

    osc.connect(gain)
    if (this.sfxGain) {
      gain.connect(this.sfxGain)
    } else {
      gain.connect(ctx.destination)
    }

    osc.start(now)
    osc.stop(now + 0.035)
  }

  // UI Click
  public playClick(): void {
    if (this.muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(520, now)
    osc.frequency.exponentialRampToValueAtTime(940, now + 0.05)

    gain.gain.setValueAtTime(0.06, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

    osc.connect(gain)
    if (this.sfxGain) {
      gain.connect(this.sfxGain)
    } else {
      gain.connect(ctx.destination)
    }

    osc.start(now)
    osc.stop(now + 0.05)
  }

  // Entering World Start
  public playEnter(): void {
    if (this.muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.07
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now)

      gain.gain.setValueAtTime(0.05, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

      osc.connect(gain)
      if (this.sfxGain) {
        gain.connect(this.sfxGain)
      } else {
        gain.connect(ctx.destination)
      }

      osc.start(now)
      osc.stop(now + 0.35)
    })
  }

  // Modal Open
  public playModalOpen(): void {
    if (this.muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(587.33, now)
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12)

    gain.gain.setValueAtTime(0.05, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14)

    osc.connect(gain)
    if (this.sfxGain) {
      gain.connect(this.sfxGain)
    } else {
      gain.connect(ctx.destination)
    }

    osc.start(now)
    osc.stop(now + 0.14)
  }

  // Modal Close
  public playModalClose(): void {
    if (this.muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, now)
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.1)

    gain.gain.setValueAtTime(0.045, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

    osc.connect(gain)
    if (this.sfxGain) {
      gain.connect(this.sfxGain)
    } else {
      gain.connect(ctx.destination)
    }

    osc.start(now)
    osc.stop(now + 0.12)
  }
}

export const soundEngine = new SoundEngine()
