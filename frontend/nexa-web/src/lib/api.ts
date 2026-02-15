import type {  
  DiscoveryResponse,  
  ListingResponse,  
  EventResponse,  
  OfferResponse,  
  BusinessResponse,  
  AiListingFromImageResponse,  
  AiSearchResponse,  
} from "@/types";  
  
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5288";  
  
async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {  
  const res = await fetch(`${API_URL}${path}`, {  
    headers: { "Content-Type": "application/json" },  
    ...options,  
  });  
  
  if (!res.ok) {  
    throw new Error(`API Error: ${res.status} ${res.statusText}`);  
  }  
  
  return res.json();  
}  
  
export const api = {  
  discovery: {  
    get(params: {  
      latitude: number;  
      longitude: number;  
      radiusKm?: number;  
      category?: string;  
      sortBy?: string;  
      page?: number;  
      pageSize?: number;  
    }) {  
      const searchParams = new URLSearchParams();  
      Object.entries(params).forEach(([key, value]) => {  
        if (value !== undefined) searchParams.set(key, String(value));  
      });  
      return fetchApi<DiscoveryResponse>(  
        `/api/discovery?${searchParams.toString()}`  
      );  
    },  
  },  
  
  listings: {  
    getAll(params?: {  
      latitude?: number;  
      longitude?: number;  
      radiusKm?: number;  
      category?: string;  
      minPrice?: number;  
      maxPrice?: number;  
      page?: number;  
      pageSize?: number;  
    }) {  
      const searchParams = new URLSearchParams();  
      if (params) {  
        Object.entries(params).forEach(([key, value]) => {  
          if (value !== undefined) searchParams.set(key, String(value));  
        });  
      }  
      return fetchApi<ListingResponse[]>(  
        `/api/listings?${searchParams.toString()}`  
      );  
    },  
  
    getById(id: string) {  
      return fetchApi<ListingResponse>(`/api/listings/${id}`);  
    },  
  
    create(data: {  
      title: string;  
      description?: string;  
      category: string;  
      tags: string[];  
      imageUrls: string[];  
      price?: number;  
      priceMin: number;  
      priceMax: number;  
      type: string;  
      latitude?: number;  
      longitude?: number;  
    }) {  
      return fetchApi<ListingResponse>("/api/listings", {  
        method: "POST",  
        body: JSON.stringify(data),  
      });  
    },  
  },  
  
  events: {  
    getAll(params?: {  
      latitude?: number;  
      longitude?: number;  
      radiusKm?: number;  
      category?: string;  
      page?: number;  
      pageSize?: number;  
    }) {  
      const searchParams = new URLSearchParams();  
      if (params) {  
        Object.entries(params).forEach(([key, value]) => {  
          if (value !== undefined) searchParams.set(key, String(value));  
        });  
      }  
      return fetchApi<EventResponse[]>(  
        `/api/events?${searchParams.toString()}`  
      );  
    },  
  
    getById(id: string) {  
      return fetchApi<EventResponse>(`/api/events/${id}`);  
    },  
  },  
  
  offers: {  
    getAll(params?: {  
      latitude?: number;  
      longitude?: number;  
      radiusKm?: number;  
      category?: string;  
      page?: number;  
      pageSize?: number;  
    }) {  
      const searchParams = new URLSearchParams();  
      if (params) {  
        Object.entries(params).forEach(([key, value]) => {  
          if (value !== undefined) searchParams.set(key, String(value));  
        });  
      }  
      return fetchApi<OfferResponse[]>(  
        `/api/offers?${searchParams.toString()}`  
      );  
    },  
  
    getById(id: string) {  
      return fetchApi<OfferResponse>(`/api/offers/${id}`);  
    },  
  },  
  
  business: {  
    getAll(params?: {  
      latitude?: number;  
      longitude?: number;  
      radiusKm?: number;  
      category?: string;  
    }) {  
      const searchParams = new URLSearchParams();  
      if (params) {  
        Object.entries(params).forEach(([key, value]) => {  
          if (value !== undefined) searchParams.set(key, String(value));  
        });  
      }  
      return fetchApi<BusinessResponse[]>(  
        `/api/business?${searchParams.toString()}`  
      );  
    },  
  
    getById(id: string) {  
      return fetchApi<BusinessResponse>(`/api/business/${id}`);  
    },  
  },  
  
  ai: {  
    listingFromImage(imageBase64: string) {  
      return fetchApi<AiListingFromImageResponse>(  
        "/api/ai/listing-from-image",  
        {  
          method: "POST",  
          body: JSON.stringify({ imageBase64 }),  
        }  
      );  
    },  
  
    search(params: {  
      query: string;  
      latitude: number;  
      longitude: number;  
      radiusKm?: number;  
      category?: string;  
      minPrice?: number;  
      maxPrice?: number;  
    }) {  
      return fetchApi<AiSearchResponse>("/api/ai/search", {  
        method: "POST",  
        body: JSON.stringify(params),  
      });  
    },  
  },  
  
  interactions: {  
    add(data: {  
      interactionType: "Like" | "Save" | "Attend" | "View";  
      contentType: "Listing" | "Event" | "Offer";  
      contentId: string;  
    }) {  
      return fetchApi<void>("/api/users/interactions", {  
        method: "POST",  
        body: JSON.stringify(data),  
      });  
    },  
  },  
};