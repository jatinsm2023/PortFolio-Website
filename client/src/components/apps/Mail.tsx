import Window from '../os/Window';
import { Send, Paperclip, User, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function Mail() {
  const [to, setTo] = useState('jatinmahawar08@gmail.com');
  const [from, setFrom] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!from || !subject || !body) return;
    
    // Simulate sending
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      
      // Fallback to mailto for actual functionality in this frontend-only demo
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}%0A%0AFrom: ${from}`;
      
      setTimeout(() => {
        setSent(false);
        setSubject('');
        setBody('');
      }, 2000);
    }, 1000);
  };

  return (
    <Window 
      id="mail" 
      title="New Message" 
      width={600} 
      height={500}
    >
      <div className="h-full flex flex-col bg-white dark:bg-[#1e1e1e]">
        <div className="p-3 border-b border-gray-200 dark:border-white/10 flex items-center justify-between bg-[#f6f6f6] dark:bg-[#2b2b2b]">
           <div className="flex gap-2">
             <button 
               onClick={handleSend}
               disabled={!from || !subject || !body || sending}
               className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-md transition-colors disabled:opacity-50"
               title="Send Email"
             >
               <Send size={18} className={sent ? "text-green-500" : "text-gray-600 dark:text-gray-300"} />
             </button>
             <button className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-md transition-colors">
               <Paperclip size={18} className="text-gray-600 dark:text-gray-300" />
             </button>
           </div>
           {sent && <span className="text-xs text-green-600 font-medium animate-fade-in">Message Sent!</span>}
        </div>
        
        <div className="px-4 py-2 border-b border-gray-100 dark:border-white/5 flex items-center gap-3">
          <span className="text-gray-500 text-sm w-12 text-right">To:</span>
          <div className="flex-1 flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-md max-w-fit">
            <span className="text-sm text-blue-700 dark:text-blue-300">{to}</span>
          </div>
        </div>

        <div className="px-4 py-2 border-b border-gray-100 dark:border-white/5 flex items-center gap-3">
          <span className="text-gray-500 text-sm w-12 text-right">From:</span>
          <input 
            type="email" 
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm dark:text-white placeholder:text-gray-300"
            placeholder="your.email@example.com"
          />
        </div>
        
        <div className="px-4 py-2 border-b border-gray-100 dark:border-white/5 flex items-center gap-3">
          <span className="text-gray-500 text-sm w-12 text-right">Subject:</span>
          <input 
            type="text" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm font-medium dark:text-white placeholder:text-gray-300"
            placeholder="Project Inquiry..."
          />
        </div>
        
        <textarea 
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="flex-1 p-4 resize-none outline-none text-sm dark:text-white dark:bg-[#1e1e1e] leading-relaxed"
          placeholder="Hi Jatin, I'd like to discuss..."
        />
        
        <div className="p-2 bg-yellow-50 dark:bg-yellow-900/10 text-[10px] text-yellow-600 dark:text-yellow-400 flex items-center gap-2 justify-center">
          <AlertCircle size={12} />
          <span>Note: This is a frontend demo. Clicking send will open your default mail client.</span>
        </div>
      </div>
    </Window>
  );
}
