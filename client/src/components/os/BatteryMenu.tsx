import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Battery, Zap } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const DATA = [
  { time: '9 AM', level: 40, activity: 'Coding' },
  { time: '11 AM', level: 65, activity: 'Meeting' },
  { time: '1 PM', level: 85, activity: 'Debugging' },
  { time: '3 PM', level: 55, activity: 'Coffee' },
  { time: '5 PM', level: 90, activity: 'Deploying' },
  { time: '7 PM', level: 70, activity: 'Learning' },
];

export default function BatteryMenu() {
  return (
    <HoverCard openDelay={0} closeDelay={200}>
      <HoverCardTrigger asChild>
        <div className="hidden sm:flex items-center gap-2 hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
          <Battery size={18} className="text-white" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-white/80 dark:bg-[#1e1e1e]/90 backdrop-blur-xl border-none shadow-2xl p-4 mr-4 mt-2" align="end">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-sm">
                <Zap size={16} fill="currentColor" />
             </div>
             <div>
                <div className="text-sm font-bold dark:text-white">Power Source: Battery</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Calculated Productivity</div>
             </div>
          </div>
          <div className="text-xl font-bold dark:text-white">84%</div>
        </div>
        
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA}>
              <XAxis 
                dataKey="time" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: '#888' }}
              />
              <Tooltip 
                contentStyle={{ 
                   backgroundColor: 'rgba(0,0,0,0.8)', 
                   border: 'none', 
                   borderRadius: '8px', 
                   color: 'white',
                   fontSize: '12px'
                }}
                cursor={{ fill: 'transparent' }}
              />
              <Bar dataKey="level" radius={[4, 4, 0, 0]}>
                {DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.level > 70 ? '#4ade80' : entry.level > 50 ? '#fbbf24' : '#f87171'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-white/10">
           <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Significant Energy Users</div>
           <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-700 dark:text-gray-300">
                 <span>VS Code</span>
                 <span>High Energy Impact</span>
              </div>
              <div className="flex justify-between text-xs text-gray-700 dark:text-gray-300">
                 <span>Chrome</span>
                 <span>High Energy Impact</span>
              </div>
           </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
