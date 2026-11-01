export class TTSController {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static utterance: SpeechSynthesisUtterance | null = null;
  private static currentRate: number = 1.0;

  static isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  static speak(
    text: string, 
    lang: 'vi' | 'en' = 'vi', 
    rate: number = 1.0, 
    onEnd?: () => void, 
    onError?: (err: any) => void
  ) {
    if (!this.synth) return;
    this.stop();

    if (!text || !text.trim()) return;

    this.currentRate = rate;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 1.0;
    utterance.lang = lang === 'en' ? 'en-US' : 'vi-VN';

    // Try finding matching voice
    const voices = this.synth.getVoices();
    const targetPrefix = lang === 'en' ? 'en' : 'vi';
    const matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith(targetPrefix));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      this.utterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.utterance = null;
      if (onError) onError(e);
    };

    this.utterance = utterance;
    this.synth.speak(utterance);
  }

  static pause() {
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
    }
  }

  static resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  static stop() {
    if (this.synth) {
      this.synth.cancel();
      this.utterance = null;
    }
  }

  static isSpeaking(): boolean {
    return !!(this.synth && this.synth.speaking);
  }

  static isPaused(): boolean {
    return !!(this.synth && this.synth.paused);
  }
}

export function initSpeechRecognition(
  lang: 'vi' | 'en' = 'vi',
  onResult: (text: string) => void,
  onError: (err: string) => void,
  onEnd: () => void
) {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) {
    onError('Trình duyệt không hỗ trợ nhận diện giọng nói (Web Speech API). Vui lòng sử dụng Chrome/Edge hoặc nhập văn bản.');
    return null;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'en' ? 'en-US' : 'vi-VN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.onerror = (event: any) => {
      onError(event.error === 'not-allowed' ? 'Vui lòng cấp quyền truy cập micro để nhận diện giọng nói.' : `Lỗi nhận diện giọng nói: ${event.error}`);
    };

    recognition.onend = () => {
      onEnd();
    };

    return recognition;
  } catch (e: any) {
    onError(e.message || 'Không thể khởi tạo nhận diện giọng nói.');
    return null;
  }
}
