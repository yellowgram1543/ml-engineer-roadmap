import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { extractHangulOnly, hasHangul } from '../data/koreanCurriculumContent';

interface KoreanAudioButtonProps {
  text: string;
  koreanText?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  title?: string;
  hideIfNoKorean?: boolean;
}

export const KoreanAudioButton: React.FC<KoreanAudioButtonProps> = ({
  text,
  koreanText,
  size = 'sm',
  className = '',
  title = 'Listen in Korean',
  hideIfNoKorean = true,
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  // Compute what Korean text should actually be spoken
  const textToSpeak = React.useMemo(() => {
    if (koreanText && koreanText.trim().length > 0) {
      return koreanText.trim();
    }
    // Extract only the Korean Hangul words/sentences from the input text
    if (hasHangul(text)) {
      return extractHangulOnly(text);
    }
    return '';
  }, [text, koreanText]);

  // If there is no Korean Hangul to pronounce, hide the button so it never reads English with a Korean voice
  if (hideIfNoKorean && !textToSpeak) {
    return null;
  }

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel(); // cancel any ongoing speech

    const utterance = new SpeechSynthesisUtterance(textToSpeak || text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.85; // Clean, natural conversational pace for learners

    // Attempt to pick a high quality Korean voice if available
    const voices = window.speechSynthesis.getVoices();
    const koVoice = voices.find(
      (v) =>
        v.lang === 'ko-KR' ||
        v.lang.startsWith('ko') ||
        v.name.includes('Korean') ||
        v.name.includes('한국')
    );
    if (koVoice) {
      utterance.voice = koVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5';

  return (
    <button
      type="button"
      onClick={handleSpeak}
      title={isPlaying ? 'Stop audio' : `${title}: "${textToSpeak}"`}
      aria-label={isPlaying ? 'Stop audio' : `${title}: "${textToSpeak}"`}
      className={`inline-flex items-center justify-center rounded-md p-1 transition cursor-pointer ${
        isPlaying
          ? 'bg-rose-100 text-rose-700 animate-pulse border border-rose-300'
          : 'bg-indigo-50/80 hover:bg-indigo-100 text-indigo-600 hover:text-indigo-800 border border-indigo-200/60'
      } ${className}`}
    >
      {isPlaying ? <VolumeX className={iconSize} /> : <Volume2 className={iconSize} />}
    </button>
  );
};
