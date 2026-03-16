type Props = {
  title: string;
  value: string | number | null;
};

export default function MetricCard({ title, value }: Props) {
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        width: "250px",
      }}
    >
      <h3>{title}</h3>

      <p style={{ fontSize: "32px", fontWeight: "bold" }}>
        {value !== null ? value : "Chargement..."}
      </p>
    </div>
  );
}