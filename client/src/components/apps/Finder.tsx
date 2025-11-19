import Window from '../os/Window';
import { Folder, FileText, Download, Clock, Monitor, GraduationCap, User, Briefcase, HardDrive, Wifi, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const SIDEBAR_ITEMS = [
  { icon: Clock, label: 'Recents', id: 'recents' },
  { icon: Monitor, label: 'Desktop', id: 'desktop' },
  { icon: Wifi, label: 'AirDrop', id: 'airdrop' },
  { icon: Download, label: 'Downloads', id: 'downloads' },
  { icon: FileText, label: 'Documents', id: 'documents' },
  { icon: Folder, label: 'Applications', id: 'applications' },
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
  { name: 'Email', handle: 'jatinmahawar08@gmail.com', icon: User, url: 'mailto:jatinmahawar08@gmail.com', color: 'bg-red-500', subtext: 'Contact' },
];

export default function Finder() {
  const [activeTab, setActiveTab] = useState('recents');
  const [githubStats, setGithubStats] = useState<{followers: number, public_repos: number} | null>(null);

  useEffect(() => {
    // Fetch real GitHub data for the "AirDrop" feel
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
      width={800} 
      height={550}
      sidebar={
        <div className="p-2 space-y-1">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 py-1 mb-1">Favorites</div>
          {SIDEBAR_ITEMS.map((item, i) => (
            <div 
              key={i} 
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-default transition-colors",
                activeTab === item.id 
                  ? "bg-black/10 dark:bg-white/20 text-gray-900 dark:text-white" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10"
              )}
            >
              <item.icon size={16} className={cn("text-blue-500", item.id === 'airdrop' && "text-blue-400")} />
              {item.label}
            </div>
          ))}
        </div>
      }
    >
      {activeTab === 'airdrop' ? (
        <div className="h-full flex flex-col items-center justify-center p-8 bg-white dark:bg-[#1e1e1e]">
          <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4 animate-pulse relative">
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
      ) : (
        <div className="p-8 max-w-2xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <img 
              src="https://source.unsplash.com/random/200x200?portrait" 
              alt="Jatin Mahawar"
              className="w-24 h-24 rounded-full object-cover shadow-lg" 
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Jatin Mahawar</h1>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">Founding Engineering Intern @ CallKaro AI | IIT Kharagpur '27</p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                I am a dual degree student at IIT Kharagpur specializing in Computer Science. I have experience building Gen AI SaaS platforms, real estate tech, and compilers. I love solving complex problems with code.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50/50 dark:bg-white/5 p-4 rounded-lg border border-gray-100 dark:border-white/5">
              <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                <GraduationCap size={20} /> Education
              </h2>
              <div className="space-y-3">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">IIT Kharagpur</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">B.Tech (Hons) + M.Tech in CSE</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">2022-2027 • CGPA: 8.54/10</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">High School</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Class XII: 94.20%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Class X: 82.67%</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50/50 dark:bg-white/5 p-4 rounded-lg border border-gray-100 dark:border-white/5">
              <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                <User size={20} /> Quick Links
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <a href="#" className="flex flex-col items-center gap-2 group p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors">
                   <div className="w-10 h-12 bg-red-500 rounded-lg shadow-sm flex items-center justify-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 border-t-8 border-r-8 border-t-white/20 border-r-white/0 transform rotate-90"></div>
                      <span className="text-[8px] font-bold text-white mt-2">PDF</span>
                   </div>
                   <span className="text-xs text-center text-gray-700 dark:text-gray-300 group-hover:text-blue-600">Resume.pdf</span>
                </a>
              </div>
            </div>
          </div>

          {/* Skills Storage Bar */}
          <div className="bg-gray-50/50 dark:bg-white/5 p-4 rounded-lg border border-gray-100 dark:border-white/5">
             <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                <HardDrive size={20} /> Skills Breakdown
             </h2>
             <div className="flex h-6 w-full rounded-md overflow-hidden mb-3 shadow-sm">
               {STORAGE_STATS.map((stat, i) => (
                 <div key={i} className={cn(stat.color, "h-full")} style={{ width: stat.size }} />
               ))}
             </div>
             <div className="flex flex-wrap gap-4 text-xs font-medium">
               {STORAGE_STATS.map((stat, i) => (
                 <div key={i} className="flex items-center gap-2">
                   <div className={cn("w-3 h-3 rounded-full", stat.color)} />
                   <span className="text-gray-700 dark:text-gray-300">{stat.label}</span>
                 </div>
               ))}
             </div>
          </div>

        </div>
      )}
    </Window>
  );
}
