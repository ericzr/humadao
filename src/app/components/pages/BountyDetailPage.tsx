import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, ClipboardCheck, Send } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { DiscussionThread } from "../shared/DiscussionThread";
import { StatusBadge } from "../shared/StatusBadge";
import { LogContributionSheet } from "./workspace/LogContributionSheet";
import { bountyDetails, bounties } from "@/data";
import type { BountyStatus } from "@/types";

function getStatusTone(status: BountyStatus) {
  if (status === "open" || status === "in_progress") return "active";
  if (status === "applied" || status === "submitted" || status === "reviewing") return "pending";
  return status;
}

function getPrimaryActionKey(status: BountyStatus) {
  if (status === "open") return "bountyDetail.apply";
  if (status === "in_progress") return "bountyDetail.submitWork";
  if (["submitted", "reviewing", "completed"].includes(status)) return "bountyDetail.recordContribution";
  return "bountyDetail.goWorkspace";
}

function shouldOpenContributionPackage(status: BountyStatus) {
  return ["submitted", "reviewing", "completed"].includes(status);
}

export function BountyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [currentStatus, setCurrentStatus] = useState<BountyStatus>("open");
  const [logOpen, setLogOpen] = useState(false);
  const [feedbackKey, setFeedbackKey] = useState<string | null>(null);

  const detail = id ? bountyDetails[id] : undefined;
  const brief = useMemo(() => (id ? bounties.find((b) => b.id === id) : undefined), [id]);

  useEffect(() => {
    setCurrentStatus(detail?.status ?? "open");
    setFeedbackKey(null);
    setLogOpen(false);
  }, [id, detail?.status]);

  if (!detail && !brief) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>{t("bountyDetail.notFound")}</p>
        <Link to="/bounties" className="mt-2 inline-block text-primary hover:underline">
          {t("bountyDetail.backToList")}
        </Link>
      </div>
    );
  }

  const bounty = detail ?? brief!;
  const title = t(bounty.titleKey);
  const daoLabel = bounty.daoKey.startsWith("bounty.") ? t(bounty.daoKey) : bounty.daoKey;
  const creator = detail?.creatorName ?? daoLabel;
  const objective = detail?.descKey
    ? t(detail.descKey)
    : t("bountyDetail.fallback.objective", { title, dao: daoLabel });
  const deliverables = detail?.deliverables.length
    ? detail.deliverables.map((key) => t(key))
    : [
        t("bountyDetail.fallback.deliverables.confirm"),
        t("bountyDetail.fallback.deliverables.package"),
        t("bountyDetail.fallback.deliverables.sync"),
      ];
  const messages = detail?.timeline.length
    ? detail.timeline.map((event) => ({
        user: event.user,
        time: t(event.timeKey),
        text: t(event.textKey),
      }))
    : [
        {
          user: creator,
          time: t(bounty.timeKey),
          text: t("bountyDetail.fallback.activity", { title }),
        },
      ];
  const contributionSummary = `${title} - ${t("bountyDetail.defaultContributionSummary")}`;
  const primaryActionKey = getPrimaryActionKey(currentStatus);

  const handlePrimaryAction = () => {
    if (currentStatus === "open") {
      setCurrentStatus("applied");
      setFeedbackKey("bountyDetail.feedback.applied");
      return;
    }
    if (currentStatus === "in_progress") {
      setCurrentStatus("submitted");
      setFeedbackKey("bountyDetail.feedback.submitted");
      return;
    }
    if (shouldOpenContributionPackage(currentStatus)) {
      setLogOpen(true);
    }
  };

  const handleLogged = () => {
    setFeedbackKey("bountyDetail.feedback.logged");
  };

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
      <Link to="/bounties" className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        {t("bountyDetail.backToList")}
      </Link>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <main className="min-w-0 space-y-5">
          <section className="space-y-4 border-b border-border pb-5">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{daoLabel}</span>
              <StatusBadge
                status={getStatusTone(currentStatus)}
                labelKey={`bountyDetail.status.${currentStatus}`}
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">{title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                {objective}
              </p>
            </div>
          </section>

          <Card className="p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold">{t("bountyDetail.deliverables")}</h2>
              <Badge variant="secondary" className="border-0 text-xs text-muted-foreground">
                {deliverables.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {deliverables.map((item, index) => (
                <div key={`${item}-${index}`} className="flex items-start gap-3 rounded-md border border-border px-3 py-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-[0.65rem] text-muted-foreground">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-md bg-secondary/40 p-3">
              <p className="text-xs leading-5 text-muted-foreground">
                {t("bountyDetail.packageHint")}
              </p>
            </div>
          </Card>

          <DiscussionThread
            title={t("bountyDetail.timeline")}
            placeholder={t("bountyDetail.commentPlaceholder")}
            messages={messages}
          />
        </main>

        <aside>
          <Card className="p-4">
            <h2 className="mb-4 text-sm font-semibold">{t("bountyDetail.info")}</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">{t("bountyDetail.side.status")}</span>
                <StatusBadge
                  status={getStatusTone(currentStatus)}
                  labelKey={`bountyDetail.status.${currentStatus}`}
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">
                  {detail ? t("bountyDetail.deadline") : t("bountyDetail.side.postedAt")}
                </span>
                <span className="text-right">{detail ? t(detail.deadlineKey) : t(bounty.timeKey)}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">{t("bountyDetail.side.reward")}</span>
                <span className="text-right">{bounty.amount ?? t("bountyDetail.side.rewardOpen")}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">{t("bountyDetail.side.applicants")}</span>
                <span className="text-right">
                  {detail ? t("bountyDetail.applicantsCount", { count: detail.applicants }) : t("bountyDetail.side.applicantsUnknown")}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">{t("bountyDetail.creator")}</span>
                <span className="text-right">{creator}</span>
              </div>
            </div>

            <div className="my-4 h-px bg-border" />

            <div>
              <p className="mb-2 text-xs text-muted-foreground">{t("bountyDetail.requiredSkills")}</p>
              <div className="flex flex-wrap gap-1.5">
                {bounty.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="h-6 rounded-md border-0 text-[0.7rem] font-medium">
                    {t(skill)}
                  </Badge>
                ))}
              </div>
            </div>

            {feedbackKey && (
              <div className="mt-4 rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-primary">
                {t(feedbackKey)}
              </div>
            )}

            <div className="my-4 h-px bg-border" />

            <div className="space-y-2">
              {["applied", "rejected"].includes(currentStatus) ? (
                <Button asChild className="w-full">
                  <Link to="/workspace">
                    {t(primaryActionKey)}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button className="w-full" onClick={handlePrimaryAction}>
                  {shouldOpenContributionPackage(currentStatus) ? (
                    <ClipboardCheck className="h-4 w-4" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {t(primaryActionKey)}
                </Button>
              )}

              {currentStatus === "open" && (
                <Button asChild variant="outline" className="w-full">
                  <Link to="/workspace">
                    {t("bountyDetail.viewWorkQueue")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
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
        onLogged={handleLogged}
      />
    </div>
  );
}
