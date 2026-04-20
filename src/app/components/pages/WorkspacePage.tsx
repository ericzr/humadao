import { useState } from "react";
import { Link } from "react-router";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { PenLine, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StatsCards } from "./workspace/StatsCards";
import { DAOList } from "./workspace/DAOList";
import { KanbanBoard } from "./workspace/KanbanBoard";
import { NotificationPanel } from "./workspace/NotificationPanel";
import { LogContributionSheet } from "./workspace/LogContributionSheet";

const pendingVotes = [
  {
    titleKey: "workspace.vote.treasury",
    dao: "peaq",
    deadlineKey: "workspace.vote.treasuryDeadline",
    progress: 72,
  },
  {
    titleKey: "workspace.vote.grading",
    dao: "莱克斯DAO",
    deadlineKey: "workspace.vote.gradingDeadline",
    progress: 45,
  },
];

export function WorkspacePage() {
  const { t } = useTranslation();
  const [logOpen, setLogOpen] = useState(false);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
        <div className="min-w-0">
          <h1 className="mb-1">{t("workspace.title")}</h1>
          <p className="text-muted-foreground">{t("workspace.subtitle")}</p>
        </div>
        <Button
          onClick={() => setLogOpen(true)}
          className="gap-1.5 self-start shrink-0"
          size="sm"
        >
          <PenLine className="w-4 h-4" />
          {t("workspace.contrib.logTitle")}
        </Button>
      </div>

      {/* Overview stats */}
      <StatsCards />

      {/* Main grid: left content + right panel */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 lg:gap-6">

        {/* ── Left column ── */}
        <div className="space-y-5 min-w-0">

          {/* 1. Pending votes — highest urgency */}
          <Card className="bg-card border-border p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <h2>{t("workspace.pendingProposals")}</h2>
              <Link
                to="/governance"
                className="text-muted-foreground hover:text-foreground transition text-sm"
              >
                {t("workspace.viewAll")}
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {pendingVotes.map((v) => (
                <div key={v.titleKey} className="bg-secondary rounded-lg p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-sm leading-snug">{t(v.titleKey)}</span>
                    <span className="text-muted-foreground text-xs shrink-0">
                      {t(v.deadlineKey)}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs mb-2">{v.dao}</p>
                  <Progress value={v.progress} className="h-1.5" />
                  <p className="text-muted-foreground mt-1 text-xs">
                    {t("workspace.for")} {v.progress}%
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* 2. Kanban board */}
          <KanbanBoard />

          {/* 3. Non-standard contribution CTA */}
          <Card className="bg-card border-border border-dashed p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{t("workspace.contrib.logTitle")}</p>
                <p className="text-muted-foreground text-xs mt-1 leading-5">
                  {t("workspace.contrib.logDesc")}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLogOpen(true)}
                className="shrink-0 gap-1.5 self-start sm:self-center"
              >
                <PenLine className="w-4 h-4" />
                {t("workspace.contrib.submit")}
              </Button>
            </div>
          </Card>

          {/* 4. My DAOs — reference, lower urgency */}
          <DAOList />

        </div>

        {/* ── Right column: notifications + quick links ── */}
        {/* On mobile this stacks below main content naturally */}
        <div className="space-y-5">
          <NotificationPanel />
        </div>

      </div>

      <LogContributionSheet open={logOpen} onClose={() => setLogOpen(false)} />
    </div>
  );
}
