import { useState, useEffect, useCallback } from 'react';

export function useTypewriter(
  strings: string[],
  options?: {
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
    loop?: boolean;
  }
) {
  const {
    typingSpeed = 80,
    deletingSpeed = 40,
    pauseDuration = 1200,
    loop = true,
  } = options || {};

  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!strings.length) return;

    const currentString = strings[currentIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < currentString.length) {
      timeout = setTimeout(() => {
        setText(currentString.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setText(currentString.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, deletingSpeed);
    } else if (!isDeleting && charIndex === currentString.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);

      const nextIndex = (currentIndex + 1) % strings.length;

      if (!loop && nextIndex === 0) {
        setIsComplete(true);
      } else {
        setCurrentIndex(nextIndex);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    isDeleting,
    currentIndex,
    strings,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    loop,
  ]);

  const reset = useCallback(() => {
    setText('');
    setCurrentIndex(0);
    setCharIndex(0);
    setIsDeleting(false);
    setIsComplete(false);
  }, []);

  return {
    text,
    currentIndex,
    isDeleting,
    isComplete,
    reset,
  };
}
