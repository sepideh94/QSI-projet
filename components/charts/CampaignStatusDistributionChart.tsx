"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

type Props = {
  data: {
    label: string;
    value: number;
  }[];
};

const colors = ["#2563eb", "#0ea5e9", "#22c55e", "#f59e0b", "#a855f7", "#64748b"];

export default function CampaignStatusDistributionChart({ data }: Props) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "430px",
        border: "1px solid #dbeafe",
        borderRadius: "12px",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
        boxShadow: "0 10px 24px rgba(30, 64, 175, 0.08)",
        padding: "20px",
        marginTop: "20px"
      }}
    >
      <h3 style={{ margin: 0, marginBottom: "10px", color: "#1e3a8a" }}>
        Répartition des campagnes par statut
      </h3>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={95}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.label}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          <Tooltip formatter={(value) => [value, "Nombre de campagnes"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}