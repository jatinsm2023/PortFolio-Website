import Window from '../os/Window';
import { Send, Paperclip, User } from 'lucide-react';
import { useState } from 'react';

export default function Mail() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSend = () => {
    window.location.href = `mailto:jatinmahawar08@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Window 
      id="mail" 
      title="New Message" 
      width={600} 
      height={500}
    >
      <div className="h-full flex flex-col bg-white dark:bg-[#1e1e1e]">
        <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
           <div className="text-sm font-semibold text-gray-500">New Message</div>
           <button onClick={handleSend} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
             <Send size={18} className="text-blue-500" />
           </button>
        </div>
        
        <div className="px-4 py-2 border-b border-gray-100 dark:border-white/5 flex items-center gap-3">
          <span className="text-gray-500 text-sm w-12">To:</span>
          <div className="flex-1 flex items-center gap-2 bg-gray-100 dark:bg-white/10 px-2 py-1 rounded-md max-w-fit">
            <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-[10px] text-white">J</div>
            <span className="text-sm dark:text-white">jatinmahawar08@gmail.com</span>
          </div>
        </div>
        
        <div className="px-4 py-2 border-b border-gray-100 dark:border-white/5 flex items-center gap-3">
          <span className="text-gray-500 text-sm w-12">Subject:</span>
          <input 
            type="text" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm dark:text-white"
            placeholder="Enter subject..."
          />
        </div>
        
        <textarea 
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="flex-1 p-4 resize-none outline-none text-sm dark:text-white dark:bg-[#1e1e1e]"
          placeholder="Type your message..."
        />
      </div>
    </Window>
  );
}
