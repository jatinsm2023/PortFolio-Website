import Window from '../os/Window';
import { useState, useRef, useEffect } from 'react';

export default function Terminal() {
  const [history, setHistory] = useState<Array<{ cmd: string, output: string }>>([
    { cmd: 'welcome', output: 'Welcome to JatinOS Terminal. Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let output = '';

    switch (cmd) {
      case 'help':
        output = 'Available commands: whoami, contact, projects, clear, date, neofetch, cmatrix, echo [text]';
        break;
      case 'whoami':
        output = 'Jatin Mahawar - CSE Student at IIT KGP';
        break;
      case 'contact':
        output = 'Email: jatinmahawar08@gmail.com\nGitHub: github.com/jatinsm2023';
        break;
      case 'projects':
        output = 'MailKaro, Tiny-C Compiler, LLMSQL, CallKaro AI... (Open Safari for details)';
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'neofetch':
        output = `
       .---.        User: Jatin Mahawar
      /     \\       OS: JatinOS (Web)
      |  O  |       Host: MacBook Pro
      |  _  |       Kernel: React 18
      \\     /       Uptime: Forever
       '---'        Shell: ZSH (Simulated)
                    Resolution: 1920x1080
                    Theme: Dark Mode
                    Font: Geist Mono
        `;
        break;
      case 'cmatrix':
        output = 'Wake up, Neo...\n(The Matrix has you...)';
        // In a real app, we'd trigger a visual effect here
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        if (cmd.startsWith('echo ')) {
          output = cmd.substring(5);
        } else if (cmd === '') {
          output = '';
        } else {
          output = `Command not found: ${cmd}`;
        }
    }

    setHistory([...history, { cmd: input, output }]);
    setInput('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <Window
      id="terminal"
      title="Terminal"
      width={600}
      height={400}
    >
      <div
        className="h-full bg-black text-green-500 font-mono text-sm p-4 overflow-auto"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, i) => (
          <div key={i} className="mb-2">
            <div className="flex gap-2 text-white/80">
              <span className="text-blue-400">jatin@macbook</span>
              <span className="text-gray-400">:</span>
              <span className="text-blue-300">~</span>
              <span className="text-gray-400">$</span>
              <span>{entry.cmd}</span>
            </div>
            {entry.output && (
              <div className="whitespace-pre-wrap opacity-90 ml-2 mt-1">{entry.output}</div>
            )}
          </div>
        ))}

        <form onSubmit={handleCommand} className="flex gap-2 text-white/80">
          <span className="text-blue-400">jatin@macbook</span>
          <span className="text-gray-400">:</span>
          <span className="text-blue-300">~</span>
          <span className="text-gray-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent outline-none flex-1 text-white"
            autoFocus
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </Window>
  );
}
