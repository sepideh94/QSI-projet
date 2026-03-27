export type CampaignStatus =
  | "draft"
  | "pending"
  | "active"
  | "success"
  | "failed"
  | "refused";

export type Campaign = {
  id: string;
  projectId: string;
  titre: string;
  description: string;
  objectifFinancier: number;
  dateFin: string;
  porteurId: string;
  status: CampaignStatus;
};

export type Contribution = {
  id: string;
  campaignId: string;
  amount: number;
  contributorId: string;
  date: string;
};

const campaigns: Campaign[] = [
  {
    id: "c1a2b3c4-d5e6-7f8g-9h0i-j1k2l3m4n5o6",
    projectId: "p9o8n7m6-l5k4-j3i2-h1g0-f9e8d7c6b5a4",
    titre: "Financement des enclos extérieurs",
    description: "Aidez-nous à construire 5 nouveaux enclos sécurisés.",
    objectifFinancier: 15000,
    dateFin: "2026-10-15T23:59:59Z",
    porteurId: "u1v2w3x4-y5z6-a7b8-c9d0-e1f2g3h4i5j6",
    status: "active"
  },
  {
    id: "c2b3c4d5-e6f7-g8h9-i0j1-k2l3m4n5o6p7",
    projectId: "p2o3n4m5-l6k7-j8i9-h0g1-f2e3d4c5b6a7",
    titre: "Extension du refuge animalier",
    description: "Création d'un nouvel espace pour accueillir plus d'animaux.",
    objectifFinancier: 22000,
    dateFin: "2026-11-20T23:59:59Z",
    porteurId: "u2v3w4x5-y6z7-a8b9-c0d1-e2f3g4h5i6j7",
    status: "failed"
  },
  {
    id: "c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8",
    projectId: "p3q4r5s6-t7u8-v9w0-x1y2-z3a4b5c6d7e8",
    titre: "Campagne en préparation",
    description: "Projet en cours de finalisation avant validation.",
    objectifFinancier: 10000,
    dateFin: "2026-12-05T23:59:59Z",
    porteurId: "u3v4w5x6-y7z8-a9b0-c1d2-e3f4g5h6i7j8",
    status: "success"
  },
  {
    id: "c4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9",
    projectId: "p4r5s6t7-u8v9-w0x1-y2z3-a4b5c6d7e8f9",
    titre: "Réaménagement des espaces vétérinaires",
    description: "Modernisation des installations médicales du refuge.",
    objectifFinancier: 18000,
    dateFin: "2026-09-30T23:59:59Z",
    porteurId: "u4v5w6x7-y8z9-a0b1-c2d3-e4f5g6h7i8j9",
    status: "success"
  }
];

const contributions: Contribution[] = [
  {
    id: "ct1",
    campaignId: "c1a2b3c4-d5e6-7f8g-9h0i-j1k2l3m4n5o6",
    amount: 100,
    contributorId: "u-001",
    date: "2026-03-12T10:00:00Z"
  },
  {
    id: "ct2",
    campaignId: "c1a2b3c4-d5e6-7f8g-9h0i-j1k2l3m4n5o6",
    amount: 50,
    contributorId: "u-002",
    date: "2026-02-25T14:30:00Z"
  },
  {
    id: "ct3",
    campaignId: "c1a2b3c4-d5e6-7f8g-9h0i-j1k2l3m4n5o6",
    amount: 70,
    contributorId: "u-003",
    date: "2025-12-20T09:15:00Z"
  },
  {
    id: "ct4",
    campaignId: "c2b3c4d5-e6f7-g8h9-i0j1-k2l3m4n5o6p7",
    amount: 120,
    contributorId: "u-004",
    date: "2025-11-10T16:45:00Z"
  },
  {
    id: "ct5",
    campaignId: "c2b3c4d5-e6f7-g8h9-i0j1-k2l3m4n5o6p7",
    amount: 80,
    contributorId: "u-005",
    date: "2026-01-18T11:20:00Z"
  },
  {
    id: "ct6",
    campaignId: "c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8",
    amount: 30,
    contributorId: "u-006",
    date: "2024-12-15T08:00:00Z"
  },
  {
    id: "ct7",
    campaignId: "c4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9",
    amount: 200,
    contributorId: "u-007",
    date: "2026-03-01T13:10:00Z"
  },
  {
    id: "ct8",
    campaignId: "c4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9",
    amount: 150,
    contributorId: "u-008",
    date: "2026-02-02T17:00:00Z"
  },
  {
    id: "ct9",
    campaignId: "c4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9",
    amount: 90,
    contributorId: "u-009",
    date: "2025-07-30T12:00:00Z"
  },
  {
    id: "ct10",
    campaignId: "c4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9",
    amount: 40,
    contributorId: "u-010",
    date: "2024-02-10T07:30:00Z"
  }
];

export function getCampaigns(): Campaign[] {
  return campaigns;
}

export function getContributions(): Contribution[] {
  return contributions;
}
