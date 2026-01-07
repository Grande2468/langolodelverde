import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import Section, { SectionHeading } from '../ui/Section';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for the default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapSection = () => {
  const position: [number, number] = [41.308, 14.1080]; // Coordinate aggiornate
  
  return (
    <Section background="light">
      <SectionHeading 
        title="Visita il Nostro Showroom" 
        subtitle="Vieni a vedere di persona le nostre attrezzature e ricevi consigli esperti dal nostro team"
      />
      
      <motion.div
        className="h-96 rounded-xl overflow-hidden shadow-md"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <MapContainer center={position} zoom={14} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              <div className="text-center">
                <strong>L'angolo del verde</strong><br />
                Via Ceraselle, n 78<br />
                81059 Caianello (CE)
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </motion.div>
    </Section>
  );
};

export default MapSection;