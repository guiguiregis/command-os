'use client';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip} from 'recharts';
const sampleData = [
    { time: '10:00', streamRate: 240, threats: 2 },
  { time: '10:01', streamRate: 310, threats: 1 },
  { time: '10:02', streamRate: 450, threats: 4 },
  { time: '10:03', streamRate: 280, threats: 0 },
  { time: '10:04', streamRate: 520, threats: 3 },
];

export default function SignalChart() {
    return (
       <div className='bg-slate-900 border border-slate-800 rounded-xl p-4'>
        <h3 className='text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3'>Débit d'Ingestion des Données (MB/s)</h3>
        <div className='h-40 w-full'>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sampleData}>
                    <AreaChart data={sampleData}>
                        <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={11} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                        <Area type="monotone" dataKey="streamRate" stroke="#3b82f6" fillOpacity={1} fill="url(#gradient)" />
                    </AreaChart>
                </AreaChart>
            </ResponsiveContainer>
        </div>
       </div>
    );
}

