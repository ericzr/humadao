import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";
import { getSkillLayer } from "@/data/contributor";
import type { ContributorSkill, SkillLayer } from "@/types";

const layerStyles: Record<SkillLayer, { light: string; dark: string }> = {
  1: {
    light: "bg-[#faeed9] text-[#633806] border-[#854f0b]/30",
    dark: "dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700/40",
  },
  2: {
    light: "bg-[#e1f5ee] text-[#085041] border-[#0f6e56]/30",
    dark: "dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-700/40",
  },
  3: {
    light: "bg-[#eeedfe] text-[#3c3489] border-[#534ab7]/30",
    dark: "dark:bg-violet-900/30 dark:text-violet-200 dark:border-violet-700/40",
  },
};

interface SkillBadgeProps {
  skill: ContributorSkill;
  size?: "sm" | "md";
}

export function SkillBadge({ skill, size = "sm" }: SkillBadgeProps) {
  const { t } = useTranslation();
  const layer = getSkillLayer(skill);
  const style = layerStyles[layer];

  return (
    <Badge
      className={`${style.light} ${style.dark} border ${size === "sm" ? "text-[0.65rem]" : "text-[0.7rem]"}`}
    >
      {t(`contributors.skill.${skill}`)}
    </Badge>
  );
}

export function SkillBadgeGroup({
  skills,
  max,
  size = "sm",
}: {
  skills: ContributorSkill[];
  max?: number;
  size?: "sm" | "md";
}) {
  const sorted = [...skills].sort((a, b) => getSkillLayer(a) - getSkillLayer(b));
  const display = max ? sorted.slice(0, max) : sorted;

  return (
    <div className="flex flex-wrap gap-1">
      {display.map((skill) => (
        <SkillBadge key={skill} skill={skill} size={size} />
      ))}
    </div>
  );
}
