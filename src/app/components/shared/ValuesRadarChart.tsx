import { useTranslation } from "react-i18next";
import { VALUE_DIMENSIONS, type ValuesProfile } from "@/types/dao-tags";

interface Props {
  values: ValuesProfile;
  size?: number;
}

export function ValuesRadarChart({ values, size = 200 }: Props) {
  const { t } = useTranslation();
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const n = VALUE_DIMENSIONS.length;
  const angleStep = (Math.PI * 2) / n;

  const point = (i: number, ratio: number) => ({
    x: cx + r * ratio * Math.sin(i * angleStep),
    y: cy - r * ratio * Math.cos(i * angleStep),
  });

  const gridLevels = [0.25, 0.5, 0.75, 1];

  const dataPoints = VALUE_DIMENSIONS.map((d, i) => point(i, values[d] / 100));
  const polygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="block mx-auto">
      {gridLevels.map((lv) => (
        <polygon
          key={lv}
          points={Array.from({ length: n }, (_, i) => point(i, lv))
            .map((p) => `${p.x},${p.y}`)
            .join(" ")}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.1}
          strokeWidth={1}
        />
      ))}

      {VALUE_DIMENSIONS.map((_, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={point(i, 1).x}
          y2={point(i, 1).y}
          stroke="currentColor"
          strokeOpacity={0.1}
          strokeWidth={1}
        />
      ))}

      <polygon points={polygon} fill="hsl(var(--primary))" fillOpacity={0.15} stroke="hsl(var(--primary))" strokeWidth={1.5} />

      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.5} fill="hsl(var(--primary))" />
      ))}

      {VALUE_DIMENSIONS.map((d, i) => {
        const labelR = r + size * 0.12;
        const lx = cx + labelR * Math.sin(i * angleStep);
        const ly = cy - labelR * Math.cos(i * angleStep);
        return (
          <text
            key={d}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-muted-foreground"
            fontSize={size * 0.052}
          >
            {t(`daoProfile.value.${d}` as never)}
          </text>
        );
      })}
    </svg>
  );
}
