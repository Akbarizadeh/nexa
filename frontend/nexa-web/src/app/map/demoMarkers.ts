export type MapMarker = {
  id: number;
  title: string;
  lat: number;
  lng: number;
  type: "Listing" | "Event" | "Offer";
  price?: number;
};

type CityConfig = {
  name: string;
  center: [number, number];
  weight: number;
};

const cities: CityConfig[] = [
  { name: "Lisbon", center: [38.7223, -9.1393], weight: 0.4 },
  { name: "Porto", center: [41.1579, -8.6291], weight: 0.25 },
  { name: "Faro", center: [37.0194, -7.9304], weight: 0.15 },
  { name: "Braga", center: [41.5454, -8.4265], weight: 0.1 },
  { name: "Coimbra", center: [40.2033, -8.4103], weight: 0.1 },
];

function randomOffset(range: number) {
  return (Math.random() - 0.5) * range;
}

export function generateDemoMarkers(count: number): MapMarker[] {
  const markers: MapMarker[] = [];

  for (let i = 0; i < count; i++) {
    // انتخاب شهر بر اساس وزن
    const rand = Math.random();
    let cumulative = 0;
    let selectedCity = cities[0];

    for (const city of cities) {
      cumulative += city.weight;
      if (rand <= cumulative) {
        selectedCity = city;
        break;
      }
    }

    markers.push({
      id: i,
      title: `${selectedCity.name} Property ${i + 1}`,
      lat: selectedCity.center[0] + randomOffset(0.25),
      lng: selectedCity.center[1] + randomOffset(0.25),
      type: ["Listing", "Event", "Offer"][
        Math.floor(Math.random() * 3)
      ] as "Listing" | "Event" | "Offer",
      price:
        Math.random() > 0.2
          ? Math.floor(Math.random() * 850000) + 75000
          : undefined,
    });
  }

  return markers;
}
