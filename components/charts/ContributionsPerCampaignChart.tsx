"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

type Props = {
  data: {
    campaignTitle: string;
    contributions: number;
  }[];
};

export default function ContributionsPerCampaignChart({ data }: Props) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "860px",
        height: "430px",
        border: "1px solid #dbeafe",
        borderRadius: "12px",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
        boxShadow: "0 10px 24px rgba(30, 64, 175, 0.08)",
        padding: "20px",
        marginTop: "20px"
      }}
    >
      <h3 style={{ margin: 0, marginBottom: "10px", color: "#1e3a8a" }}>
        Contributions par campagne
      </h3>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 90 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="campaignTitle"
            interval={0}
            angle={-25}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 12 }}
          />

          <YAxis allowDecimals={false} />

          <Tooltip formatter={(value) => [value, "Contributions"]} />

          <Bar
            dataKey="contributions"
            fill="#2563eb"
            barSize={60}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}