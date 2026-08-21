import { UKServiceItem, Engineer, Booking, LandlordProperty, DigitalCertificate, Review } from '../types';

export const UK_SERVICES: UKServiceItem[] = [
  // Electrical Services
  {
    id: 'fuse-box-upgrade',
    title: 'Consumer Unit / Fuse Board Upgrade',
    category: 'electrical',
    shortDesc: '18th Edition metal dual-RCD / RCBO fuse board replacement with surge protection & EICR certification.',
    fullDesc: 'Upgrade your outdated rewirable fuse box to a modern 18th Edition Amendment 2 compliant metal consumer unit with individual RCBO circuit breakers and Surge Protection Device (SPD). Complies with BS 7671 regulations.',
    startingPrice: 380,
    estimatedTime: '4 - 6 Hours',
    requiresGasSafe: false,
    requiresNICEIC: true,
    popularTag: 'Most Requested',
    iconName: 'Zap',
    ukStandard: 'BS 7671:2018+A2:2022',
    features: [
      '18th Edition compliant metal consumer unit',
      'RCBO protection for every circuit',
      'Surge Protection Device (SPD) included',
      'Full circuit testing & EICR certificate',
      'NICEIC Building Control notification'
    ]
  },
  {
    id: 'eicr-landlord-cert',
    title: 'EICR Landlord Electrical Safety Certificate',
    category: 'certification',
    shortDesc: 'Mandatory 5-year electrical safety inspection for UK landlords and property managers.',
    fullDesc: 'Comprehensive Electrical Installation Condition Report (EICR) by a qualified NICEIC electrician. Required by law every 5 years for UK rented residential properties.',
    startingPrice: 120,
    estimatedTime: '1.5 - 2 Hours',
    requiresGasSafe: false,
    requiresNICEIC: true,
    popularTag: 'Landlord Essential',
    iconName: 'FileCheck',
    ukStandard: 'Electrical Safety Standards 2020',
    features: [
      'Testing of all fixed wiring & socket circuits',
      'Digital PDF report issued within 24 hours',
      'Code C1, C2 & C3 breakdown with photo proof',
      'Instant landlord compliance dashboard update',
      'Discounted remedy quote if remedials required'
    ]
  },
  {
    id: 'emergency-electrician',
    title: '24/7 Emergency Electrician Dispatch',
    category: 'emergency',
    shortDesc: '30-minute rapid response for power outages, smoking sockets, burnt smells & tripping RCDs.',
    fullDesc: 'Immediate callout by an emergency NICEIC electrician for total loss of power, electrical fire hazards, dangerous sparking, or water ingress into light fittings.',
    startingPrice: 95,
    estimatedTime: '30-45 Min Arrival',
    requiresGasSafe: false,
    requiresNICEIC: true,
    popularTag: '24/7 Rapid',
    iconName: 'AlertTriangle',
    ukStandard: 'Emergency Response SLA',
    features: [
      'Guaranteed rapid UK dispatch',
      'Live engineer GPS tracking',
      'First hour diagnostic & safe isolation included',
      'Stocked van with replacement RCBOs & switches',
      'No hidden emergency surcharge'
    ]
  },
  {
    id: 'ev-charger-install',
    title: 'Home & Commercial EV Charger Installation',
    category: 'electrical',
    shortDesc: 'Smart 7kW / 22kW Electric Vehicle Charger installation (Ohme, Myenergi Zappi, Wallbox).',
    fullDesc: 'Professional installation of smart EV wallbox chargers for Tesla, BMW, Nissan, VW, and all electric vehicles. Includes OZEV grant compliance and PEN fault protection.',
    startingPrice: 599,
    estimatedTime: '3 - 4 Hours',
    requiresGasSafe: false,
    requiresNICEIC: true,
    popularTag: 'Eco / Smart',
    iconName: 'BatteryCharging',
    ukStandard: 'IET Code of Practice EV',
    features: [
      '7kW tethered or socketed smart wallbox',
      'Solar integration capable (Zappi / Hypervolt)',
      'Built-in PME earth fault protection',
      'DNO (Distribution Network Operator) notification',
      'Smartphone app setup & dynamic tariff sync'
    ]
  },
  {
    id: 'solar-battery-storage',
    title: 'Solar Panel Electrical & Battery Storage Wiring',
    category: 'electrical',
    shortDesc: 'Hybrid inverter wiring, GivEnergy / Tesla Powerwall battery hookup & MCS certification.',
    fullDesc: 'Complete electrical connection of rooftop solar PV arrays, AC-coupled battery storage, emergency backup power (EPS) switches, and smart grid export meters.',
    startingPrice: 850,
    estimatedTime: '1 Day',
    requiresGasSafe: false,
    requiresNICEIC: true,
    iconName: 'Sun',
    ukStandard: 'G98 / G99 Grid Connection',
    features: [
      'DC isolation & AC grid integration',
      'Emergency EPS backup switch installation',
      'Smart meter tariff setup (Octopus Flux / Agile)',
      'MCS electrical signoff & DNO approval'
    ]
  },

  // Gas Services
  {
    id: 'gas-safety-cp12',
    title: 'Gas Safety CP12 Landlord Certificate',
    category: 'certification',
    shortDesc: 'Official Gas Safe CP12 inspection certificate for boilers, gas hobs, and fires.',
    fullDesc: 'Annual legal requirement for UK landlords. A Gas Safe registered engineer inspects all gas appliances, pipework pressure, flue flow, and safety cutouts.',
    startingPrice: 75,
    estimatedTime: '45 - 60 Mins',
    requiresGasSafe: true,
    requiresNICEIC: false,
    popularTag: 'Landlord Essential',
    iconName: 'Flame',
    ukStandard: 'Gas Safety Reg 36 (GSIUR 1998)',
    features: [
      'Inspection of up to 3 gas appliances',
      'Gas tightness test at gas meter',
      'Flue gas analyzer emissions test',
      'Digital CP12 PDF emailed immediately',
      'Free automated annual expiry reminder'
    ]
  },
  {
    id: 'boiler-servicing-annual',
    title: 'Annual Boiler Servicing & Health Check',
    category: 'gas',
    shortDesc: 'Comprehensive service for Worcester Bosch, Vaillant, Ideal, Baxi & Glow-worm combi boilers.',
    fullDesc: 'Prevent breakdowns and validate manufacturer warranty with a thorough 18-point annual boiler service. Includes heat exchanger cleaning, flue gas analysis, and seal check.',
    startingPrice: 89,
    estimatedTime: '1 Hour',
    requiresGasSafe: true,
    requiresNICEIC: false,
    popularTag: 'Save Money',
    iconName: 'Wrench',
    ukStandard: 'Manufacturer Certified',
    features: [
      'Clean main burner & spark electrode',
      'Combustion ratio test (CO / CO2)',
      'Expansion vessel pressure check & recharge',
      'Magnetic heating filter clean (MagnaClean)',
      'Extends boiler lifespan & maintains warranty'
    ]
  },
  {
    id: 'emergency-gas-engineer',
    title: 'Emergency Gas Leak & Boiler Breakdown',
    category: 'emergency',
    shortDesc: 'Immediate emergency response for gas smells, boiler error codes (F22/F75) & cold radiators.',
    fullDesc: 'Immediate dispatch of a certified Gas Safe emergency engineer. Safe gas isolation, leak detection using electronic sniffer, and rapid repair of broken boiler components.',
    startingPrice: 110,
    estimatedTime: '30-45 Min Arrival',
    requiresGasSafe: true,
    requiresNICEIC: false,
    popularTag: '24/7 Emergency',
    iconName: 'AlertCircle',
    ukStandard: 'Gas Safe Emergency Protocol',
    features: [
      'Sniffer leak trace & emergency repair',
      'Boiler PCB & pump fault diagnosis',
      'Safe gas restoring certificate',
      'Replacement valves & thermocouples carried'
    ]
  },
  {
    id: 'boiler-replacement-new',
    title: 'New A-Rated Combi Boiler Installation',
    category: 'gas',
    shortDesc: 'New energy efficient Worcester Bosch / Vaillant combi boiler with up to 12 years warranty.',
    fullDesc: 'Complete replacement of your old inefficient boiler with a brand new A-rated condensing combi boiler. Includes chemical flush, smart thermostat, and Benchmark registration.',
    startingPrice: 1650,
    estimatedTime: '1 Day',
    requiresGasSafe: true,
    requiresNICEIC: true,
    popularTag: 'Top Rated',
    iconName: 'Flame',
    ukStandard: 'Building Regs Part L Compliant',
    features: [
      'A-rated Worcester Bosch / Vaillant boiler',
      'Up to 12 years parts & labour guarantee',
      'Adey MagnaClean magnetic system filter',
      'Wireless programmable smart thermostat',
      'Free chemical system flush & inhibitor'
    ]
  },
  {
    id: 'smart-thermostat-nest-hive',
    title: 'Smart Thermostat Installation (Hive / Nest)',
    category: 'gas',
    shortDesc: 'Installation & wiring of Hive Active Heating, Google Nest Learning, or Tado thermostats.',
    fullDesc: 'Professional wiring of receiver module to your boiler controller, hub setup, wall thermostat mounting, and mobile app pairing for smart zone heating control.',
    startingPrice: 140,
    estimatedTime: '1.5 Hours',
    requiresGasSafe: true,
    requiresNICEIC: true,
    iconName: 'Thermometer',
    features: [
      'Wiring to combi or system boiler controls',
      'Smart hub bridge connection to router',
      'Phone app pairing & scheduling tutorial',
      'Multi-zone thermostatic radiator valve (TRV) ready'
    ]
  },
  {
    id: 'pat-testing-commercial',
    title: 'PAT Testing (Portable Appliance Testing)',
    category: 'certification',
    shortDesc: 'Safety testing for appliances in offices, rental flats, shops, and construction sites.',
    fullDesc: 'Visual and electrical safety testing of portable electrical tools, computers, kettles, and extensions. Includes green pass stickers and detailed digital asset log.',
    startingPrice: 65,
    estimatedTime: '1 - 2 Hours',
    requiresGasSafe: false,
    requiresNICEIC: true,
    iconName: 'CheckSquare',
    features: [
      'Includes up to 20 appliances (£1.50 per add-on)',
      'Insulation & earth continuity testing',
      'Pass/Fail barcode labels applied',
      'Full PDF Equipment Register report'
    ]
  }
];

