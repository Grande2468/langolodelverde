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
  // Categoria: motocoltivatori-tosaerba
  {
    id: 'moto-003-motocarriola-d30md',
    name: 'Motocarriola D30MD',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['Immagine-WhatsApp-2024-02-08-ore-15.57.23_47219f59-220x220_2x_rlfxgc'],
    shortDescription: 'Motocarriola a cingoli con motore Ducar 6.5 HP, cilindrata 196 cc, avviamento manuale, portata 300 kg, cambio 3 marce avanti + 1 retromarcia, cassone 1040×860 mm ribaltabile, pendenza massima 20%, cingoli 189x60 con 34 buchi.',
    fullDescription: 'Motocarriola a cingoli con motore Ducar 6.5 HP, cilindrata 196 cc, avviamento manuale, portata 300 kg, cambio 3 marce avanti + 1 retromarcia, cassone 1040×860 mm ribaltabile, pendenza massima 20%, cingoli 189x60 con 34 buchi.',
    price: '€ 1450'
  },
  {
    id: 'moto-005-motozappa-hp4',
    name: 'Motozappa hp 4',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['B-003-e1530044176939-125x125_2x_imbmlt'],
    shortDescription: 'Motozappa hp 4 – cc 139 – motore benzina 4 tempi – larghezza fresa mm 360',
    fullDescription: 'Motozappa hp 4 – cc 139 – motore benzina 4 tempi – larghezza fresa mm 360',
    price: '€ 290'
  },

  // Categoria: attrezzatura-giardino
  {
    id: 'attg-tubo-giardino-11',
    name: 'Tubo da Giardino Base',
    categoryId: 'attrezzatura-giardino',
    images: ['DSC03967_dlr8yg'],
    shortDescription: 'Tubo flessibile e leggero, ideale per piccoli giardini o balconi.',
    fullDescription: 'Tubo flessibile e leggero, ideale per piccoli giardini o balconi. Compatibile con tutti gli attacchi standard.',
    price: '€ 11'
  },
  {
    id: 'attg-tubo-giardino-18',
    name: 'Tubo da Giardino Rinforzato',
    categoryId: 'attrezzatura-giardino',
    images: ['DSC03968_ngslnu'],
    shortDescription: 'Tubo estensibile rinforzato, resistente a nodi e piegature.',
    fullDescription: 'Tubo estensibile rinforzato, resistente a nodi e piegature. Per irrigazione quotidiana con maggiore portata.',
    price: '€ 18'
  },
  {
    id: 'attg-tubo-giardino-20',
    name: 'Tubo da Giardino Professionale',
    categoryId: 'attrezzatura-giardino',
    images: ['DSC03966_arwbwe'],
    shortDescription: 'Tubo da giardino professionale, triplo strato, resistente a UV e pressione.',
    fullDescription: 'Tubo da giardino professionale, triplo strato, resistente a UV e pressione. Perfetto per superfici ampie.',
    price: '€ 20'
  },
  {
    id: 'attg-idropulitrice-110',
    name: 'Idropulitrice Elettrica 110 bar',
    categoryId: 'attrezzatura-giardino',
    images: ['DSC03960_bgwx1d'],
    shortDescription: 'Idropulitrice a corrente da 110 bar, perfetta per pulizie di esterni, auto, pavimenti e muretti.',
    fullDescription: 'Idropulitrice a corrente da 110 bar, perfetta per pulizie di esterni, auto, pavimenti e muretti. Potente ma compatta, con avvolgitubo, pistola e lancia regolabile inclusi.',
    price: '€ 85'
  },
  {
    id: 'attg-compressore-batteria',
    name: 'Compressore a Batteria Makota',
    categoryId: 'attrezzatura-giardino',
    images: ['DSC03958_qnmmof'],
    shortDescription: 'Compressore portatile a batteria, ideale per gonfiare gomme, piscine e attrezzi da giardino.',
    fullDescription: 'Compressore portatile a batteria, ideale per gonfiare gomme, piscine e attrezzi da giardino. Compatto e ricaricabile, perfetto per casa e auto.',
    price: '€ 169'
  },

  // Categoria: utensileria
  {
    id: 'ut-avvolgitubo-011',
    name: 'Avvolgitubo automatico per aria compressa',
    categoryId: 'utensileria',
    images: ['DSC03930_ylwgfv'],
    shortDescription: 'Avvolgitubo automatico professionale per aria compressa, con capacità di 20 metri di tubo. Sistema di riavvolgimento automatico per una gestione pratica e veloce.',
    fullDescription: 'Avvolgitubo automatico professionale per aria compressa, con capacità di 20 metri di tubo. Sistema di riavvolgimento automatico per una gestione pratica e veloce. Ideale per officine e ambienti di lavoro professionali.',
    price: '€ 70'
  },
  {
    id: 'ut-fasce-sollevamento-small',
    name: 'Fasce per sollevamento carichi - grande',
    categoryId: 'utensileria',
    images: ['20250528_095204_a6an86'],
    shortDescription: 'Fasce robuste in poliestere per sollevamento carichi leggeri',
    fullDescription: 'Fasce robuste in poliestere ad alta resistenza, ideali per il sollevamento e il trasporto in sicurezza di carichi leggeri. Utilizzate in ambito edile e agricolo, garantiscono affidabilità grazie alla struttura rinforzata.',
    price: '€ 12'
  },
  {
    id: 'ut-fasce-sollevamento-large',
    name: 'Fasce per sollevamento carichi - piccola',
    categoryId: 'utensileria',
    images: ['20250528_095504_j4t4wb'],
    shortDescription: 'Fasce robuste in poliestere per sollevamento carichi pesanti',
    fullDescription: 'Fasce robuste in poliestere ad alta resistenza, ideali per il sollevamento e il trasporto in sicurezza di carichi pesanti. Utilizzate in ambito industriale, garantiscono massima affidabilità grazie alla struttura extra rinforzata e alle cuciture ad alta tenuta.',
    price: '€ 3'
  },
  {
    id: 'ut-tagliasiepi-2in1-004',
    name: 'Tagliasiepi 2 in 1 Makota',
    categoryId: 'utensileria',
    images: ['20250528_084937_gemhrc'],
    shortDescription: 'Tagliasiepi elettrico 2 in 1 Makota, versatile strumento che combina le funzioni di tagliasiepi e tosarami in un unico dispositivo.',
    fullDescription: 'Tagliasiepi elettrico 2 in 1 Makota, versatile strumento che combina le funzioni di tagliasiepi e tosarami in un unico dispositivo. Design ergonomico e lame di precisione per risultati professionali nella potatura di siepi e rami.',
    price: '€ 55'
  },
  {
    id: 'ut-soffiatore-makota99',
    name: 'Soffiatore Makota',
    categoryId: 'utensileria',
    images: ['DSC03969_zjzjui'],
    shortDescription: 'Soffiatore leggero e pratico, perfetto per rimuovere foglie e detriti da giardini e vialetti. Funzionamento silenzioso, impugnatura ergonomica e facile utilizzo senza fili.',
    fullDescription: 'Soffiatore leggero e pratico, perfetto per rimuovere foglie e detriti da giardini e vialetti. Funzionamento silenzioso, impugnatura ergonomica e facile utilizzo senza fili.',
    price: '€ 20'
  },
  {
    id: 'ut-kit-forbice-009-small',
    name: 'Kit forbice/cesoia a batteria Makota - Piccola',
    categoryId: 'utensileria',
    images: ['20250528_081710_cyqnar', '20250528_081629_frwm2l'],
    shortDescription: 'Kit forbice elettrica Makota con lama piccola, ideale per potature precise di rami sottili.',
    fullDescription: 'Kit forbice elettrica Makota con lama piccola, ideale per potature precise di rami sottili. Funzionamento a batteria per la massima libertà di movimento, impugnatura ergonomica e sistema di sicurezza integrato.',
    price: '€ 35'
  },
  {
    id: 'ut-kit-forbice-009-medium',
    name: 'Kit forbice/cesoia a batteria Makota - Media',
    categoryId: 'utensileria',
    images: ['20250528_082425_lirlzz', '20250528_082302_kpdhwu'],
    shortDescription: 'Kit forbice elettrica Makota con lama media, perfetta per potature di rami di medio spessore.',
    fullDescription: 'Kit forbice elettrica Makota con lama media, perfetta per potature di rami di medio spessore. Funzionamento a batteria per la massima libertà di movimento, impugnatura ergonomica e sistema di sicurezza integrato.',
    price: '€ 60'
  },
  {
    id: 'ut-kit-forbice-009-large',
    name: 'Kit forbice/cesoia a batteria Makota - Grande',
    categoryId: 'utensileria',
    images: ['20250528_082821_whpwrt', '20250528_082740_rogq61'],
    shortDescription: 'Kit forbice elettrica Makota con lama grande, ideale per potature di rami spessi.',
    fullDescription: 'Kit forbice elettrica Makota con lama grande, ideale per potature di rami spessi. Funzionamento a batteria per la massima libertà di movimento, impugnatura ergonomica e sistema di sicurezza integrato.',
    price: '€ 70'
  },
  
  
  {
    id: 'moto-005-motozappa-hp4',
    name: 'Motozappa hp 4',
    categoryId: 'motocoltivatori-tosaerba',
    images: ['B-003-e1530044176939-125x125_2x_imbmlt'],
    shortDescription: 'Motozappa hp 4 – cc 139 – motore benzina 4 tempi – larghezza fresa mm 360',
    fullDescription: 'Motozappa hp 4 – cc 139 – motore benzina 4 tempi – larghezza fresa mm 360',
    price: '€ 290',
  },
  

  // Categoria: attrezzatura-giardino
  {
    id: 'attg-001-tagliasiepi-makota',
    name: 'Tagliasiepi Makota',
    categoryId: 'attrezzatura-giardino',
    images: ['DSC03908_fs8dwv'],
    shortDescription: 'Tagliasiepi elettrico Makota, ideale per la potatura precisa di siepi e arbusti',
    fullDescription: 'Tagliasiepi elettrico Makota, ideale per la potatura precisa di siepi e arbusti. Leggero, maneggevole e dotato di lame affilate per un taglio netto e sicuro. Ottimo per mantenere in ordine il giardino con facilità.',
    price: '€ 55'
  },
  {
    id: 'ag-set-base-004',
    name: 'Pompa a Irrorazione A.M.C.',
    categoryId: 'attrezzatura-giardino',
    images: ['2842021Pompa-Spalla-elettrica-nebulizzatore-16L-per-disinfestazione-irrorazione-pulizia_1_ycdqrp'],
    shortDescription: 'Pompa a spalla ideale per trattamenti su orti e giardini. Dotata di lancia regolabile, serbatoio resistente e facile da trasportare. Perfetta per irrorazione di pesticidi, fertilizzanti o acqua. Alta affidabilità e pressione costante.',
    fullDescription: 'Pompa a spalla ideale per trattamenti su orti e giardini. Dotata di lancia regolabile, serbatoio resistente e facile da trasportare. Perfetta per irrorazione di pesticidi, fertilizzanti o acqua. Alta affidabilità e pressione costante.',
    price: '€ 55'
  },
  {
    id: 'attg-002-motosega-carving',
    name: 'Motosega da potatura Carving CS 3100',
    categoryId: 'attrezzatura-giardino',
    images: ['WhatsApp_Image_2024-08-01_at_09.30.22-removebg-preview-250x250_uociaf'],
    shortDescription: 'Motosega da potatura Carving 25 ULTRALEGGERA',
    fullDescription: 'Motosega da potaturfa Carving 25 ULTRALEGGERA',
    price: '€ 110'
  },
  {
    id: 'attg-002-motosega-cc',
    name: 'Motosega a Scoppio 52cc',
    categoryId: 'attrezzatura-giardino',
    images: ['352022Motosega-a-scoppio-52cc-profondita-lama-50cm-professionale-per-giardinaggio-1-1__zoqyna'],
    shortDescription: 'Motosega compatta e potente da 52cc, perfetta per potature e piccoli lavori domestici. Dotata di avviamento facilitato, barra da taglio maneggevole e motore a due tempi affidabile. Leggera ma efficace, ideale per l\'uso hobbistico.',
    fullDescription: 'Motosega compatta e potente da 52cc, perfetta per potature e piccoli lavori domestici. Dotata di avviamento facilitato, barra da taglio maneggevole e motore a due tempi affidabile. Leggera ma efficace, ideale per l\'uso hobbistico.',
    price: '€ 70'
  },
  {
    id: 'attg-003-motosega-cc38',
    name: 'Motosega da taglio CC 38',
    categoryId: 'attrezzatura-giardino',
    images: ['20210630_113227-scaled-220x220_2x_k7mwsz'],
    shortDescription: 'Motosega da taglio CC 38',
    fullDescription: 'Motosega da taglio CC 38',
    price: '€ 100'
  },
  {
    id: 'attg-004-motosega-cc65',
    name: 'Motosega da taglio cc 65',
    categoryId: 'attrezzatura-giardino',
    images: ['20210630_113306-removebg-preview-400x400_dbnq9q'],
    shortDescription: 'Motosega da taglio cc 65',
    fullDescription: 'Motosega da taglio cc 65',
    price: '€ 100'
  },
  {
    id: 'attg-005-asta-telescopica',
    name: 'Asta telescopica Makota',
    categoryId: 'attrezzatura-giardino',
    images: ['DSC03919_q0lzxm'],
    shortDescription: 'Asta telescopica con mini motosega e cesoia per potatura in altezza',
    fullDescription: 'Asta telescopica con mini motosega e cesoia. Struttura estensibile per potatura in altezza',
    price: '€ 75'
  },
  {
    id: 'attg-006-soffiatore-miscela',
    name: 'Soffiatore a miscela',
    categoryId: 'attrezzatura-giardino',
    images: ['DSC03925_ujil3g'],
    shortDescription: 'Soffiatore a miscela potente e affidabile',
    fullDescription: 'Soffiatore a miscela potente e affidabile per la pulizia di foglie e detriti',
    price: '€ 75'
  },

  // Categoria: ricambi
  {
    id: 'scarpentinfortunistica1',
    name: ' Scarpe Antinfortunistica',
    categoryId: 'ricambi',
    images: ['WhatsApp_Image_2025-06-07_at_16.19.09_rpeaq1',
      'WhatsApp_Image_2025-06-07_at_16.19.09_5_cdbpb1',
      'WhatsApp_Image_2025-06-07_at_16.19.09_4_eiwf6l',
      'WhatsApp_Image_2025-06-07_at_16.19.09_2_fducp4',
    ],
    shortDescription: 'Scarpa da lavoro robusta con puntale in acciaio, suola anti-perforazione, antiscivolo e tomaia idrorepellente. Ideale per cantieri, magazzini e officine. Classe S3 – massima protezione e comfort per uso professionale.',
    fullDescription: 'Scarpa da lavoro robusta con puntale in acciaio, suola anti-perforazione, antiscivolo e tomaia idrorepellente. Ideale per cantieri, magazzini e officine. Classe S3 – massima protezione e comfort per uso professionale.',
    price: '€ 48'
  },
  {
    id: 'scarpentinfortunistica2',
    name: ' Scarpe Antinfortunistica',
    categoryId: 'ricambi',
    images: ['WhatsApp_Image_2025-06-07_at_16.19.09_4_eiwf6l',
      'WhatsApp_Image_2025-06-07_at_16.19.10_yyemxr',
    ],
    shortDescription: 'Scarpa protettiva leggera con puntale rinforzato, suola antiscivolo e assorbimento urti al tallone. Perfetta per lavori leggeri e uso quotidiano. Classe S1 – ottimo rapporto qualità-prezzo.',
    fullDescription: 'Scarpa protettiva leggera con puntale rinforzato, suola antiscivolo e assorbimento urti al tallone. Perfetta per lavori leggeri e uso quotidiano. Classe S1 – ottimo rapporto qualità-prezzo.',
    price: '€ 35'
  },
  {
    id: 'rica-001-disco-decespugliatore',
    name: 'Disco per decespugliatore',
    categoryId: 'ricambi',
    images: ['20250528_095954_wrcdp9'],
    shortDescription: 'Disco in acciaio ad alte prestazioni, ideale per tagliare erba alta, rovi e sterpaglie',
    fullDescription: 'Disco in acciaio ad alte prestazioni, ideale per tagliare erba alta, rovi e sterpaglie. Compatibile con la maggior parte dei decespugliatori, assicura un taglio preciso e potente anche nei lavori più impegnativi.',
    price: '€ 8'
  },
  {
    id: 'rica-002-filo-decespugliatore',
    name: 'Filo per decespugliatore',
    categoryId: 'ricambi',
    images: ['20250528_100030_ctnbzh'],
    shortDescription: 'Filo in nylon resistente, adatto al taglio di erba e vegetazione leggera',
    fullDescription: 'Filo in nylon resistente, adatto al taglio di erba e vegetazione leggera. Disponibile in vari diametri e lunghezze, garantisce efficienza e durata per ogni tipo di lavoro di rifinitura e pulizia del verde.',
    price: '€ 2'
  },
  {
    id: 'rica-003-bobina-filo',
    name: 'Bobina di filo per decespugliatore',
    categoryId: 'ricambi',
    images: ['20250528_100124_lzbiqy'],
    shortDescription: 'Bobina preavvolta con filo in nylon ad alta resistenza',
    fullDescription: 'Bobina preavvolta con filo in nylon ad alta resistenza, pronta all\'uso e compatibile con la maggior parte delle testine. Ideale per sostituzioni rapide e un taglio continuo e uniforme su erba e vegetazione leggera.',
    price: '€ 10'
  },
  {
    id: 'rica-004-batteria-makota',
    name: 'Batteria di ricambio Makota 6000 mAh 68V',
    categoryId: 'ricambi',
    images: ['20250528_100405_xst38r'],
    shortDescription: 'Batteria al litio da 18V con capacità di 6000 mAh, compatibile con utensili Makota',
    fullDescription: 'Batteria al litio da 18V con capacità di 6000 mAh, compatibile con utensili Makota. Offre un ottimo equilibrio tra durata e peso, ideale per lavori di media intensità. Ricarica rapida e prestazioni costanti.',
    price: '€ 13'
  },
  {
    id: 'ru-filtro-aria-09uwunwnw08',
    name: 'Batteria di ricambio Makota 8000 mAh 88V ',
    categoryId: 'ricambi',
    images: ['20250528_100352_t8zsde'],
    shortDescription: 'Batteria al litio da 18V con capacità extra da 8000 mAh, progettata per garantire la massima autonomia nei lavori più intensi. Perfetta per professionisti che necessitano di potenza prolungata senza interruzioni.',
    fullDescription: 'Batteria al litio da 18V con capacità extra da 8000 mAh, progettata per garantire la massima autonomia nei lavori più intensi. Perfetta per professionisti che necessitano di potenza prolungata senza interruzioni.',
    price: '€ 17'
  },

  // Categoria: utensileria
  {
    id: 'uten-001-set-giraviti',
    name: 'Set di giraviti con attacco per chiave',
    categoryId: 'utensileria',
    images: ['20250528_095611_xbdbzp'],
    shortDescription: 'Set completo di cacciaviti con punte intercambiabili e impugnatura ergonomica',
    fullDescription: 'Set completo di cacciaviti con punte intercambiabili e impugnatura ergonomica, dotato di attacco per chiave inglese o cricchetto, per aumentare la forza di torsione nei lavori più impegnativi. Perfetto per ogni tipo di intervento di precisione e manutenzione.',
    price: '€ 5'
  },
  {
    id: 'uten-002-maschera-protettiva',
    name: 'Maschera protettiva con visiera',
    categoryId: 'utensileria',
    images: ['20250528_095942_evqm1i'],
    shortDescription: 'Maschera protettiva con visiera in rete metallica per uso con decespugliatori e tagliaerba',
    fullDescription: 'Maschera protettiva con visiera in rete metallica. Protegge il viso da detriti e schizzi mantenendo ottima visibilità',
    price: '€ 5'
  },
  {
    id: 'uten-003-cacciaviti-isolati',
    name: 'Set di cacciaviti isolati',
    categoryId: 'utensileria',
    images: ['20250528_095249_xhoxbn'],
    shortDescription: 'Set di cacciaviti isolati fino a 1000V per lavori elettrici',
    fullDescription: 'Set di cacciaviti isolati fino a 1000V, progettati per lavori elettrici in totale sicurezza. Ideali per elettricisti e hobbisti, garantiscono protezione contro le scariche elettriche durante l\'uso su impianti sotto tensione.',
    price: '€ 10'
  },
  {
    id: 'uten-004-pistola-gonfiaggio',
    name: 'Pistola gonfiagomme ad aria',
    categoryId: 'utensileria',
    images: ['20250528_095547_cqxukt'],
    shortDescription: 'Pistola per il gonfiaggio di pneumatici con manometro integrato',
    fullDescription: 'Pistola per il gonfiaggio di pneumatici, compatibile con compressori d\'aria. Dotata di manometro integrato per controllare la pressione in tempo reale, assicura un gonfiaggio preciso e rapido di ruote per auto, moto e attrezzi da giardino.',
    price: '€ 8'
  },
  {
    id: 'uten-005-forbici-pota-small',
    name: 'Forbici da pota - Piccole',
    categoryId: 'utensileria',
    images: ['20250528_095413_yhrhia'],
    shortDescription: 'Forbici da potatura compatte con lame affilate in acciaio, ideali per piccoli rami e lavori di precisione',
    fullDescription: 'Forbici da potatura compatte con lame affilate in acciaio. Impugnatura ergonomica e sistema di chiusura di sicurezza. Perfette per potature precise di rami sottili e lavori di giardinaggio delicati.',
    price: '€ 2'
  },
  {
    id: 'uten-005-forbici-pota-large',
    name: 'Forbici da pota - Grandi',
    categoryId: 'utensileria',
    images: ['20250528_095422_sionl8'],
    shortDescription: 'Forbici da potatura professionali con lame robuste in acciaio, per rami più spessi',
    fullDescription: 'Forbici da potatura professionali con lame robuste in acciaio. Impugnatura ergonomica rinforzata e sistema di chiusura di sicurezza. Ideali per potature di rami più spessi e lavori intensivi.',
    price: '€ 5'
  },
  {
    id: 'uten-006-punte-trapano',
    name: 'Punte per trapano',
    categoryId: 'utensileria',
    images: ['20250528_095524_wyspk5'],
    shortDescription: 'Set di punte in acciaio ad alta resistenza',
    fullDescription: 'Set di punte in acciaio ad alta resistenza. Compatibili con tutti i trapani standard',
    price: '€ 10'
  },

  {
    id: 'uten-008-fasce-sollevamento',
    name: 'Pistola ingrassatrice',
    categoryId: 'utensileria',
    images: ['20250528_095214_t0i0o4'],
    shortDescription: 'Set completo con pistola ingrassatrice manuale',
    fullDescription: 'Set completo con pistola ingrassatrice manuale, tubi flessibili e raccordi. Ideale per la lubrificazione precisa',
    price: '€ 15'
  },
  {
    id: 'ut-seghetto-alternativo-001',
    name: 'Seghetto alternativo Makota',
    categoryId: 'utensileria',
    images: ['DSC03922_mftdhw'],
    shortDescription: 'Seghetto alternativo Makota con velocità regolabile, perfetto per tagli curvi e precisi su legno, plastica e metallo. Struttura compatta, impugnatura ergonomica e lama facilmente sostituibile per un lavoro pulito e veloce.',
    fullDescription: 'Seghetto alternativo Makota con velocità regolabile, perfetto per tagli curvi e precisi su legno, plastica e metallo. Struttura compatta, impugnatura ergonomica e lama facilmente sostituibile per un lavoro pulito e veloce.',
    price: '€ 55'
  },
  {
    id: 'ut-smerigliatrice-batteria-002',
    name: 'Smerigliatrice angolare a batteria Makota',
    categoryId: 'utensileria',
    images: ['20250528_092352_pegwp8',
      '20250528_092324_xxcynm',
    ],
    shortDescription: 'Smerigliatrice angolare a batteria da 18V compatibile Makita, ideale per tagliare, smerigliare e levigare metallo, pietra e altri materiali. Design compatto, impugnatura ergonomica e protezione regolabile per un lavoro preciso e sicuro anche senza cavi.',
    fullDescription: 'Smerigliatrice angolare a batteria da 18V compatibile Makita, ideale per tagliare, smerigliare e levigare metallo, pietra e altri materiali. Design compatto, impugnatura ergonomica e protezione regolabile per un lavoro preciso e sicuro anche senza cavi.',
    price: '€70'
  },
  {
    id: 'ut-smerigliatrice-corrente-003',
    name: 'Smerigliatrice angolare a corrente Makota',
    categoryId: 'utensileria',
    images: ['20250528_092612_pwfxvy'],
    shortDescription: 'Smerigliatrice angolare elettrica Makota, potente e affidabile, ideale per taglio, smerigliatura e lucidatura di metallo e altri materiali. Design robusto con impugnatura ergonomica per un utilizzo confortevole e sicuro anche durante lavori prolungat',
    fullDescription: 'Smerigliatrice angolare elettrica Makota, potente e affidabile, ideale per taglio, smerigliatura e lucidatura di metallo e altri materiali. Design robusto con impugnatura ergonomica per un utilizzo confortevole e sicuro anche durante lavori prolungat',
    price: '€ 30'
  },
  {
    id: 'ut-pistola-termica-005',
    name: 'Pistola Termica Makota',
    categoryId: 'utensileria',
    images: ['20250528_092704_empkcf'],
    shortDescription: 'Pistola ad aria calda professionale Makita, ideale per lavori di saldatura, decapaggio vernici, piegatura tubi e termoretrazione. Offre regolazione precisa della temperatura e del flusso d\'aria per adattarsi a diverse applicazioni con massima efficienza e sicurezza.',
    fullDescription: 'Pistola ad aria calda professionale Makita, ideale per lavori di saldatura, decapaggio vernici, piegatura tubi e termoretrazione. Offre regolazione precisa della temperatura e del flusso d\'aria per adattarsi a diverse applicazioni con massima efficienza e sicurezza.',
    price: '€ 55'
  },
  {
    id: 'ut-avvitatore-006',
    name: 'Avvitatore Makota',
    categoryId: 'utensileria',
    images: ['20250528_090006_wmz8wg'],
    shortDescription: 'Avvitatore a batteria Makota, compatto e potente, ideale per avvitare e svitare con precisione in lavori di fai-da-te e professionali. Dotato di batteria a lunga durata e design ergonomico per un utilizzo comodo anche negli spazi più stretti.',
    fullDescription: 'Avvitatore a batteria Makota, compatto e potente, ideale per avvitare e svitare con precisione in lavori di fai-da-te e professionali. Dotato di batteria a lunga durata e design ergonomico per un utilizzo comodo anche negli spazi più stretti.',
    price: '€ 35'
  },
  {
    id: 'ut-kit-4in1-007',
    name: 'Kit 3 in 1 Makota – avvitatore ad impulsi, flex e faretto',
    categoryId: 'utensileria',
    images: ['20250528_093337_pc8zfz'],
    shortDescription: 'Kit 3 in 1 Makota: avvitatore ad impulsi, flex e faretto LED. Compatto, potente e pronto per ogni lavoro.',
    fullDescription: 'Kit 3 in 1 Makota: avvitatore ad impulsi, flex e faretto LED. Compatto, potente e pronto per ogni lavoro.',
    price: '€ 90'
  },
  {
    id: 'ut-ingrassatore-008',
    name: 'Ingrassatore a mano',
    categoryId: 'utensileria',
    images: ['DSC03933_gng9o7'],
    shortDescription: 'Ingrassatore manuale per lubrificare in modo preciso cuscinetti, ingranaggi e componenti meccanici. Ideale per officine, manutenzione agricola o fai-da-te. Facile da usare e resistente all\'usura.',
    fullDescription: 'Ingrassatore manuale per lubrificare in modo preciso cuscinetti, ingranaggi e componenti meccanici. Ideale per officine, manutenzione agricola o fai-da-te. Facile da usare e resistente all\'usura.',
    price: '€ 50'
  },
  
  {
    id: 'ut-tassellatore-batteria-010',
    name: 'Tassellatore a batteria makota',
    categoryId: 'utensileria',
    images: ['DSC03923_oq0c3b'],
    shortDescription: 'Tassellatore Makota potente e resistente, ideale per forare e fissare materiali duri come cemento, muratura e pietra. Dotato di modalità martello e rotazione, offre prestazioni elevate e controllo ottimale anche nei lavori più impegnativi.',
    fullDescription: 'Tassellatore Makota potente e resistente, ideale per forare e fissare materiali duri come cemento, muratura e pietra. Dotato di modalità martello e rotazione, offre prestazioni elevate e controllo ottimale anche nei lavori più impegnativi.',
    price: '€ 80'
  },
  {
    id: 'ut-avvolgitubo-011',
    name: 'Avvolgitubo',
    categoryId: 'utensileria',
    images: ['DSC03930_ylwgfv'],
    shortDescription: 'Avvolgitubo pratico e resistente, perfetto per mantenere il tubo ordinato e sempre a portata di mano. ',
    fullDescription: 'Avvolgitubo pratico e resistente, perfetto per mantenere il tubo ordinato e sempre a portata di mano.',
    price: '€ 70'
  },
  {
    id: 'ut-mini-flex-012',
    name: 'Mini flex a batteria Makota',
    categoryId: 'utensileria',
    images: ['20250528_090930_a0cnw2'],
    shortDescription: 'Mini smerigliatrice angolare a batteria Makota, compatta e maneggevole, ideale per lavori di precisione come taglio, smerigliatura e lucidatura in spazi ristretti. Dotata di batteria ad alta autonomia e impugnatura ergonomica per un controllo ottimale.',
    fullDescription: 'Mini smerigliatrice angolare a batteria Makota, compatta e maneggevole, ideale per lavori di precisione come taglio, smerigliatura e lucidatura in spazi ristretti. Dotata di batteria ad alta autonomia e impugnatura ergonomica per un controllo ottimale.',
    price: '€ 25'
  },
  {
    id: 'ut-aspiratore-013',
    name: 'Aspiratore Makota',
    categoryId: 'utensileria',
    images: ['20250528_092103_rerht0'],
    shortDescription: 'Aspiratore Makota potente e versatile, ideale per la raccolta di polvere, detriti e liquidi in ambienti domestici e lavorativi. Design compatto, facile da usare e dotato di filtri ad alta efficienza per garantire prestazioni ottimali e lunga durata.',
    fullDescription: 'Aspiratore Makota potente e versatile, ideale per la raccolta di polvere, detriti e liquidi in ambienti domestici e lavorativi. Design compatto, facile da usare e dotato di filtri ad alta efficienza per garantire prestazioni ottimali e lunga durata.',
    price: '€ 18'
  },
  {
    id: 'ut-saldatore-plastica-014',
    name: 'Saldatore per plastica',
    categoryId: 'utensileria',
    images: ['20250528_091938_cxpfgd'],
    shortDescription: 'Saldatore per plastica Makota, ideale per riparazioni e giunzioni su materiali plastici di vario tipo. Offre controllo preciso della temperatura e punta intercambiabile per saldature resistenti e durature in ambito professionale e hobbistico.',
    fullDescription: 'Saldatore per plastica Makota, ideale per riparazioni e giunzioni su materiali plastici di vario tipo. Offre controllo preciso della temperatura e punta intercambiabile per saldature resistenti e durature in ambito professionale e hobbistico.',
    price: '€ 45'
  },
  {
    id: 'ut-levigatrice-015',
    name: 'Levigatrice Makota',
    categoryId: 'utensileria',
    images: ['20250528_091214_dplxcv',
      '20250528_091250_na4xow',
    ],
    shortDescription: 'Levigatrice Makota pratica ed efficiente, perfetta per lisciare superfici in legno, metallo e altri materiali. Compatta e maneggevole, garantisce finiture precise e uniformi anche negli angoli più difficili.',
    fullDescription: 'Levigatrice Makota pratica ed efficiente, perfetta per lisciare superfici in legno, metallo e altri materiali. Compatta e maneggevole, garantisce finiture precise e uniformi anche negli angoli più difficili.',
    price: '€ 60'
  },
  {
    id: 'ut-kit-potatura-016',
    name: 'Makota : 4 in 1 – Forbice da Potatura a Batteria, Motosega a Batteria',
    categoryId: 'utensileria',
    images: ['DSC03912_svig5u',
      'DSC03915_upjgx6',
    ],
    shortDescription: 'Kit versatile e completo per la cura del verde, include forbice da potatura e mini motosega a batteria e asta telescopica 2.10m, perfetti per tagli precisi e veloci su rami e siepi. Leggeri, maneggevoli e ideali per uso domestico o professionale.',
    fullDescription: 'Kit versatile e completo per la cura del verde, include forbice da potatura e mini motosega a batteria e asta telescopica 2.10m, perfetti per tagli precisi e veloci su rami e siepi. Leggeri, maneggevoli e ideali per uso domestico o professionale.',
    price: '€ 80'
  },
  {
    id: 'ut-pistola-idropulitrice-017',
    name: 'Pistola idropulitrice Makota',
    categoryId: 'utensileria',
    images: ['20250528_091431_qnonsw',
      '20250528_091350_vbadsu',
    ],
    shortDescription: 'Pistola per idropulitrice Makota, progettata per garantire un getto d\'acqua potente e regolabile, ideale per la pulizia di superfici esterne, veicoli, attrezzi da giardino e pavimenti. Realizzata con materiali resistenti per un uso intenso e duraturo.',
    fullDescription: 'Pistola per idropulitrice Makota, progettata per garantire un getto d\'acqua potente e regolabile, ideale per la pulizia di superfici esterne, veicoli, attrezzi da giardino e pavimenti. Realizzata con materiali resistenti per un uso intenso e duraturo.',
    price: '€ 25'
  },
  {
    id: 'ut-soffiatore-batteria-018',
    name: 'Soffiatore a batteria Makota',
    categoryId: 'utensileria',
    images: ['20250528_084740_pdxn2i'],
    shortDescription: 'Soffiatore a batteria Makota, leggero e potente, ideale per la pulizia di foglie, polvere e detriti in giardini, cortili e aree esterne. Dotato di batteria ad alta capacità per lunga autonomia e design ergonomico per un utilizzo confortevole.',
    fullDescription: 'Soffiatore a batteria Makota, leggero e potente, ideale per la pulizia di foglie, polvere e detriti in giardini, cortili e aree esterne. Dotato di batteria ad alta capacità per lunga autonomia e design ergonomico per un utilizzo confortevole.',
    price: '€ 60'
  },
  {
    id: 'ut-tassellatore-019',
    name: 'Tassellatore Makota',
    categoryId: 'utensileria',
    images: ['20250528_093844_bui6wi'],
    shortDescription: 'Tassellatore Makota potente e resistente, ideale per forare e fissare materiali duri come cemento, muratura e pietra. Dotato di modalità martello e rotazione, offre prestazioni elevate e controllo ottimale anche nei lavori più impegnativi.',
    fullDescription: 'Tassellatore Makota potente e resistente, ideale per forare e fissare materiali duri come cemento, muratura e pietra. Dotato di modalità martello e rotazione, offre prestazioni elevate e controllo ottimale anche nei lavori più impegnativi.',
    price: '€ 70'
  },
  {
    id: 'ut-set-chiavi-unique-0452039240892',
    name: 'Trapano avvitatore Makota con attacco bussola',
    categoryId: 'utensileria',
    images: ['20250528_093042_t6ihne'],
    shortDescription: 'Trapano avvitatore Makota potente e versatile, dotato di attacco per bussole che permette di utilizzare punte e accessori per svitare e stringere dadi e bulloni. Ideale per lavori di falegnameria, meccanica e manutenzione, garantisce prestazioni elevate e comodità d\'uso.',
    fullDescription: 'Trapano avvitatore Makota potente e versatile, dotato di attacco per bussole che permette di utilizzare punte e accessori per svitare e stringere dadi e bulloni. Ideale per lavori di falegnameria, meccanica e manutenzione, garantisce prestazioni elevate e comodità d\'uso.',
    price: '€ 75'
  },
  {
    id: 'ut-mini-motosega-small',
    name: 'Mini Motosega Makota - Piccola',
    categoryId: 'utensileria',
    images: ['DSC03464_c8hcmy', 'DSC03463_wx5hmj'],
    shortDescription: 'Mini motosega Makota a batteria, versione piccola ideale per potature leggere e lavori di precisione',
    fullDescription: 'Mini motosega Makota a batteria, versione piccola. Design ultra compatto e leggero, perfetta per potature di precisione e lavori in spazi ristretti. Ideale per rami sottili e manutenzione ordinaria del verde.',
    price: '€ 35'
  },
  {
    id: 'ut-mini-motosega-medium',
    name: 'Mini Motosega Makota - Media',
    categoryId: 'utensileria',
    images: ['DSC03475_itorc5', 'DSC03473_e2jyfs'],
    shortDescription: 'Mini motosega Makota a batteria, versione media per un equilibrio ottimale tra potenza e maneggevolezza',
    fullDescription: 'Mini motosega Makota a batteria, versione media. Ottimo compromesso tra potenza e maneggevolezza, perfetta per lavori di potatura regolare e taglio di rami di medio spessore. Versatile e affidabile per ogni esigenza di giardinaggio.',
    price: '€ 45'
  },
  {
    id: 'ut-mini-motosega-large',
    name: 'Mini Motosega Makota - Grande',
    categoryId: 'utensileria',
    images: ['DSC03486_d2peqr', 'DSC03488_z6bpkl'],
    shortDescription: 'Mini motosega Makota a batteria, versione grande per lavori più impegnativi e maggiore autonomia',
    fullDescription: 'Mini motosega Makota a batteria, versione grande. Massima potenza e autonomia per lavori più impegnativi. Ideale per potature intensive e taglio di rami più spessi, mantiene la praticità di utilizzo tipica delle mini motoseghe.',
    price: '€ 60'
  },
  {
    id: 'utensile-001-compressore-25l',
    name: 'Compressore ad aria 25L 8 bar',
    categoryId: 'utensileria',
    images: ['51JWYLt79YL._AC_SX679__tjbsv2'],
    shortDescription: 'Compressore ad aria da 25 litri, pressione massima 8 bar. Compatto e pratico per lavori domestici e semi-professionali.',
    fullDescription: 'Compressore ad aria con serbatoio da 25 litri, pressione massima di 8 bar. Ideale per gonfiaggio, verniciatura e piccoli lavori di manutenzione. Alimentazione elettrica, facile da trasportare.',
    price: '€ 90'
  },
  {
    id: 'utensile-005-compressore-50l',
    name: 'AMC Compressore ad Aria 50L 8 bar',
    categoryId: 'utensileria',
    images: ['51JWYLt79YL._AC_SX679__tjbsv2'],
    shortDescription: 'Compressore ad aria elettrico da 50 litri, pressione 8 bar, motore coassiale da 2 HP, ideale per lavori intensivi.',
    fullDescription: 'Compressore ad aria da 50 litri con motore elettrico coassiale da 2 HP e pressione massima di 8 bar. Adatto a molteplici applicazioni come verniciatura, gonfiaggio e uso con utensili pneumatici. Design robusto e silenzioso.',
    price: '€ 140'
  },
  {
    id: 'utensile-002-cric-idraulico-4t',
    name: 'AMC Cric Idraulico Carrello 4T',
    categoryId: 'utensileria',
    images: ['61wLAXai1JS._AC_SX522__hjhjzz'],
    shortDescription: 'Cric idraulico a carrello professionale con capacità di sollevamento fino a 4 tonnellate, dotato di ruote bidirezionali.',
    fullDescription: 'AMC Cric sollevatore idraulico a carrello con capacità di 4 tonnellate, ideale per uso professionale e officine. Dotato di ruote bidirezionali a cuscinetto per una maggiore manovrabilità.',
    price: '€ 100'
  },
  {
    id: 'utensile-003-chiavi-bussola-108pz',
    name: 'Set Chiavi a Bussola 108 Pezzi',
    categoryId: 'utensileria',
    images: ['135713546_1_tc7rr5'],
    shortDescription: 'Set completo di chiavi a bussola e cricchetto da 108 pezzi, ideale per lavori di manutenzione meccanica e fai-da-te.',
    fullDescription: 'Set professionale di chiavi a bussola con cricchetto da 108 pezzi in acciaio temprato. Include bussole metriche, accessori e adattatori per ogni esigenza di manutenzione e riparazione.',
    price: '€ 45'
  },
  {
    id: 'utensile-004-cassetta-attrezzi-849pz',
    name: 'AMC Cassetta Attrezzi 849 Pezzi',
    categoryId: 'utensileria',
    images: ['71jt6yC2uSL._AC_SX679__nqj9kh'],
    shortDescription: 'Valigetta completa con 849 pezzi, inclusi cacciaviti, bussole, pinze, chiavi e molto altro. Montata su trolley con ruote.',
    fullDescription: 'AMC Set cassetta attrezzi completa di 849 pezzi. Include una vasta gamma di utensili per meccanica e bricolage. La struttura a trolley con manico e ruote facilita il trasporto ovunque.',
    price: '€ 80'
  },
  {
    id: 'utensile-006-ventilatore-batteria-makota',
    name: 'Ventilatore a Batteria Makota',
    categoryId: 'utensileria',
    images: ['DSC03976_nk72hg'],
    shortDescription: 'Ventilatore portatile Makota a batteria, leggero, compatto e ricaricabile, ideale per ambienti di lavoro o uso domestico.',
    fullDescription: 'Ventilatore a batteria Makota, ideale per rinfrescare l’ambiente durante le giornate calde. Design compatto, portatile e con lunga autonomia. Funzionamento silenzioso e griglia protettiva per una maggiore sicurezza.',
    price: '€ 80'
  },
  {
    id: 'utensile-007-pistola-compressore-makota',
    name: 'Pistola Compressore Makota',
    categoryId: 'utensileria',
    images: ['DSC03992_v6rnv6'],
    shortDescription: 'Pistola compressore Makota, realizzata per gonfiare pneumatici in qualunque momento e luogo.',
    fullDescription: 'Pistola compressore Makota, realizzata per gonfiare pneumatici in qualunque momento e luogo.',
    price: '€ 45'
  },
  {
    id: 'utensile-008-lucidatrice-batteria-makota',
    name: 'Lucidatrice a Batteria Makota',
    categoryId: 'utensileria',
    images: ['DSC03996_i3envb'],
    shortDescription: 'Lucidatrice Makota senza fili, a batteria, ideale per la cura dell’auto o superfici delicate.',
    fullDescription: 'Lucidatrice portatile Makota a batteria, con controllo della velocità e impugnatura comoda. Perfetta per lucidare auto, superfici metalliche o verniciate. Lunga autonomia e praticità senza cavo.',
    price: '€ 75'
  },
  {
    id: 'utensile-009-trapano-brushless-makota',
    name: 'Trapano Brushless a Litio Makota',
    categoryId: 'utensileria',
    images: ['DSC03994_epy083'],
    shortDescription: 'Trapano Makota a batteria al litio con motore brushless, compatto, leggero e potente.',
    fullDescription: 'Trapano Makota alimentato a batteria al litio con tecnologia brushless (senza spazzole), che garantisce maggiore durata, prestazioni elevate e manutenzione ridotta. Ideale per forare legno, metallo e plastica.',
    price: '€ 45'
  },
  {
    id: 'giardino-010-nebulizzatore-8l',
    name: 'Nebulizzatore 8 Litri',
    categoryId: 'attrezzatura-giardino',
    images: ['DSC03971_jhxbii'],
    shortDescription: 'Nebulizzatore manuale da 8 litri, perfetto per giardinaggio e trattamenti fitosanitari.',
    fullDescription: 'Nebulizzatore con serbatoio da 8 litri, progettato per la distribuzione di fertilizzanti o prodotti fitosanitari nel giardino. Lancia regolabile, tracolla per il trasporto e valvola di sicurezza inclusi.',
    price: '€ 20'
  },
  {
    id: 'giardino-011-decespugliatore-batteria-makota',
    name: 'Decespugliatore a Batteria Makota',
    categoryId: 'attrezzatura-giardino',
    images: ['514d9oO3vaL._AC_SX679__yviehx'],
    shortDescription: 'Decespugliatore Makota a batteria, leggero e silenzioso, ideale per rifiniture e manutenzione del verde.',
    fullDescription: 'Decespugliatore Makota alimentato a batteria, perfetto per tagli precisi nei bordi del prato e la cura di aree difficili da raggiungere. Design ergonomico, impugnatura comoda e motore silenzioso. Autonomia ideale per l’uso domestico.',
    price: '€ 60'
  },
{
  id: 'utensili-001-carrello-attrezzi-amc',
  name: 'Carrello Porta Attrezzi AMC con Ruote',
  categoryId: 'utensileria',
  images: ['71dkbXCpJZL._AC_SX679__p92ux8'],
  shortDescription: 'Carrello porta attrezzi AMC con struttura rinforzata, sei cassetti e oltre 500 utensili inclusi.',
  fullDescription: 'A.M.C. Carrello porta attrezzi completo con ruote, struttura rinforzata e 6 cassetti per un’organizzazione ottimale. Contiene oltre 500 pezzi di utensili professionali per ogni tipo di lavoro. Ideale per officine e appassionati del fai-da-te.',
  price: '€ 260'
},

