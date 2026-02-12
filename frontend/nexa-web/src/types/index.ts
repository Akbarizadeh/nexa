export interface ListingResponse {
  id: string;
  sellerId: string;
  sellerName: string;
  businessId: string | null;
  businessName: string | null;
  title: string;
  description: string | null;
  category: string;
  tags: string[];
  imageUrls: string[];
  priceMin: number;
  priceMax: number;
  price: number | null;
  type: "Product" | "Service";
  status: "Active" | "Sold" | "Expired" | "Draft";
  latitude: number | null;
  longitude: number | null;
  aiConfidenceScore: number | null;
  viewCount: number;
  likeCount: number;
  saveCount: number;
  createdAt: string;
}

export interface EventResponse {
  id: string;
  businessId: string;
  businessName: string;
  title: string;
  description: string | null;
  category: string;
  tags: string[];
  imageUrl: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  startDate: string;
  endDate: string | null;
  price: number | null;
  isFree: boolean;
  maxAttendees: number | null;
  attendeeCount: number;
  viewCount: number;
  likeCount: number;
  saveCount: number;
  createdAt: string;
}

export interface OfferResponse {
  id: string;
  businessId: string;
  businessName: string;
  title: string;
  description: string | null;
  category: string;
  tags: string[];
  imageUrl: string | null;
  originalPrice: number | null;
  discountedPrice: number | null;
  discountPercent: number | null;
  latitude: number | null;
  longitude: number | null;
  startDate: string;
  endDate: string;
  viewCount: number;
  likeCount: number;
  saveCount: number;
  createdAt: string;
}

export interface BusinessResponse {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  coverImageUrl: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  category: string | null;
  isVerified: boolean;
  createdAt: string;
  eventCount: number;
  listingCount: number;
  offerCount: number;
}

export interface DiscoveryItem {
  contentType: "Listing" | "Event" | "Offer";
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  category: string;
  latitude: number | null;
  longitude: number | null;
  distanceKm: number;
  price: number | null;
  likeCount: number;
  saveCount: number;
  createdAt: string;
  businessName: string | null;
}

export interface DiscoveryResponse {
  items: DiscoveryItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface AiListingFromImageResponse {
  title: string;
  description: string;
  category: string;
  tags: string[];
  priceMin: number;
  priceMax: number;
  confidenceScore: number;
}

export interface AiSearchResponse {
  interpretedIntent: string;
  results: RecommendedItem[];
}

export interface RecommendedItem {
  contentType: string;
  contentId: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  category: string;
  relevanceScore: number;
  distanceKm: number;
}
