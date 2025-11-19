import Window from '../os/Window';
import { Search, ArrowLeft, ArrowRight, RotateCw, ExternalLink, Github, Star, Cpu, Database, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import generated images
import llmsqlImg from '@assets/generated_images/AI_converting_natural_language_to_SQL_database_queries_9307416e.png';
import tinycImg from '@assets/generated_images/Retro_style_compiler_architecture_visualization_ab3798ff.png';
import mailkaroImg from '@assets/generated_images/High_speed_email_marketing_concept_6c139f6d.png';
// Placeholder for new project image
import riscImg from '@assets/generated_images/Futuristic_interface_for_AI_voice_calling_platform_4a67247a.png'; // Reusing futuristic style for RISC temporarily

const PROJECTS = [
  {
    title: "LLMSQL",
    desc: "LLM-powered system translating natural language into optimal SQL queries. Fine-tuned Mistral-7B (4-bit LoRA) on 78.9k samples. Achieved 86.2% accuracy and reduced hallucinations by 38%. Backend via Flask & T4 GPU.",
    tags: ["LLM", "Mistral-7B", "Python", "SQL", "Flask"],
    image: llmsqlImg,
    highlight: true,
    icon: Database
  },
  {
    title: "Tiny-C Compiler",
    desc: "Machine-independent compiler translating C to 3-address code. Engineered 120+ semantic rules with Bison/Flex. Features global symbol management, type checking, and 100% correctness on 5 test suites.",
    tags: ["C", "Compiler Design", "Bison", "Flex"],
    image: tinycImg,
    highlight: false,
    icon: Terminal
  },
  {
    title: "MailKaro",
    desc: "High-performance mass mailing platform for NGOs. Built with FastAPI & SMTP. Used Mistral AI for content variation to reduce spam. Doubled campaign donations in 14 days.",
    tags: ["FastAPI", "SMTP", "GenAI", "Redis"],
    image: mailkaroImg,
    highlight: false,
    icon: Star
  },
  {
    title: "32-bit RISC Processor",
    desc: "Designed a 32-bit RISC Processor on FPGA using Verilog & Xilinx Vivado. Handles arithmetic, branch, and control ops. Verified complex algorithms like Booth multiplication and factorial.",
    tags: ["Verilog", "FPGA", "RISC", "Computer Arch"],
    image: riscImg,
    highlight: false,
    icon: Cpu
  }
];

export default function Safari() {
  return (
    <Window 
      id="safari" 
      title="Safari - Jatin's Projects" 
      width={1000} 
      height={700}
    >
      <div className="flex flex-col h-full bg-[#fbfbfb] dark:bg-[#1e1e1e]">
        {/* Browser Toolbar */}
        <div className="bg-[#f5f5f5] dark:bg-[#2a2a2a] border-b border-gray-200 dark:border-white/10 p-3 flex items-center gap-4 sticky top-0 z-10">
          <div className="flex gap-3 text-gray-500">
            <div className="p-1 hover:bg-black/5 rounded-md transition-colors"><ArrowLeft size={16} /></div>
            <div className="p-1 hover:bg-black/5 rounded-md transition-colors"><ArrowRight size={16} /></div>
            <div className="p-1 hover:bg-black/5 rounded-md transition-colors"><RotateCw size={14} /></div>
          </div>
          
          <div className="flex-1 bg-white dark:bg-[#1e1e1e] rounded-lg h-9 flex items-center px-4 text-sm shadow-sm border border-gray-200 dark:border-white/5 text-center justify-center text-gray-600 dark:text-gray-300 group transition-all focus-within:ring-2 ring-blue-500/20">
            <Search size={14} className="mr-2 opacity-50 group-focus-within:text-blue-500" />
            <span>github.com/jatinsm2023/projects</span>
          </div>
          
           <div className="p-1 hover:bg-black/5 rounded-md transition-colors text-gray-500"><ExternalLink size={16} /></div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center mb-12">
               <h1 className="text-4xl font-bold mb-4 dark:text-white tracking-tight">Academic & Personal Projects</h1>
               <p className="text-gray-500 dark:text-gray-400 text-center max-w-xl text-lg">
                 Deep dives into Compilers, AI Systems, and Architecture.
               </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {PROJECTS.map((project, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "group bg-white dark:bg-[#252526] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full",
                    project.highlight ? "lg:col-span-2 lg:flex-row lg:h-96" : ""
                  )}
                >
                  <div className={cn(
                    "overflow-hidden relative",
                    project.highlight ? "lg:w-3/5 h-64 lg:h-full" : "h-56"
                  )}>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute bottom-4 left-4">
                       <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white border border-white/20">
                          <project.icon size={20} />
                       </div>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "p-6 flex flex-col justify-between",
                    project.highlight ? "lg:w-2/5 lg:p-8" : "flex-1"
                  )}>
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className={cn("font-bold dark:text-white leading-tight", project.highlight ? "text-2xl" : "text-xl")}>
                          {project.title}
                        </h3>
                        <a href="https://github.com/jatinsm2023" target="_blank" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                          <Github size={20} />
                        </a>
                      </div>
                      
                      <p className={cn("text-gray-600 dark:text-gray-300 mb-6 leading-relaxed", project.highlight ? "text-sm" : "text-xs")}>
                        {project.desc}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-2.5 py-1 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-wider rounded-md font-semibold border border-gray-200 dark:border-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <a 
                      href="https://github.com/jatinsm2023" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center justify-center px-6 py-2.5 bg-black dark:bg-white dark:text-black text-white rounded-xl text-sm font-medium gap-2 hover:opacity-80 transition-all w-full shadow-sm"
                    >
                      View Code <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* GitHub Call to Action */}
            <div className="bg-[#24292e] rounded-2xl p-8 text-center text-white shadow-xl mb-8 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
               <div className="relative z-10 flex flex-col items-center">
                 <Github size={48} className="mb-4 text-gray-400" />
                 <h2 className="text-2xl font-bold mb-2">More on GitHub</h2>
                 <p className="text-gray-400 mb-6 max-w-xl text-sm">
                   Explore 32-bit RISC Processors, K-Nearest Neighbor Search libraries, and other low-level system projects.
                 </p>
                 <a 
                   href="https://github.com/jatinsm2023" 
                   target="_blank" 
                   rel="noreferrer"
                   className="inline-flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-colors"
                 >
                   Visit Profile
                 </a>
               </div>
            </div>

          </div>
        </div>
      </div>
    </Window>
  );
}
