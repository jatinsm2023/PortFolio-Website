import Window from '../os/Window';
import Jatin from '@assets/generated_images/jatin_mahawar.png';
import Cover from '@assets/generated_images/ln_cover.jpeg';
import { Folder, FileText, Download, Clock, Monitor, GraduationCap, User, Briefcase, HardDrive, Wifi, Github, Linkedin, Twitter, ExternalLink, Mail as MailIcon, MapPin, Calendar, BadgeCheck, Building2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const INTERNSHIPS = [
  {
    role: "Founding Engineering",
    company: "CallKaro AI",
    location: "Backed by Microsoft for Startups",
    duration: "Dec 2024 - Present",
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
  const [githubStats, setGithubStats] = useState<{ followers: number, public_repos: number } | null>(null);

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
      ) : activeTab === 'documents' ? (
        <div className="h-full bg-white dark:bg-[#1e1e1e] p-8 overflow-auto">
          <h1 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-3">
            <FileText className="text-blue-500" />
            Documents
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div className="group relative flex flex-col items-center p-4 rounded-xl hover:bg-blue-50 dark:hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-blue-100 dark:hover:border-white/10">
              <div className="w-16 h-20 bg-white shadow-md border border-gray-200 flex flex-col items-center justify-center mb-3 relative overflow-hidden group-hover:-translate-y-1 transition-transform">
                <div className="absolute top-0 right-0 w-4 h-4 bg-gray-100 border-b border-l border-gray-200" />
                <div className="text-[8px] text-gray-400 mt-2">PDF</div>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium text-center truncate w-full">Resume.pdf</span>
              <span className="text-xs text-gray-400">2.4 MB</span>

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 rounded-xl flex items-center justify-center gap-2 backdrop-blur-[1px] transition-opacity">
                <button
                  className="p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform text-gray-700"
                  title="Preview"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open('/resume.pdf', '_blank'); // Placeholder link
                  }}
                >
                  <ExternalLink size={14} />
                </button>
                <button
                  className="p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform text-blue-600"
                  title="Download"
                  onClick={(e) => {
                    e.stopPropagation();
                    const link = document.createElement('a');
                    link.href = '/resume.pdf';
                    link.download = 'Jatin_Mahawar_Resume.pdf';
                    link.click();
                  }}
                >
                  <Download size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'experience' ? (
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
      ) : (
        <div className="bg-white dark:bg-[#1e1e1e] h-full overflow-auto">
          {/* Cover Image */}
          <div className="h-40 relative">
            <img src={Cover} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
            {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"></div> */}
          </div>

          <div className="px-8 pb-8 -mt-16 relative">
            <div className="flex items-end justify-between mb-6">
              <div className="flex items-end gap-6">
                <img
                  src={Jatin}
                  alt="Jatin Mahawar"
                  className="w-32 h-32 rounded-full object-cover shadow-2xl border-4 border-white dark:border-[#1e1e1e]"
                />
                <div className="mb-3">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Jatin Mahawar</h1>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Founding Engineering @ CallKaro AI</p>
                </div>
              </div>
              <div className="mb-4 flex flex-col gap-2 text-nowrap">
                <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 dark:bg-white/10 px-3 py-1.5 rounded-full">
                  <MapPin size={12} /> IIT Kharagpur, India
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 dark:bg-white/10 px-3 py-1.5 rounded-full">
                  <Calendar size={12} /> Class of '27
                </div>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm max-w-3xl mb-8 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
              Fourth-year undergraduate student at IIT Kharagpur, pursuing a degree in Computer Science and Engineering. With a strong foundation in programming languages like C and C++ and proficiency in web development technologies, including HTML, CSS, JavaScript, ReactJS, MongoDB, and Node.js, I'm journeying to shape my future as a software engineer.
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
