import { Link } from "react-router";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { useTranslation } from "react-i18next";
import { myTasks } from "@/data";

export function TaskBoard() {
  const { t } = useTranslation();
  const statusIcon: Record<string, typeof Clock> = {
    [t("workspace.status.inProgress")]: Clock,
    [t("workspace.status.review")]: AlertCircle,
    [t("workspace.status.done")]: CheckCircle,
  };

  return (
    <Card className="bg-card border-border p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <h2>{t("workspace.taskBoard")}</h2>
        <Link to="/bounties" className="text-muted-foreground hover:text-foreground transition text-sm">{t("workspace.viewAll")}</Link>
      </div>
      <div className="space-y-3">
        {myTasks.map((task) => {
          const status = t(task.statusKey);
          const Icon = statusIcon[status] || Clock;
          return (
            <div key={task.titleKey} className="bg-secondary rounded-lg p-3 sm:p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm truncate">{t(task.titleKey)}</p>
                  <p className="text-muted-foreground text-xs">{task.dao} · {t(task.deadlineKey)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge className="bg-accent text-muted-foreground border-0 text-[0.7rem] hidden sm:inline-flex">{status}</Badge>
                <span className="text-foreground text-xs">{task.reward}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
