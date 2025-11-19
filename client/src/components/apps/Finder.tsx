import Window from '../os/Window';
import { Folder, FileText, Download, Clock, Monitor, GraduationCap, User, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

const SIDEBAR_ITEMS = [
  { icon: Clock, label: 'Recents' },
  { icon: Monitor, label: 'Desktop' },
  { icon: Download, label: 'Downloads' },
  { icon: FileText, label: 'Documents' },
  { icon: Folder, label: 'Applications' },
];

export default function Finder() {
  return (
    <Window 
      id="finder" 
      title="Finder" 
      width={800} 
      height={500}
      sidebar={
        <div className="p-2 space-y-1">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 py-1 mb-1">Favorites</div>
          {SIDEBAR_ITEMS.map((item, i) => (
            <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 cursor-default transition-colors">
              <item.icon size={16} className="text-blue-500" />
              {item.label}
            </div>
          ))}
        </div>
      }
    >
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
      </div>
    </Window>
  );
}
