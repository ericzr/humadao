import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ClipboardCheck,
  Send,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { DiscussionThread } from "../shared/DiscussionThread";
import { StatusBadge } from "../shared/StatusBadge";
import { LogContributionSheet } from "./workspace/LogContributionSheet";
import { myTasks, workspaceTaskDetails } from "@/data";

function initials(name: string) {
  return name.slice(0, 1).toUpperCase();
}

function getPrimaryActionKey(statusKey: string) {
  if (statusKey.includes("assigned")) return "workspace.taskDetail.action.accept";
  if (statusKey.includes("pendingStart")) return "workspace.taskDetail.action.start";
  if (statusKey.includes("inProgress")) return "workspace.taskDetail.action.submit";
  if (statusKey.includes("review")) return "workspace.taskDetail.action.supplement";
  if (statusKey.includes("done")) return "workspace.taskDetail.action.viewRecord";
  return "workspace.taskDetail.action.start";
}

function shouldShowPackageAction(statusKey: string) {
  return statusKey.includes("inProgress") || statusKey.includes("review") || statusKey.includes("done");
}

export function WorkspaceTaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [logOpen, setLogOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const task = useMemo(() => myTasks.find((item) => item.id === id), [id]);
  const detail = id ? workspaceTaskDetails[id] : undefined;

  if (!task || !detail) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>{t("workspace.taskDetail.notFound")}</p>
        <Link to="/workspace" className="mt-2 inline-block text-primary hover:underline">
          {t("workspace.taskDetail.back")}
        </Link>
      </div>
    );
  }

  const primaryActionKey = getPrimaryActionKey(task.statusKey);
  const showPackageAction = shouldShowPackageAction(task.statusKey);
  const contributionSummary = `${t(task.titleKey)} - ${t("workspace.taskDetail.package.defaultSummary")}`;

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
      <Link to="/workspace" className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        {t("workspace.taskDetail.back")}
      </Link>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <main className="min-w-0 space-y-5">
          <section className="space-y-4 border-b border-border pb-5">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{task.dao}</span>
              <StatusBadge status={task.statusKey} labelKey={task.statusKey} />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">{t(task.titleKey)}</h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                  {t(detail.objectiveKey)}
                </p>
              </div>
            </div>
          </section>

          <Card className="p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold">{t("workspace.taskDetail.section.checklist")}</h2>
              <Badge variant="secondary" className="border-0 text-xs text-muted-foreground">
                {detail.checklistKeys.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {detail.checklistKeys.map((key, index) => (
                <div key={key} className="flex items-start gap-3 rounded-md border border-border px-3 py-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-[0.65rem] text-muted-foreground">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6">{t(key)}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-md bg-secondary/40 p-3">
              <p className="text-xs leading-5 text-muted-foreground">
                {t("workspace.taskDetail.package.hint")}
              </p>
            </div>
            {submitted && (
              <div className="mt-3 rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-primary">
                {t("workspace.taskDetail.package.submitted")}
              </div>
            )}
          </Card>

          <DiscussionThread
            title={t("workspace.taskDetail.section.activity")}
            placeholder={t("workspace.taskDetail.commentPlaceholder")}
            messages={detail.activities.map((activity) => ({
              user: activity.user,
              time: t(activity.timeKey),
              text: t(activity.textKey),
            }))}
          />
        </main>

        <aside>
          <Card className="p-4">
            <h2 className="mb-4 text-sm font-semibold">{t("workspace.taskDetail.section.status")}</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">{t("workspace.taskDetail.side.status")}</span>
                <StatusBadge status={task.statusKey} labelKey={task.statusKey} />
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">{t("workspace.taskDetail.side.deadline")}</span>
                <span>{t(task.deadlineKey)}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">{t("workspace.taskDetail.side.reward")}</span>
                <span>{task.reward}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">{t("workspace.taskDetail.side.settlement")}</span>
                <span className="text-right">{t(detail.settlementKey)}</span>
              </div>
            </div>

            <div className="my-4 h-px bg-border" />

            <div className="space-y-3">
              {[
                ["assignee", detail.assignee],
                ["reviewer", detail.reviewer],
              ].map(([key, value]) => (
                <div key={key} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                    {initials(value)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{t(`workspace.taskDetail.side.${key}`)}</p>
                    <p className="truncate text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-4 h-px bg-border" />

            <div className="space-y-2">
              <Button className="w-full" onClick={() => setSubmitted(true)}>
                <Send className="h-4 w-4" />
                {t(primaryActionKey)}
              </Button>
              {showPackageAction && (
                <Button variant="outline" className="w-full" onClick={() => setLogOpen(true)}>
                  <ClipboardCheck className="h-4 w-4" />
                  {t("workspace.taskDetail.package.open")}
                </Button>
              )}
            </div>
          </Card>
        </aside>
      </div>

      <LogContributionSheet
        open={logOpen}
        onClose={() => setLogOpen(false)}
        initialType="documentation"
        initialSummary={contributionSummary}
        onLogged={() => setSubmitted(true)}
      />
    </div>
  );
}
