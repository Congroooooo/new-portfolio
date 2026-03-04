import { useRef, useState, useCallback } from 'react';
import { ANIMATION, SCRAMBLE_CHARS } from '@/lib/constants';

export function useScrambleText(
  targetText: string,
  options?: {
    cyclesPerLetter?: number;
    shuffleTime?: number;
    chars?: string;
  }
) {
  const {
    cyclesPerLetter = ANIMATION.CYCLES_PER_LETTER,
    shuffleTime = ANIMATION.SHUFFLE_TIME,
    chars = SCRAMBLE_CHARS,
  } = options || {};

  const [text, setText] = useState(targetText);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopScramble = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setText(targetText);
  }, [targetText]);

  const scramble = useCallback(() => {
    let position = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = targetText
        .split('')
        .map((char, index) => {
          if (position / cyclesPerLetter > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * chars.length);
          return chars[randomCharIndex];
        })
        .join('');

      setText(scrambled);
      position++;

      if (position >= targetText.length * cyclesPerLetter) {
        stopScramble();
      }
    }, shuffleTime);
  }, [targetText, cyclesPerLetter, shuffleTime, chars, stopScramble]);

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  return { text, scramble, stopScramble, cleanup };
}
