import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Section, { SectionHeading } from '../ui/Section';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for the default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const position: [number, number] = [41.308, 14.108];

/**
 * La mappa (OpenStreetMap) si carica solo dopo il clic del visitatore:
 * prima di allora nessuna richiesta parte verso server esterni (GDPR).
 */
const MapSection = () => {
  const [show, setShow] = useState(false);

  return (
    <Section background="light">
      <SectionHeading
        title="Visita il Nostro Showroom"
        subtitle="Vieni a vedere di persona le nostre attrezzature e ricevi consigli esperti dal nostro team"
      />

      <motion.div
        className="h-96 rounded-xl overflow-hidden shadow-md bg-primary-50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {show ? (
          <MapContainer center={position} zoom={14} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <div className="text-center">
                  <strong>L'angolo del verde</strong>
                  <br />
                  Via Ceraselle, n 78
                  <br />
                  81059 Caianello (CE)
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 gap-4">
            <MapPin className="h-12 w-12 text-primary-600" />
            <p className="text-lg font-semibold text-gray-800">L'angolo del verde — Caianello (CE)</p>
            <button
              onClick={() => setShow(true)}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
            >
              Mostra la mappa
            </button>
            <p className="text-xs text-gray-500 max-w-md">
              La mappa è fornita da OpenStreetMap: caricandola, il tuo indirizzo IP viene inviato ai loro server.
              Vedi l'<a href="/privacy-policy" className="underline">informativa privacy</a>.
            </p>
          </div>
        )}
      </motion.div>
    </Section>
  );
};

export default MapSection;
