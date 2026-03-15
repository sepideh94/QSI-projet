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
        maxWidth: "700px",
        height: "350px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        marginTop: "40px"
      }}
    >

      <h3 style={{ marginBottom: "10px" }}>
        Contributions par campagne
      </h3>

      <ResponsiveContainer width="100%" height="85%">

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="campaignTitle"
            interval={0}
            angle={-25}
            textAnchor="end"
            height={70}
            tick={{ fontSize: 12 }}
          />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar
            dataKey="contributions"
            fill="#4f46e5"
            barSize={35}
            radius={[6, 6, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}