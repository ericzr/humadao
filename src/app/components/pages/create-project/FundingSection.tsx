import { Input } from "../../ui/input";
import { Card } from "../../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useTranslation } from "react-i18next";
import type { CreateDAOFormData } from "../CreateProjectPage";

interface Props {
  form?: CreateDAOFormData;
  update?: (patch: Partial<CreateDAOFormData>) => void;
}

export function FundingSection({ form, update }: Props) {
  const { t } = useTranslation();

  return (
    <Card className="bg-card border-border p-4 sm:p-6 space-y-4">
      <h2>{t("create.funding")}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-muted-foreground mb-1 block text-sm">{t("create.initialBudget")}</label>
          <Input
            placeholder={t("create.initialBudgetPlaceholder")}
            className="bg-secondary border-border"
            value={form?.budget ?? ""}
            onChange={(e) => update?.({ budget: e.target.value })}
          />
        </div>
        <div>
          <label className="text-muted-foreground mb-1 block text-sm">{t("create.tokenSymbol")}</label>
          <Input
            placeholder={t("create.tokenSymbolPlaceholder")}
            className="bg-secondary border-border"
            value={form?.tokenSymbol ?? ""}
            onChange={(e) => update?.({ tokenSymbol: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label className="text-muted-foreground mb-1 block text-sm">{t("create.revenueModel")}</label>
        <Select value={form?.revenueModel ?? ""} onValueChange={(v) => update?.({ revenueModel: v })}>
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue placeholder={t("create.revenueModelPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fixed">{t("create.revenueFixed")}</SelectItem>
            <SelectItem value="share">{t("create.revenueShare")}</SelectItem>
            <SelectItem value="bounty">{t("create.revenueBounty")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}
