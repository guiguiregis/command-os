'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useFleetStore } from '@/store/useFleetStore';
import SignalChart from '@/components/telemetry/SignalChart';
import FleetList from '@/components/sidebar/FleetList';

// Importation dynamique de la carte Leaflet (exigence SSR)
const TacticalMap = dynamic(() => import('@/components/map/TacticalMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse rounded-xl" />,
});

export default function CommandDashboard() {
  const { tickSimulation } = useFleetStore();

  // Boucle de rafraîchissement temps réel (1 tick par seconde)
  useEffect(() => {
    const interval = setInterval(() => {
      tickSimulation();
    }, 1000);
    return () => clearInterval(interval);
  }, [tickSimulation]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="h-14 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/50 backdrop-blur">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
          <h1 className="text-sm font-bold tracking-wider uppercase text-slate-200">
            CommandOS <span className="text-slate-500 text-xs font-normal">| Supervision Tactique</span>
          </h1>
        </div>
        <div className="text-xs text-slate-400 font-mono">SYSTEM STATUS: OPERATIONAL</div>
      </header>

      {/* Main Grid Layout */}
      <div className="flex-1 grid grid-cols-12 gap-4 p-4">
        {/* Left Sidebar: Fleet List & Filters */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          <FleetList />
        </aside>

        {/* Center: Tactical Map View */}
        <section className="col-span-12 lg:col-span-6 flex flex-col gap-4">
          <div className="flex-1 min-h-[400px]">
            <TacticalMap />
          </div>
        </section>

        {/* Right Sidebar: Real-time Telemetry */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          <SignalChart />
          {/* Métriques supplémentaires, logs d'événements, etc. */}
        </aside>
      </div>
    </main>
  );
}