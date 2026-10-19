"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { MapContainer, Marker, TileLayer, Tooltip, useMap, ZoomControl } from "react-leaflet";

/*
  The countries the page pins. Latitude and longitude are owned by the code, like the section
  icons, so the admin cannot break them.

  This file is loaded with ssr: false, because Leaflet needs the browser.
*/

/* The free CARTO basemaps key, inlined at build time. Empty means the tiles carry a watermark. */
const CARTO_API_KEY = process.env.NEXT_PUBLIC_CARTO_API_KEY ?? "";

const MAP_PINS = [
  { name: "Morocco", lat: 31.8, lng: -7.1 },
  { name: "Lebanon", lat: 33.9, lng: 35.5 },
  { name: "Occupied Palestinian Territory", lat: 31.9, lng: 35.2 },
  { name: "Jordan", lat: 31.2, lng: 36.5 },
  { name: "Syria", lat: 34.8, lng: 39 },
  { name: "Turkey", lat: 39, lng: 35.2 },
  { name: "Egypt", lat: 26.8, lng: 30.8 },
  { name: "Sudan", lat: 15.5, lng: 30.2 },
  { name: "Yemen", lat: 15.6, lng: 48 },
  { name: "Somalia", lat: 5.2, lng: 46.2 },
  { name: "Uganda", lat: 1.4, lng: 32.3 },
  { name: "Kenya", lat: 0.2, lng: 37.9 },
  { name: "Pakistan", lat: 30.4, lng: 69.3 },
  { name: "Afghanistan", lat: 33.9, lng: 67.7 },
  { name: "India", lat: 22, lng: 79 },
  { name: "Bangladesh", lat: 23.7, lng: 90.4 },
  { name: "Malaysia", lat: 4.2, lng: 101.9 },
  { name: "Indonesia", lat: -2.5, lng: 118 },
];

/* The whole world, so the map stops at its edges instead of repeating. */
const WORLD_BOUNDS: [[number, number], [number, number]] = [
  [-85, -180],
  [85, 180],
];

/* Every zoom step, and the step the fit zoom is rounded up to. */
const ZOOM_SNAP = 0.5;

/*
  A drawn pin rather than Leaflet's own marker image. The built-in image is fetched from a
  bundler path that breaks in Next, and a drawn pin also lets it carry the brand green.
*/
const PIN_ICON = L.divIcon({
  className: "",
  html:
    '<svg viewBox="0 0 24 24" width="22" height="22" style="filter:drop-shadow(0 1px 1px rgba(0,0,0,0.35))">' +
    '<path d="M12 2.5a7 7 0 0 0-7 7c0 5 7 12 7 12s7-7 7-12a7 7 0 0 0-7-7zm0 9.6a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2z" ' +
    'fill="#29bb24" stroke="#ffffff" stroke-width="1.4"/></svg>',
  iconSize: [22, 22],
  iconAnchor: [11, 22],
  tooltipAnchor: [0, -18],
});

/*
  Keeps the map covering its box. The smallest zoom that still covers the box is made the
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

export function ReportsMap() {
  return (
    <MapContainer
      center={[20, 30]}
      zoom={2}
      minZoom={1}
      maxZoom={6}
      zoomSnap={ZOOM_SNAP}
      zoomControl={false}
      scrollWheelZoom={false}
      /* Stop the map at the edges of the world, so it cannot be dragged round for ever. */
      maxBounds={WORLD_BOUNDS}
      maxBoundsViscosity={1}
      className="h-full w-full"
    >
      {/* Raises the smallest zoom, and the opening zoom, to the one that fills the box. */}
      <FitToBox />
      {/*
        CARTO light tiles. OpenStreetMap's own tile server blocked this site with a 403, because
        it is not meant for a live site. CARTO is free for small sites, needs no key, and this
        host is allowed by the content security policy.
      */}
      <TileLayer
        url={`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=${CARTO_API_KEY}`}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
        /* Without this the world repeats to the left and right for ever. */
        noWrap
      />

      {/* On the right, as the live page has it. */}
      <ZoomControl position="topright" />

      {MAP_PINS.map((pin) => (
        <Marker key={pin.name} position={[pin.lat, pin.lng]} icon={PIN_ICON}>
          <Tooltip direction="top">{pin.name}</Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
