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
  // Milan coordinates (center of the city)
  const position: [number, number] = [45.4642, 9.1900];
  
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
                <strong>GreenPower Attrezzature</strong><br />
                Via Giardino 1234<br />
                Milano, Italia 20100
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </motion.div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="bg-white p-5 rounded-lg shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h4 className="font-semibold mb-2">In Auto</h4>
          <p className="text-gray-600 text-sm">Comodo parcheggio disponibile nel nostro lotto clienti dedicato.</p>
        </motion.div>
        
        <motion.div
          className="bg-white p-5 rounded-lg shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className="font-semibold mb-2">In Autobus</h4>
          <p className="text-gray-600 text-sm">Le linee 42 e 57 fermano proprio di fronte al nostro showroom.</p>
        </motion.div>
        
        <motion.div
          className="bg-white p-5 rounded-lg shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h4 className="font-semibold mb-2">In Metro</h4>
          <p className="text-gray-600 text-sm">Siamo a 5 minuti a piedi dalla fermata metro Stazione Centrale.</p>
        </motion.div>
        
        <motion.div
          className="bg-white p-5 rounded-lg shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h4 className="font-semibold mb-2">Orari di Apertura</h4>
          <p className="text-gray-600 text-sm">Lunedì-Venerdì: 9:00-18:00<br />Sabato: 9:00-13:00</p>
        </motion.div>
      </div>
    </Section>
  );
};

export default MapSection;