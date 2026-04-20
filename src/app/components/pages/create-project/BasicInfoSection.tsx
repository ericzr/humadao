import { Upload } from "lucide-react";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Card } from "../../ui/card";
import { useTranslation } from "react-i18next";
import type { CreateDAOFormData } from "../CreateProjectPage";

interface Props {
  form?: CreateDAOFormData;
  update?: (patch: Partial<CreateDAOFormData>) => void;
}

export function BasicInfoSection({ form, update }: Props) {
  const { t } = useTranslation();

  return (
    <Card className="bg-card border-border p-4 sm:p-6 space-y-4">
      <h2>{t("create.basicInfo")}</h2>
      <div>
        <label className="text-muted-foreground mb-1 block text-sm">{t("create.projectName")} *</label>
        <Input
          placeholder={t("create.projectNamePlaceholder")}
          className="bg-secondary border-border"
          value={form?.name ?? ""}
          onChange={(e) => update?.({ name: e.target.value })}
        />
      </div>
      <div>
        <label className="text-muted-foreground mb-1 block text-sm">{t("create.projectBrief")} *</label>
        <Input
          placeholder={t("create.projectBriefPlaceholder")}
          className="bg-secondary border-border"
          value={form?.brief ?? ""}
          onChange={(e) => update?.({ brief: e.target.value })}
        />
      </div>
      <div>
        <label className="text-muted-foreground mb-1 block text-sm">{t("create.detailedDesc")}</label>
        <Textarea
          placeholder={t("create.detailedDescPlaceholder")}
          className="bg-secondary border-border min-h-[120px]"
          value={form?.description ?? ""}
          onChange={(e) => update?.({ description: e.target.value })}
        />
      </div>
      <div>
        <label className="text-muted-foreground mb-1 block text-sm">{t("create.projectLogo")}</label>
        <div className="w-24 h-24 rounded-xl border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-foreground/30 transition">
          <Upload className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
}
