import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";
import { VALUE_DIMENSIONS, type ValuesProfile } from "@/types/dao-tags";

interface Props {
  values: ValuesProfile;
  /** only show dimensions above this threshold (0-100) */
  threshold?: number;
  max?: number;
}

export function ValuesTags({ values, threshold = 65, max = 4 }: Props) {
  const { t } = useTranslation();

  const top = VALUE_DIMENSIONS
    .filter((d) => values[d] >= threshold)
    .sort((a, b) => values[b] - values[a])
    .slice(0, max);

  if (top.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {top.map((d) => (
        <Badge key={d} variant="outline" className="text-muted-foreground text-[0.65rem]">
          {t(`daoProfile.value.${d}` as never)}
        </Badge>
      ))}
    </div>
  );
}
