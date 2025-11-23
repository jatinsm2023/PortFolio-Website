import Window from '../os/Window';
import { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Lightbulb } from 'lucide-react';

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

const SUGGESTED_QUESTIONS = [
    "Who is Jatin?",
    "What are his skills?",
    "Show me his projects",
    "How can I contact him?"
];

export default function Assistant() {
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', text: string }>>([
        { role: 'assistant', text: "Hi! I'm JatinGPT, your personal portfolio assistant. 👋\n\nAsk me about Jatin's work, skills, or projects!" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (text?: string) => {
        const messageText = text || input.trim();
        if (!messageText) return;

        const userMessage = messageText;
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setInput('');
        setIsTyping(true);

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

            setIsTyping(false);
            setMessages(prev => [...prev, { role: 'assistant', text: response }]);
        }, 800);
    };

    return (
        <Window
            id="assistant"
            title="JatinGPT Assistant"
            width={500}
            height={650}
        >
            <div className="h-full flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Sparkles size={24} className="animate-pulse" />
                        </div>
                        <div>
                            <h2 className="font-bold text-xl">JatinGPT</h2>
                            <p className="text-sm opacity-90">Your AI Portfolio Assistant</p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-auto p-4 space-y-4">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                        >
                            <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                {msg.role === 'assistant' && (
                                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Sparkles size={16} className="text-white" />
                                    </div>
                                )}
                                <div
                                    className={`px-4 py-3 rounded-2xl ${msg.role === 'user'
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex justify-start animate-in fade-in">
                            <div className="flex gap-2 max-w-[85%]">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <Sparkles size={16} className="text-white" />
                                </div>
                                <div className="px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 shadow-md">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions */}
                {messages.length === 1 && (
                    <div className="px-4 pb-2">
                        <div className="flex items-center gap-2 mb-2 text-xs text-gray-600 dark:text-gray-400">
                            <Lightbulb size={14} />
                            <span>Suggested questions:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {SUGGESTED_QUESTIONS.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(q)}
                                    className="px-3 py-1.5 bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700 border border-purple-200 dark:border-purple-800 rounded-full text-xs font-medium transition-colors text-gray-700 dark:text-gray-300"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input */}
                <div className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me anything..."
                            className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-full outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white placeholder-gray-500 transition-all"
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={!input.trim()}
                            className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full transition-all flex items-center gap-2 font-medium shadow-lg hover:shadow-xl"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </Window>
    );
}
