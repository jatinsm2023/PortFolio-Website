import Window from '../os/Window';
import { Briefcase, Building2, Calendar, ArrowRight, ExternalLink, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const INTERNSHIPS = [
  {
    role: "Founding Engineering Intern",
    company: "CallKaro AI",
    location: "Backed by Microsoft for Startups",
    duration: "Dec 2024 - Jun 2025",
    logo: "https://ui-avatars.com/api/?name=C+K&background=0D8ABC&color=fff&size=128",
    color: "bg-blue-500",
    details: [
      "Built Gen AI SaaS Platform automating inbound/outbound calls to boost business productivity.",
      "Developed Call Scheduling API boosting conversions by 20% using RESTful endpoints & Redis.",
      "Integrated Hybrid RAG using Azure OpenAI embeddings, NumPy vectors, and cosine similarity.",
      "Constructed paginated inbox with React Infinite Scroller & WebSockets handling 60K+ calls.",
      "Implemented call priority & concurrency using global priority queues and asyncio semaphores.",
      "Built Batch Call Dashboard using Nivo funnels & AntUI tables, boosting conversions by 40%."
    ]
  },
  {
    role: "Full Stack Developer",
    company: "iProp91",
    location: "Real Estate Tech",
    duration: "Aug 2024 - Oct 2024",
    logo: "https://ui-avatars.com/api/?name=i+P&background=F97316&color=fff&size=128",
    color: "bg-orange-500",
    details: [
      "Architected real estate platform handling state management with microsecond latency.",
      "Established secure OTP authentication via OTPLESS & JWT, enhancing UX and security.",
      "Built property listings, dashboards, and admin panel using React, Node.js, and MongoDB.",
      "Implemented group chat via WebSockets supporting text, links, and media messaging."
    ]
  }
];

export default function Experience() {
  return (
    <Window 
      id="vscode" // Reusing VSCode ID as 'Experience' app for now, or we can create a new one. Let's stick to the user request of "Internship section". 
      // Actually, let's make a dedicated "Experience" app to replace VS Code in the dock or just launch this window.
      // For now, I'll bind this to a new ID 'experience' and update the store later.
      // Wait, the prompt said "Add Internship as another section". I will create a new component for it.
      title="Experience & Internships" 
      width={900} 
      height={600}
    >
      <div className="h-full bg-[#f5f5f7] dark:bg-[#1e1e1e] overflow-auto p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-white dark:bg-white/10 rounded-xl shadow-sm">
               <Briefcase size={32} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
               <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Professional Experience</h1>
               <p className="text-gray-500 dark:text-gray-400">My journey in building scalable systems</p>
            </div>
          </div>

          <div className="space-y-8 relative before:absolute before:left-[28px] before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-200 dark:before:bg-white/10">
            {INTERNSHIPS.map((job, i) => (
              <div key={i} className="relative pl-20 group">
                {/* Timeline Dot */}
                <div className={cn(
                  "absolute left-0 top-0 w-14 h-14 rounded-full border-4 border-white dark:border-[#1e1e1e] shadow-lg flex items-center justify-center z-10 transition-transform group-hover:scale-110",
                  job.color
                )}>
                   <span className="text-white font-bold text-lg">{job.company[0]}</span>
                </div>

                <div className="bg-white dark:bg-[#252526] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-xl transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        {job.role}
                        {i === 0 && <BadgeCheck size={18} className="text-blue-500" />}
                      </h2>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 font-medium">
                        <Building2 size={16} />
                        {job.company}
                        <span className="text-gray-300 dark:text-gray-600">•</span>
                        <span className="text-sm text-gray-500 font-normal">{job.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 bg-gray-100 dark:bg-white/10 px-3 py-1.5 rounded-full w-fit">
                      <Calendar size={14} />
                      {job.duration}
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {job.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        <ArrowRight size={14} className="mt-1 text-gray-400 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}
