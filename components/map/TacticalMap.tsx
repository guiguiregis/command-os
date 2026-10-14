'use client';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useFleetStore} from '../../store/useFleetStore';

export default function TacticalMap() {
    const { assets, selectedAssetId, selectAsset } = useFleetStore();

    return (
        <div className="h-full w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative">
            <MapContainer center={[45.4215, -75.6972]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                />
                {assets.map((asset) => (
                    <Marker key={asset.id} position={asset.coordinates}
                    eventHandlers={{
                        click: () => selectAsset(asset.id),
                    }}
                    >
                        <Popup className='text-slate-900'>
                            <strong>{asset.callsign}</strong> <br />
                            Status: {asset.status} <br />
                            Speed: {asset.speed} km/h <br />
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
