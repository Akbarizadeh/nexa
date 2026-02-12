"use client";

import { Calendar, MapPin, Users, Heart, Bookmark } from "lucide-react";
import type { EventResponse } from "@/types";

interface EventCardProps {
  event: EventResponse;
  onLike?: (id: string) => void;
  onSave?: (id: string) => void;
  onAttend?: (id: string) => void;
}

export default function EventCard({ event, onLike, onSave, onAttend }: EventCardProps) {
  const startDate = new Date(event.startDate);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-40 bg-gradient-to-br from-amber-400 to-orange-500">
        {event.imageUrl ? (
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar size={48} className="text-white/50" />
          </div>
        )}
        <div className="absolute top-3 left-3 bg-white rounded-lg px-2 py-1 text-center shadow-sm">
          <div className="text-xs font-semibold text-amber-600 uppercase">
            {startDate.toLocaleDateString("en-US", { month: "short" })}
          </div>
          <div className="text-lg font-bold text-slate-900 leading-tight">
            {startDate.getDate()}
          </div>
        </div>
        {event.isFree && (
          <span className="absolute top-3 right-3 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            FREE
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900">{event.title}</h3>
        <p className="text-sm text-slate-500 mt-0.5">{event.businessName}</p>
        <div className="flex items-center gap-3 mt-3 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {startDate.toLocaleDateString("en-US", {
              weekday: "short",
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
          {event.address && (
            <span className="flex items-center gap-1 truncate">
              <MapPin size={14} />
              {event.address}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-slate-400" />
            <span className="text-sm text-slate-500">
              {event.attendeeCount} attending
              {event.maxAttendees && ` / ${event.maxAttendees}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onAttend?.(event.id)}
              className="px-3 py-1 bg-indigo-500 text-white text-xs font-semibold rounded-full hover:bg-indigo-600 transition-colors"
            >
              Attend
            </button>
            <button onClick={() => onLike?.(event.id)} className="text-slate-400 hover:text-red-500">
              <Heart size={16} />
            </button>
            <button onClick={() => onSave?.(event.id)} className="text-slate-400 hover:text-indigo-500">
              <Bookmark size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
