"use client";

import Map from "react-map-gl";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapWrapper() {
  return (
    <section className="h-full w-full">
      <Map
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: "width: 100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      />
    </section>
  );
}
