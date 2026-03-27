"use client";

import { type PeriodFilter as PeriodFilterValue } from "@/lib/charts/use-cases/period-filter";

type Props = {
  value: PeriodFilterValue;
  onChange: (value: PeriodFilterValue) => void;
};

const options: { value: PeriodFilterValue; label: string }[] = [
  { value: "all", label: "Toute la période" },
  { value: "30d", label: "30 derniers jours" },
  { value: "90d", label: "90 derniers jours" },
  { value: "12m", label: "12 derniers mois" }
];

export default function PeriodFilter({ value, onChange }: Props) {
  return (
    <div>
      <label
        htmlFor="period-filter"
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "bold"
        }}
      >
        Période
      </label>

      <select
        id="period-filter"
        value={value}
        onChange={(event) => onChange(event.target.value as PeriodFilterValue)}
        style={{
          padding: "10px 12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          minWidth: "220px"
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}