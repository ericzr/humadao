import { Card } from "../../ui/card";
import { useTranslation } from "react-i18next";
import type { CreateDAOFormData } from "../CreateProjectPage";

const skillOptions = [
  "create.skill.dev",
  "create.skill.design",
  "create.skill.ops",
  "create.skill.translation",
  "create.skill.marketing",
  "create.skill.research",
  "create.skill.product",
  "create.skill.community",
  "create.skill.writing",
  "create.skill.security",
] as const;

interface Props {
  form?: CreateDAOFormData;
  update?: (patch: Partial<CreateDAOFormData>) => void;
}

export function SkillsSection({ form, update }: Props) {
  const { t } = useTranslation();
  const selected = form?.skills ?? [];

  const toggle = (s: string) => {
    if (selected.includes(s)) {
      update?.({ skills: selected.filter((x) => x !== s) });
    } else {
      update?.({ skills: [...selected, s] });
    }
  };

  return (
    <Card className="bg-card border-border p-4 sm:p-6 space-y-4">
      <h2>{t("create.requiredSkills")}</h2>
      <p className="text-muted-foreground text-sm">{t("create.requiredSkillsDesc")}</p>
      <div className="flex flex-wrap gap-2">
        {skillOptions.map((s) => {
          const active = selected.includes(s);
          return (
            <button
              key={s}
              onClick={() => toggle(s)}
              className={`px-3 py-1.5 rounded-lg text-sm transition ${
                active
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {t(s)}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
