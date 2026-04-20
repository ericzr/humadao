import { Briefcase, ClipboardList, Vote, Coins, type LucideIcon } from "lucide-react";
import { Card } from "../../ui/card";
import { useTranslation } from "react-i18next";

const stats: { labelKey: string; value: string; icon: LucideIcon }[] = [
  { labelKey: "workspace.joinedDAOs", value: "3", icon: Briefcase },
  { labelKey: "workspace.activeTasks", value: "2", icon: ClipboardList },
  { labelKey: "workspace.pendingVotes", value: "2", icon: Vote },
  { labelKey: "workspace.totalEarnings", value: "¥2,200", icon: Coins },
];

export function StatsCards() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
      {stats.map((s) => (
        <Card key={s.labelKey} className="bg-card border-border p-3 sm:p-4">
          <s.icon className="w-5 h-5 text-muted-foreground mb-2" />
          <p className="text-2xl">{s.value}</p>
          <p className="text-muted-foreground text-xs">{t(s.labelKey)}</p>
        </Card>
      ))}
    </div>
  );
}
