import { create } from "zustand";
import { Asset, TelemetryPoint } from "../types/fleet";

interface FleetState {
  assets: Asset[];
  selectedAssetId: string | null;
  telemetryHistory: TelemetryPoint[];
  selectAsset: (id: string | null) => void;
  updateAssetPosition: (id: string, coords: [number, number]) => void;
  tickSimulation: () => void;
}

const INITIAL_ASSETS: Asset[] = [
  {
    id: "u-1",
    callsign: "ALPHA-01",
    type: "drone",
    status: "active",
    coordinates: [45.4215, -75.6972],
    speed: 45,
    battery: 88,
    signalStrength: -62,
    lastPing: "Just now",
  },
  {
    id: "u-2",
    callsign: "BRAVO-04",
    type: "sensor",
    status: "warning",
    coordinates: [45.428, -75.705],
    speed: 0,
    battery: 24,
    signalStrength: -85,
    lastPing: "2s ago",
  },
  {
    id: "u-3",
    callsign: "TANGO-09",
    type: "vehicle",
    status: "critical",
    coordinates: [45.415, -75.688],
    speed: 72,
    battery: 12,
    signalStrength: -92,
    lastPing: "5s ago",
  },
];

export const useFleetStore = create<FleetState>((set) => ({
    assets: INITIAL_ASSETS,
    selectedAssetId: 'u-1',
    telemetryHistory: [],
    selectAsset: (id) => set({ selectedAssetId: id }),
    updateAssetPosition: (id, coords) => set((state) => ({
        assets: state.assets.map((asset) => asset.id === id ? { ...asset, coordinates: coords } : asset),
    })),
    tickSimulation: () => set((state) => ({
        assets: state.assets.map((asset) => ({
            ...asset,
            coordinates: [asset.coordinates[0] + (Math.random() - 0.5) * 0.01, asset.coordinates[1] + (Math.random() - 0.5) * 0.01],
        })),
    })),
}));
