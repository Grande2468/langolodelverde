export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  images: string[];
  shortDescription: string;
  fullDescription: string;
  price: string;
}

export const productCategories: ProductCategory[] = [
  {
    id: 'motocoltivatori-tosaerba',
    name: 'Motocoltivatori e Tosaerba',
    description: 'Potenza e affidabilità per la lavorazione del terreno e la cura del prato'
  },
  {
    id: 'attrezzatura-giardino',
    name: 'Attrezzatura da Giardino',
    description: 'Tutto il necessario per la manutenzione e la bellezza del tuo giardino'
  },
  {
    id: 'ricambi',
    name: 'Ricambi',
    description: 'Componenti originali per mantenere le tue attrezzature sempre efficienti'
  },
  {
    id: 'utensileria',
    name: 'Utensileria',
    description: 'Utensili professionali e accessori di qualità per ogni tipo di lavorazione'
  }
];

export const allProducts: Product[] = [
  {
    id: 'mt-motocoltivatore-001',
    name: 'Motocoltivatore Professionale XP200',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['DSC03943_k1n11c'],
    shortDescription: 'Motocoltivatore professionale con motore a 4 tempi da 6.5 HP',
    fullDescription: 'Caratteristiche principali: Motore a 4 tempi da 6.5 HP, Larghezza di lavoro: 50-90 cm, Profondità di lavoro: fino a 30 cm',
    price: '€ 899,00'
  },
  {
    id: 'ts-garden-master-002',
    name: 'Tosaerba Elettrico Garden Master',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['cld-sample-3'],
    shortDescription: 'Tosaerba elettrico leggero e maneggevole',
    fullDescription: 'Il Garden Master è un tosaerba elettrico silenzioso ed ecologico. Con una larghezza di taglio di XX cm e un capiente cesto di raccolta',
    price: '€ 275,00'
  }
]; 