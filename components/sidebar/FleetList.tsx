'use client';
import { useState } from 'react';
import { useFleetStore } from '@/store/useFleetStore';
import { Asset, AssetStatus } from '@/types/fleet';
import { Radio, AlertTriangle, ShieldAlert, WifiOff, Search } from 'lucide-react';

export default function FleetList() {
  const { assets, selectedAssetId, selectAsset } = useFleetStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filtrage des unités selon la recherche et le statut
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.callsign.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: AssetStatus) => {
    switch (status) {
      case 'active':
        return <span className="flex items-center text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-800/50 px-2 py-0.5 rounded-full"><Radio className="w-3 h-3 mr-1 animate-pulse" /> Actif</span>;
      case 'warning':
        return <span className="flex items-center text-xs text-amber-400 bg-amber-950/50 border border-amber-800/50 px-2 py-0.5 rounded-full"><AlertTriangle className="w-3 h-3 mr-1" /> Attention</span>;
      case 'critical':
        return <span className="flex items-center text-xs text-rose-400 bg-rose-950/50 border border-rose-800/50 px-2 py-0.5 rounded-full"><ShieldAlert className="w-3 h-3 mr-1 animate-bounce" /> Critique</span>;
      case 'offline':
        return <span className="flex items-center text-xs text-slate-400 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded-full"><WifiOff className="w-3 h-3 mr-1" /> Hors ligne</span>;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col h-[550px] shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Unités de la Flotte ({filteredAssets.length})
        </h3>
      </div>

      {/* Barre de recherche */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
        <input
          type="text"
          placeholder="Rechercher (ex: ALPHA-01)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-600"
        />
      </div>

      {/* Filtres par statut */}
      <div className="flex space-x-1 mb-3 pb-2 border-b border-slate-800 overflow-x-auto text-xs">
        {['all', 'active', 'warning', 'critical'].map((filter) => (
          <button
            key={filter}
            onClick={() => setStatusFilter(filter)}
            className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
              statusFilter === filter
                ? 'bg-blue-600 text-white font-medium'
                : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800'
            }`}
          >
            {filter === 'all' ? 'Tous' : filter}
          </button>
        ))}
      </div>

      {/* Liste des unités */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {filteredAssets.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-6">Aucune unité trouvée.</p>
        ) : (
          filteredAssets.map((asset: Asset) => {
            const isSelected = selectedAssetId === asset.id;
            return (
              <div
                key={asset.id}
                onClick={() => selectAsset(asset.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-blue-950/40 border-blue-600/80 shadow-md'
                    : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold font-mono tracking-wide text-slate-200">
                    {asset.callsign}
                  </span>
                  {getStatusBadge(asset.status)}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/50">
                  <div>Vitesse : <span className="text-slate-200 font-mono">{asset.speed} km/h</span></div>
                  <div>Batterie : <span className="text-slate-200 font-mono">{asset.battery}%</span></div>
                  <div>Signal : <span className="text-slate-200 font-mono">{asset.signalStrength} dBm</span></div>
                  <div>Ping : <span className="text-slate-200 font-mono">{asset.lastPing}</span></div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}