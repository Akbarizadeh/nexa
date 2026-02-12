"use client";

import { Heart, Bookmark, MapPin, Calendar, Tag } from "lucide-react";
import type { DiscoveryItem } from "@/types";

interface DiscoveryCardProps {
  item: DiscoveryItem;
  onLike?: (id: string) => void;
  onSave?: (id: string) => void;
}

const typeColors: Record<string, string> = {
  Listing: "bg-indigo-100 text-indigo-700",
  Event: "bg-amber-100 text-amber-700",
  Offer: "bg-emerald-100 text-emerald-700",
};

export default function DiscoveryCard({ item, onLike, onSave }: DiscoveryCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-slate-100">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-slate-300">
              {item.contentType === "Event" ? (
                <Calendar size={48} />
              ) : item.contentType === "Offer" ? (
                <Tag size={48} />
              ) : (
                <MapPin size={48} />
              )}
            </div>
          </div>
        )}
        <span
          className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${
            typeColors[item.contentType] || "bg-slate-100 text-slate-700"
          }`}
        >
          {item.contentType}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-900 truncate">{item.title}</h3>
            {item.businessName && (
              <p className="text-sm text-slate-500 mt-0.5">{item.businessName}</p>
            )}
          </div>
          {item.price !== null && (
            <span className="text-lg font-bold text-indigo-600 shrink-0">
              ${item.price.toFixed(2)}
            </span>
          )}
        </div>
        {item.description && (
          <p className="text-sm text-slate-600 mt-2 line-clamp-2">{item.description}</p>
        )}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {item.distanceKm.toFixed(1)} km
            </span>
            <span className="px-2 py-0.5 bg-slate-100 rounded-full text-xs">
              {item.category}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onLike?.(item.id)}
              className="flex items-center gap-1 text-slate-400 hover:text-red-500 transition-colors"
            >
              <Heart size={16} />
              <span className="text-xs">{item.likeCount}</span>
            </button>
            <button
              onClick={() => onSave?.(item.id)}
              className="flex items-center gap-1 text-slate-400 hover:text-indigo-500 transition-colors"
            >
              <Bookmark size={16} />
              <span className="text-xs">{item.saveCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
