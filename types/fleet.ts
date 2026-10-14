export type AssetStatus = 'active' | 'warning' | 'critical'| 'offline';

export interface Asset {
    id: string;
    callsign: string;
    type: 'drone' | 'sensor' | 'vehicle';
    status: AssetStatus;
    coordinates: [number, number];
    speed: number;
    battery: number;
    signalStrength: number;
    lastPing: string;
}

export interface TelemetryPoint {
    timestamp: string;
    activeUnits: number;
    dateIngestionRate: number;
    threatIndex: number;
}