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
    label: string;
    value: number;
  }[];
};

export default function TargetAchievementRatePerCampaignChart({
  data
}: Props) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "820px",
        height: "430px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        marginTop: "40px"
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>
        Taux d’atteinte par campagne
      </h3>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 90 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="label"
            interval={0}
            angle={-25}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 12 }}
          />

          <YAxis />

          <Tooltip formatter={(value) => [`${value} %`, "Taux d’atteinte"]} />

          <Bar
            dataKey="value"
            fill="#16a34a"
            barSize={60}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}