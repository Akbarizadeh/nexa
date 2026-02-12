"use client";

import { useState } from "react";
import { MapPin, Layers, ZoomIn, ZoomOut } from "lucide-react";

interface MapMarker {
  id: string;
  type: "Listing" | "Event" | "Offer";
  title: string;
  lat: number;
  lng: number;
  price?: number;
}

const DEMO_MARKERS: MapMarker[] = [
  { id: "1", type: "Listing", title: "MacBook Pro 14\"", lat: 40.7128, lng: -74.006, price: 1499 },
  { id: "2", type: "Event", title: "Tech Meetup", lat: 40.7148, lng: -74.004 },
  { id: "3", type: "Offer", title: "50% Off Coffee", lat: 40.711, lng: -74.008, price: 3.5 },
  { id: "4", type: "Listing", title: "Leather Bag", lat: 40.716, lng: -74.002, price: 89 },
  { id: "5", type: "Event", title: "Farmers Market", lat: 40.718, lng: -74.001 },
  { id: "6", type: "Listing", title: "Photo Service", lat: 40.709, lng: -74.01, price: 150 },
];

const typeColors: Record<string, string> = {
  Listing: "bg-indigo-500",
  Event: "bg-amber-500",
  Offer: "bg-emerald-500",
};

export default function MapPage() {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filters = ["All", "Listing", "Event", "Offer"];
  const filteredMarkers = activeFilter === "All"
    ? DEMO_MARKERS
    : DEMO_MARKERS.filter((m) => m.type === activeFilter);

  return (
    <div className="h-[calc(100vh-4rem)] relative">
      <div className="absolute inset-0 bg-slate-200">
        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {filteredMarkers.map((marker) => {
            const x = ((marker.lng + 74.015) / 0.02) * 100;
            const y = ((40.72 - marker.lat) / 0.015) * 100;

            return (
              <button
                key={marker.id}
                onClick={() => setSelectedMarker(marker)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${typeColors[marker.type]} text-white rounded-full shadow-lg hover:scale-110 transition-transform z-10`}
                style={{
                  left: `${Math.min(Math.max(x, 10), 90)}%`,
                  top: `${Math.min(Math.max(y, 10), 90)}%`,
                }}
              >
                <div className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold whitespace-nowrap">
                  <MapPin size={12} />
                  {marker.price ? `$${marker.price}` : marker.type}
                </div>
              </button>
            );
          })}

          {!selectedMarker && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm text-sm text-slate-500 z-20">
              <MapPin size={16} className="inline mr-1" />
              Mapbox integration ready — add your token to .env.local
            </div>
          )}
        </div>
      </div>

      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-colors ${
                activeFilter === f
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        <button className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center hover:bg-slate-50">
          <ZoomIn size={18} className="text-slate-600" />
        </button>
        <button className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center hover:bg-slate-50">
          <ZoomOut size={18} className="text-slate-600" />
        </button>
        <button className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center hover:bg-slate-50">
          <Layers size={18} className="text-slate-600" />
        </button>
      </div>

      {selectedMarker && (
        <div className="absolute bottom-6 left-4 right-4 md:left-auto md:right-4 md:w-80 z-20">
          <div className="bg-white rounded-xl shadow-xl p-4">
            <div className="flex items-start justify-between">
              <div>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-white mb-2 ${typeColors[selectedMarker.type]}`}>
                  {selectedMarker.type}
                </span>
                <h3 className="font-semibold text-slate-900">{selectedMarker.title}</h3>
              </div>
              <button
                onClick={() => setSelectedMarker(null)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                &times;
              </button>
            </div>
            {selectedMarker.price && (
              <p className="text-lg font-bold text-indigo-600 mt-1">
                ${selectedMarker.price.toFixed(2)}
              </p>
            )}
            <div className="flex items-center gap-1 mt-2 text-sm text-slate-500">
              <MapPin size={14} />
              <span>
                {selectedMarker.lat.toFixed(4)}, {selectedMarker.lng.toFixed(4)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
