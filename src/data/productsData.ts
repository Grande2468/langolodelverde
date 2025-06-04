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
  price?: string;
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
    shortDescription: 'Tosaerba elettrico leggero e maneggevole, perfetto per giardini di medie dimensioni',
    fullDescription: 'Il Garden Master è un tosaerba elettrico silenzioso ed ecologico. Con una larghezza di taglio di XX cm e un capiente cesto di raccolta, garantisce un prato perfetto con minimi sforzi. Altezza di taglio regolabile e design compatto per riporlo facilmente',
    price: '€ 275,00'
  },
  {
    id: 'hyugiu-220x220_2x_cg0h8e',
    name: 'Bio Trituratore cingolato hp 15',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['15HP-220x220_2x_drr57s'],
    shortDescription: 'Bio Trituratore Cingolato 15 HP - Motocarriola con bio-trituratore integrato.',
    fullDescription: 'Bio Trituratore Cingolato 15 HP - Motocarriola con bio-trituratore integrato, dotata di doppio motore a benzina per trasporto e triturazione indipendenti. Potente, autonoma e ideale per lavori intensivi in giardino e campagna.',
    price: '€ 1.299,00'
  },
  {
    id: 'Immagine-WhatsApp-2023-11-12-ore-17.07.57_310a2150-e1723734235216-400x400_ohg61e',
    name: 'RASAERBA UOMO A BORDO YH107',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['Immagine-WhatsApp-2023-11-12-ore-17.07.57_310a2150-e1723734235216-400x400_ohg61e'],
    shortDescription: 'Rasaerba uomo a bordo YH107 – 13.6 HP - Potente trattorino tagliaerba.',
    fullDescription: 'Rasaerba uomo a bordo YH107 – 13.6 HP - Potente trattorino tagliaerba con larghezza di taglio da 107 cm, 5 marce + retromarcia, frizione elettromagnetica e serbatoio da 5 litri. Comfort garantito da sedile ergonomico e cesto da 220 L.',
    price: '€ 2.499,00'
  },
  {
    id: 'ts-gardden-master-002',
    name: 'Motozappa hp 4',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['B-003-e1530044176939-125x125_2x_imbmlt'],
    shortDescription: 'Motozappa hp 4 – cc 139 – motore benzina 4 tempi – larghezza fresa mm 360',
    fullDescription: 'Motozappa hp 4 – cc 139 – motore benzina 4 tempi – larghezza fresa mm 360',
    price: '€ 299,00',
  },
  {
    id: 'ts-garden-masfterg-002',
    name: 'Tosaerba Elettrico Garden Master',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['cld-sample-3'], // Sostituisci con i tuoi Public ID di Cloudinary
    shortDescription: 'Transpallet elettrico pratico e robusto, perfetto per sollevare e spostare pallet senza fatica. Ideale per magazzini',
    fullDescription: `Transpallet elettrico pratico e robusto, perfetto per sollevare e spostare pallet senza fatica. Ideale per magazzini`,
  },
  {
    id: 'ts-garden-mayster-002',
    name: 'Motozappa cc 52',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['B-004-e1530044650671-125x125_2x_temg01'], // Sostituisci con i tuoi Public ID di Cloudinary
    shortDescription: 'Motozappa cc 52 – kw 1.9 – motore miscela 2 tempi – larghezza fresa mm 300',
    fullDescription: `Motozappa cc 52 – kw 1.9 – motore miscela 2 tempi – larghezza fresa mm 300`,
  },
  {
    id: 'Immagine-2024-08-02-103427-125x125_2x_j8mlzm',
    name: 'Motore pompa Acqua 22 bar / 30 bar',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['Immagine-2024-08-02-103427-125x125_2x_j8mlzm'],
    shortDescription: 'Motore Pompe dell\'acqua',
    fullDescription: 'Motore Pompe dell\'acqua',
    price: '€ 199,00'
  },
  {
    id: 'Immagine-WhatsApp-2023-11-12-ore-17.07.57_cebd0127-220x220_2x_o1socj',
    name: 'RASAERBA UOMO A BORDO LH63',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['Immagine-WhatsApp-2023-11-12-ore-17.07.57_cebd0127-220x220_2x_o1socj'],
    shortDescription: 'Rasaerba uomo a bordo LH63 – 5.5 HP - Compatto e maneggevole, con taglio da 61 cm',
    fullDescription: 'Rasaerba uomo a bordo LH63 – 5.5 HP - Compatto e maneggevole, con taglio da 61 cm, 4 marce + retromarcia, frizione elettromagnetica e cesto da 150 L. Ideale per giardini di medie dimensioni.',
    price: '€ 1.899,00'
  },
  {
    id: 'Immagine-WhatsApp-2023-11-12-ore-17.07.57_ebc28632-e1723733075115-125x125_2x_jdz89j',
    name: 'RASAERBA UOMO A BORDO YH84',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['Immagine-WhatsApp-2023-11-12-ore-17.07.57_ebc28632-e1723733075115-125x125_2x_jdz89j'], // Sostituisci con i tuoi Public ID di Cloudinary
    shortDescription: 'RASAERBA UOMO A BORDO YH84',
    fullDescription: `RASAERBA UOMO A BORDO YH84`,
  },
  {
    id: 'Immagine-WhatsApp-2024-02-08-ore-15.57.23_0c6a2893-220x220_2x_rz7iij',
    name: 'Motocarriola Cingolata Auto-caricante D350HA',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['Immagine-WhatsApp-2024-02-08-ore-15.57.23_0c6a2893-220x220_2x_rz7iij'], // Sostituisci con i tuoi Public ID di Cloudinary
    shortDescription: 'Motocarriola Cingolata Autocaricante D350HA',
    fullDescription: `Motocarriola Cingolata Autocaricante D350HA`,
  },
  {
    id: 'Immagine-WhatsApp-2024-02-08-ore-15.57.23_47219f59-220x220_2x_rlfxgc',
    name: 'Motocarriola D30MD',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['Immagine-WhatsApp-2024-02-08-ore-15.57.23_47219f59-220x220_2x_rlfxgc'],
    shortDescription: 'Motocarriola D350HA – 6.5 HP - Motocarriola cingolata con carico max 300 kg',
    fullDescription: `Motocarriola D350HA – 6.5 HP - Motocarriola cingolata con carico max 300 kg, cambio 3+1, cassone ribaltabile e motore Ducar 196cc. Ideale per terreni in pendenza fino al 20%.`,
    price: '€ 1.599,00',
  },
  {
    id: 'Trattore-B001-e1530043946669-220x220_2x_xqobel',
    name: 'Motocoltivatore hp 6.5',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['Trattore-B001-e1530043946669-220x220_2x_xqobel'], // Sostituisci con i tuoi Public ID di Cloudinary
    shortDescription: 'Motocoltivatore hp 6.5 – cc 196 – motore a benzina – larghezza fresa mm 500 – fresa posteriore',
    fullDescription: `Motocoltivatore hp 6.5 – cc 196 – motore a benzina – larghezza fresa mm 500 – fresa posteriore`,
    price: '€ 499,00',
  },
  {
    id: 'trivella-gd-52-e1530034035272-125x125_2x_up4ryt',
    name: 'Trivella cc 52',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['cld-sample-3'], // Sostituisci con i tuoi Public ID di Cloudinary
    shortDescription: 'Trivella gd 52 – kw 1.9 – impugnatura registrabile – punta mm 100 o 150 inclusa',
    fullDescription: `Trivella gd 52 – kw 1.9 – impugnatura registrabile – punta mm 100 o 150 inclusa`,
    price: '€ 199,00',
  },
  {
    id: 'WhatsApp_Image_2024-08-01_at_09.30.22-removebg-preview-250x250_uociaf',
    name: 'Motosega da potatura Carving CS 3100',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['cld-sample-3'], // Sostituisci con i tuoi Public ID di Cloudinary
    shortDescription: 'Motosega da potatura Carving 25 ULTRALEGGERA',
    fullDescription: `Motosega da potatura Carving 25 ULTRALEGGERA`,
    price: '€ 299,00',
  },
  {
    id: '6.5HP-220x220_2x_pt3pqc',
    name: 'Bio trituratore benzina hp 6.5',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['cld-sample-3'], // Sostituisci con i tuoi Public ID di Cloudinary
    shortDescription: 'Bio trituratore benzina hp 6.5',
    fullDescription: `Bio trituratore benzina hp 6.5`,
    price: '€ 499,00',
  },
  {
    id: 'spr16eb-e1723726090894-125x125_2x_owse1n',
    name: 'POMPA IRRORAZIONE A BATTERIA',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['cld-sample-3'], // Sostituisci con i tuoi Public ID di Cloudinary
    shortDescription: 'POMPA IRRORAZIONE A BATTERIA',
    fullDescription: `POMPA IRRORAZIONE A BATTERIA`,
    price: '€ 199,00',
  },
  {
    id: '15HP-220x220_2x_drr57s',
    name: 'Bio trituratore benzina hp 6.5',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['cld-sample-3'], // Sostituisci con i tuoi Public ID di Cloudinary
    shortDescription: 'Bio trituratore benzina hp 6.5',
    fullDescription: `Bio trituratore benzina hp 6.5`,
    price: '€ 499,00',
  },
  {
    id: '25hp-220x220_2x_iam7hy',
    name: 'Bio Trituratore Idraulico 25 hp',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['cld-sample-3'], // Sostituisci con i tuoi Public ID di Cloudinary
    shortDescription: 'Bio Trituratore Idraulico 25 hp',
    fullDescription: `Bio Trituratore Idraulico 25 hp`,
    price: '€ 499,00',
  },
  {
    id: '60afa468-f4e7-4d78-a893-bc483bbc8e2b-220x220_2x_apbgrh',
    name: 'Motocarriola Gommata',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['cld-sample-3'], // Sostituisci con i tuoi Public ID di Cloudinary
    shortDescription: 'Motocarriola Gommata',
    fullDescription: `Motocarriola Gommata`,
    price: '€ 199,00',
  },
  {
    id: '20210630_113227-scaled-220x220_2x_k7mwsz',
    name: 'Motosega da taglio CC 38',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['cld-sample-3'], // Sostituisci con i tuoi Public ID di Cloudinary
    shortDescription: 'Motosega da taglio CC 38',
    fullDescription: `Motosega da taglio CC 38`,
    price: '€ 199,00',
  },
  {
    id: '20210630_113306-removebg-preview-400x400_dbnq9q',
    name: 'Motosega da taglio cc 65',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['cld-sample-3'], // Sostituisci con i tuoi Public ID di Cloudinary
    shortDescription: 'Motosega da taglio cc 65',
    fullDescription: `Motosega da taglio cc 65`,
    price: '€ 199,00',
  },
  {
    id: 'B-002-e1530044457886-125x125_2x_xnkidy',
    name: 'Motozappa hp 6.5',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['cld-sample-3'], // Sostituisci con i tuoi Public ID di Cloudinary
    shortDescription: 'Motozappa hp 6.5 – cc 196 – motore benzina 4 tempi – larghezza fresa mm 360',
    fullDescription: `Motozappa hp 6.5 – cc 196 – motore benzina 4 tempi – larghezza fresa mm 360`,
    price: '€ 299,00',
  },
  

  // Esempi per Attrezzatura da Giardino
  {
    id: 'ag-set-base-003',
    name: 'Tagliasiepi Makota',
    categoryId: 'attrezzatura-giardino',
    images: ['DSC03908_fs8dwv'], // Sostituisci con i tuoi Public ID di Cloudinary
    shortDescription: 'Tagliasiepi elettrico Makota, ideale per la potatura precisa di siepi e arbusti. Leggero, maneggevole e dotato di lame affilate per un taglio netto e sicuro. Ottimo per mantenere in ordine il giardino con facilità.',
    fullDescription: `Tagliasiepi elettrico Makota, ideale per la potatura precisa di siepi e arbusti. Leggero, maneggevole e dotato di lame affilate per un taglio netto e sicuro. Ottimo per mantenere in ordine il giardino con facilità.`,
    price: '€ 55',
  },
  {
    id: 'ag-irrigatore-pro-004',
    name: 'Seghetto alternativo Makota',
    categoryId: 'attrezzatura-giardino',
    images: ['DSC03922_mftdhw'], // Sostituisci con i tuoi Public ID di Cloudinary
    shortDescription: 'Seghetto alternativo Makota con velocità regolabile, perfetto per tagli curvi e precisi su legno, plastica e metallo. Struttura compatta, impugnatura ergonomica e lama facilmente sostituibile per un lavoro pulito e veloce.',
    fullDescription: `Seghetto alternativo Makota con velocità regolabile, perfetto per tagli curvi e precisi su legno, plastica e metallo. Struttura compatta, impugnatura ergonomica e lama facilmente sostituibile per un lavoro pulito e veloce.`,
    price: '€ 55',
  },

  // Esempi per Ricambi
  {
    id: 'ru-lama-ts-univ-005',
    name: 'Disco per decespugliatore ',
    categoryId: 'ricambi',
    images: ['20250528_095954_wrcdp9'],
    shortDescription: 'Disco in acciaio ad alte prestazioni, ideale per tagliare erba alta, rovi e sterpaglie. Compatibile con la maggior parte dei decespugliatori, assicura un taglio preciso e potente anche nei lavori più impegnativi.',
    fullDescription: `Disco in acciaio ad alte prestazioni, ideale per tagliare erba alta, rovi e sterpaglie. Compatibile con la maggior parte dei decespugliatori, assicura un taglio preciso e potente anche nei lavori più impegnativi.`,
    price: '€ 22,50',
  },
  {
    id: 'ru-filtro-aria-007',
    name: 'Filo per decespugliatore',
    categoryId: 'ricambi',
    images: ['20250528_100030_ctnbzh'],
    shortDescription: 'Filo in nylon resistente, adatto al taglio di erba e vegetazione leggera. Disponibile in vari diametri e lunghezze, garantisce efficienza e durata per ogni tipo di lavoro di rifinitura e pulizia del verde.',
    fullDescription: `Filo in nylon resistente, adatto al taglio di erba e vegetazione leggera. Disponibile in vari diametri e lunghezze, garantisce efficienza e durata per ogni tipo di lavoro di rifinitura e pulizia del verde.`,
    price: '€ 18,00',
  },
  {
    id: 'ru-filtro-aria-006',
    name: 'Bobina di filo per decespugliatore',
    categoryId: 'ricambi',
    images: ['20250528_100124_lzbiqy'],
    shortDescription: 'Bobina preavvolta con filo in nylon ad alta resistenza, pronta all\'uso e compatibile con la maggior parte delle testine. Ideale per sostituzioni rapide e un taglio continuo e uniforme su erba e vegetazione leggera.',
    fullDescription: `Bobina preavvolta con filo in nylon ad alta resistenza, pronta all\'uso e compatibile con la maggior parte delle testine. Ideale per sostituzioni rapide e un taglio continuo e uniforme su erba e vegetazione leggera.`,
    price: '€ 18,00',
  },
  {
    id: 'ru-filtro-aria-008',
    name: 'Batteria di ricambio Makota 6000 mAh',
    categoryId: 'ricambi',
    images: ['20250528_100405_xst38r'],
    shortDescription: ' Batteria al litio da 18V con capacità di 6000 mAh, compatibile con utensili Makita. Offre un ottimo equilibrio tra durata e peso, ideale per lavori di media intensità. Ricarica rapida e prestazioni costanti.',
    fullDescription: `Batteria al litio da 18V con capacità di 6000 mAh, compatibile con utensili Makita. Offre un ottimo equilibrio tra durata e peso, ideale per lavori di media intensità. Ricarica rapida e prestazioni costanti.`,
    price: '€ 13',
  },
  {
    id: 'ru-filtro-aria-009843',
    name: 'Bobine di filo per decespugliatore',
    categoryId: 'ricambi',
    images: [
      'DSC03936_e0zwem',
      'DSC03938_k1otu9',  // seconda foto20250528_095804_umktnz
      'DSC03940_ol9bwk',
      '20250528_100248_czggtx', 
      '20250528_095804_umktnz',
      '20250528_095710_k0x4v5', // terza foto
    ],
    shortDescription: 'Ampia selezione di bobine di filo in nylon di varie dimensioni e spessori, compatibili con la maggior parte delle testine. Perfette per sostituzioni rapide e per garantire un taglio efficace su erba e vegetazione di diversa densità.',
    fullDescription: `Ampia selezione di bobine di filo in nylon di varie dimensioni e spessori, compatibili con la maggior parte delle testine. Perfette per sostituzioni rapide e per garantire un taglio efficace su erba e vegetazione di diversa densità.`,
    price: '€ 2 - € 2,5- € 10€ ',
  },

  // Esempi per Utensileria
  {
    id: 'ru-filo-decesp-03406',
    name: 'Spruzzatore a benzina ad aria compressa',
    categoryId: 'utensileria',
    images: ['20250528_093941_ysllo1'],
    shortDescription: 'Spruzzatore portatile a motore a benzina, ideale per trattamenti agricoli e giardinaggio. Grazie al sistema ad aria compressa, consente una distribuzione uniforme di liquidi e prodotti fitosanitari su grandi superfici con efficienza e praticità.',
    fullDescription: `Spruzzatore portatile a motore a benzina, ideale per trattamenti agricoli e giardinaggio. Grazie al sistema ad aria compressa, consente una distribuzione uniforme di liquidi e prodotti fitosanitari su grandi superfici con efficienza e praticità.`,
    price: '€ 5',
  },
  {
    id: 'ut-set-chiavi-004548',
    name: 'Set di giraviti con attacco per chiave',
    categoryId: 'utensileria',
    images: ['20250528_095611_xbdbzp'],
    shortDescription: 'Set completo di cacciaviti con punte intercambiabili e impugnatura ergonomica, dotato di attacco per chiave inglese o cricchetto, per aumentare la forza di torsione nei lavori più impegnativi. Perfetto per ogni tipo di intervento di precisione e manutenzione.',
    fullDescription: `Set completo di cacciaviti con punte intercambiabili e impugnatura ergonomica, dotato di attacco per chiave inglese o cricchetto, per aumentare la forza di torsione nei lavori più impegnativi. Perfetto per ogni tipo di intervento di precisione e manutenzione.`,
    price: '€ 5',
  },
  {
    id: 'ut-set-chiavi-23008',
    name: 'Maschera protettiva con visiera',
    categoryId: 'utensileria',
    images: ['20250528_095942_evqm1i'],
    shortDescription: 'Maschera protettiva con visiera in rete metallica per uso con decespugliatori e tagliaerba',
    fullDescription: 'Maschera protettiva con visiera in rete metallica. Protegge il viso da detriti e schizzi mantenendo ottima visibilità',
    price: '€ 5'
  },
  {
    id: 'ut-set-chiavi-00567898',
    name: 'Pompa a mano per irrorazione',
    categoryId: 'utensileria',
    images: ['20250528_094241_feyvkg'],
    shortDescription: 'Pompa manuale per irrorazione di liquidi con serbatoio resistente e lancia regolabile',
    fullDescription: 'Pompa manuale per irrorazione di liquidi. Dotata di serbatoio resistente e lancia regolabile per una distribuzione uniforme',
    price: '€ 60'
  },
  {
    id: 'ut-set-chiavi-0023548',
    name: 'Set di cacciaviti isolati',
    categoryId: 'utensileria',
    images: ['20250528_095249_xhoxbn'],
    shortDescription: 'Set di cacciaviti isolati fino a 1000V, progettati per lavori elettrici in totale sicurezza. Ideali per elettricisti e hobbisti, garantiscono protezione contro le scariche elettriche durante l\'uso su impianti sotto tensione.',
    fullDescription: 'Set di cacciaviti isolati fino a 1000V, progettati per lavori elettrici in totale sicurezza. Ideali per elettricisti e hobbisti, garantiscono protezione contro le scariche elettriche durante l\'uso su impianti sotto tensione.',
    price: '€ 10'
  },
  {
    id: 'ut-set-chiavi-002328',
    name: 'Pistola gonfiagomme ad aria',
    categoryId: 'utensileria',
    images: ['20250528_095547_cqxukt'],
    shortDescription: 'Pistola per il gonfiaggio di pneumatici, compatibile con compressori d\'aria. Dotata di manometro integrato per controllare la pressione in tempo reale, assicura un gonfiaggio preciso e rapido di ruote per auto, moto e attrezzi da giardino.',
    fullDescription: 'Pistola per il gonfiaggio di pneumatici, compatibile con compressori d\'aria. Dotata di manometro integrato per controllare la pressione in tempo reale, assicura un gonfiaggio preciso e rapido di ruote per auto, moto e attrezzi da giardino.',
    price: '€ 8'
  },
  {
    id: 'ut-set-chiavi-034308',
    name: 'Forbici da pota',
    categoryId: 'utensileria',
    images: ['20250528_095413_yhrhia', '20250528_095422_sionl8'],
    shortDescription: 'Forbici da potatura con lame affilate in acciaio',
    fullDescription: 'Forbici da potatura con lame affilate in acciaio. Impugnatura ergonomica e sistema di chiusura di sicurezza',
    price: '€ 2 - € 6'
  },
  {
    id: 'ut-set-chiavi-00824543',
    name: 'Punte per trapano',
    categoryId: 'utensileria',
    images: ['20250528_095524_wyspk5'],
    shortDescription: 'Set di punte in acciaio ad alta resistenza',
    fullDescription: 'Set di punte in acciaio ad alta resistenza. Compatibili con tutti i trapani standard',
    price: '€ 10'
  },
  {
    id: 'ut-set-chidsfavi-008',
    name: 'Pistola ingrassatrice',
    categoryId: 'utensileria',
    images: ['20250528_095214_t0i0o4'],
    shortDescription: 'Set completo con pistola ingrassatrice manuale, tubi flessibili e raccordi',
    fullDescription: 'Set completo con pistola ingrassatrice manuale, tubi flessibili e raccordi. Ideale per la lubrificazione precisa',
    price: '€ 15'
  },
  {
    id: 'ut-set-chiavi-008',
    name: ' Fasce di sollevamento ',
    categoryId: 'utensileria',
    images: [
      '20250528_095204_a6an86',
      '20250528_095504_j4t4wb',

    ],
    shortDescription: 'Fasce robuste in poliestere ad alta resistenza, ideali per il sollevamento e il trasporto in sicurezza di carichi pesanti. Utilizzate in ambito edile, agricolo e industriale, garantiscono massima affidabilità grazie alla struttura rinforzata e alle cuciture ad alta tenuta.',
    fullDescription: `Fasce robuste in poliestere ad alta resistenza, ideali per il sollevamento e il trasporto in sicurezza di carichi pesanti. Utilizzate in ambito edile, agricolo e industriale, garantiscono massima affidabilità grazie alla struttura rinforzata e alle cuciture ad alta tenuta.`,
    price: '€ 3 - € 12',
  },
  {
    id: 'ut-set-chiavi-008565',
    name: 'Tagliatubi',
    categoryId: 'utensileria',
    images: [
      '20250528_095429_ahjyig',
      '20250528_095446_pq0kfn',
    ],
    shortDescription: 'Utensile manuale progettato per tagliare con precisione tubi in plastica, rame, alluminio o acciaio. Dotato di lama affilata e sistema a rotella regolabile, garantisce tagli netti e senza sbavature con il minimo sforzo.',
    fullDescription: `Utensile manuale progettato per tagliare con precisione tubi in plastica, rame, alluminio o acciaio. Dotato di lama affilata e sistema a rotella regolabile, garantisce tagli netti e senza sbavature con il minimo sforzo.`,
    price: '€ 6- € 7',
  },
  {
    id: 'ut-set-chiavi-008532365',
    name: 'Smerigliatrice angolare a batteria Makita',
    categoryId: 'utensileria',
    images: [
      '20250528_090608_cajh0c',
    ],
    shortDescription: 'Smerigliatrice angolare a batteria da 18V compatibile Makota, ideale per tagliare, smerigliare e levigare metallo, pietra e altri materiali. Design compatto, impugnatura ergonomica e protezione regolabile per un lavoro preciso e sicuro anche senza cavi..',
    fullDescription: `Smerigliatrice angolare a batteria da 18V compatibile Makota, ideale per tagliare, smerigliare e levigare metallo, pietra e altri materiali. Design compatto, impugnatura ergonomica e protezione regolabile per un lavoro preciso e sicuro anche senza cavi.`,
    price: '€ 70',
  },
  {
    id: 'ut-set-chiavi-00fr8de565',
    name: 'Mini motosega a batteria 26V',
    categoryId: 'utensileria',
    images: [
      '20250528_084306_phitpc',
    ],
    shortDescription: '20250528_084306_phitpc',
    fullDescription: `20250528_084306_phitpc`,
    price: '€ 60',
  },
  {
    id: 'ut-set-chiavi-0ded08565',
    name: 'Pistola ad aria calda Makota',
    categoryId: 'utensileria',
    images: [
      '20250528_092704_empkcf',
    ],
    shortDescription: 'Pistola ad aria calda professionale Makota, ideale per lavori di saldatura e decapaggio',
    fullDescription: `Pistola ad aria calda professionale Makota, ideale per lavori di saldatura, decapaggio vernici, piegatura tubi e termoretrazione. Offre regolazione precisa della temperatura e del flusso d'aria per adattarsi a diverse applicazioni con massima efficienza e sicurezza.`,
    price: '€ 25',
  },
  {
    id: 'ut-set-chiavi-008fvdfvcdvs565',
    name: 'Kit 4 in 1 Makota - Flex, Avvitatore a percussione, Avvitatore a impulso, Martello tassellatore',
    categoryId: 'utensileria',
    images: ['20250528_093337_emml5o'],
    shortDescription: 'Kit professionale 4 in 1 Makota per lavori edili e di manutenzione. Include smerigliatrice, avvitatore a percussione, avvitatore a impulso e martello tassellatore.',
    fullDescription: 'Kit professionale 4 in 1 Makota per lavori edili e di manutenzione. Include smerigliatrice, avvitatore a percussione, avvitatore a impulso e martello tassellatore. Alimentazione a batteria.',
    price: '€ 120'
  },
  {
    id: 'ut-set-chiavi-008fvdfvcdvddvdvs565',
    name: 'Saldatore per plastica Makota',
    categoryId: 'utensileria',
    images: ['20250528_091938_cxpfgd'],
    shortDescription: 'Saldatore per plastica Makota, ideale per riparazioni e giunzioni su materiali plastici di vario tipo. Offre controllo preciso della temperatura e punta intercambiabile per saldature resistenti e durature.',
    fullDescription: 'Saldatore per plastica Makota, ideale per riparazioni e giunzioni su materiali plastici di vario tipo. Offre controllo preciso della temperatura e punta intercambiabile per saldature resistenti e durature.',
    price: '€ 40'
  },
  {
    id: 'ut-set-chiavi-008fvdfvcdvddvdcdddvs565',
    name: 'Soffiatore a batteria Makota',
    categoryId: 'utensileria',
    images: ['20250528_084740_pdxn2i'],
    shortDescription: 'Soffiatore a batteria Makota, leggero e potente, ideale per la pulizia di foglie e detriti in giardini e cortili.',
    fullDescription: 'Soffiatore a batteria Makota, leggero e potente, ideale per la pulizia di foglie e detriti in giardini e cortili. Design ergonomico e batteria ad alta capacità.',
    price: '€ 60'
  },
  {
    id: 'ut-set-chiavi-008fvdfvcdvdfdddvssxsdcdddvs565',
    name: 'Kit forbice/cesoia a batteria Makota - 3 misure di taglio',
    categoryId: 'utensileria',
    images: [
      '20250528_081831_i8qq3j',
      '20250528_082425_lirlzz',
      '20250528_082821_whpwrt'
    ],
    shortDescription: 'Kit completo di forbice elettrica con 3 lame intercambiabili di diverse grandezze, ideale per potature precise.',
    fullDescription: 'Kit completo di forbice elettrica con 3 lame intercambiabili di diverse grandezze. Sistema di sicurezza integrato e impugnatura ergonomica.',
    price: '€ 35-€60-€70'
  },
  {
    id: 'ut-set-chiavi-008fvdfvcdvddvs565',
    name: 'Kit 4 in 1 Makota - Flex, Avvitatore a percussione, Avvitatore a impulso, Martello tassellatore',
    categoryId: 'utensileria',
    images: ['20250528_093337_emml5o'],
    shortDescription: 'Kit professionale 4 in 1 Makota per lavori edili e di manutenzione. Include smerigliatrice, avvitatore a percussione, avvitatore a impulso e martello tassellatore.',
    fullDescription: 'Kit professionale 4 in 1 Makota per lavori edili e di manutenzione. Include smerigliatrice, avvitatore a percussione, avvitatore a impulso e martello tassellatore. Alimentazione a batteria.',
    price: '€ 120'
  },
  {
    id: 'ut-set-chiavi-008fvdfvcvddvdcdddvs565',
    name: 'Tagliaerba manuale Makota',
    categoryId: 'utensileria',
    images: ['20250528_084937_gemhrc'],
    shortDescription: 'Tagliaerba manuale leggero e silenzioso per piccoli giardini',
    fullDescription: 'Tagliaerba manuale leggero e silenzioso. Dotato di lame affilate per un taglio preciso e uniforme',
    price: '€ 55'
  },
  {
    id: 'ru-lama-ts-univ-003125',
    name: 'Soffiatore a miscela',
    categoryId: 'ricambi',
    images: ['DSC03925_ujil3g'],
    shortDescription: 'Soffiatore a miscela potente e affidabile',
    fullDescription: 'Soffiatore a miscela potente e affidabile per la pulizia di foglie e detriti',
    price: '€ 75'
  },
  {
    id: 'ru-lama-ts-univ-122e005',
    name: 'Ingrassatore a mano',
    categoryId: 'ricambi',
    images: ['DSC03933_gng9o7'],
    shortDescription: 'Ingrassatore manuale per lubrificazione di precisione',
    fullDescription: 'Ingrassatore manuale per lubrificazione di precisione di componenti meccanici',
    price: '€ 50'
  },
  {
    id: 'ru-lama-ts-univ-0wded05',
    name: 'Avvolgitubo',
    categoryId: 'ricambi',
    images: ['DSC03930_ylwgfv'],
    shortDescription: 'Avvolgitubo da giardino pratico e resistente',
    fullDescription: 'Avvolgitubo da giardino pratico e resistente con manovella per riavvolgimento semplice',
    price: '€ 70'
  },
  {
    id: 'ru-lama-ts-univ-434343005',
    name: 'Asta telescopica Makota',
    categoryId: 'ricambi',
    images: ['DSC03919_q0lzxm'],
    shortDescription: 'Asta telescopica con mini motosega e cesoia per potatura in altezza',
    fullDescription: 'Asta telescopica con mini motosega e cesoia. Struttura estensibile per potatura in altezza',
    price: '€ 75'
  },

]; 