export const MOCK_ENGINEERS: Engineer[] = [
  {
    id: 'eng-101',
    name: 'David Miller',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    roleTitle: 'Senior Gas Safe & Electrical Engineer',
    category: 'Dual Certified',
    gasSafeNo: '589210',
    niceicNo: '042918',
    napitNo: 'NAP-3382',
    dbsChecked: true,
    rating: 4.96,
    reviewCount: 312,
    completedJobs: 1480,
    hourlyRate: 85,
    currentLocation: {
      address: 'Kensington High Street, London',
      postcode: 'W8 6ED',
      lat: 51.501,
      lng: -0.192
    },
    vanModel: 'Ford Transit Custom (Electric)',
    vanReg: 'VK23 XOL',
    status: 'en_route',
    phone: '07700 900482',
    bio: '18 years UK experience in emergency boiler diagnostics, 18th edition consumer unit upgrades, and commercial Gas Safe inspections across West London.',
    etaMinutes: 14
  },
  {
    id: 'eng-102',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    roleTitle: 'NICEIC Approved Master Electrician',
    category: 'Electrical',
    niceicNo: 'NIC-88201',
    napitNo: 'NAP-1920',
    dbsChecked: true,
    rating: 4.98,
    reviewCount: 245,
    completedJobs: 980,
    hourlyRate: 75,
    currentLocation: {
      address: 'Deansgate, Manchester',
      postcode: 'M3 4EN',
      lat: 53.479,
      lng: -2.248
    },
    vanModel: 'Volkswagen ID. Buzz Cargo',
    vanReg: 'MA74 EVX',
    status: 'available',
    phone: '07700 900119',
    bio: 'Specialist in EV smart charger installations, EICR landlord reports, full rewires, and solar battery storage wiring across Greater Manchester.',
    etaMinutes: 22
  },
  {
    id: 'eng-103',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    roleTitle: 'Gas Safe Heating Specialist (Worcester Approved)',
    category: 'Gas',
    gasSafeNo: '648291',
    dbsChecked: true,
    rating: 4.92,
    reviewCount: 189,
    completedJobs: 820,
    hourlyRate: 80,
    currentLocation: {
      address: 'Bullring, Birmingham',
      postcode: 'B5 4BU',
      lat: 52.477,
      lng: -1.893
    },
    vanModel: 'Peugeot Expert Gas Service Van',
    vanReg: 'BM72 GAS',
    status: 'on_job',
    phone: '07700 900388',
    bio: 'Expert in combi boiler installations, power flushing, CP12 certificates, and smart thermostat heating controls across West Midlands.',
    etaMinutes: 30
  },
  {
    id: 'eng-104',
    name: 'Alexander Ross',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    roleTitle: 'Emergency Electrical & Commercial Inspector',
    category: 'Electrical',
    niceicNo: 'NIC-91044',
    dbsChecked: true,
    rating: 4.95,
    reviewCount: 164,
    completedJobs: 650,
    hourlyRate: 85,
    currentLocation: {
      address: 'Princes Street, Edinburgh',
      postcode: 'EH2 2EQ',
      lat: 55.953,
      lng: -3.188
    },
    vanModel: 'Mercedes-Benz Vito Dualiner',
    vanReg: 'ED73 SPK',
    status: 'available',
    phone: '07700 900741',
    bio: 'Commercial 3-phase specialist, fault finding expert, and emergency night callouts in Edinburgh & Lothians.',
    etaMinutes: 18
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'VOLT-9842',
    customerName: 'Eleanor Vance',
    email: 'eleanor.vance@example.co.uk',
    phone: '07911 123456',
    address: '14 Kensington Gardens, Flat 3B, London',
    postcode: 'W8 4PR',
    propertyType: 'Flat / Apartment',
    serviceId: 'emergency-electrician',
    serviceTitle: '24/7 Emergency Electrician Dispatch',
    category: 'emergency',
    urgency: 'emergency_30min',
    scheduledDate: '2026-08-03',
    scheduledTime: 'Immediate Dispatch',
    status: 'en_route',
    engineerId: 'eng-101',
    engineerName: 'David Miller',
    engineerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    engineerGasSafeNo: '589210',
    engineerNiceicNo: '042918',
    engineerPhone: '07700 900482',
    engineerEtaMinutes: 14,
    netCost: 95.00,
    vatAmount: 19.00,
    totalCost: 114.00,
    notes: 'RCD switch in main hall consumer unit tripped when microwave was switched on. Smells faint ozone warmth near panel.',
    faultDiagnosis: {
      issueTitle: 'Circuit Breaker Thermal Tripping & Neutral Fault',
      severity: 'high',
      category: 'Electrical',
      probableCause: 'Overload or neutral-earth fault on kitchen ring main socket circuit.',
      safetyWarning: 'Leave faulty appliance unplugged. Do not force RCD lever up if it immediately snaps back.',
      estimatedCostMin: 95,
      estimatedCostMax: 145,
      estimatedDurationMinutes: 60,
      recommendedCertification: 'NICEIC / NAPIT Certified Electrician',
      recommendedActionSteps: [
        'Isolate kitchen socket ring main MCB',
        'Perform insulation resistance test (500V DC)',
        'Check socket termination tightness & replace faulty breaker'
      ],
      urgencyBadge: 'EMERGENCY 30-MIN DISPATCH',
      ukStandardReference: 'BS 7671 Reg 411.3.3'
    },
    paymentStatus: 'paid',
    paymentMethod: 'Apple Pay',
    createdAt: '2026-08-03T08:50:00Z'
  },
  {
    id: 'VOLT-8819',
    customerName: 'James Harrington (Landlord)',
    email: 'j.harrington@londonestates.co.uk',
    phone: '07890 654321',
    address: '42 Regent Street, Cambridge',
    postcode: 'CB2 1AB',
    propertyType: 'Terraced House',
    serviceId: 'gas-safety-cp12',
    serviceTitle: 'Gas Safety CP12 Landlord Certificate',
    category: 'certification',
    urgency: 'scheduled',
    scheduledDate: '2026-08-05',
    scheduledTime: '10:00 - 12:00',
    status: 'engineer_assigned',
    engineerId: 'eng-103',
    engineerName: 'Marcus Vance',
    engineerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    engineerGasSafeNo: '648291',
    engineerPhone: '07700 900388',
    netCost: 75.00,
    vatAmount: 15.00,
    totalCost: 90.00,
    notes: 'Annual CP12 certificate for tenant move-in. Gas combi boiler + gas hob in kitchen.',
    paymentStatus: 'paid',
    paymentMethod: 'Card',
    createdAt: '2026-08-02T14:20:00Z'
  }
];

