'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useFleetStore } from '@/store/useFleetStore';
import { AssetStatus } from '@/types/fleet';

// Fonction pour générer une icône Leaflet personnalisée basée sur le statut
const getCustomMarkerIcon = (status: AssetStatus) => {
  let bgColor = 'bg-emerald-500 shadow-emerald-500/50';
  let pulseEffect = 'animate-pulse';

  switch (status) {
    case 'active':
      bgColor = 'bg-emerald-500 shadow-emerald-500/50';
      break;
    case 'warning':
      bgColor = 'bg-amber-500 shadow-amber-500/50';
      break;
    case 'critical':
      bgColor = 'bg-rose-600 shadow-rose-600/50 animate-bounce';
      break;
    case 'offline':
      bgColor = 'bg-slate-600 shadow-none';
      pulseEffect = '';
      break;
  }

  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="w-4 h-4 rounded-full ${bgColor} shadow-lg ring-2 ring-white/20 ${pulseEffect} flex items-center justify-center"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10],
  });
};

export default function TacticalMap() {
  const { assets, selectedAssetId, selectAsset } = useFleetStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-full w-full bg-slate-950 flex items-center justify-center rounded-xl border border-slate-800 text-xs text-slate-500 animate-pulse">
        Chargement de la carte tactique...
      </div>
    );
  }

  return (
    <div className="h-full w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative shadow-lg">
      <MapContainer
        center={[45.4215, -75.6972]}
        zoom={13}
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {assets.map((asset) => {
          return (
            <Marker
              key={asset.id}
              position={asset.coordinates}
              icon={getCustomMarkerIcon(asset.status)}
              eventHandlers={{
                click: () => selectAsset(asset.id),
              }}
            >
              <Popup className="custom-popup">
                <div className="p-1 text-slate-900">
                  <strong className="text-sm font-bold text-slate-900">{asset.callsign}</strong>
                  <div className="text-xs text-slate-600 mt-1">
                    <div>Type : <span className="font-semibold uppercase">{asset.type}</span></div>
                    <div>Statut : <span className="font-semibold">{asset.status}</span></div>
                    <div>Vitesse : <span className="font-semibold">{asset.speed} km/h</span></div>
                    <div>Batterie : <span className="font-semibold">{asset.battery}%</span></div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}