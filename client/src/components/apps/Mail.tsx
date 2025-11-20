import Window from '../os/Window';
import { useState, useRef } from 'react';
import { Send, Paperclip, Bold, Italic, Type, X } from 'lucide-react';

export default function Mail() {
  const [to, setTo] = useState('jatinmahawar08@gmail.com');
  const [from, setFrom] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    contentEditableRef.current?.focus();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if (!from || !subject || !contentEditableRef.current?.innerHTML) return;

    setSending(true);
    try {
      const formData = new FormData();
      formData.append('to', to);
      formData.append('from', from);
      formData.append('subject', subject);
      formData.append('body', contentEditableRef.current.innerHTML);

      files.forEach(file => {
        formData.append('attachments', file);
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData, // Send as FormData
      });

      if (response.ok) {
        setSent(true);
        setTimeout(() => {
          setSent(false);
          setSubject('');
          if (contentEditableRef.current) contentEditableRef.current.innerHTML = '';
          setFiles([]);
        }, 2000);
      } else {
        alert('Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <Window
      id="mail"
      title="Mail"
      width={800}
      height={600}
    >
      <div className="h-full flex flex-col bg-white dark:bg-[#1e1e1e]">
        {/* Headers */}
        <div className="px-4 py-2 space-y-2 border-b border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 w-12">From:</span>
            <input
              type="email"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Your Email"
              className="flex-1 bg-transparent text-sm outline-none text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 w-12">To:</span>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none text-gray-900 dark:text-white placeholder-gray-400"
              readOnly
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 w-12">Subject:</span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="flex-1 bg-transparent text-sm outline-none font-medium text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Attachments List */}
        {files.length > 0 && (
          <div className="px-4 py-2 flex flex-wrap gap-2 border-b border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
            {files.map((file, i) => (
              <div key={i} className="flex items-center gap-2 bg-white dark:bg-[#252526] px-2 py-1 rounded border border-gray-200 dark:border-white/10 text-xs">
                <Paperclip size={10} className="text-gray-400" />
                <span className="max-w-[150px] truncate">{file.name}</span>
                <button onClick={() => removeFile(i)} className="hover:text-red-500">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Body (Rich Text) */}
        <div
          className="flex-1 p-4 outline-none text-sm leading-relaxed text-gray-900 dark:text-white overflow-auto"
          contentEditable
          ref={contentEditableRef}
          onInput={(e) => setBody(e.currentTarget.innerHTML)}
          style={{ minHeight: '200px' }}
        />

        {/* Toolbar (Bottom) */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#252526]">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSend}
              disabled={sending || sent}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${sent
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
            >
              <Send size={14} />
              {sending ? 'Sending...' : sent ? 'Sent!' : 'Send'}
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-md text-gray-600 dark:text-gray-300"
              title="Attach File"
            >
              <Paperclip size={16} />
              <input
                type="file"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
            </button>
          </div>
          <div className="flex items-center gap-1 border-l border-gray-300 dark:border-white/10 pl-2 ml-2">
            <button onClick={() => handleFormat('bold')} className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded text-gray-600 dark:text-gray-300" title="Bold">
              <Bold size={14} />
            </button>
            <button onClick={() => handleFormat('italic')} className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded text-gray-600 dark:text-gray-300" title="Italic">
              <Italic size={14} />
            </button>
            <div className="relative group">
              <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded text-gray-600 dark:text-gray-300 flex items-center gap-1" title="Text Color">
                <Type size={14} />
                <div className="w-3 h-3 rounded-full bg-black dark:bg-white border border-gray-300" />
              </button>
              <div className="absolute bottom-full left-0 mb-1 bg-white dark:bg-[#252526] shadow-xl rounded-lg p-2 hidden group-hover:grid grid-cols-4 gap-1 border border-gray-200 dark:border-white/10 z-50">
                {['#000000', '#ef4444', '#22c55e', '#3b82f6', '#eab308', '#a855f7', '#ec4899', '#64748b'].map(color => (
                  <button
                    key={color}
                    className="w-5 h-5 rounded-full border border-gray-200"
                    style={{ backgroundColor: color }}
                    onClick={() => handleFormat('foreColor', color)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
