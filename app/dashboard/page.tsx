"use client";

import { useEffect, useState } from "react";
import MetricCard from "@/components/dashboard/MetricCard";
import ContributionsPerCampaignChart from "@/components/charts/ContributionsPerCampaignChart";
import { getContributionsPerCampaign } from "@/lib/metrics/contributions/contributions-per-campaign";

export default function DashboardPage() {

  const [activeCampaigns, setActiveCampaigns] = useState<number | null>(null);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [successRate, setSuccessRate] = useState<number | null>(null);
  const [averageContribution, setAverageContribution] = useState<number | null>(null);

  const chartData = getContributionsPerCampaign();

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

        const successResponse = await fetch("/api/metrics/success-rate");
        const successData = await successResponse.json();
        setSuccessRate(successData.value);

        const averageResponse = await fetch("/api/metrics/average-contribution");
        const averageData = await averageResponse.json();
        setAverageContribution(
averageData.value);

      } catch (error) {

        console.error("Erreur chargement métriques", error);

      }

    }

    loadMetrics();

  }, []);

  return (

    <main
      style={{
        padding: "24px",
        minHeight: "100vh",
        paddingBottom: "120px"
      }}
    >

      <h1>Dashboard WeFund</h1>

      <h2>Indicateurs</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap"
        }}
      >

        <MetricCard title="Campagnes actives" value={activeCampaigns} />

        <MetricCard title="Contributions totales" value={totalContributions} />

        <MetricCard
          title="Montant collecté"
          value={totalAmount !== null ? `${totalAmount} €` : null}
        />

        <MetricCard
          title="Taux de succès"
          value={successRate !== null ? `${successRate} %` : null}
        />

        <MetricCard
          title="Contribution moyenne"
          value={averageContribution !== null ? `${averageContribution}` : null}
        />

      </div>

      <ContributionsPerCampaignChart data={chartData} />

    </main>

  );

}