// "use client";

// import { useState } from "react";
// import { Search, Sparkles, MapPin, Loader2 } from "lucide-react";
// import DiscoveryCard from "@/components/cards/DiscoveryCard";
// import type { DiscoveryItem } from "@/types";

// const EXAMPLE_QUERIES = [
//   "Show me tech events near me tonight",
//   "Find a used bike under $300 nearby",
//   "Best coffee deals within 1 mile",
//   "I need a laptop for design under $1000",
//   "Photography services near downtown",
//   "Free events this weekend",
// ];

// const DEMO_RESULTS: DiscoveryItem[] = [
//   {
//     contentType: "Listing",
//     id: "s1",
//     title: 'Dell XPS 15 - Perfect for Design',
//     description: "Powerful laptop with 4K OLED display, 32GB RAM, perfect for creative professionals.",
//     imageUrl: null,
//     category: "Electronics",
//     latitude: 40.7128,
//     longitude: -74.006,
//     distanceKm: 0.5,
//     price: 899.0,
//     likeCount: 18,
//     saveCount: 10,
//     createdAt: new Date().toISOString(),
//     businessName: null,
//   },
//   {
//     contentType: "Listing",
//     id: "s2",
//     title: "MacBook Air M2 - Student Edition",
//     description: "Lightly used MacBook Air, ideal for design work and coding.",
//     imageUrl: null,
//     category: "Electronics",
//     latitude: 40.714,
//     longitude: -74.003,
//     distanceKm: 1.1,
//     price: 749.0,
//     likeCount: 12,
//     saveCount: 7,
//     createdAt: new Date().toISOString(),
//     businessName: null,
//   },
//   {
//     contentType: "Listing",
//     id: "s3",
//     title: "iPad Pro 12.9\" with Apple Pencil",
//     description: "Great for digital art and design. Comes with Apple Pencil 2 and Magic Keyboard.",
//     imageUrl: null,
//     category: "Electronics",
//     latitude: 40.716,
//     longitude: -74.008,
//     distanceKm: 1.8,
//     price: 650.0,
//     likeCount: 25,
//     saveCount: 15,
//     createdAt: new Date().toISOString(),
//     businessName: null,
//   },
// ];

// export default function SearchPage() {
//   const [query, setQuery] = useState("");
//   const [isSearching, setIsSearching] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [results, setResults] = useState<DiscoveryItem[]>([]);
//   const [interpretedIntent, setInterpretedIntent] = useState("");

//   const handleSearch = async (searchQuery?: string) => {
//     const q = searchQuery || query;
//     if (!q.trim()) return;

//     setQuery(q);
//     setIsSearching(true);
//     setHasSearched(true);

//     await new Promise((resolve) => setTimeout(resolve, 1500));

//     setInterpretedIntent(
//       `Looking for: ${q} — filtered by location and relevance`
//     );
//     setResults(DEMO_RESULTS);
//     setIsSearching(false);
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-slate-900">AI Search</h1>
//         <p className="text-slate-500 mt-1">
//           Search naturally — NEXA understands what you need
//         </p>
//       </div>

//       <div className="relative mb-6">
//         <div className="flex items-center gap-2 bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus-within:border-indigo-500 transition-colors">
//           <Sparkles size={20} className="text-indigo-400 shrink-0" />
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//             placeholder="Try: &quot;I need a laptop for design under $1000 near me&quot;"
//             className="flex-1 outline-none text-slate-900 placeholder-slate-400"
//           />
//           <button
//             onClick={() => handleSearch()}
//             disabled={isSearching}
//             className="px-4 py-1.5 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors disabled:opacity-50 flex items-center gap-1"
//           >
//             {isSearching ? (
//               <Loader2 size={16} className="animate-spin" />
//             ) : (
//               <Search size={16} />
//             )}
//             Search
//           </button>
//         </div>
//       </div>

