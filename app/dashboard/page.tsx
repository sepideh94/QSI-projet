"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import MetricCard from "@/components/dashboard/MetricCard";
import PeriodFilter from "@/components/dashboard/PeriodFilter";
import ContributionsPerCampaignChart from "@/components/charts/ContributionsPerCampaignChart";
import AmountCollectedPerCampaignChart from "@/components/charts/AmountCollectedPerCampaignChart";
import TargetAchievementRatePerCampaignChart from "@/components/charts/TargetAchievementRatePerCampaignChart";
import CampaignStatusDistributionChart from "@/components/charts/CampaignStatusDistributionChart";
import { getFilteredContributionsPerCampaign } from "@/lib/charts/use-cases/get-contributions-per-campaign";
import { getFilteredAmountCollectedPerCampaign } from "@/lib/charts/use-cases/get-amount-collected-per-campaign";
import { getFilteredTargetAchievementRatePerCampaign } from "@/lib/charts/use-cases/get-target-achievement-rate-per-campaign";
import { getCampaignStatusDistribution } from "@/lib/charts/use-cases/get-campaign-status-distribution";
import { type PeriodFilter as PeriodFilterValue } from "@/lib/charts/use-cases/period-filter";

type MetricsState = {
  activeCampaigns: number | null;
  totalContributions: number | null;
  totalAmount: number | null;
  successRate: number | null;
  averageContribution: number | null;
};

type ChartOption =
  | "contributions-per-campaign"
  | "amount-collected-per-campaign"
  | "target-achievement-rate-per-campaign";

const metricCards = [
  {
    key: "activeCampaigns" as const,
    title: "Campagnes actives",
    format: (value: number) => value,
    tone: "blue" as const
  },
  {
    key: "totalContributions" as const,
    title: "Contributions totales",
    format: (value: number) => value,
    tone: "violet" as const
  },
  {
    key: "totalAmount" as const,
    title: "Montant collecté",
    format: (value: number) => `${value} €`,
    tone: "cyan" as const
  },
  {
    key: "successRate" as const,
    title: "Taux de succès",
    format: (value: number) => `${value} %`,
    tone: "green" as const
  },
  {
    key: "averageContribution" as const,
    title: "Contribution moyenne",
    format: (value: number) => value,
    tone: "slate" as const
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
        const response = await fetch("/api/metrics");

        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status} sur /api/metrics`);
        }

        const payload = await response.json();
        setMetrics({
          activeCampaigns: payload.metrics["campaigns-active"],
          totalContributions: payload.metrics["contributions-total"],
          totalAmount: payload.metrics["amount-collected"],
          successRate: payload.metrics["success-rate"],
          averageContribution: payload.metrics["average-contribution"]
        });
      } catch (error) {
        console.error("Erreur chargement métriques", error);
      }
    }

    loadMetrics();
  }, []);

  const shellStyle: CSSProperties = {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    maxWidth: "1440px",
    margin: "0 auto"
  };

  const sidebarStyle: CSSProperties = {
    width: "220px",
    flexShrink: 0,
    background: "linear-gradient(180deg, #0f172a 0%, #1e293b 55%, #172554 100%)",
    color: "#e2e8f0",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    borderRight: "1px solid rgba(148, 163, 184, 0.15)",
    boxShadow: "4px 0 24px rgba(15, 23, 42, 0.12)"
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    padding: "24px 28px 40px",
    overflow: "auto"
  };

  const contentCardStyle: CSSProperties = {
    background: "rgba(255, 255, 255, 0.92)",
    backdropFilter: "blur(12px)",
    borderRadius: "16px",
    border: "1px solid rgba(226, 232, 240, 0.9)",
    boxShadow: "0 4px 6px rgba(15, 23, 42, 0.04), 0 12px 40px rgba(30, 64, 175, 0.08)",
    padding: "24px"
  };

  return (
    <div style={shellStyle}>
      <aside style={sidebarStyle} aria-label="Navigation">
        <div style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid rgba(148, 163, 184, 0.2)" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "4px" }}>
            WeFund
          </div>
          <div style={{ fontWeight: 700, fontSize: "18px", color: "#f8fafc" }}>Dashboard SI</div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span
            style={{
              padding: "10px 12px",
              borderRadius: "10px",
              background: "rgba(59, 130, 246, 0.25)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "14px"
            }}
          >
            Vue d’ensemble
          </span>
          <span style={{ padding: "10px 12px", borderRadius: "10px", color: "#94a3b8", fontSize: "14px" }}>
            Campagnes
          </span>
          <span style={{ padding: "10px 12px", borderRadius: "10px", color: "#94a3b8", fontSize: "14px" }}>
            Contributions
          </span>
        </nav>
        <div style={{ marginTop: "auto", paddingTop: "24px", fontSize: "12px", color: "#64748b" }}>
          POC · données locales
        </div>
      </aside>

      <main style={mainStyle}>
        <div style={contentCardStyle}>
      <section
        style={{
          marginBottom: "24px",
          padding: "20px 22px",
          borderRadius: "14px",
          border: "1px solid rgba(191, 219, 254, 0.6)",
          background: "linear-gradient(105deg, #1e3a8a 0%, #2563eb 48%, #0ea5e9 100%)",
          color: "#ffffff",
          boxShadow: "0 14px 32px rgba(30, 64, 175, 0.28)"
        }}
      >
        <h1 style={{ margin: 0, marginBottom: "8px", fontSize: "clamp(26px, 4vw, 34px)", color: "#ffffff", fontWeight: 800 }}>
          Dashboard WeFund
        </h1>

        <p style={{ margin: 0, opacity: 0.92, fontSize: "15px", maxWidth: "640px" }}>
          Suivi des campagnes, contributions et performances globales
        </p>
      </section>

      <h2 style={{ marginTop: 0, marginBottom: "4px", color: "#1e3a8a", fontSize: "18px", fontWeight: 700 }}>
        Indicateurs
      </h2>
      <p style={{ margin: "0 0 16px", color: "#64748b", fontSize: "14px" }}>
        Synthèse des métriques clés du POC
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "14px",
          marginTop: "4px"
        }}
      >
        {metricCards.map(({ key, title, format, tone }) => (
          <MetricCard
            key={key}
            title={title}
            tone={tone}
            value={metrics[key] !== null ? format(metrics[key] as number) : null}
          />
        ))}
      </div>

      <h2 style={{ marginTop: "28px", marginBottom: "4px", color: "#1e3a8a", fontSize: "18px", fontWeight: 700 }}>
        Filtres & période
      </h2>
      <p style={{ margin: "0 0 16px", color: "#64748b", fontSize: "14px" }}>
        Choisissez l’indicateur et la fenêtre temporelle pour les graphiques
      </p>

      <section
        style={{
          marginTop: "0",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          alignItems: "end",
          padding: "18px 20px",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)"
        }}
      >
        <div>
          <label
            htmlFor="chart-selector"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 600,
              color: "#1e3a8a"
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
              borderRadius: "10px",
              border: "1px solid #bfdbfe",
              background: "#ffffff",
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
          marginTop: "22px",
          display: "grid",
          gridTemplateColumns: "65% 35%",
          columnGap: "16px",
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

        <div style={{ minWidth: 0 }}>
          <CampaignStatusDistributionChart
            data={campaignStatusDistributionData}
          />
        </div>
      </section>
        </div>
      </main>
    </div>
  );
}