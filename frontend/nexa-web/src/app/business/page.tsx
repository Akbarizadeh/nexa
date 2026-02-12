"use client";

import { useState } from "react";
import {
  Store,
  Eye,
  Heart,
  Bookmark,
  Package,
  Calendar,
  Tag,
  TrendingUp,
  BarChart3,
  Plus,
} from "lucide-react";

interface BusinessStats {
  totalViews: number;
  totalLikes: number;
  totalSaves: number;
  totalListings: number;
  totalEvents: number;
  totalOffers: number;
}

const DEMO_STATS: BusinessStats = {
  totalViews: 12450,
  totalLikes: 843,
  totalSaves: 321,
  totalListings: 15,
  totalEvents: 8,
  totalOffers: 5,
};

const DEMO_RECENT_LISTINGS = [
  { id: "1", title: "Wireless Headphones Pro", views: 234, likes: 18, saves: 9, status: "Active" },
  { id: "2", title: "Bluetooth Speaker Mini", views: 187, likes: 12, saves: 6, status: "Active" },
  { id: "3", title: "USB-C Hub 7-in-1", views: 156, likes: 8, saves: 4, status: "Active" },
  { id: "4", title: "Laptop Stand Adjustable", views: 98, likes: 5, saves: 3, status: "Sold" },
];

export default function BusinessPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "listings" | "events" | "offers">("overview");
  const stats = DEMO_STATS;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600" />
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10">
            <div className="w-20 h-20 bg-white rounded-xl border-4 border-white shadow-sm flex items-center justify-center">
              <Store size={32} className="text-indigo-500" />
            </div>
            <div className="pb-1">
              <h1 className="text-xl font-bold text-slate-900">
                TechZone Electronics
              </h1>
              <p className="text-sm text-slate-500">
                Premium electronics and gadgets &middot; Verified Business
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          { icon: Eye, label: "Views", value: stats.totalViews, color: "text-blue-500" },
          { icon: Heart, label: "Likes", value: stats.totalLikes, color: "text-red-500" },
          { icon: Bookmark, label: "Saves", value: stats.totalSaves, color: "text-amber-500" },
          { icon: Package, label: "Listings", value: stats.totalListings, color: "text-indigo-500" },
          { icon: Calendar, label: "Events", value: stats.totalEvents, color: "text-emerald-500" },
          { icon: Tag, label: "Offers", value: stats.totalOffers, color: "text-purple-500" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-slate-200 p-4 text-center"
          >
            <stat.icon size={20} className={`mx-auto ${stat.color} mb-1`} />
            <div className="text-xl font-bold text-slate-900">
              {stat.value.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 mb-6 bg-slate-100 rounded-lg p-1">
        {(["overview", "listings", "events", "offers"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
              activeTab === tab
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                <TrendingUp size={18} className="text-indigo-500" />
                Performance Overview
              </h2>
              <select className="text-sm text-slate-500 bg-slate-50 rounded-lg px-3 py-1.5 border border-slate-200">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="h-48 bg-slate-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-slate-400">
                <BarChart3 size={48} className="mx-auto mb-2" />
                <p className="text-sm">Analytics charts will render here</p>
                <p className="text-xs text-slate-300 mt-1">Recharts integration ready</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900">Recent Listings</h2>
              <button className="flex items-center gap-1 text-sm text-indigo-500 hover:text-indigo-600 font-medium">
                <Plus size={14} />
                New Listing
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {DEMO_RECENT_LISTINGS.map((listing) => (
                <div
                  key={listing.id}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <h3 className="font-medium text-slate-900">
                      {listing.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Eye size={12} /> {listing.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={12} /> {listing.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bookmark size={12} /> {listing.saves}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      listing.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {listing.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "listings" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">All Listings</h2>
            <button className="flex items-center gap-1 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors">
              <Plus size={16} />
              Add Listing
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {DEMO_RECENT_LISTINGS.map((listing) => (
              <div key={listing.id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Package size={20} className="text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">{listing.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {listing.views} views &middot; {listing.likes} likes
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    listing.status === "Active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {listing.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "events" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Events</h2>
            <button className="flex items-center gap-1 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors">
              <Plus size={16} />
              Create Event
            </button>
          </div>
          <div className="text-center py-12 text-slate-400">
            <Calendar size={48} className="mx-auto mb-3" />
            <p>No events created yet</p>
            <p className="text-sm mt-1">Create your first event to attract local customers</p>
          </div>
        </div>
      )}

      {activeTab === "offers" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Offers</h2>
            <button className="flex items-center gap-1 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors">
              <Plus size={16} />
              Create Offer
            </button>
          </div>
          <div className="text-center py-12 text-slate-400">
            <Tag size={48} className="mx-auto mb-3" />
            <p>No offers created yet</p>
            <p className="text-sm mt-1">Create your first offer to boost engagement</p>
          </div>
        </div>
      )}
    </div>
  );
}
