import { useState, useEffect } from "react";
import { Command } from "cmdk";
import { Search, Calculator, Calendar, CreditCard, Settings, User, Globe, Code, Terminal, Mail, Image } from "lucide-react";
import { useOSStore } from "@/lib/os-store";
import { cn } from "@/lib/utils";

export default function Spotlight() {
  const [open, setOpen] = useState(false);
  const launchApp = useOSStore((state) => state.launchApp);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className={cn("fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm transition-all duration-200", open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none")}>
      <div className="w-[600px] max-w-full shadow-2xl rounded-xl overflow-hidden border border-white/20 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-xl" onClick={(e) => e.stopPropagation()}>
        <Command className="w-full">
          <div className="flex items-center border-b border-black/5 dark:border-white/10 px-4" cmdk-input-wrapper="">
            <Search className="mr-2 h-5 w-5 shrink-0 opacity-50 dark:text-white" />
            <Command.Input 
              placeholder="Spotlight Search" 
              className="flex h-14 w-full rounded-md bg-transparent py-3 text-xl outline-none placeholder:text-gray-500 dark:text-white disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">No results found.</Command.Empty>
            
            <Command.Group heading="Applications" className="px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
              <Command.Item onSelect={() => { launchApp('finder'); setOpen(false); }} className="flex items-center gap-2 px-2 py-2 rounded-md aria-selected:bg-blue-500 aria-selected:text-white cursor-pointer">
                <User className="h-4 w-4" />
                <span>Finder (About Me)</span>
              </Command.Item>
              <Command.Item onSelect={() => { launchApp('vscode'); setOpen(false); }} className="flex items-center gap-2 px-2 py-2 rounded-md aria-selected:bg-blue-500 aria-selected:text-white cursor-pointer">
                <Code className="h-4 w-4" />
                <span>VS Code (Experience)</span>
              </Command.Item>
              <Command.Item onSelect={() => { launchApp('safari'); setOpen(false); }} className="flex items-center gap-2 px-2 py-2 rounded-md aria-selected:bg-blue-500 aria-selected:text-white cursor-pointer">
                <Globe className="h-4 w-4" />
                <span>Safari (Projects)</span>
              </Command.Item>
              <Command.Item onSelect={() => { launchApp('terminal'); setOpen(false); }} className="flex items-center gap-2 px-2 py-2 rounded-md aria-selected:bg-blue-500 aria-selected:text-white cursor-pointer">
                <Terminal className="h-4 w-4" />
                <span>Terminal</span>
              </Command.Item>
              <Command.Item onSelect={() => { launchApp('mail'); setOpen(false); }} className="flex items-center gap-2 px-2 py-2 rounded-md aria-selected:bg-blue-500 aria-selected:text-white cursor-pointer">
                <Mail className="h-4 w-4" />
                <span>Mail</span>
              </Command.Item>
              <Command.Item onSelect={() => { launchApp('photos'); setOpen(false); }} className="flex items-center gap-2 px-2 py-2 rounded-md aria-selected:bg-blue-500 aria-selected:text-white cursor-pointer">
                <Image className="h-4 w-4" />
                <span>Photos</span>
              </Command.Item>
            </Command.Group>
            
            <Command.Group heading="Developer Skills" className="px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 mt-2">
              <Command.Item className="flex items-center gap-2 px-2 py-2 rounded-md aria-selected:bg-blue-500 aria-selected:text-white cursor-default">
                <Code className="h-4 w-4" />
                <span>React & Next.js</span>
              </Command.Item>
              <Command.Item className="flex items-center gap-2 px-2 py-2 rounded-md aria-selected:bg-blue-500 aria-selected:text-white cursor-default">
                <Code className="h-4 w-4" />
                <span>TypeScript & Node.js</span>
              </Command.Item>
              <Command.Item className="flex items-center gap-2 px-2 py-2 rounded-md aria-selected:bg-blue-500 aria-selected:text-white cursor-default">
                <Code className="h-4 w-4" />
                <span>Python & AI/ML</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
          <div className="border-t border-black/5 dark:border-white/10 px-4 py-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
             <span>Press ⌘K to toggle</span>
             <span>Spotlight Search</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
