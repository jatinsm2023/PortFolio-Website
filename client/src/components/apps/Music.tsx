import Window from '../os/Window';
import { useState } from 'react';
import { Play, Pause, Volume2, Search, ExternalLink } from 'lucide-react';

const FEATURED_TRACKS = [
    { title: 'Blinding Lights', artist: 'The Weeknd', youtubeId: 'fHI8X4OXluQ' },
    { title: 'Shape of You', artist: 'Ed Sheeran', youtubeId: 'JGwWNGJdvx8' },
    { title: 'Levitating', artist: 'Dua Lipa', youtubeId: 'TUVcZfQe-Kw' },
    { title: 'Starboy', artist: 'The Weeknd', youtubeId: '34Na4j8AVgA' },
    { title: 'Bad Guy', artist: 'Billie Eilish', youtubeId: 'DyDfgMOUjCI' },
    { title: 'Circles', artist: 'Post Malone', youtubeId: 'wXhTHyIgQ_U' },
];

export default function Music() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentTrack, setCurrentTrack] = useState(FEATURED_TRACKS[0]);

    const filteredTracks = searchQuery
        ? FEATURED_TRACKS.filter(track =>
            track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            track.artist.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : FEATURED_TRACKS;

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
                        <button className="w-full text-left px-3 py-2 rounded-lg bg-white/20">
                            🏠 Home
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
                            🔍 Search
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
                            📚 Library
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Top Bar with Search */}
                    <div className="p-4 border-b border-white/10">
                        <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search for songs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent outline-none placeholder-white/60"
                            />
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-auto p-6">
                        {currentTrack && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">Now Playing</h2>
                                <div className="bg-white/10 rounded-lg p-4 mb-4">
                                    <div className="aspect-video mb-4 bg-black rounded overflow-hidden">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${currentTrack.youtubeId}?autoplay=0`}
                                            title={currentTrack.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold">{currentTrack.title}</h3>
                                    <p className="text-white/60">{currentTrack.artist}</p>
                                </div>
                            </div>
                        )}

                        <h2 className="text-2xl font-bold mb-4">
                            {searchQuery ? 'Search Results' : 'Featured Tracks'}
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {filteredTracks.map((track, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentTrack(track)}
                                    className={`p-4 rounded-lg transition-all hover:bg-white/20 text-left ${currentTrack.youtubeId === track.youtubeId ? 'bg-white/20' : 'bg-white/10'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
                                            {currentTrack.youtubeId === track.youtubeId ? (
                                                <Play size={20} fill="currentColor" />
                                            ) : (
                                                <span className="text-2xl">🎵</span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">{track.title}</p>
                                            <p className="text-sm text-white/60 truncate">{track.artist}</p>
                                        </div>
                                        <ExternalLink size={16} className="text-white/40" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Window>
    );
}
