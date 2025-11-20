import { CloudSun, MapPin } from 'lucide-react';

export default function WeatherWidget() {
    return (
        <div className="fixed top-12 right-4 w-64 bg-white/20 dark:bg-black/40 backdrop-blur-md rounded-2xl p-4 text-white shadow-lg border border-white/10 transition-all hover:bg-white/30 dark:hover:bg-black/50 cursor-default group">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-light">28°</h2>
                    <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
                        <MapPin size={12} />
                        <span>Kharagpur, IN</span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <CloudSun size={32} className="text-yellow-300" />
                    <span className="text-sm font-medium mt-2">Partly Cloudy</span>
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between text-xs opacity-80">
                <div className="flex flex-col items-center gap-1">
                    <span>Now</span>
                    <CloudSun size={14} />
                    <span>28°</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span>1 PM</span>
                    <CloudSun size={14} />
                    <span>29°</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span>2 PM</span>
                    <CloudSun size={14} />
                    <span>30°</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span>3 PM</span>
                    <CloudSun size={14} />
                    <span>29°</span>
                </div>
            </div>
        </div>
    );
}
