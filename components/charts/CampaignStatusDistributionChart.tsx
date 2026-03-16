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

const colors = ["#2563eb", "#16a34a", "#dc2626", "#f59e0b", "#7c3aed", "#6b7280"];

export default function CampaignStatusDistributionChart({ data }: Props) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "430px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        marginTop: "40px"
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>
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