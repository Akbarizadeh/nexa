"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css";
import { generateDemoMarkers, MapMarker } from "./demoMarkers";

/* ========= Dynamic Leaflet ========= */

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);

const MarkerClusterGroup = dynamic(
  () => import("react-leaflet-cluster"),
  { ssr: false }
);

/* ========= Price Tag Icon ========= */

function createPriceIcon(price: number) {
  const L = require("leaflet");

  return new L.DivIcon({
    html: `
      <div class="bg-white shadow-lg px-3 py-1 rounded-full text-xs font-semibold border border-gray-200">
        $${price}
      </div>
    `,
    className: "",
    iconSize: [40, 20],
    iconAnchor: [20, 10],
  });
}

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const markers = useMemo<MapMarker[]>(
    () => generateDemoMarkers(2000),
    []
  );

  const filteredMarkers = useMemo(() => {
    if (!activeFilter) return markers;
    return markers.filter((m) => m.type === activeFilter);
  }, [markers, activeFilter]);

  if (!mounted) return null;

  return (
    <div className="relative h-screen w-full bg-gray-100 dark:bg-gray-900">

      {/* 🔎 Glass Header */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-[460px] max-w-[95%]">
        <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 shadow-2xl rounded-2xl p-4 space-y-4 border border-white/40 dark:border-gray-700">

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            {["Listing", "Event", "Offer"].map((type) => (
              <button
                key={type}
                onClick={() =>
                  setActiveFilter(
                    activeFilter === type ? null : type
                  )
                }
                className={`px-3 py-1.5 text-xs rounded-full font-medium transition
                ${
                  activeFilter === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-blue-500 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 🗺 Map */}
      <MapContainer
        center={[39.5, -8.0]}
        zoom={7}
        className="h-full w-full"
      >
        <TileLayer
          url={
            darkMode
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        />

        <MarkerClusterGroup chunkedLoading>
          {filteredMarkers.map((item) => {
  const icon = item.price
    ? createPriceIcon(item.price)
    : undefined;

  return (
    <Marker
      key={item.id}
      position={[item.lat, item.lng]}
      {...(icon ? { icon } : {})}
    >
      <Popup>
        <div className="min-w-[200px]">
          <h3 className="font-semibold text-gray-900 text-sm">
            {item.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {item.type}
          </p>
          {item.price && (
            <div className="mt-3 text-blue-600 font-bold text-sm">
              ${item.price}
            </div>
          )}
        </div>
      </Popup>
    </Marker>
  );
})}

        </MarkerClusterGroup>
      </MapContainer>

      {/* 🎛 Floating Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-[1000]">

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-12 h-12 rounded-full bg-gray-900 text-white shadow-xl flex items-center justify-center hover:scale-105 transition"
        >
          🌙
        </button>

      </div>

    </div>
  );
}
