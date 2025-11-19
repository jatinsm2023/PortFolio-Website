import Window from '../os/Window';
import { Heart } from 'lucide-react';

export default function Photos() {
  return (
    <Window 
      id="photos" 
      title="Photos" 
      width={700} 
      height={500}
    >
      <div className="h-full bg-white dark:bg-[#1e1e1e] p-4 overflow-auto">
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-md overflow-hidden relative group">
              <img 
                src={`https://source.unsplash.com/random/400x400?nature,${i}`} 
                alt="Gallery" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="text-white fill-white/50" size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
}
