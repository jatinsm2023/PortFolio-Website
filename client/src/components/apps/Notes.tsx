import Window from '../os/Window';
import { useState, useEffect } from 'react';

export default function Notes() {
    const [note, setNote] = useState('');

    useEffect(() => {
        const savedNote = localStorage.getItem('jatinos-notes');
        if (savedNote) {
            setNote(savedNote);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setNote(newValue);
        localStorage.setItem('jatinos-notes', newValue);
    };

    return (
        <Window
            id="notes"
            title="Notes"
            width={400}
            height={500}
        >
            <div className="h-full bg-yellow-50 dark:bg-[#2d2b20] flex flex-col">
                <textarea
                    className="flex-1 w-full h-full p-6 bg-transparent resize-none outline-none text-gray-800 dark:text-gray-200 font-medium text-lg leading-relaxed"
                    placeholder="Type your thoughts here..."
                    value={note}
                    onChange={handleChange}
                    spellCheck={false}
                />
                <div className="px-4 py-2 text-xs text-gray-400 dark:text-gray-500 text-right border-t border-yellow-100 dark:border-white/5">
                    {note.length} characters
                </div>
            </div>
        </Window>
    );
}
