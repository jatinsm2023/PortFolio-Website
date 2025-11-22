import Window from '../os/Window';
import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const RESPONSES: Record<string, string> = {
    'who is jatin': "Jatin Mahawar is a Computer Science student at IIT Kharagpur with a passion for full-stack development and AI!",
    'what projects': "Jatin has built amazing projects like MailKaro, Tiny-C Compiler, LLMSQL, and CallKaro AI. Open Safari to see more details!",
    'show resume': "Opening your resume in Finder... 📄",
    'skills': "Jatin is skilled in React, Node.js, Python, C++, TypeScript, and many more technologies!",
    'contact': "You can reach Jatin at jatinmahawar08@gmail.com or check out his GitHub at github.com/jatinsm2023",
    'hello': "Hey there! 👋 I'm JatinGPT, your personal assistant. Ask me anything about Jatin!",
    'hi': "Hello! How can I help you today?",
    'thank': "You're welcome! Happy to help! 😊",
};

export default function Assistant() {
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', text: string }>>([
        { role: 'assistant', text: "Hi! I'm JatinGPT, your personal portfolio assistant. Ask me about Jatin's work, skills, or projects!" }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setInput('');

        // Find matching response
        setTimeout(() => {
            const lowerInput = userMessage.toLowerCase();
            let response = "I'm not sure about that. Try asking about Jatin's projects, skills, resume, or contact info!";

            for (const [key, value] of Object.entries(RESPONSES)) {
                if (lowerInput.includes(key)) {
                    response = value;
                    break;
                }
            }

            setMessages(prev => [...prev, { role: 'assistant', text: response }]);
        }, 500);
    };

    return (
        <Window
            id="assistant"
            title="JatinGPT Assistant"
            width={500}
            height={600}
        >
            <div className="h-full flex flex-col bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <div className="flex items-center gap-2">
                        <Sparkles size={24} />
                        <div>
                            <h2 className="font-bold text-lg">JatinGPT</h2>
                            <p className="text-xs opacity-90">Your AI Portfolio Assistant</p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-auto p-4 space-y-3">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] px-4 py-2 rounded-2xl ${msg.role === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me anything..."
                            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full outline-none text-gray-900 dark:text-white placeholder-gray-500"
                        />
                        <button
                            onClick={handleSend}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors flex items-center gap-2"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                        Try: "Who is Jatin?", "What projects?", "Show resume"
                    </p>
                </div>
            </div>
        </Window>
    );
}
