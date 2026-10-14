import { create } from 'zustand';
import { Asset, TelemetryPoint } from '@/types/fleet';

interface FleetState {
  assets: Asset[];
  selectedAssetId: string | null;
  telemetryHistory: TelemetryPoint[];
  
  // Actions
  selectAsset: (id: string | null) => void;
  updateAssetPosition: (id: string, coords: [number, number]) => void;
  tickSimulation: () => void;
}

const INITIAL_ASSETS: Asset[] = [
  { id: 'u-1', callsign: 'ALPHA-01', type: 'drone', status: 'active', coordinates: [45.4215, -75.6972], speed: 48, battery: 88, signalStrength: -62, lastPing: 'À l\'instant' },
  { id: 'u-2', callsign: 'BRAVO-04', type: 'sensor', status: 'warning', coordinates: [45.4280, -75.7050], speed: 0, battery: 24, signalStrength: -85, lastPing: 'il y a 2s' },
  { id: 'u-3', callsign: 'TANGO-09', type: 'vehicle', status: 'critical', coordinates: [45.4150, -75.6880], speed: 72, battery: 12, signalStrength: -92, lastPing: 'il y a 5s' },
  { id: 'u-4', callsign: 'RADAR-02', type: 'sensor', status: 'active', coordinates: [45.4310, -75.6800], speed: 0, battery: 95, signalStrength: -50, lastPing: 'À l\'instant' },
  { id: 'u-5', callsign: 'ECHO-07', type: 'drone', status: 'offline', coordinates: [45.4090, -75.7120], speed: 0, battery: 0, signalStrength: -110, lastPing: 'il y a 12m' },
];

export const useFleetStore = create<FleetState>((set) => ({
  assets: INITIAL_ASSETS,
  selectedAssetId: 'u-1',
  telemetryHistory: [],

  selectAsset: (id) => set({ selectedAssetId: id }),

  updateAssetPosition: (id, coords) =>
    set((state) => ({
      assets: state.assets.map((a) => (a.id === id ? { ...a, coordinates: coords } : a)),
    })),

  // Simulation à chaque tick (1 Hz)
  tickSimulation: () =>
    set((state) => ({
      assets: state.assets.map((asset) => {
        // Les unités immobiles ou hors ligne ne bougent pas
        if (asset.status === 'offline' || asset.speed === 0) return asset;

        // Micro-déplacement aléatoire pour simuler le mouvement
        const latDelta = (Math.random() - 0.5) * 0.0008;
        const lngDelta = (Math.random() - 0.5) * 0.0008;
        
        return {
          ...asset,
          coordinates: [
            asset.coordinates[0] + latDelta,
            asset.coordinates[1] + lngDelta,
          ],
        };
      }),
    })),
}));