export const MOCK_LANDLORD_PROPERTIES: LandlordProperty[] = [
  {
    id: 'prop-1',
    propertyName: 'Kensington Luxury Flat',
    address: '14 Kensington Gardens, Flat 3B, London',
    postcode: 'W8 4PR',
    propertyType: '2 Bed Flat',
    eicrExpiryDate: '2026-09-15',
    eicrStatus: 'expiring_soon',
    gasSafetyExpiryDate: '2027-02-10',
    gasSafetyStatus: 'valid',
    boilerServiceExpiryDate: '2026-11-20',
    tenantName: 'Sophie Bennett',
    tenantPhone: '07712 345678'
  },
  {
    id: 'prop-2',
    propertyName: 'Cambridge Student Let',
    address: '42 Regent Street, Cambridge',
    postcode: 'CB2 1AB',
    propertyType: '4 Bed Terraced House',
    eicrExpiryDate: '2028-05-10',
    eicrStatus: 'valid',
    gasSafetyExpiryDate: '2026-08-20',
    gasSafetyStatus: 'expiring_soon',
    boilerServiceExpiryDate: '2026-08-20',
    tenantName: 'Oliver Smith',
    tenantPhone: '07788 990011'
  },
  {
    id: 'prop-3',
    propertyName: 'Manchester City Center Loft',
    address: '88 Deansgate, Apartment 12, Manchester',
    postcode: 'M3 2BW',
    propertyType: '1 Bed Apartment',
    eicrExpiryDate: '2026-07-01',
    eicrStatus: 'expired',
    gasSafetyExpiryDate: '2027-04-14',
    gasSafetyStatus: 'valid',
    boilerServiceExpiryDate: '2027-04-14',
    tenantName: 'Liam Harrison',
    tenantPhone: '07733 445566'
  }
];

