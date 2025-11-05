"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

// ==== Default center Porto 🇵🇹 ====
const defaultCenter = [41.149956, -8.610242];

// ==== Icons (SVG en /public/) ====
const userIcon = L.icon({
    iconUrl: "/user_location.svg",
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -18],
});

const recycleIcon = L.icon({
    iconUrl: "/recycle_marker.svg",
    iconSize: [42, 42],
    iconAnchor: [21, 21],
    popupAnchor: [0, -18],
});

// ==== Puntos de Porto ====
const recyclingPoints = [
    { id: 1, name: "Humana Porto – Santa Catarina", position: [41.149956, -8.605317] },
    { id: 2, name: "Humana Porto – Cedofeita", position: [41.154450, -8.620710] },
    { id: 3, name: "Humana Porto – Campanhã", position: [41.147230, -8.587910] },
    { id: 4, name: "Ponto Têxtil Gaia", position: [41.124970, -8.612960] },
];

// ==== Botón de centrar ====
function RecenterButton({ userLocation }) {
    const map = useMap();

    const goToUser = () => {
        if (userLocation) map.flyTo(userLocation, 15, { duration: 1.3 });
    };

    return (
        <button
            onClick={goToUser}
            className="absolute bottom-24 right-4 bg-white shadow-lg rounded-full p-3 z-1000
      border border-gray-200 active:scale-95 transition"
        >
            🎯
        </button>
    );
}

export default function MapPage() {
    const [userLocation, setUserLocation] = useState(defaultCenter);

    useEffect(() => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
            () => setUserLocation(defaultCenter)
        );
    }, []);

    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-green-600" size={28} />
                <h1 className="text-2xl font-bold text-gray-800">Pontos de Coleta</h1>
            </div>
            <div className="w-full h-[70vh] relative rounded-xl overflow-hidden shadow-sm border border-gray-200">
                <MapContainer
                    center={defaultCenter}
                    zoom={13}
                    scrollWheelZoom
                    className="w-full h-full"
                >
                    <TileLayer
                        attribution="© OpenStreetMap"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Usuario */}
                    <Marker position={userLocation} icon={userIcon}>
                        <Popup>📍 Estás aqui</Popup>
                    </Marker>

                    {/* Puntos de reciclaje */}
                    {recyclingPoints.map((p) => (
                        <Marker key={p.id} position={p.position} icon={recycleIcon}>
                            <Popup>♻️ {p.name}</Popup>
                        </Marker>
                    ))}

                    <RecenterButton userLocation={userLocation} />
                </MapContainer>
            </div>
        </div>
    );
}