"use client";

import { useState, useEffect, useRef } from "react";
import { useTerminalCommands } from "@/hooks/useTerminalCommands";
import { useTerminalSound } from "@/hooks/useTerminalSound";
import { useTerminalTheme } from "@/hooks/useTerminalTheme";
import { useMatrixEffect } from "@/hooks/useMatrixEffect";
import { ASCII_ART } from "@/constants/ascii";
import { COMMANDS } from "@/constants/commands";
import { formatPrompt } from "@/utils/formatters";
import clsx from "clsx";

export default function TerminalPortfolio() {
  const [output, setOutput] = useState<string[]>([
    "Initializing system..."
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const [userIp, setUserIp] = useState("127.0.0.1");
  const terminalRef = useRef<HTMLDivElement>(null);
  const { theme, changeTheme } = useTerminalTheme();
  const { handleCommand } = useTerminalCommands({ setOutput, setLoading, changeTheme });
  const { playSound } = useTerminalSound();
  const { matrixLines, startEffect, isRunning } = useMatrixEffect();

  // Fetch user's IP on mount
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setUserIp(data.ip))
      .catch(() => setUserIp("127.0.0.1")); // Fallback to localhost if fetch fails
  }, []);

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output, loading]);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setOutput([
        ...ASCII_ART,
        "Welcome to Chopper's Portfolio Terminal! Type 'help' for commands.",
        "Try different themes with 'theme <name>' (e.g., theme ubuntu)",
        "System ready."
      ]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Update suggestions when input changes
  useEffect(() => {
    const availableCommands = Object.keys(COMMANDS);
    const filtered = availableCommands.filter(cmd => 
      cmd.startsWith(input.toLowerCase()) && cmd !== input.toLowerCase()
    );
    setSuggestions(filtered);
    setSuggestionIndex(-1);
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      const command = input.trim().toLowerCase();
      const promptText = formatPrompt(theme.name, userIp);
      setOutput(prev => [...prev, promptText, `<span class="${theme.arrow}">→</span> ${command}`]);
      setInput("");
      setLoading(true);
      playSound();
      
      if (command === "hack") {
        startEffect();
      }
      
      handleCommand(command);
      setCommandHistory(prev => [...prev, command]);
      setHistoryIndex(-1);
      setSuggestions([]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0) {
        const nextIndex = (suggestionIndex + 1) % suggestions.length;
        setSuggestionIndex(nextIndex);
        setInput(suggestions[nextIndex]);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  if (!mounted) return null;

    return (
      <div 
        data-theme={theme.name}
        className={clsx(
          "min-h-screen p-4 font-[family-name:var(--font-geist-mono)] transition-colors duration-300",
          theme.background
        )}
      >
        <div
          ref={terminalRef}
          className={clsx(
            "h-[80vh] overflow-y-auto border p-4 rounded-md scroll-smooth",
            theme.text,
            theme.border
          )}
        >
          {isRunning ? (
            <div className="font-mono text-emerald-400 animate-pulse">
              {matrixLines.map((line, index) => (
                <p key={index} className="whitespace-pre-wrap mb-1">
                  {line}
                </p>
              ))}
            </div>
          ) : (
            <>
              {output.map((line, index) => (
                <p
                  key={index}
                  className="whitespace-pre-wrap mb-1"
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              ))}
              {loading && <p className="animate-pulse">Processing...</p>}
            </>
          )}
        </div>
        <div className="mt-4 flex flex-col">
          <div className="flex items-center">
            <span className={clsx("font-bold", theme.text)}>
              {formatPrompt(theme.name, userIp)}
            </span>
            <input
              type="text"
              className={clsx(
                "bg-transparent outline-none ml-2 flex-grow",
                theme.text
              )}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>
          {suggestions.length > 0 && (
            <div className={clsx("ml-8 mt-1 text-sm opacity-50", theme.text)}>
              {suggestions.map((suggestion, index) => (
                <span
                  key={suggestion}
                  className={clsx(
                    "mr-2",
                    index === suggestionIndex && "opacity-100 underline"
                  )}
                >
                  {suggestion}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
}