export const MOCK_CERTIFICATES: DigitalCertificate[] = [
  {
    id: 'CERT-EICR-2026-0421',
    certType: 'EICR',
    certNumber: 'UK-EICR-892019-NIC',
    propertyAddress: '14 Kensington Gardens, Flat 3B, London',
    postcode: 'W8 4PR',
    issueDate: '2026-08-03',
    expiryDate: '2031-08-03',
    inspectorName: 'David Miller',
    niceicNo: '042918',
    overallResult: 'SATISFACTORY / PASS',
    summaryItems: [
      { item: 'Main Consumer Unit 18th Ed RCD Protection', result: 'PASS' },
      { item: 'Earthing & Bonding (10mm2 Main Earth Conductor)', result: 'PASS' },
      { item: 'Insulation Resistance Test (Kitchen Ring > 200 MΩ)', result: 'PASS' },
      { item: 'Bathroom Zone 1 IPX4 Light Fittings', result: 'PASS' },
      { item: 'Smoke & Heat Alarms Interlinked (Grade D1)', result: 'ADVISORY (C3)' }
    ],
    engineerSignature: 'D. Miller NICEIC Approved'
  },
  {
    id: 'CERT-CP12-2026-7812',
    certType: 'CP12_GAS_SAFETY',
    certNumber: 'UK-CP12-589210-GS',
    propertyAddress: '42 Regent Street, Cambridge',
    postcode: 'CB2 1AB',
    issueDate: '2026-08-02',
    expiryDate: '2027-08-02',
    inspectorName: 'Marcus Vance',
    gasSafeNo: '648291',
    overallResult: 'SATISFACTORY / PASS',
    summaryItems: [
      { item: 'Worcester Bosch 30i Combi Boiler Pressure & Combustion', result: 'PASS' },
      { item: 'Flue Gas Analysis (CO:CO2 ratio 0.0014 within spec)', result: 'PASS' },
      { item: 'Gas Hob Flame Supervision Device (FSD) Cutout', result: 'PASS' },
      { item: 'Gas Tightness Test at Meter (0 mbar drop over 2 mins)', result: 'PASS' }
    ],
    engineerSignature: 'M. Vance Gas Safe Registered #648291'
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Sir Arthur Pendelton',
    location: 'Kensington, London',
    rating: 5,
    date: 'Yesterday',
    serviceTitle: '24/7 Emergency Electrician',
    comment: 'Our main consumer unit tripped at 10 PM. David arrived in 18 minutes! Replaced the faulty RCBO quickly and gave us total peace of mind. Exceptional UK service.',
    verifiedTag: true
  },
  {
    id: 'rev-2',
    customerName: 'Charlotte Hughes',
    location: 'Didsbury, Manchester',
    rating: 5,
    date: '3 days ago',
    serviceTitle: 'EV Charger & Fuse Board Upgrade',
    comment: 'Sarah installed our Hypervolt EV charger and upgraded our fuse box to 18th edition standards. Handled all DNO paperwork automatically. Top class engineer!',
    verifiedTag: true
  },
  {
    id: 'rev-3',
    customerName: 'Robert Sterling (Property Director)',
    location: 'Solihull, Birmingham',
    rating: 5,
    date: '1 week ago',
    serviceTitle: 'Gas Safety CP12 & EICR',
    comment: 'As a landlord with 12 properties, VoltSure makes compliance effortless. Instant digital CP12 PDF certificates and automated expiry reminders.',
    verifiedTag: true
  }
];
