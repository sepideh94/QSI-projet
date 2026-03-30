type Props = {
  title: string;
  value: string | number | null;
  tone?: "blue" | "violet" | "cyan" | "green" | "slate";
};

const tones = {
  blue: { border: "#bfdbfe", title: "#1d4ed8", glow: "rgba(37, 99, 235, 0.16)" },
  violet: { border: "#ddd6fe", title: "#6d28d9", glow: "rgba(124, 58, 237, 0.16)" },
  cyan: { border: "#bae6fd", title: "#0369a1", glow: "rgba(14, 165, 233, 0.16)" },
  green: { border: "#bbf7d0", title: "#15803d", glow: "rgba(34, 197, 94, 0.16)" },
  slate: { border: "#cbd5e1", title: "#475569", glow: "rgba(71, 85, 105, 0.12)" }
};

export default function MetricCard({ title, value, tone = "blue" }: Props) {
  const styleTone = tones[tone];

  return (
    <div
      style={{
        padding: "18px",
        border: `1px solid ${styleTone.border}`,
        borderRadius: "12px",
        width: "100%",
        minWidth: 0,
        background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
        boxShadow: `0 10px 24px ${styleTone.glow}`
      }}
    >
      <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: styleTone.title }}>
        {title}
      </h3>

      <p style={{ margin: "12px 0 0", fontSize: "30px", fontWeight: 700, color: "#0f172a" }}>
        {value !== null ? value : "Chargement..."}
      </p>
    </div>
  );
}