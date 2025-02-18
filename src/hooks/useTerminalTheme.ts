import { useState } from "react";

type Theme = {
  name: string;
  background: string;
  text: string;
  border: string;
  prompt: string;
  link: string;
  arrow: string;
};

const themes: Record<string, Theme> = {
  matrix: {
    name: "matrix",
    background: "bg-black",
    text: "text-emerald-400",
    border: "border-emerald-500",
    prompt: "$",
    link: "text-emerald-300",
    arrow: "text-emerald-400"
  },
  ubuntu: {
    name: "ubuntu",
    background: "bg-black",
    text: "text-gray-200",
    border: "border-gray-800",
    prompt: "chopper@portfolio:~$",
    link: "text-[#98FB98]",
    arrow: "text-green-400"
  },
  powershell: {
    name: "powershell",
    background: "bg-terminal-powershell",
    text: "text-blue-50",
    border: "border-blue-400",
    prompt: "PS C:\\Users\\Chopper>",
    link: "text-green-400",
    arrow: "text-blue-400"
  },
  light: {
    name: "light",
    background: "bg-zinc-50",
    text: "text-zinc-800",
    border: "border-zinc-300",
    prompt: "guest@portfolio:~$",
    link: "text-green-600",
    arrow: "text-zinc-600"
  }
};

export function useTerminalTheme() {
  const [currentTheme, setCurrentTheme] = useState<string>("ubuntu");

  const changeTheme = (themeName: string) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      return true;
    }
    return false;
  };

  return {
    theme: themes[currentTheme],
    changeTheme
  };
}
