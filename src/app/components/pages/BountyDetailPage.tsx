import { useParams, Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Clock,
  Users,
  Coins,
  CheckCircle2,
  Circle,
  Play,
  FileCheck,
  Eye,
  MessageSquare,
  User,
} from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { bountyDetails, bounties } from "@/data";
import type { BountyStatus } from "@/types";

const STATUS_STEPS: { key: BountyStatus; icon: typeof Circle }[] = [
  { key: "open", icon: Circle },
  { key: "applied", icon: Users },
  { key: "in_progress", icon: Play },
  { key: "submitted", icon: FileCheck },
  { key: "reviewing", icon: Eye },
  { key: "completed", icon: CheckCircle2 },
];

function getStepIndex(status: BountyStatus): number {
  return STATUS_STEPS.findIndex((s) => s.key === status);
}

function StatusStepper({ status }: { status: BountyStatus }) {
  const { t } = useTranslation();
  const current = getStepIndex(status);

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2">
      {STATUS_STEPS.map((step, i) => {
        const Icon = step.icon;
        const done = i <= current;
        const active = i === current;
        return (
          <div key={step.key} className="flex items-center gap-1">
            {i > 0 && (
              <div className={`h-0.5 w-4 sm:w-8 ${done ? "bg-primary" : "bg-muted"}`} />
            )}
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs
                  ${active ? "bg-primary text-primary-foreground ring-2 ring-primary/30" : done ? "bg-primary/80 text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-xs whitespace-nowrap ${active ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {t(`bountyDetail.status.${step.key}`)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const TIMELINE_ICON: Record<string, typeof Circle> = {
  created: Circle,
  applied: Users,
  accepted: CheckCircle2,
  submitted: FileCheck,
  comment: MessageSquare,
  completed: CheckCircle2,
};

export function BountyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const detail = id ? bountyDetails[id] : undefined;
  const brief = id ? bounties.find((b) => b.id === id) : undefined;

  if (!detail && !brief) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>{t("bountyDetail.notFound")}</p>
        <Link to="/bounties" className="text-primary underline mt-2 inline-block">
          {t("bountyDetail.backToList")}
        </Link>
      </div>
    );
  }

  const bounty = detail ?? brief!;
  const daoLabel = bounty.daoKey.startsWith("bounty.") ? t(bounty.daoKey) : bounty.daoKey;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <Link to="/bounties" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-4 transition">
        <ArrowLeft className="w-4 h-4" />
        {t("bountyDetail.backToList")}
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">{t(bounty.titleKey)}</h1>
          <p className="text-muted-foreground text-sm mt-1">{daoLabel} · {t(bounty.timeKey)}</p>
        </div>
        {bounty.amount && (
          <div className="flex items-center gap-1.5 text-lg font-semibold shrink-0">
            <Coins className="w-5 h-5 text-primary" />
            {bounty.amount}
          </div>
        )}
      </div>

      {detail && (
        <Card className="p-4 sm:p-6 mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground mb-4">{t("bountyDetail.lifecycle")}</h2>
          <StatusStepper status={detail.status} />
        </Card>
      )}

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-6">
          {detail && (
            <Card className="p-4 sm:p-6">
              <h2 className="font-semibold mb-3">{t("bountyDetail.description")}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{t(detail.descKey)}</p>

              {detail.deliverables.length > 0 && (
                <>
                  <h3 className="font-semibold mt-5 mb-2">{t("bountyDetail.deliverables")}</h3>
                  <ul className="space-y-1.5">
                    {detail.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        {t(d)}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Card>
          )}

          {detail && detail.timeline.length > 0 && (
            <Card className="p-4 sm:p-6">
              <h2 className="font-semibold mb-4">{t("bountyDetail.timeline")}</h2>
              <div className="relative pl-6 border-l border-border space-y-6">
                {detail.timeline.map((evt, i) => {
                  const Icon = TIMELINE_ICON[evt.type] ?? Circle;
                  return (
                    <div key={i} className="relative">
                      <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                        <Icon className="w-2.5 h-2.5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-medium text-sm">{evt.user}</span>
                          <span className="text-xs text-muted-foreground">{t(evt.timeKey)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{t(evt.textKey)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold text-sm mb-3">{t("bountyDetail.info")}</h3>
            <div className="space-y-3 text-sm">
              {detail && (
                <>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>{t("bountyDetail.deadline")}: {t(detail.deadlineKey)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4 shrink-0" />
                    <span>{t("bountyDetail.applicantsCount", { count: detail.applicants })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4 shrink-0" />
                    <span>{t("bountyDetail.creator")}: {detail.creatorName}</span>
                  </div>
                </>
              )}
              <Separator />
              <div>
                <p className="text-muted-foreground mb-2">{t("bountyDetail.requiredSkills")}</p>
                <div className="flex flex-wrap gap-1.5">
                  {bounty.skills.map((s) => (
                    <Badge key={s} variant="secondary">{t(s)}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {detail?.status === "open" && (
            <Button className="w-full">{t("bountyDetail.apply")}</Button>
          )}
          {detail?.status === "in_progress" && (
            <Button className="w-full">{t("bountyDetail.submitWork")}</Button>
          )}
        </div>
      </div>
    </div>
  );
}
