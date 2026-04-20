import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";
import { SPECTRUM_AXES, type SpectrumProfile } from "@/types/dao-tags";

interface Props {
  spectrum: SpectrumProfile;
  max?: number;
}

export function SpectrumTags({ spectrum, max = 3 }: Props) {
  const { t } = useTranslation();

  const tags = SPECTRUM_AXES
    .filter((axis) => spectrum[axis] <= 30 || spectrum[axis] >= 70)
    .sort((a, b) => Math.abs(spectrum[b] - 50) - Math.abs(spectrum[a] - 50))
    .slice(0, max)
    .map((axis) => {
      const labels = t(`daoProfile.spectrum.${axis}` as never, { returnObjects: true }) as [string, string];
      return spectrum[axis] >= 70 ? labels[1] : labels[0];
    });

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((label) => (
        <Badge key={label} variant="outline" className="text-muted-foreground text-[0.65rem]">
          {label}
        </Badge>
      ))}
    </div>
  );
}
