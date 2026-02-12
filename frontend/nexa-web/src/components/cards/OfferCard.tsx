"use client";

import { Tag, Clock, Heart, Bookmark } from "lucide-react";
import type { OfferResponse } from "@/types";

interface OfferCardProps {
  offer: OfferResponse;
  onLike?: (id: string) => void;
  onSave?: (id: string) => void;
}

export default function OfferCard({ offer, onLike, onSave }: OfferCardProps) {
  const endDate = new Date(offer.endDate);
  const now = new Date();
  const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-36 bg-gradient-to-br from-emerald-400 to-teal-500">
        {offer.imageUrl ? (
          <img src={offer.imageUrl} alt={offer.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Tag size={48} className="text-white/50" />
          </div>
        )}
        {offer.discountPercent && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{offer.discountPercent}%
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900">{offer.title}</h3>
        <p className="text-sm text-slate-500 mt-0.5">{offer.businessName}</p>
        <div className="flex items-center gap-3 mt-2">
          {offer.discountedPrice !== null && (
            <span className="text-lg font-bold text-emerald-600">
              ${offer.discountedPrice.toFixed(2)}
            </span>
          )}
          {offer.originalPrice !== null && (
            <span className="text-sm text-slate-400 line-through">
              ${offer.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
          <span className="flex items-center gap-1 text-sm text-slate-500">
            <Clock size={14} />
            {daysLeft > 0 ? `${daysLeft} days left` : "Ending soon"}
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => onLike?.(offer.id)} className="text-slate-400 hover:text-red-500">
              <Heart size={16} />
            </button>
            <button onClick={() => onSave?.(offer.id)} className="text-slate-400 hover:text-indigo-500">
              <Bookmark size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
