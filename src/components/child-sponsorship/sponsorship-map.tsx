"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

/*
  The countries the programme runs in. Latitude and longitude are owned by the code, like the
  section icons, so nothing can break them.

  This file is loaded with ssr: false, because Leaflet needs the browser.
*/
/* The free CARTO basemaps key, inlined at build time. Empty means the tiles carry a watermark. */
const CARTO_API_KEY = process.env.NEXT_PUBLIC_CARTO_API_KEY ?? "";

const COUNTRIES = [
  { name: "Morocco", lat: 31.8, lng: -7.1 },
  { name: "Tunisia", lat: 34, lng: 9.5 },
  { name: "Lebanon", lat: 33.9, lng: 35.5 },
  { name: "Palestine", lat: 31.9, lng: 35.2 },
  { name: "Yemen", lat: 15.6, lng: 48 },
  { name: "Somalia", lat: 5.2, lng: 46.2 },
  { name: "Kashmir", lat: 34.1, lng: 74.8 },
  { name: "India", lat: 22, lng: 79 },
  { name: "Bangladesh", lat: 23.7, lng: 90.4 },
  { name: "Rohingya", lat: 20.1, lng: 93 },
  { name: "Uyghur", lat: 41.5, lng: 85 },
  { name: "Guyana", lat: 5, lng: -58.9 },
];

/* The whole world, so the map stops at its edges instead of repeating. */
const WORLD_BOUNDS: [[number, number], [number, number]] = [
  [-85, -180],
  [85, 180],
];

/* Every zoom step, and the step the fit zoom is rounded up to. */
const ZOOM_SNAP = 0.5;

/*
  A dot with a ring that keeps pulsing out of it. Each country starts a little after the one
  before, so they never all fire together.

  The ring grows to about six times the dot, which is how the design reads: a white-haloed dot
  inside one wide, thin red circle.
*/
function dotIcon(delayMs: number) {
  return L.divIcon({
    className: "",
    html:
      '<span class="relative grid size-4 place-items-center">' +
      '<span class="absolute inset-0 animate-map-ping rounded-full border border-action"' +
      ` style="animation-delay:${delayMs}ms"></span>` +
      '<span class="relative size-2 rounded-full bg-action ring-[3px] ring-white"></span>' +
      "</span>",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

/*
  Keeps the map covering its box. The smallest zoom that still covers the box becomes the
  smallest zoom the visitor can reach, so zooming out can never show empty space beside the
  world.
*/
function FitToBox() {
  const map = useMap();
  const hasFitted = useRef(false);

  useEffect(() => {
    function apply() {
      const size = map.getSize();

      /* A world is 256px per tile and square, so the longer side of the box decides. */
      const raw = Math.log2(Math.max(size.x, size.y, 256) / 256);
      const fit = Math.ceil(raw / ZOOM_SNAP) * ZOOM_SNAP;

      map.setMinZoom(fit);

      if (!hasFitted.current) {
        hasFitted.current = true;
        map.setZoom(fit);
      } else if (map.getZoom() < fit) {
        map.setZoom(fit);
      }
    }

    apply();
    map.on("resize", apply);

    return () => {
      map.off("resize", apply);
    };
  }, [map]);

  return null;
}

export function SponsorshipMap() {
  return (
    <MapContainer
      center={[20, 20]}
      zoom={2}
      minZoom={1}
      maxZoom={5}
      zoomSnap={ZOOM_SNAP}
      zoomControl={false}
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      /* Stop the map at the edges of the world, so it cannot be dragged round for ever. */
      maxBounds={WORLD_BOUNDS}
      maxBoundsViscosity={1}
      className="h-full w-full"
    >
      {/* Raises the smallest zoom, and the opening zoom, to the one that fills the box. */}
      <FitToBox />

      {/*
        CARTO light tiles, the same source as the Reports map. OpenStreetMap's own tile server
        blocked this site with a 403, because it is not meant for a live site. CARTO is free for
        small sites, needs no key, and this host is allowed by the content security policy.
      */}
      <TileLayer
        url={`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=${CARTO_API_KEY}`}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
        /* Without this the world repeats to the left and right for ever. */
        noWrap
      />

      {COUNTRIES.map((country, index) => (
        <Marker
          key={country.name}
          position={[country.lat, country.lng]}
          icon={dotIcon(index * 220)}
        />
      ))}
    </MapContainer>
  );
}
