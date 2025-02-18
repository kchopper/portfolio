import { useState, useEffect } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';

export function useMatrixEffect() {
  const [matrixLines, setMatrixLines] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const generateRandomLine = () => {
    return Array(Math.floor(Math.random() * 50) + 20)
      .fill(0)
      .map(() => characters[Math.floor(Math.random() * characters.length)])
      .join('');
  };

  const startEffect = () => {
    setIsRunning(true);
  };

  const stopEffect = () => {
    setIsRunning(false);
    setMatrixLines([]);
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setMatrixLines(prev => {
        const newLines = [...prev, generateRandomLine()];
        return newLines.slice(-20); // Keep last 20 lines
      });
    }, 100);

    // Stop after 5 seconds
    const timeout = setTimeout(() => {
      stopEffect();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isRunning]);

  return { matrixLines, startEffect, isRunning };
} 
