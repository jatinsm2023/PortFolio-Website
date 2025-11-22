import Window from '../os/Window';
import { Trash2 } from 'lucide-react';

export default function Trash() {
    const items = [
        { name: 'Old Draft.txt', size: '2 KB', deletedDate: '2 days ago' },
        { name: 'Screenshot.png', size: '143 KB', deletedDate: '1 week ago' },
    ];

    return (
        <Window
            id="trash"
            title="Trash"
            width={600}
            height={400}
        >
            <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <Trash2 size={20} />
                            Trash
                        </h2>
                        <button className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg font-medium transition-colors">
                            Empty Trash
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                            <Trash2 size={64} className="mb-4 opacity-30" />
                            <p className="text-lg">Trash is empty</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {items.map((item, i) => (
                                <div
                                    key={i}
                                    className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="text-2xl">🗑️</div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {item.size} • Deleted {item.deletedDate}
                                                </p>
                                            </div>
                                        </div>
                                        <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded font-medium transition-colors">
                                            Restore
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Window>
    );
}