//       {!hasSearched && (
//         <div>
//           <p className="text-sm font-medium text-slate-500 mb-3">
//             Try these searches:
//           </p>
//           <div className="flex flex-wrap gap-2">
//             {EXAMPLE_QUERIES.map((eq) => (
//               <button
//                 key={eq}
//                 onClick={() => handleSearch(eq)}
//                 className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-colors"
//               >
//                 &ldquo;{eq}&rdquo;
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {isSearching && (
//         <div className="text-center py-16">
//           <Loader2 size={40} className="mx-auto text-indigo-500 animate-spin mb-4" />
//           <h3 className="font-semibold text-slate-700">AI is searching...</h3>
//           <p className="text-sm text-slate-500 mt-1">
//             Understanding intent, searching listings, ranking by relevance
//           </p>
//         </div>
//       )}

//       {hasSearched && !isSearching && (
//         <div>
//           {interpretedIntent && (
//             <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 mb-4 flex items-center gap-2">
//               <Sparkles size={16} className="text-indigo-500" />
//               <span className="text-sm text-indigo-700">{interpretedIntent}</span>
//             </div>
//           )}

//           <div className="flex items-center justify-between mb-4">
//             <p className="text-sm text-slate-500">
//               {results.length} results found
//             </p>
//             <div className="flex items-center gap-1 text-sm text-slate-500">
//               <MapPin size={14} />
//               Sorted by relevance + distance
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {results.map((item) => (
//               <DiscoveryCard key={item.id} item={item} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";  
  
import { useState, useEffect } from "react";  
import { Search, Sparkles, MapPin, Loader2 } from "lucide-react";  
import DiscoveryCard from "@/components/cards/DiscoveryCard";  
import type { DiscoveryItem } from "@/types";  
import { api } from "@/lib/api";  
  
const EXAMPLE_QUERIES = [  
  "Show me tech events near me tonight",  
  "Find a used bike under $300 nearby",  
  "Best coffee deals within 1 mile",  
  "I need a laptop for design under $1000",  
  "Photography services near downtown",  
  "Free events this weekend",  
];  
  
export default function SearchPage() {  
  const [query, setQuery] = useState("");  
  const [isSearching, setIsSearching] = useState(false);  
  const [hasSearched, setHasSearched] = useState(false);  
  const [results, setResults] = useState<DiscoveryItem[]>([]);  
  const [interpretedIntent, setInterpretedIntent] = useState("");  
  
  // Auto-search with debounce  
  useEffect(() => {  
    if (!query.trim()) {  
      setResults([]);  
      setHasSearched(false);  
      return;  
    }  
  
    const timer = setTimeout(() => {  
      handleSearch();  
    }, 500); // 500ms debounce  
  
    return () => clearTimeout(timer);  
  }, [query]);  
  
  const handleSearch = async () => {  
    if (!query.trim()) return;  
  
    setIsSearching(true);  
    setHasSearched(true);  
  
    try {  
      // Get user location (default to NYC for now)  
      const latitude = 40.7128;  
      const longitude = -74.006;  
  
      const response = await api.ai.search({  
        query: query,  
        latitude: latitude,  
        longitude: longitude,  
        radiusKm: 10,  
      });  
  
      setInterpretedIntent(response.interpretedIntent);  
        
      // Convert RecommendedItem to DiscoveryItem  
      const items: DiscoveryItem[] = response.results.map((item) => ({  
        contentType: item.contentType as "Listing" | "Event" | "Offer",  
        id: item.contentId,  
        title: item.title,  
        description: item.description,  
        imageUrl: item.imageUrl,  
        category: item.category,  
        latitude: null,  
        longitude: null,  
        distanceKm: item.distanceKm,  
        price: null,  
        likeCount: 0,  
        saveCount: 0,  
        createdAt: new Date().toISOString(),  
        businessName: null,  
      }));  
  
      setResults(items);  
    } catch (error) {  
      console.error("Error searching:", error);  
      setInterpretedIntent("Error performing search");  
      setResults([]);  
    } finally {  
      setIsSearching(false);  
    }  
  };  
  
  return (  
    <div className="max-w-4xl mx-auto px-4 py-8">  
      <div className="mb-8">  
        <h1 className="text-2xl font-bold text-slate-900">AI Search</h1>  
        <p className="text-slate-500 mt-1">  
          Search naturally — NEXA understands what you need  
        </p>  
      </div>  
  
      <div className="relative mb-6">  
        <div className="flex items-center gap-2 bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus-within:border-indigo-500 transition-colors">  
          <Sparkles size={20} className="text-indigo-400 shrink-0" />  
          <input  
            type="text"  
            value={query}  
            onChange={(e) => setQuery(e.target.value)}  
            placeholder="Try: &quot;I need a laptop for design under $1000 near me&quot;"  
            className="flex-1 outline-none text-slate-900 placeholder-slate-400"  
          />  
          {isSearching && <Loader2 size={16} className="animate-spin text-indigo-500" />}  
        </div>  
      </div>  
  
      {!hasSearched && (  
        <div>  
          <p className="text-sm font-medium text-slate-500 mb-3">  
            Try these searches:  
          </p>  
          <div className="flex flex-wrap gap-2">  
            {EXAMPLE_QUERIES.map((eq) => (  
              <button  
                key={eq}  
                onClick={() => setQuery(eq)}  
                className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-colors"  
              >  
                &ldquo;{eq}&rdquo;  
              </button>  
            ))}  
          </div>  
        </div>  
      )}  
  
      {isSearching && (  
        <div className="text-center py-16">  
          <Loader2 size={40} className="mx-auto text-indigo-500 animate-spin mb-4" />  
          <h3 className="font-semibold text-slate-700">AI is searching...</h3>  
          <p className="text-sm text-slate-500 mt-1">  
            Understanding intent, searching listings, ranking by relevance  
          </p>  
        </div>  
      )}  
  
      {hasSearched && !isSearching && (  
        <div>  
          {interpretedIntent && (  
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 mb-4 flex items-center gap-2">  
              <Sparkles size={16} className="text-indigo-500" />  
              <span className="text-sm text-indigo-700">{interpretedIntent}</span>  
            </div>  
          )}  
  
          <div className="flex items-center justify-between mb-4">  
            <p className="text-sm text-slate-500">  
              {results.length} results found  
            </p>  
            <div className="flex items-center gap-1 text-sm text-slate-500">  
              <MapPin size={14} />  
              Sorted by relevance + distance  
            </div>  
          </div>  
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">  
            {results.map((item) => (  
              <DiscoveryCard key={item.id} item={item} />  
            ))}  
          </div>  
        </div>  
      )}  
    </div>  
  );  
}