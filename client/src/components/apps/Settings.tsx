import Window from '../os/Window';
import { useOSStore } from '@/lib/os-store';
import { Monitor, Palette, Volume2, Bell } from 'lucide-react';
import { useState } from 'react';

const WALLPAPERS = [
    { name: 'Abstract', path: '/wallpapers/default.jpg' },
    { name: 'Mountain', path: '/wallpapers/mountain.jpg' },
    { name: 'Ocean', path: '/wallpapers/ocean.jpg' },
    { name: 'Forest', path: '/wallpapers/forest.jpg' },
];

const ACCENT_COLORS = [
    { name: 'Blue', value: 'blue', class: 'bg-blue-500' },
    { name: 'Purple', value: 'purple', class: 'bg-purple-500' },
    { name: 'Pink', value: 'pink', class: 'bg-pink-500' },
    { name: 'Red', value: 'red', class: 'bg-red-500' },
    { name: 'Orange', value: 'orange', class: 'bg-orange-500' },
    { name: 'Green', value: 'green', class: 'bg-green-500' },
];

export default function Settings() {
    const [activeTab, setActiveTab] = useState<'appearance' | 'sound' | 'displays'>('appearance');
    const wallpaper = useOSStore((state) => state.wallpaper);
    const setWallpaper = useOSStore((state) => state.setWallpaper);
    const accentColor = useOSStore((state) => state.accentColor);
    const setAccentColor = useOSStore((state) => state.setAccentColor);
    const theme = useOSStore((state) => state.theme);
    const toggleTheme = useOSStore((state) => state.toggleTheme);

    return (
        <Window
            id="settings"
            title="System Preferences"
            width={700}
            height={500}
        >
            <div className="flex h-full bg-gray-50 dark:bg-gray-900">
                {/* Sidebar */}
                <div className="w-48 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
                    <button
                        onClick={() => setActiveTab('appearance')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-2 transition-colors ${activeTab === 'appearance'
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        <Palette size={18} />
                        <span className="text-sm font-medium">Appearance</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('displays')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-2 transition-colors ${activeTab === 'displays'
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        <Monitor size={18} />
                        <span className="text-sm font-medium">Displays</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('sound')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'sound'
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        <Volume2 size={18} />
                        <span className="text-sm font-medium">Sound</span>
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 overflow-auto">
                    {activeTab === 'appearance' && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Appearance</h2>

                            {/* Theme Selection */}
                            <div className="mb-8">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</h3>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => theme === 'dark' && toggleTheme()}
                                        className={`px-4 py-2 rounded-lg border-2 transition-all ${theme === 'light'
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        ☀️ Light
                                    </button>
                                    <button
                                        onClick={() => theme === 'light' && toggleTheme()}
                                        className={`px-4 py-2 rounded-lg border-2 transition-all ${theme === 'dark'
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        🌙 Dark
                                    </button>
                                </div>
                            </div>

                            {/* Accent Color */}
                            <div className="mb-8">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Accent Color</h3>
                                <div className="flex gap-3 flex-wrap">
                                    {ACCENT_COLORS.map((color) => (
                                        <button
                                            key={color.value}
                                            onClick={() => setAccentColor(color.value)}
                                            className={`w-12 h-12 rounded-lg ${color.class} transition-transform ${accentColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'hover:scale-105'
                                                }`}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Wallpaper Selection */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Desktop Wallpaper</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {WALLPAPERS.map((wp) => (
                                        <button
                                            key={wp.path}
                                            onClick={() => setWallpaper(wp.path)}
                                            className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${wallpaper === wp.path
                                                    ? 'border-blue-500 ring-2 ring-blue-200'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500" />
                                            <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/30 px-2 py-1 rounded">
                                                {wp.name}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'displays' && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Displays</h2>
                            <div className="text-gray-600 dark:text-gray-400">
                                <p className="mb-4">Resolution: 1920 × 1080</p>
                                <p className="mb-4">Refresh Rate: 60 Hz</p>
                                <p className="text-sm italic">Display settings are managed by your browser.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'sound' && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Sound</h2>
                            <div className="text-gray-600 dark:text-gray-400">
                                <p className="mb-4">🔊 Output Volume: 80%</p>
                                <p className="mb-4">🎤 Input Volume: 60%</p>
                                <p className="text-sm italic">Sound settings are managed by your browser.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Window>
    );
}
