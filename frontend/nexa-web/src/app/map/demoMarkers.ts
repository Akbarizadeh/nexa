export type MarkerType = "Listing" | "Event" | "Offer";

export interface MapMarker {
  id: string;
  type: MarkerType;
  title: string;
  lat: number;
  lng: number;
  price?: number;
}

const CITIES = [
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "Chicago", lat: 41.8781, lng: -87.6298 },
  { name: "Houston", lat: 29.7604, lng: -95.3698 },
  { name: "Miami", lat: 25.7617, lng: -80.1918 },
  { name: "Seattle", lat: 47.6062, lng: -122.3321 },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { name: "Boston", lat: 42.3601, lng: -71.0589 },
  { name: "Denver", lat: 39.7392, lng: -104.9903 },
  { name: "Atlanta", lat: 33.749, lng: -84.388 },
  { name: "Las Vegas", lat: 36.1699, lng: -115.1398 },
  { name: "Phoenix", lat: 33.4484, lng: -112.074 },
  { name: "Dallas", lat: 32.7767, lng: -96.797 },
  { name: "San Diego", lat: 32.7157, lng: -117.1611 },
  { name: "Philadelphia", lat: 39.9526, lng: -75.1652 },
];

const TITLES = {
  Listing: ["MacBook Pro", "iPhone 15", "Apartment", "SUV Car", "Gaming PC", "Luxury Watch"],
  Event: ["Tech Meetup", "Startup Pitch", "Music Festival", "Food Expo", "Art Show"],
  Offer: ["Coffee Discount", "50% Off Shoes", "Gym Membership Deal", "Free Dessert", "Black Friday Deal"],
};

function randomOffset() {
  return (Math.random() - 0.5) * 0.2; // پراکندگی طبیعی
}

function randomPrice(type: MarkerType) {
  if (type === "Listing") return Math.floor(Math.random() * 2000) + 50;
  if (type === "Offer") return Math.floor(Math.random() * 100) + 5;
  return undefined;
}

export function generateDemoMarkers(count = 500): MapMarker[] {
  const markers: MapMarker[] = [];

  for (let i = 0; i < count; i++) {
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];

    const types: MarkerType[] = ["Listing", "Event", "Offer"];
    const type = types[Math.floor(Math.random() * types.length)];

    const titles = TITLES[type];
    const title = titles[Math.floor(Math.random() * titles.length)];

    markers.push({
      id: `${i + 1}`,
      type,
      title,
      lat: city.lat + randomOffset(),
      lng: city.lng + randomOffset(),
      price: randomPrice(type),
    });
  }

  return markers;
}
