import { COMMANDS } from "@/constants/commands";

type UseTerminalCommandsProps = {
  setOutput: React.Dispatch<React.SetStateAction<string[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  changeTheme: (theme: string) => boolean;
};

export function useTerminalCommands({ setOutput, setLoading, changeTheme }: UseTerminalCommandsProps) {
  const handleCommand = (command: string) => {
    setTimeout(() => {
      setLoading(false);
      
      if (command === "clear") {
        setOutput([]);
        return;
      }

      if (command === "hack") {
        setOutput(prev => [...prev, `> ${command}`, "Initiating hack sequence..."]);
        changeTheme("matrix");
        return;
      }

      // Handle theme command
      if (command.startsWith("theme ")) {
        const themeName = command.split(" ")[1];
        if (changeTheme(themeName)) {
          setOutput(prev => [...prev, `> ${command}`, `Theme changed to ${themeName}`]);
        } else {
          setOutput(prev => [...prev, `> ${command}`, "Invalid theme. Try: matrix, ubuntu, powershell, light"]);
        }
        return;
      }

      // Handle other commands
      if (COMMANDS[command]) {
        setOutput(prev => [...prev, `> ${command}`, COMMANDS[command]]);
      } else {
        setOutput(prev => [...prev, `> ${command}`, "Command not found. Type 'help' for a list of commands."]);
      }
    }, 200);
  };

  return { handleCommand };
}
