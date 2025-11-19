import Window from '../os/Window';
import { Folder, FileText, Download, Clock, Monitor, GraduationCap, User, Briefcase, HardDrive, Wifi, Github, Linkedin, Twitter, ExternalLink, Mail as MailIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import Experience from './Experience'; // Import Experience component

const SIDEBAR_ITEMS = [
  { icon: Clock, label: 'Recents', id: 'recents' },
  { icon: Monitor, label: 'Desktop', id: 'desktop' },
  { icon: Wifi, label: 'AirDrop', id: 'airdrop' },
  { icon: Download, label: 'Downloads', id: 'downloads' },
  { icon: FileText, label: 'Documents', id: 'documents' },
  { icon: Folder, label: 'Applications', id: 'applications' },
  { icon: Briefcase, label: 'Experience', id: 'experience' }, // Added Experience
];

const STORAGE_STATS = [
  { label: 'Frontend', color: 'bg-blue-500', size: '40%' },
  { label: 'Backend', color: 'bg-green-500', size: '25%' },
  { label: 'AI/ML', color: 'bg-purple-500', size: '20%' },
  { label: 'DevOps', color: 'bg-yellow-500', size: '15%' },
];

const SOCIAL_CONTACTS = [
  { name: 'GitHub', handle: '@jatinsm2023', icon: Github, url: 'https://github.com/jatinsm2023', color: 'bg-[#24292e]', subtext: 'View Code' },
  { name: 'LinkedIn', handle: 'Jatin Mahawar', icon: Linkedin, url: 'https://linkedin.com/in/jatin-mahawar', color: 'bg-[#0077b5]', subtext: 'Connect' },
  { name: 'Twitter', handle: '@jatin_dev', icon: Twitter, url: 'https://twitter.com', color: 'bg-[#1da1f2]', subtext: 'Follow' },
  { name: 'Email', handle: 'jatinmahawar08@gmail.com', icon: MailIcon, url: 'mailto:jatinmahawar08@gmail.com', color: 'bg-red-500', subtext: 'Contact' },
];

export default function Finder() {
  const [activeTab, setActiveTab] = useState('recents');
  const [githubStats, setGithubStats] = useState<{followers: number, public_repos: number} | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/users/jatinsm2023')
      .then(res => res.json())
      .then(data => {
        if (data.followers) {
          setGithubStats({ followers: data.followers, public_repos: data.public_repos });
        }
      })
      .catch(err => console.error("Failed to fetch GitHub stats", err));
  }, []);

  return (
    <Window 
      id="finder" 
      title="Finder" 
      width={850} 
      height={580}
      sidebar={
        <div className="p-3 space-y-1 h-full bg-[#f6f6f6]/90 dark:bg-[#202020]/90 backdrop-blur-xl">
          <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 px-3 py-2">Favorites</div>
          {SIDEBAR_ITEMS.map((item, i) => (
            <div 
              key={i} 
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] font-medium cursor-default transition-all",
                activeTab === item.id 
                  ? "bg-[#e1e1e1] dark:bg-white/10 text-black dark:text-white shadow-sm" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-[#e8e8e8] dark:hover:bg-white/5"
              )}
            >
              <item.icon size={15} className={cn(
                "text-gray-500 dark:text-gray-400", 
                activeTab === item.id && "text-blue-500",
                item.id === 'airdrop' && "text-blue-500",
                item.id === 'experience' && "text-orange-500"
              )} />
              {item.label}
            </div>
          ))}
          
          <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 px-3 py-2 mt-4">iCloud</div>
           <div className={cn("flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] font-medium text-gray-600 dark:text-gray-400 hover:bg-[#e8e8e8] dark:hover:bg-white/5 transition-colors")}>
              <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-dashed animate-spin-slow" />
              iCloud Drive
           </div>
        </div>
      }
    >
      {activeTab === 'airdrop' ? (
        <div className="h-full flex flex-col items-center justify-center p-8 bg-white dark:bg-[#1e1e1e]">
          <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-4 animate-pulse relative">
             <Wifi size={48} className="text-blue-500" />
             <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-ping" />
          </div>
          <h2 className="text-xl font-semibold mb-2 dark:text-white">AirDrop: Nearby Networks</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-12 text-center max-w-md">
            Connect with Jatin across the web.
            {githubStats && <span className="block text-xs mt-2 text-blue-500 font-mono">GitHub Status: {githubStats.followers} followers • {githubStats.public_repos} repos</span>}
          </p>
          
          <div className="flex gap-6 flex-wrap justify-center">
            {SOCIAL_CONTACTS.map((contact, i) => (
              <a 
                key={i}
                href={contact.url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-3 group cursor-pointer p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className={cn("w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 text-white relative overflow-hidden", contact.color)}>
                  <contact.icon size={32} className="relative z-10" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-900 dark:text-white text-sm flex items-center gap-1 justify-center">
                    {contact.name}
                    <ExternalLink size={10} className="opacity-50" />
                  </div>
                  <div className="text-xs text-gray-500">{contact.handle}</div>
                  <div className="text-[10px] text-blue-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{contact.subtext}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : activeTab === 'experience' ? (
        // Reuse the layout from Experience component but embedded
        <div className="h-full bg-[#f5f5f7] dark:bg-[#1e1e1e] overflow-auto">
          {/* We can just iframe the content or re-implement. Let's re-implement cleanly since we can't import the full Window component here easily without double chrome */}
           <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">Professional Experience</h2>
              <p className="text-gray-500 mb-8">Timeline of internships and work history.</p>
              {/* Simply redirect user to open the full app or show a preview */}
              <div className="flex flex-col items-center justify-center h-64 text-center">
                 <Briefcase size={48} className="text-orange-500 mb-4" />
                 <h3 className="text-lg font-medium dark:text-white">View Full Experience Timeline</h3>
                 <p className="text-gray-500 text-sm max-w-xs mb-6">Open the dedicated Experience app for detailed internship information.</p>
              </div>
           </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1e1e1e] h-full overflow-auto">
          {/* Cover Image */}
          <div className="h-40 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          </div>
          
          <div className="px-8 pb-8 -mt-16 relative">
            <div className="flex items-end justify-between mb-6">
               <div className="flex items-end gap-6">
                 <img 
                   src="https://source.unsplash.com/random/200x200?portrait" 
                   alt="Jatin Mahawar"
                   className="w-32 h-32 rounded-full object-cover shadow-2xl border-4 border-white dark:border-[#1e1e1e]" 
                 />
                 <div className="mb-3">
                   <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Jatin Mahawar</h1>
                   <p className="text-blue-600 dark:text-blue-400 font-medium">Founding Engineering Intern @ CallKaro AI</p>
                 </div>
               </div>
               <div className="mb-4 flex gap-2">
                 <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 dark:bg-white/10 px-3 py-1.5 rounded-full">
                   <MapPin size={12} /> IIT Kharagpur, India
                 </div>
                 <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 dark:bg-white/10 px-3 py-1.5 rounded-full">
                   <Calendar size={12} /> Class of '27
                 </div>
               </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm max-w-3xl mb-8 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
              I am a dual degree student at IIT Kharagpur specializing in Computer Science. I have experience building Gen AI SaaS platforms, real estate tech, and compilers. I love solving complex problems with code and building systems that scale.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-[#252526] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                <h2 className="flex items-center gap-2 text-lg font-bold mb-4 text-gray-900 dark:text-white">
                  <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600"><GraduationCap size={18} /></div>
                  Education
                </h2>
                <div className="space-y-4 relative before:absolute before:left-[19px] before:top-2 before:h-full before:w-0.5 before:bg-gray-200 dark:before:bg-white/10">
                  <div className="relative pl-10">
                    <div className="absolute left-3 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white dark:border-[#252526] ring-1 ring-blue-100"></div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">IIT Kharagpur</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">B.Tech (Hons) + M.Tech in CSE</div>
                    <div className="text-xs text-blue-600 font-medium mt-0.5">2022-2027 • CGPA: 8.54/10</div>
                  </div>
                  <div className="relative pl-10">
                    <div className="absolute left-3 top-1.5 w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-[#252526]"></div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">High School</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Class XII: 94.20% | Class X: 82.67%</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white dark:bg-[#252526] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                  <h2 className="flex items-center gap-2 text-lg font-bold mb-4 text-gray-900 dark:text-white">
                    <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600"><HardDrive size={18} /></div>
                    Skills Breakdown
                  </h2>
                  <div className="flex h-4 w-full rounded-full overflow-hidden mb-4 shadow-inner bg-gray-100">
                    {STORAGE_STATS.map((stat, i) => (
                      <div key={i} className={cn(stat.color, "h-full")} style={{ width: stat.size }} />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {STORAGE_STATS.map((stat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full", stat.color)} />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-[#252526] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-between group cursor-pointer hover:bg-gray-50 transition-colors">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-lg flex items-center justify-center">
                        <FileText size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white text-sm">Download Resume</div>
                        <div className="text-xs text-gray-500">PDF • 2.4 MB</div>
                      </div>
                   </div>
                   <Download size={16} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Window>
  );
}
