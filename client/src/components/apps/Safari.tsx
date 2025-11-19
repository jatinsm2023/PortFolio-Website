import Window from '../os/Window';
import { Search, ArrowLeft, ArrowRight, RotateCw, ExternalLink, Github, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import generated images (placeholders for now until generation completes)
import callkaroImg from '@assets/generated_images/Futuristic_interface_for_AI_voice_calling_platform_4a67247a.png';
import llmsqlImg from '@assets/generated_images/AI_converting_natural_language_to_SQL_database_queries_9307416e.png';
import tinycImg from '@assets/generated_images/Retro_style_compiler_architecture_visualization_ab3798ff.png';
import mailkaroImg from '@assets/generated_images/High_speed_email_marketing_concept_6c139f6d.png';

const PROJECTS = [
  {
    title: "CallKaro AI",
    desc: "Gen AI SaaS for automated inbound/outbound business calls. Handles 60K+ calls with real-time responsiveness.",
    tags: ["GenAI", "SaaS", "Voice API", "React"],
    image: callkaroImg,
    highlight: true
  },
  {
    title: "LLMSQL",
    desc: "Natural Language to SQL translator powered by a fine-tuned Mistral-7B model. Makes databases accessible to everyone.",
    tags: ["LLM", "Mistral-7B", "Python", "SQL"],
    image: llmsqlImg,
    highlight: false
  },
  {
    title: "Tiny-C Compiler",
    desc: "Machine-independent compiler built with Bison/Flex. Translates C code to 3-address code optimization.",
    tags: ["C", "Compiler Design", "Bison", "Flex"],
    image: tinycImg,
    highlight: false
  },
  {
    title: "MailKaro",
    desc: "High-performance SMTP platform for mass mailing. Uses AI to vary content and improve deliverability.",
    tags: ["FastAPI", "SMTP", "AI Content", "Redis"],
    image: mailkaroImg,
    highlight: false
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
               <h1 className="text-4xl font-bold mb-4 dark:text-white tracking-tight">Featured Projects</h1>
               <p className="text-gray-500 dark:text-gray-400 text-center max-w-xl text-lg">
                 A showcase of my work in AI, Systems, and Full Stack Development.
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className={cn(
                    "p-6 flex flex-col justify-between",
                    project.highlight ? "lg:w-2/5 lg:p-10" : "flex-1"
                  )}>
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className={cn("font-bold dark:text-white", project.highlight ? "text-3xl" : "text-xl")}>
                          {project.title}
                        </h3>
                        <a href="https://github.com/jatinsm2023" target="_blank" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                          <Github size={20} />
                        </a>
                      </div>
                      
                      <p className={cn("text-gray-600 dark:text-gray-300 mb-6 leading-relaxed", project.highlight ? "text-base" : "text-sm")}>
                        {project.desc}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-xs rounded-full font-medium border border-gray-200 dark:border-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <a 
                      href="https://github.com/jatinsm2023" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center justify-center px-6 py-2.5 bg-black dark:bg-white dark:text-black text-white rounded-full text-sm font-medium gap-2 hover:opacity-80 transition-all w-fit shadow-lg"
                    >
                      View Source Code <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* GitHub Call to Action */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-center text-white shadow-xl mb-8 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               <div className="relative z-10">
                 <h2 className="text-2xl font-bold mb-3">Explore More on GitHub</h2>
                 <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                   I have many more experiments, tools, and contributions available on my profile. Check out my repositories to see how I code.
                 </p>
                 <a 
                   href="https://github.com/jatinsm2023" 
                   target="_blank" 
                   rel="noreferrer"
                   className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg"
                 >
                   <Github size={20} /> Visit @jatinsm2023
                 </a>
               </div>
            </div>

          </div>
        </div>
      </div>
    </Window>
  );
}
