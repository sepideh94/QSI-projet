"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [activeCampaigns, setActiveCampaigns] = useState<number | null>(null);

  useEffect(() => {
    async function loadMetric() {
      try {
        const response = await fetch("/api/metrics/campaigns-active");
        const data = await response.json();
        setActiveCampaigns(data.value);
      } catch (error) {
        console.error("Erreur chargement métrique", error);
      }
    }

    loadMetric();
  }, []);

  return (
    <main style={{ padding: "24px" }}>
      <h1>Dashboard WeFund</h1>

      <h2>Indicateurs</h2>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          width: "250px",
        }}
      >
        <h3>Campagnes actives</h3>

        <p style={{ fontSize: "32px", fontWeight: "bold" }}>
          {activeCampaigns !== null ? activeCampaigns : "Chargement..."}
        </p>
      </div>
    </main>
  );
}