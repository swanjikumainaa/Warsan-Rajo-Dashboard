// components/ClientSideMap.tsx
import React, { useEffect, useRef } from 'react';
import L, { Icon, Map as LeafletMap } from 'leaflet';

interface LocationData {
  location: string;
  longitude: number;
  latitude: number;
  immunization_rate: number;
}

const ClientSideMap: React.FC<{ locations: LocationData[] }> = ({ locations }) => {
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (locations.length === 0 || mapRef.current) {
      return;
    }

    const L = require('leaflet');

    const bounds = L.latLngBounds(L.latLng(0, 40), L.latLng(12, 52));
    const map = L.map('map', {
      maxBounds: bounds,
      minZoom: 6,
    }).fitBounds(bounds);

    mapRef.current = map;

    const somaliaTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      subdomains: ['a', 'b', 'c'],
      bounds: bounds,
      maxZoom: 6,
      minZoom: 0,
    }).addTo(map);

    locations.forEach((location: LocationData) => {
      const locationIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      const marker = L.marker([location.latitude, location.longitude], { icon: locationIcon }).addTo(map);
      marker.bindPopup(`<b>${location.location}</b><br>Immunization Rate: ${location.immunization_rate}%`);
    });
  }, [locations]);

  return <div id="map" className="bg-white w-[850px] md:w-full py-10 h-[650px] mb-6 md:mb-0"></div>;
//   return <div id="map" style={{ width: '100%', height: '100%' }}></div>;

};

export default ClientSideMap;
