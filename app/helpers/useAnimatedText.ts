import { useState, useEffect } from 'react';

type AnimationOptions = {
  delay?: number;
  speed?: number;
  onComplete?: () => void;
};

/**
 * A custom hook that creates a typewriter animation effect
 */
export default function useAnimatedText(
  text: string,
  options: AnimationOptions = {}
) {
  const { delay = 0, speed = 50, onComplete } = options;
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;
    
    // Reset when text changes
    setDisplayedText('');
    setIsComplete(false);
    
    // Initial delay before starting animation
    const startTimeout = setTimeout(() => {
      const animateText = () => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.substring(0, currentIndex));
          currentIndex++;
          
          if (currentIndex <= text.length) {
            timeout = setTimeout(animateText, speed);
          } else {
            setIsComplete(true);
            if (onComplete) onComplete();
          }
        }
      };
      
      animateText();
    }, delay);
    
    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeout);
    };
  }, [text, delay, speed, onComplete]);

  return { text: displayedText, isComplete };
}
