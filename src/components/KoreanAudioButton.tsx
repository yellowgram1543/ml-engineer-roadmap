import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface KoreanAudioButtonProps {
  text: string;
  size?: 'sm' | 'md';
  className?: string;
  title?: string;
}

export const KoreanAudioButton: React.FC<KoreanAudioButtonProps> = ({
  text,
  size = 'sm',
  className = '',
  title = 'Listen in Korean',
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const cleanKoreanText = React.useMemo(() => {
    // Strip markdown formatting, backticks, brackets if any
    return text.replace(/[`*_[\]]/g, '').trim();
  }, [text]);

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

    const utterance = new SpeechSynthesisUtterance(cleanKoreanText);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.9; // natural conversational pace

    // Attempt to pick a high quality Korean voice if available
    const voices = window.speechSynthesis.getVoices();
    const koVoice = voices.find((v) => v.lang.startsWith('ko') || v.lang.includes('KR'));
    if (koVoice) {
      utterance.voice = koVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';

  return (
    <button
      type="button"
      onClick={handleSpeak}
      title={isPlaying ? 'Stop audio' : title}
      aria-label={isPlaying ? 'Stop audio' : title}
      className={`inline-flex items-center justify-center rounded-md p-1 transition cursor-pointer ${
        isPlaying
          ? 'bg-rose-100 text-rose-700 animate-pulse border border-rose-200'
          : 'bg-indigo-50/80 hover:bg-indigo-100 text-indigo-600 hover:text-indigo-800 border border-indigo-200/60'
      } ${className}`}
    >
      {isPlaying ? <VolumeX className={iconSize} /> : <Volume2 className={iconSize} />}
    </button>
  );
};
