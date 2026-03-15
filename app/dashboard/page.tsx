"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [activeCampaigns, setActiveCampaigns] = useState<number | null>(null);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);

  useEffect(() => {
    async function loadMetrics() {
      try {

        // campagnes actives
        const campaignsResponse = await fetch("/api/metrics/campaigns-active");
        const campaignsData = await campaignsResponse.json();
        setActiveCampaigns(campaignsData.value);

        // contributions totales
        const contributionsResponse = await fetch("/api/metrics/contributions-total");
        const contributionsData = await contributionsResponse.json();
        setTotalContributions(contributionsData.value);

      } catch (error) {
        console.error("Erreur chargement métriques", error);
      }
    }

    loadMetrics();
  }, []);

  return (
    <main style={{ padding: "24px" }}>
      <h1>Dashboard WeFund</h1>

      <h2>Indicateurs</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

        {/* Campagnes actives */}
        <div
          style={{
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

        {/* Contributions totales */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            width: "250px",
          }}
        >
          <h3>Contributions totales</h3>

          <p style={{ fontSize: "32px", fontWeight: "bold" }}>
            {totalContributions !== null ? totalContributions : "Chargement..."}
          </p>
        </div>

      </div>
    </main>
  );
}