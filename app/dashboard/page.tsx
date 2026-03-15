"use client";

import { useEffect, useMemo, useState } from "react";
import MetricCard from "@/components/dashboard/MetricCard";
import ContributionsPerCampaignChart from "@/components/charts/ContributionsPerCampaignChart";
import AmountCollectedPerCampaignChart from "@/components/charts/AmountCollectedPerCampaignChart";
import { getContributionsPerCampaign } from "@/lib/metrics/contributions/contributions-per-campaign";
import { getAmountCollectedPerCampaign } from "@/lib/charts/amount-collected-per-campaign";

type MetricsState = {
  activeCampaigns: number | null;
  totalContributions: number | null;
  totalAmount: number | null;
  successRate: number | null;
  averageContribution: number | null;
};

type MetricResponse = {
  value: number;
};

type ChartOption =
  | "contributions-per-campaign"
  | "amount-collected-per-campaign";

const metricEndpoints = [
  {
    key: "activeCampaigns" as const,
    url: "/api/metrics/campaigns-active",
    title: "Campagnes actives",
    format: (value: number) => value
  },
  {
    key: "totalContributions" as const,
    url: "/api/metrics/contributions-total",
    title: "Contributions totales",
    format: (value: number) => value
  },
  {
    key: "totalAmount" as const,
    url: "/api/metrics/amount-collected",
    title: "Montant collecté",
    format: (value: number) => `${value} €`
  },
  {
    key: "successRate" as const,
    url: "/api/metrics/success-rate",
    title: "Taux de succès",
    format: (value: number) => `${value} %`
  },
  {
    key: "averageContribution" as const,
    url: "/api/metrics/average-contribution",
    title: "Contribution moyenne",
    format: (value: number) => value
  }
];

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<MetricsState>({
    activeCampaigns: null,
    totalContributions: null,
    totalAmount: null,
    successRate: null,
    averageContribution: null
  });

  const [selectedChart, setSelectedChart] =
    useState<ChartOption>("contributions-per-campaign");

  const contributionsPerCampaignData = useMemo(
    () => getContributionsPerCampaign(),
    []
  );

  const amountCollectedPerCampaignData = useMemo(
    () => getAmountCollectedPerCampaign(),
    []
  );

  useEffect(() => {
    async function loadMetrics() {
      try {
        const results = await Promise.all(
          metricEndpoints.map(async ({ key, url }) => {
            const response = await fetch(url);

            if (!response.ok) {
              throw new Error(`Erreur HTTP ${response.status} sur ${url}`);
            }

            const data: MetricResponse = await response.json();

            return { key, value: data.value };
          })
        );

        setMetrics((currentMetrics) => {
          const nextMetrics = { ...currentMetrics };

          for (const result of results) {
            nextMetrics[result.key] = result.value;
          }

          return nextMetrics;
        });
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
        {metricEndpoints.map(({ key, title, format }) => (
          <MetricCard
            key={key}
            title={title}
            value={metrics[key] !== null ? format(metrics[key] as number) : null}
          />
        ))}
      </div>

      <section style={{ marginTop: "40px", maxWidth: "700px" }}>
        <label
          htmlFor="chart-selector"
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold"
          }}
        >
          Sélectionner un indicateur
        </label>

        <select
          id="chart-selector"
          value={selectedChart}
          onChange={(event) =>
            setSelectedChart(event.target.value as ChartOption)
          }
          style={{
            padding: "10px 12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            minWidth: "280px"
          }}
        >
          <option value="contributions-per-campaign">
            Contributions par campagne
          </option>
          <option value="amount-collected-per-campaign">
            Montant collecté par campagne
          </option>
        </select>
      </section>

      {selectedChart === "contributions-per-campaign" && (
        <ContributionsPerCampaignChart data={contributionsPerCampaignData} />
      )}

      {selectedChart === "amount-collected-per-campaign" && (
        <AmountCollectedPerCampaignChart
          data={amountCollectedPerCampaignData}
        />
      )}
    </main>
  );
}