import { Briefcase, ClipboardList, Coins, PenLine, Vote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/button";

interface WorkspaceHeaderProps {
  onLogContribution: () => void;
}

const metrics = [
  { labelKey: "workspace.joinedDAOs", value: "3", icon: Briefcase },
  { labelKey: "workspace.activeTasks", value: "2", icon: ClipboardList },
  { labelKey: "workspace.pendingVotes", value: "2", icon: Vote },
  { labelKey: "workspace.totalEarnings", value: "¥2,200", icon: Coins },
] as const;

export function WorkspaceHeader({ onLogContribution }: WorkspaceHeaderProps) {
  const { t } = useTranslation();

  return (
    <section className="mb-5 border-b border-border pb-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-foreground text-background flex shrink-0 items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">{t("workspace.space.eyebrow")}</p>
            <h1 className="mb-0 truncate">{t("workspace.title")}</h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center">
          <Button variant="outline" onClick={onLogContribution} className="h-10">
            <PenLine className="w-4 h-4 shrink-0" />
            {t("workspace.contrib.logTitle")}
          </Button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.labelKey} className="rounded-md border border-border bg-card px-3 py-2.5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon className="w-3.5 h-3.5" />
                <span>{t(metric.labelKey)}</span>
              </div>
              <p className="mt-1 text-lg font-semibold">{metric.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
