"use client";

import { useEffect, useState } from "react";
import MetricCard from "@/components/dashboard/MetricCard";

export default function DashboardPage() {
  const [activeCampaigns, setActiveCampaigns] = useState<number | null>(null);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  useEffect(() => {
    async function loadMetrics() {
      try {

        const campaignsResponse = await fetch("/api/metrics/campaigns-active");
        const campaignsData = await campaignsResponse.json();
        setActiveCampaigns(campaignsData.value);

        const contributionsResponse = await fetch("/api/metrics/contributions-total");
        const contributionsData = await contributionsResponse.json();
        setTotalContributions(contributionsData.value);

        const amountResponse = await fetch("/api/metrics/amount-collected");
        const amountData = await amountResponse.json();
        setTotalAmount(amountData.value);

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
        <MetricCard title="Campagnes actives" value={activeCampaigns} />

        <MetricCard title="Contributions totales" value={totalContributions} />

        <MetricCard
          title="Montant collecté"
          value={totalAmount !== null ? `${totalAmount} €` : null}
        />
      </div>
    </main>
  );
}