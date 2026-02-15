// "use client";

// import { useState } from "react";
// import { MapPin, TrendingUp, Sparkles } from "lucide-react";
// import DiscoveryCard from "@/components/cards/DiscoveryCard";
// import FilterBar from "@/components/ui/FilterBar";
// import type { DiscoveryItem } from "@/types";

// const DEMO_ITEMS: DiscoveryItem[] = [
//   {
//     contentType: "Listing",
//     id: "1",
//     title: 'MacBook Pro 14" M3 - Like New',
//     description:
//       "Barely used MacBook Pro with M3 chip, 16GB RAM, 512GB SSD. Includes original box and charger.",
//     imageUrl: null,
//     category: "Electronics",
//     latitude: 40.7128,
//     longitude: -74.006,
//     distanceKm: 0.8,
//     price: 1499.0,
//     likeCount: 24,
//     saveCount: 12,
//     createdAt: new Date().toISOString(),
//     businessName: null,
//   },
//   {
//     contentType: "Event",
//     id: "2",
//     title: "Local Tech Meetup - AI & Startups",
//     description:
//       "Join us for an evening of talks on AI, startups, and the future of local commerce.",
//     imageUrl: null,
//     category: "Technology",
//     latitude: 40.7148,
//     longitude: -74.004,
//     distanceKm: 1.2,
//     price: null,
//     likeCount: 56,
//     saveCount: 34,
//     createdAt: new Date().toISOString(),
//     businessName: "TechHub NYC",
//   },
//   {
//     contentType: "Offer",
//     id: "3",
//     title: "50% Off All Coffee Drinks",
//     description:
//       "Celebrate our anniversary with half-price specialty coffees all week long!",
//     imageUrl: null,
//     category: "Food & Drink",
//     latitude: 40.711,
//     longitude: -74.008,
//     distanceKm: 0.3,
//     price: 3.5,
//     likeCount: 89,
//     saveCount: 45,
//     createdAt: new Date().toISOString(),
//     businessName: "Urban Beans Cafe",
//   },
//   {
//     contentType: "Listing",
//     id: "4",
//     title: "Vintage Leather Messenger Bag",
//     description:
//       "Handcrafted Italian leather messenger bag. Perfect for daily commute or travel.",
//     imageUrl: null,
//     category: "Fashion",
//     latitude: 40.716,
//     longitude: -74.002,
//     distanceKm: 1.5,
//     price: 89.0,
//     likeCount: 15,
//     saveCount: 8,
//     createdAt: new Date().toISOString(),
//     businessName: "Leather & Co",
//   },
//   {
//     contentType: "Event",
//     id: "5",
//     title: "Weekend Farmers Market",
//     description:
//       "Fresh local produce, artisan goods, and live music every Saturday morning.",
//     imageUrl: null,
//     category: "Food & Drink",
//     latitude: 40.718,
//     longitude: -74.001,
//     distanceKm: 2.0,
//     price: null,
//     likeCount: 120,
//     saveCount: 67,
//     createdAt: new Date().toISOString(),
//     businessName: "Green Market Collective",
//   },
//   {
//     contentType: "Listing",
//     id: "6",
//     title: "Professional Photography Service",
//     description:
//       "Portrait, event, and product photography. Available for bookings within the city.",
//     imageUrl: null,
//     category: "Services",
//     latitude: 40.709,
//     longitude: -74.01,
//     distanceKm: 0.5,
//     price: 150.0,
//     likeCount: 32,
//     saveCount: 20,
//     createdAt: new Date().toISOString(),
//     businessName: null,
//   },
// ];

// const CATEGORIES = [
//   "Electronics",
//   "Technology",
//   "Food & Drink",
//   "Fashion",
//   "Services",
//   "Sports",
//   "Home & Garden",
// ];

// export default function DiscoverPage() {
//   const [category, setCategory] = useState("");
//   const [sortBy, setSortBy] = useState("latest");
//   const [items] = useState<DiscoveryItem[]>(DEMO_ITEMS);

//   const filteredItems = items
//     .filter((item) => !category || item.category === category)
//     .sort((a, b) => {
//       if (sortBy === "distance") return a.distanceKm - b.distanceKm;
//       if (sortBy === "popular")
//         return b.likeCount + b.saveCount - (a.likeCount + a.saveCount);
//       return (
//         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       );
//     });

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6">
//       <div className="mb-6">
//         <div className="flex items-center gap-2 mb-1">
//           <MapPin size={20} className="text-indigo-500" />
//           <span className="text-sm text-slate-500">New York, NY</span>
//         </div>
//         <h1 className="text-2xl font-bold text-slate-900">
//           Discover Near You
//         </h1>
//         <p className="text-slate-500 mt-1">
//           Events, products, services, and offers powered by AI
//         </p>
//       </div>

//       <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 mb-6 text-white">
//         <div className="flex items-center gap-2 mb-2">
//           <Sparkles size={20} />
//           <span className="font-semibold">AI-Powered Discovery</span>
//         </div>
//         <p className="text-indigo-100 text-sm">
//           NEXA uses AI to match you with the most relevant local content based
//           on your interests, location, and behavior.
//         </p>
//         <div className="flex items-center gap-4 mt-4">
//           <div className="flex items-center gap-1 text-sm">
//             <TrendingUp size={16} />
//             <span>{items.length} items nearby</span>
//           </div>
//         </div>
//       </div>

