"use client";

import { useEffect, useMemo, useState } from "react";
import MetricCard from "@/components/dashboard/MetricCard";
import PeriodFilter from "@/components/dashboard/PeriodFilter";
import ContributionsPerCampaignChart from "@/components/charts/ContributionsPerCampaignChart";
import AmountCollectedPerCampaignChart from "@/components/charts/AmountCollectedPerCampaignChart";
import TargetAchievementRatePerCampaignChart from "@/components/charts/TargetAchievementRatePerCampaignChart";
import CampaignStatusDistributionChart from "@/components/charts/CampaignStatusDistributionChart";
import { getFilteredContributionsPerCampaign } from "@/lib/charts/filtered-contributions-per-campaign";
import { getFilteredAmountCollectedPerCampaign } from "@/lib/charts/filtered-amount-collected-per-campaign";
import { getFilteredTargetAchievementRatePerCampaign } from "@/lib/charts/filtered-target-achievement-rate-per-campaign";
import { getCampaignStatusDistribution } from "@/lib/charts/campaign-status-distribution";
import { PeriodFilter as PeriodFilterValue } from "@/lib/charts/period-utils";

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
  | "amount-collected-per-campaign"
  | "target-achievement-rate-per-campaign";

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

  const [selectedPeriod, setSelectedPeriod] =
    useState<PeriodFilterValue>("all");

  const contributionsPerCampaignData = useMemo(
    () => getFilteredContributionsPerCampaign(selectedPeriod),
    [selectedPeriod]
  );

  const amountCollectedPerCampaignData = useMemo(
    () => getFilteredAmountCollectedPerCampaign(selectedPeriod),
    [selectedPeriod]
  );

  const targetAchievementRatePerCampaignData = useMemo(
    () => getFilteredTargetAchievementRatePerCampaign(selectedPeriod),
    [selectedPeriod]
  );

  const campaignStatusDistributionData = useMemo(
    () => getCampaignStatusDistribution(),
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

      <section
        style={{
          marginTop: "40px",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          alignItems: "end"
        }}
      >
        <div>
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
            <option value="target-achievement-rate-per-campaign">
              Taux d’atteinte par campagne
            </option>
          </select>
        </div>

        <PeriodFilter
          value={selectedPeriod}
          onChange={setSelectedPeriod}
        />
      </section>

      <section
        style={{
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: "65% 35%",
          columnGap: "8px",
          alignItems: "start"
        }}
      >
        <div style={{ minWidth: 0 }}>
          {selectedChart === "contributions-per-campaign" && (
            <ContributionsPerCampaignChart data={contributionsPerCampaignData} />
          )}

          {selectedChart === "amount-collected-per-campaign" && (
            <AmountCollectedPerCampaignChart
              data={amountCollectedPerCampaignData}
            />
          )}

          {selectedChart === "target-achievement-rate-per-campaign" && (
            <TargetAchievementRatePerCampaignChart
              data={targetAchievementRatePerCampaignData}
            />
          )}
        </div>

        <div style={{ minWidth: 0, marginLeft: "-40px" }}>
          <CampaignStatusDistributionChart
            data={campaignStatusDistributionData}
          />
        </div>
      </section>
    </main>
  );
}