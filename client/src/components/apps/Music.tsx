import Window from '../os/Window';
import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music as MusicIcon, Heart, Shuffle, Repeat } from 'lucide-react';

export default function Music() {
    const [nowPlaying, setNowPlaying] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        fetch('/api/spotify/now-playing')
            .then(res => res.json())
            .then(data => {
                setNowPlaying(data);
                setIsPlaying(data?.isPlaying || false);
            })
            .catch(err => console.error('Failed to fetch Spotify data', err));
    }, []);

    return (
        <Window
            id="music"
            title="Music"
            width={900}
            height={600}
        >
            <div className="h-full flex bg-gradient-to-b from-purple-900 to-black text-white">
                {/* Sidebar */}
                <div className="w-56 bg-black/40 p-4 flex flex-col gap-4">
                    <div className="space-y-2">
                        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
                            🏠 Home
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
                            🔍 Search
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg bg-white/20">
                            📚 Your Library
                        </button>
                    </div>

                    <div className="mt-auto">
                        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                            ❤️ Liked Songs
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Top Section */}
                    <div className="flex-1 overflow-auto p-8">
                        <h1 className="text-4xl font-bold mb-6">Now Playing</h1>

                        {nowPlaying ? (
                            <div className="flex gap-6 items-start">
                                {/* Album Art */}
                                <div className="w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-2xl flex items-center justify-center shrink-0">
                                    {nowPlaying.albumArt ? (
                                        <img src={nowPlaying.albumArt} alt="Album Art" className="w-full h-full object-cover rounded-lg" />
                                    ) : (
                                        <MusicIcon size={80} />
                                    )}
                                </div>

                                {/* Track Info */}
                                <div className="flex-1">
                                    <h2 className="text-5xl font-bold mb-2">
                                        {nowPlaying.title || 'No Track Playing'}
                                    </h2>
                                    <p className="text-2xl text-white/60 mb-4">
                                        {nowPlaying.artist || 'Not Connected'}
                                    </p>
                                    <p className="text-lg text-white/40">
                                        {nowPlaying.album || ''}
                                    </p>

                                    {nowPlaying.lastPlayed && (
                                        <div className="mt-4 px-3 py-1 bg-white/10 rounded-full inline-block text-sm">
                                            Last Played
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-white/60 py-20">
                                <MusicIcon size={80} className="mx-auto mb-4 opacity-50" />
                                <p>No music playing</p>
                                <p className="text-sm">Connect to Spotify to see your tracks</p>
                            </div>
                        )}
                    </div>

                    {/* Player Controls */}
                    <div className="bg-black/60 backdrop-blur-xl p-4 border-t border-white/10">
                        <div className="flex items-center justify-between max-w-3xl mx-auto">
                            {/* Left - Track Info */}
                            <div className="flex items-center gap-3 w-64">
                                <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center">
                                    {nowPlaying?.albumArt ? (
                                        <img src={nowPlaying.albumArt} alt="" className="w-full h-full object-cover rounded" />
                                    ) : (
                                        <MusicIcon size={20} />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium truncate">{nowPlaying?.title || 'Not Playing'}</p>
                                    <p className="text-xs text-white/60 truncate">{nowPlaying?.artist || ''}</p>
                                </div>
                                <button className="text-white/60 hover:text-white">
                                    <Heart size={16} />
                                </button>
                            </div>

                            {/* Center - Controls */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex items-center gap-4">
                                    <button className="text-white/60 hover:text-white">
                                        <Shuffle size={18} />
                                    </button>
                                    <button className="text-white/60 hover:text-white">
                                        <SkipBack size={20} />
                                    </button>
                                    <button className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                                    </button>
                                    <button className="text-white/60 hover:text-white">
                                        <SkipForward size={20} />
                                    </button>
                                    <button className="text-white/60 hover:text-white">
                                        <Repeat size={18} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 w-96">
                                    <span className="text-xs text-white/60">0:00</span>
                                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-white w-1/3"></div>
                                    </div>
                                    <span className="text-xs text-white/60">3:45</span>
                                </div>
                            </div>

                            {/* Right - Volume */}
                            <div className="w-64"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Window>
    );
}
