export type AppRole = 'customer' | 'engineer' | 'admin';

export type ViewMode = 'desktop' | 'mobile_frame';

export type ServiceCategory = 'electrical' | 'gas' | 'emergency' | 'certification';

export interface UKServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDesc: string;
  fullDesc: string;
  startingPrice: number; // in GBP £
  estimatedTime: string;
  requiresGasSafe: boolean;
  requiresNICEIC: boolean;
  popularTag?: string;
  iconName: string;
  features: string[];
  ukStandard?: string;
}

export interface Engineer {
  id: string;
  name: string;
  avatar: string;
  roleTitle: string;
  category: 'Electrical' | 'Gas' | 'Dual Certified';
  gasSafeNo?: string;
  niceicNo?: string;
  napitNo?: string;
  dbsChecked: boolean;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  hourlyRate: number; // GBP £
  currentLocation: {
    address: string;
    postcode: string;
    lat: number;
    lng: number;
  };
  vanModel: string;
  vanReg: string;
  status: 'available' | 'on_job' | 'en_route' | 'offline';
  phone: string;
  bio: string;
  etaMinutes: number;
}

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  propertyType: 'Flat / Apartment' | 'Terraced House' | 'Semi-Detached' | 'Detached House' | 'Commercial Office' | 'Retail / Restaurant';
  serviceId: string;
  serviceTitle: string;
  category: ServiceCategory;
  urgency: 'emergency_30min' | 'same_day' | 'scheduled';
  scheduledDate: string;
  scheduledTime: string;
  status: 'pending' | 'engineer_assigned' | 'en_route' | 'in_progress' | 'completed' | 'cancelled';
  engineerId?: string;
  engineerName?: string;
  engineerAvatar?: string;
  engineerGasSafeNo?: string;
  engineerNiceicNo?: string;
  engineerPhone?: string;
  engineerEtaMinutes?: number;
  netCost: number; // GBP
  vatAmount: number; // 20% GBP
  totalCost: number; // Net + VAT
  notes?: string;
  faultDiagnosis?: AIDiagnosisResult;
  certificateIssued?: boolean;
  certificateId?: string;
  paymentStatus: 'paid' | 'pending' | 'pay_on_completion';
  paymentMethod?: 'Card' | 'Apple Pay' | 'Google Pay' | 'Open Banking / Transfer' | 'Klarna Pay Later';
  createdAt: string;
}

export interface AIDiagnosisResult {
  issueTitle: string;
  severity: 'emergency' | 'high' | 'moderate' | 'low';
  category: 'Electrical' | 'Gas & Heating' | 'Plumbing & Gas';
  probableCause: string;
  safetyWarning: string;
  estimatedCostMin: number;
  estimatedCostMax: number;
  estimatedDurationMinutes: number;
  recommendedCertification: string;
  recommendedActionSteps: string[];
  urgencyBadge: string;
  ukStandardReference?: string;
}

export interface LandlordProperty {
  id: string;
  propertyName: string;
  address: string;
  postcode: string;
  propertyType: string;
  eicrExpiryDate: string; // YYYY-MM-DD
  eicrStatus: 'valid' | 'expiring_soon' | 'expired';
  gasSafetyExpiryDate: string; // YYYY-MM-DD
  gasSafetyStatus: 'valid' | 'expiring_soon' | 'expired';
  boilerServiceExpiryDate: string;
  tenantName: string;
  tenantPhone: string;
}

export interface DigitalCertificate {
  id: string;
  certType: 'EICR' | 'CP12_GAS_SAFETY' | 'PAT_TESTING' | 'EV_CHARGER_INSTALL';
  certNumber: string;
  propertyAddress: string;
  postcode: string;
  issueDate: string;
  expiryDate: string;
  inspectorName: string;
  gasSafeNo?: string;
  niceicNo?: string;
  overallResult: 'SATISFACTORY / PASS' | 'UNSATISFACTORY / ACTION REQUIRED';
  summaryItems: {
    item: string;
    result: 'PASS' | 'FAIL (C1 Emergency)' | 'FAIL (C2 Danger)' | 'ADVISORY (C3)';
  }[];
  customerSignature?: string;
  engineerSignature: string;
}

export interface Review {
  id: string;
  customerName: string;
  location: string;
  rating: number;
  date: string;
  serviceTitle: string;
  comment: string;
  verifiedTag: boolean;
}
