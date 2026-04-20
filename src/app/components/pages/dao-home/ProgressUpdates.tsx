import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { useTranslation } from "react-i18next";

const updates = [
  { titleKey: "dao.update.mainnet" as const, dateKey: "dao.update.mainnetDate" as const, typeKey: "dao.update.mainnetType" as const },
  { titleKey: "dao.update.nodes" as const, dateKey: "dao.update.nodesDate" as const, typeKey: "dao.update.nodesType" as const },
  { titleKey: "dao.update.finance" as const, dateKey: "dao.update.financeDate" as const, typeKey: "dao.update.financeType" as const },
];

export function ProgressUpdates() {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="mb-4">{t("dao.progressUpdates")}</h2>
      <div className="space-y-3">
        {updates.map((u) => (
          <Card key={u.titleKey} className="bg-card border-border p-4 flex items-center justify-between">
            <div className="min-w-0">
              <span>{t(u.titleKey)}</span>
              <p className="text-muted-foreground text-xs">{t(u.dateKey)}</p>
            </div>
            <Badge className="bg-secondary text-muted-foreground border-0 shrink-0">{t(u.typeKey)}</Badge>
          </Card>
        ))}
      </div>
    </>
  );
}
