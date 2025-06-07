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
    price: '€ 299,00',
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
    fullDescription: 'Motosega da potatura Carving 25 ULTRALEGGERA',
    price: '€ 110'
  },
  {
    id: 'attg-002-motosega-cc',
    name: 'Motosega a Scoppio 25cc',
    categoryId: 'attrezzatura-giardino',
    images: ['352022Motosega-a-scoppio-52cc-profondita-lama-50cm-professionale-per-giardinaggio-1-1__zoqyna'],
    shortDescription: 'Motosega compatta e potente da 25cc, perfetta per potature e piccoli lavori domestici. Dotata di avviamento facilitato, barra da taglio maneggevole e motore a due tempi affidabile. Leggera ma efficace, ideale per l’uso hobbistico.',
    fullDescription: 'Motosega compatta e potente da 25cc, perfetta per potature e piccoli lavori domestici. Dotata di avviamento facilitato, barra da taglio maneggevole e motore a due tempi affidabile. Leggera ma efficace, ideale per l’uso hobbistico.',
    price: '€ 80'
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
    name: 'Batteria di ricambio Makota 6000 mAh',
    categoryId: 'ricambi',
    images: ['20250528_100405_xst38r'],
    shortDescription: 'Batteria al litio da 18V con capacità di 6000 mAh, compatibile con utensili Makota',
    fullDescription: 'Batteria al litio da 18V con capacità di 6000 mAh, compatibile con utensili Makota. Offre un ottimo equilibrio tra durata e peso, ideale per lavori di media intensità. Ricarica rapida e prestazioni costanti.',
    price: '€ 13'
  },
  {
    id: 'ru-filtro-aria-09uwunwnw08',
    name: 'Batteria di ricambio Makota 8000 mAh',
    categoryId: 'ricambi',
    images: ['20250528_100352_t8zsde'],
    shortDescription: 'Batteria al litio da 18V con capacità extra da 8000 mAh, progettata per garantire la massima autonomia nei lavori più intensi. Perfetta per professionisti che necessitano di potenza prolungata senza interruzioni.',
    fullDescription: 'Batteria al litio da 18V con capacità extra da 8000 mAh, progettata per garantire la massima autonomia nei lavori più intensi. Perfetta per professionisti che necessitano di potenza prolungata senza interruzioni.',
    price: '€ 13'
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
    id: 'uten-005-forbici-pota',
    name: 'Forbici da pota',
    categoryId: 'utensileria',
    images: ['20250528_095413_yhrhia', '20250528_095422_sionl8'],
    shortDescription: 'Forbici da potatura con lame affilate in acciaio',
    fullDescription: 'Forbici da potatura con lame affilate in acciaio. Impugnatura ergonomica e sistema di chiusura di sicurezza',
    price: '€ 2 - € 6'
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
    id: 'uten-007-pistola-ingrassatrice',
    name: 'Pistola ingrassatrice',
    categoryId: 'utensileria',
    images: ['20250528_095204_a6an86', '20250528_095504_j4t4wb'],
    shortDescription: 'Fasce robuste in poliestere per sollevamento carichi',
    fullDescription: 'Fasce robuste in poliestere ad alta resistenza, ideali per il sollevamento e il trasporto in sicurezza di carichi pesanti. Utilizzate in ambito edile, agricolo e industriale, garantiscono massima affidabilità grazie alla struttura rinforzata e alle cuciture ad alta tenuta.',
    price: '€ 3 - € 12'
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
    name: 'Seghetto alternativo Makotae',
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
    id: 'ut-tagliaerba-manuale-004',
    name: 'Tagliaerba manuale Makota',
    categoryId: 'utensileria',
    images: ['20250528_084937_gemhrc'],
    shortDescription: 'Tagliaerba manuale Makota, pratico e silenzioso, ideale per la cura di piccoli giardini e spazi verdi. Dotato di lame affilate per un taglio preciso e uniforme, funziona senza elettricità o carburante, garantendo un utilizzo ecologico ed economico. Struttura leggera e maneggevole per il massimo comfort durante l\'uso.',
    fullDescription: 'Tagliaerba manuale Makota, pratico e silenzioso, ideale per la cura di piccoli giardini e spazi verdi. Dotato di lame affilate per un taglio preciso e uniforme, funziona senza elettricità o carburante, garantendo un utilizzo ecologico ed economico. Struttura leggera e maneggevole per il massimo comfort durante l\'uso.',
    price: '€ 55'
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
    name: 'Kit 4 in 1 Makota – Flex, Avvitatore a percussione, Avvitatore a impulso, Martello tassellatore',
    categoryId: 'utensileria',
    images: ['20250528_093337_pc8zfz'],
    shortDescription: 'Kit professionale 4 in 1 Makota, ideale per soddisfare ogni esigenza in ambito edilizio e di manutenzione. Include una smerigliatrice per tagli e rifiniture, un avvitatore a percussione per forare anche materiali duri, un avvitatore a impulso per lavori su viti e bulloni ad alta resistenza, e un martello tassellatore perfetto per cemento e muratura. Tutti gli utensili sono alimentati a batteria, offrendo libertà di movimento, potenza e praticità in un unico set completo e versatile.',
    fullDescription: 'Kit professionale 4 in 1 Makota, ideale per soddisfare ogni esigenza in ambito edilizio e di manutenzione. Include una smerigliatrice per tagli e rifiniture, un avvitatore a percussione per forare anche materiali duri, un avvitatore a impulso per lavori su viti e bulloni ad alta resistenza, e un martello tassellatore perfetto per cemento e muratura. Tutti gli utensili sono alimentati a batteria, offrendo libertà di movimento, potenza e praticità in un unico set completo e versatile.',
    price: '€ 120'
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
    id: 'ut-kit-forbice-009',
    name: 'Kit forbice/cesoia a batteria Makota – 3 misure di tagli',
    categoryId: 'utensileria',
    images: ['20250528_081710_cyqnar',
      '20250528_081629_frwm2l',
      '20250528_082425_lirlzz',
     ' 20250528_082302_kpdhwu',
      '20250528_082821_whpwrt',
      '20250528_082740_rogq61',
    ],
    shortDescription: 'Kit completo di forbice elettrica Makota con 3 lame intercambiabili di diverse grandezze, ideale per potature precise di rami, siepi e piante. Funzionamento a batteria per la massima libertà di movimento, impugnatura ergonomica e sistema di sicurezza integrato. Perfetto per uso domestico e professionale in giardinaggio.',
    fullDescription: 'Kit completo di forbice elettrica Makota con 3 lame intercambiabili di diverse grandezze, ideale per potature precise di rami, siepi e piante. Funzionamento a batteria per la massima libertà di movimento, impugnatura ergonomica e sistema di sicurezza integrato. Perfetto per uso domestico e professionale in giardinaggio.',
    price: '€ 50 - € 60 - € 70'
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
    shortDescription: 'Avvolgitubo da giardino pratico e resistente, perfetto per mantenere il tubo ordinato e sempre a portata di mano. Dotato di manovella per un riavvolgimento semplice e struttura stabile per un uso duraturo.',
    fullDescription: 'Avvolgitubo da giardino pratico e resistente, perfetto per mantenere il tubo ordinato e sempre a portata di mano. Dotato di manovella per un riavvolgimento semplice e struttura stabile per un uso duraturo.',
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
    price: '€ 70'
  },
  {
    id: 'ut-set-chiavi-unique-04520392408345692',
    name: 'Mini Motoseghe Makota – Tre Grandezze',
    categoryId: 'utensileria',
    images: ['DSC03464_c8hcmy',
      'DSC03463_wx5hmj',
      'DSC03475_itorc5',
      'DSC03473_e2jyfs',
      'DSC03486_d2peqr',
      'DSC03488_z6bpkl',
    ],
    shortDescription: 'Set di 3 mini motoseghe Makota a batteria, ideali per potatura rapida e precisa. Disponibili in tre misure per adattarsi a ogni esigenza di taglio. Design compatto, leggera e maneggevole, perfetta per giardinaggio e cura degli alberi.',
    fullDescription: 'Set di 3 mini motoseghe Makota a batteria, ideali per potatura rapida e precisa. Disponibili in tre misure per adattarsi a ogni esigenza di taglio. Design compatto, leggera e maneggevole, perfetta per giardinaggio e cura degli alberi.',
    price: '€ 35 - €45 - 60'
  },
  
]; 