{
  id: 'giardino-012-decespugliatore-zaino-52cc',
  name: 'Decespugliatore a Zaino a Scoppio 52cc',
  categoryId: 'attrezzatura-giardino',
  images: ['1372022Decespugliatore-zaino-a-scoppio-2-tempi-52cc-con-doppio-disco-e-kit-accessori_1_noxkfh'],
  shortDescription: 'Decespugliatore a zaino con motore a scoppio 2 tempi da 52cc e accessori inclusi.',
  fullDescription: 'Decespugliatore a zaino con motore a scoppio 52cc 2 tempi, completo di doppio disco e kit accessori. Perfetto per lavori intensivi e di lunga durata grazie al comodo supporto a zaino che riduce l’affaticamento.',
  price: '€ 100'
},

{
  id: 'giardino-013-decespugliatore-scoppio-52cc',
  name: 'Decespugliatore a Scoppio 52cc',
  categoryId: 'attrezzatura-giardino',
  images: ['51jYxNeyidL._AC_SX679__wbmnqq'],
  shortDescription: 'Decespugliatore a scoppio 52cc potente e affidabile, ideale per la manutenzione del verde.',
  fullDescription: 'Decespugliatore a scoppio 52cc ad alte prestazioni, adatto per il taglio di erba alta e sterpaglie. Leggero e maneggevole, garantisce ottimi risultati anche nei terreni più difficili.',
  price: '€ 75'
},
{
  id: 'giardino-014-atomizzatore-43cc',
  name: 'Atomizzatore a Scoppio 43cc a Spalla',
  categoryId: 'attrezzatura-giardino',
  images: ['51Idr9vfqNS._SX522__iarjvo'],
  shortDescription: 'Atomizzatore tripla funzione: soffiatore, polverizzatore e spruzzatore con motore 43cc e serbatoio da 20L.',
  fullDescription: 'Atomizzatore multifunzione con motore a scoppio 43cc, serbatoio da 20 litri e utilizzo a spalla. Ideale per la cura delle piante, può essere usato come soffiatore, polverizzatore o spruzzatore. Robusto e versatile, adatto sia per uso agricolo che hobbistico.',
  price: '€ 130'
}




  
  
  
  
  
  
  
]; 