export function useTerminalSound() {
  const playSound = () => {
    if (typeof window !== 'undefined') {
      const audio = new Audio("/terminal-sound.mp3");
      audio.play().catch(() => {
        // Handle any audio playback errors silently
      });
    }
  };

  return { playSound };
}
