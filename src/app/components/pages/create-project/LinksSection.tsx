import { Input } from "../../ui/input";
import { Card } from "../../ui/card";
import { useTranslation } from "react-i18next";
import type { CreateDAOFormData } from "../CreateProjectPage";

interface Props {
  form?: CreateDAOFormData;
  update?: (patch: Partial<CreateDAOFormData>) => void;
}

const linkFields: { key: keyof CreateDAOFormData; label: string }[] = [
  { key: "website", label: "create.website" },
  { key: "github", label: "GitHub" },
  { key: "discord", label: "Discord" },
  { key: "twitter", label: "Twitter" },
];

export function LinksSection({ form, update }: Props) {
  const { t } = useTranslation();

  return (
    <Card className="bg-card border-border p-4 sm:p-6 space-y-4">
      <h2>{t("create.links")}</h2>
      <div className="space-y-3">
        {linkFields.map(({ key, label }) => {
          const displayLabel = label.startsWith("create.") ? t(label) : label;
          return (
            <div key={key}>
              <label className="text-muted-foreground mb-1 block text-sm">{displayLabel}</label>
              <Input
                placeholder={t("create.linkPlaceholder").replace("{link}", displayLabel)}
                className="bg-secondary border-border"
                value={(form?.[key] as string) ?? ""}
                onChange={(e) => update?.({ [key]: e.target.value })}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