//       <FilterBar
//         categories={CATEGORIES}
//         selectedCategory={category}
//         onCategoryChange={setCategory}
//         selectedSort={sortBy}
//         onSortChange={setSortBy}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//         {filteredItems.map((item) => (
//           <DiscoveryCard
//             key={item.id}
//             item={item}
//             onLike={(id) => console.log("Like", id)}
//             onSave={(id) => console.log("Save", id)}
//           />
//         ))}
//       </div>

//       {filteredItems.length === 0 && (
//         <div className="text-center py-16">
//           <MapPin size={48} className="mx-auto text-slate-300 mb-4" />
//           <h3 className="text-lg font-semibold text-slate-700">
//             Nothing found
//           </h3>
//           <p className="text-slate-500">
//             Try adjusting your filters or expanding your search area.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";  
  
import { useState, useEffect } from "react";  
import { MapPin, TrendingUp, Sparkles, Loader2 } from "lucide-react";  
import DiscoveryCard from "@/components/cards/DiscoveryCard";  
import FilterBar from "@/components/ui/FilterBar";  
import type { DiscoveryItem } from "@/types";  
import { api } from "@/lib/api";  
  
const CATEGORIES = [  
  "Electronics",  
  "Technology",  
  "Food & Drink",  
  "Fashion",  
  "Services",  
  "Sports",  
  "Home & Garden",  
];  
  
export default function DiscoverPage() {  
  const [category, setCategory] = useState("");  
  const [sortBy, setSortBy] = useState("latest");  
  const [items, setItems] = useState<DiscoveryItem[]>([]);  
  const [isLoading, setIsLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null);  
  
  // Fetch data from backend  
  useEffect(() => {  
    const fetchDiscovery = async () => {  
      try {  
        setIsLoading(true);  
        const response = await api.discovery.get({  
          latitude: 40.7128, // Default NYC coordinates  
          longitude: -74.006,  
          radiusKm: 10,  
          category: category || undefined,  
          sortBy: sortBy === "latest" ? undefined : sortBy,  
          page: 1,  
          pageSize: 20,  
        });  
        setItems(response.items);  
        setError(null);  
      } catch (err) {  
        console.error("Error fetching discovery items:", err);  
        setError("Failed to load items. Please try again.");  
      } finally {  
        setIsLoading(false);  
      }  
    };  
  
    fetchDiscovery();  
  }, [category, sortBy]);  
  
  const filteredItems = items;  
  
  if (isLoading) {  
    return (  
      <div className="max-w-7xl mx-auto px-4 py-6">  
        <div className="text-center py-16">  
          <Loader2 size={40} className="mx-auto text-indigo-500 animate-spin mb-4" />  
          <h3 className="font-semibold text-slate-700">Loading...</h3>  
        </div>  
      </div>  
    );  
  }  
  
  if (error) {  
    return (  
      <div className="max-w-7xl mx-auto px-4 py-6">  
        <div className="text-center py-16">  
          <p className="text-red-500">{error}</p>  
        </div>  
      </div>  
    );  
  }  
  
  return (  
    <div className="max-w-7xl mx-auto px-4 py-6">  
      <div className="mb-6">  
        <div className="flex items-center gap-2 mb-1">  
          <MapPin size={20} className="text-indigo-500" />  
          <span className="text-sm text-slate-500">New York, NY</span>  
        </div>  
        <h1 className="text-2xl font-bold text-slate-900">  
          Discover Near You  
        </h1>  
        <p className="text-slate-500 mt-1">  
          Events, products, services, and offers powered by AI  
        </p>  
      </div>  
  
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 mb-6 text-white">  
        <div className="flex items-center gap-2 mb-2">  
          <Sparkles size={20} />  
          <span className="font-semibold">AI-Powered Discovery</span>  
        </div>  
        <p className="text-indigo-100 text-sm">  
          NEXA uses AI to match you with the most relevant local content based  
          on your interests, location, and behavior.  
        </p>  
        <div className="flex items-center gap-4 mt-4">  
          <div className="flex items-center gap-1 text-sm">  
            <TrendingUp size={16} />  
            <span>{items.length} items nearby</span>  
          </div>  
        </div>  
      </div>  
  
      <FilterBar  
        categories={CATEGORIES}  
        selectedCategory={category}  
        onCategoryChange={setCategory}  
        selectedSort={sortBy}  
        onSortChange={setSortBy}  
      />  
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">  
        {filteredItems.map((item) => (  
          <DiscoveryCard  
            key={item.id}  
            item={item}  
            onLike={(id) => console.log("Like", id)}  
            onSave={(id) => console.log("Save", id)}  
          />  
        ))}  
      </div>  
  
      {filteredItems.length === 0 && (  
        <div className="text-center py-16">  
          <MapPin size={48} className="mx-auto text-slate-300 mb-4" />  
          <h3 className="text-lg font-semibold text-slate-700">  
            Nothing found  
          </h3>  
          <p className="text-slate-500">  
            Try adjusting your filters or expanding your search area.  
          </p>  
        </div>  
      )}  
    </div>  
  );  
}