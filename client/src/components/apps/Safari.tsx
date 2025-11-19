import Window from '../os/Window';
import { Search, ArrowLeft, ArrowRight, RotateCw, ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    title: "MailKaro",
    desc: "FastAPI & SMTP platform for mass mailing. Used Mistral AI for content variation to reduce spam. Doubled NGO donations.",
    tags: ["FastAPI", "Mistral AI", "SMTP"],
    image: "https://source.unsplash.com/random/800x600?technology,mail"
  },
  {
    title: "Tiny-C Compiler",
    desc: "Machine-independent compiler built with Bison/Flex. Translates C to 3-address code.",
    tags: ["C", "Bison", "Flex", "Compiler"],
    image: "https://source.unsplash.com/random/800x600?code,tech"
  },
  {
    title: "LLMSQL",
    desc: "LLM-powered system translating natural language to SQL. Fine-tuned Mistral-7B.",
    tags: ["LLM", "SQL", "Mistral-7B"],
    image: "https://source.unsplash.com/random/800x600?database,ai"
  },
  {
    title: "CallKaro AI",
    desc: "Gen AI SaaS for automated business calls.",
    tags: ["GenAI", "SaaS", "Voice"],
    image: "https://source.unsplash.com/random/800x600?phone,ai"
  }
];

export default function Safari() {
  return (
    <Window 
      id="safari" 
      title="Safari" 
      width={1000} 
      height={700}
    >
      <div className="flex flex-col h-full bg-white dark:bg-[#1e1e1e]">
        {/* Browser Toolbar */}
        <div className="bg-[#f5f5f5] dark:bg-[#2a2a2a] border-b border-gray-200 dark:border-white/10 p-2 flex items-center gap-4">
          <div className="flex gap-2 text-gray-500">
            <ArrowLeft size={18} />
            <ArrowRight size={18} />
            <RotateCw size={16} />
          </div>
          
          <div className="flex-1 bg-white dark:bg-[#1e1e1e] rounded-md h-8 flex items-center px-3 text-sm shadow-sm border border-gray-200 dark:border-white/5 text-center justify-center text-gray-600 dark:text-gray-300">
            <Search size={14} className="mr-2 opacity-50" />
            github.com/jatinsm2023
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8 bg-white dark:bg-[#121212]">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-center dark:text-white">My Projects</h1>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-10">A collection of things I've built</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.map((project, i) => (
                <div key={i} className="group bg-white dark:bg-[#1e1e1e] rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="h-48 overflow-hidden relative">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 dark:text-white">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-1">{project.desc}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-md font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <a 
                      href="https://github.com/jatinsm2023" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center justify-center w-full py-2 bg-gray-900 dark:bg-white dark:text-black text-white rounded-lg text-sm font-medium gap-2 hover:opacity-90 transition-opacity"
                    >
                      Visit GitHub <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
