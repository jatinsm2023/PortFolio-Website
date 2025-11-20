import Window from '../os/Window';
import { FileCode, FolderOpen, Search, GitBranch, Settings, ChevronRight, Menu } from 'lucide-react';
import { useState } from 'react';

const EXPERIENCE = [
  {
    role: "Founding Engineering",
    company: "CallKaro AI",
    duration: "Dec 2024 - Present",
    details: [
      "Built Gen AI SaaS platform automating inbound/outbound calls.",
      "Developed Call Scheduling API boosting conversions by 20%.",
      "Integrated Hybrid RAG using Azure OpenAI & NumPy vectors.",
      "Handled 60K+ calls/messages with React Infinite Scroller & WebSockets."
    ]
  },
  {
    role: "Full Stack Developer",
    company: "iProp91",
    duration: "Aug 2024 - Oct 2024",
    details: [
      "Architected real estate platform with microsecond latency.",
      "Built secure OTP auth using OTPLESS & JWT.",
      "Implemented group chat via WebSockets for customers & advocates."
    ]
  }
];

const SKILLS = {
  languages: ["C", "C++", "Python", "Assembly", "Verilog", "JavaScript"],
  web: ["React.js", "Node.js", "Express.js", "Tailwind CSS", "HTML/CSS"],
  data_ai: ["NumPy", "Pandas", "RAG", "Azure OpenAI", "Mistral AI"],
  tools: ["Git", "Docker", "Azure", "MongoDB", "PostgreSQL", "Redis"]
};

export default function VSCode() {
  const [activeFile, setActiveFile] = useState<'experience.json' | 'skills.js'>('experience.json');

  return (
    <Window 
      id="vscode" 
      title="VS Code - Portfolio" 
      width={900} 
      height={600}
      sidebar={
        <div className="h-full flex flex-col bg-[#252526] text-[#cccccc]">
          <div className="flex-1">
            <div className="px-4 py-2 text-xs font-bold tracking-wider text-[#858585]">EXPLORER</div>
            <div className="px-2">
              <div className="flex items-center gap-1 text-xs py-1 font-bold">
                <ChevronRight size={14} />
                <span>PORTFOLIO</span>
              </div>
              <div className="pl-4 space-y-0.5">
                <div 
                  className={`flex items-center gap-2 px-2 py-1 text-sm cursor-pointer hover:bg-[#2a2d2e] ${activeFile === 'experience.json' ? 'bg-[#37373d] text-white' : ''}`}
                  onClick={() => setActiveFile('experience.json')}
                >
                  <span className="text-yellow-400 text-xs">{'{}'}</span>
                  experience.json
                </div>
                <div 
                  className={`flex items-center gap-2 px-2 py-1 text-sm cursor-pointer hover:bg-[#2a2d2e] ${activeFile === 'skills.js' ? 'bg-[#37373d] text-white' : ''}`}
                  onClick={() => setActiveFile('skills.js')}
                >
                  <span className="text-yellow-400 text-xs">JS</span>
                  skills.js
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm flex flex-col">
        {/* Editor Tabs */}
        <div className="flex bg-[#252526]">
          <div 
            className={`px-4 py-2 bg-[#1e1e1e] border-t-2 border-blue-500 flex items-center gap-2 text-xs cursor-pointer ${activeFile !== 'experience.json' ? 'bg-[#2d2d2d] border-transparent opacity-70' : ''}`}
            onClick={() => setActiveFile('experience.json')}
          >
            <span className="text-yellow-400">{'{}'}</span> experience.json
          </div>
          <div 
            className={`px-4 py-2 bg-[#1e1e1e] border-t-2 border-blue-500 flex items-center gap-2 text-xs cursor-pointer ${activeFile !== 'skills.js' ? 'bg-[#2d2d2d] border-transparent opacity-70' : ''}`}
            onClick={() => setActiveFile('skills.js')}
          >
            <span className="text-yellow-400">JS</span> skills.js
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 p-4 overflow-auto">
          {activeFile === 'experience.json' ? (
            <div className="space-y-1">
              <div><span className="text-[#dcdcaa]">[</span></div>
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="pl-4">
                  <div><span className="text-[#dcdcaa]">{'{'}</span></div>
                  <div className="pl-4">
                    <span className="text-[#9cdcfe]">"role"</span>: <span className="text-[#ce9178]">"{exp.role}"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-[#9cdcfe]">"company"</span>: <span className="text-[#ce9178]">"{exp.company}"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-[#9cdcfe]">"duration"</span>: <span className="text-[#ce9178]">"{exp.duration}"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-[#9cdcfe]">"details"</span>: <span className="text-[#dcdcaa]">[</span>
                  </div>
                  {exp.details.map((detail, j) => (
                    <div key={j} className="pl-8">
                      <span className="text-[#ce9178]">"{detail}"</span>{j < exp.details.length - 1 ? ',' : ''}
                    </div>
                  ))}
                  <div className="pl-4"><span className="text-[#dcdcaa]">]</span></div>
                  <div><span className="text-[#dcdcaa]">{'}'}</span>{i < EXPERIENCE.length - 1 ? ',' : ''}</div>
                </div>
              ))}
              <div><span className="text-[#dcdcaa]">]</span></div>
            </div>
          ) : (
            <div className="space-y-1">
              <div><span className="text-[#569cd6]">const</span> <span className="text-[#4fc1ff]">skills</span> = <span className="text-[#dcdcaa]">{'{'}</span></div>
              {Object.entries(SKILLS).map(([category, items], i) => (
                <div key={category} className="pl-4">
                  <span className="text-[#9cdcfe]">{category}</span>: <span className="text-[#dcdcaa]">[</span>
                  {items.map((item, j) => (
                    <span key={j}>
                      <span className="text-[#ce9178]">"{item}"</span>{j < items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                  <span className="text-[#dcdcaa]">]</span>{i < Object.keys(SKILLS).length - 1 ? ',' : ''}
                </div>
              ))}
              <div><span className="text-[#dcdcaa]">{'}'}</span>;</div>
            </div>
          )}
        </div>
      </div>
    </Window>
  );
}
