import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  Clock,
  FileCheck2,
  MessageCircle,
  MinusCircle,
  ThumbsDown,
  ThumbsUp,
  Users,
  XCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { DiscussionThread } from "../shared/DiscussionThread";
import { StatusBadge } from "../shared/StatusBadge";
import { proposals, governanceComments } from "@/data";
import { proposalBackPath } from "@/app/utils/proposalRoutes";

type VoteChoice = "for" | "against" | "abstain" | null;
type ProposalStage = "discussion" | "voting" | "decision" | "execution";

function VoteBar({ forPct, againstPct, abstainPct }: { forPct: number; againstPct: number; abstainPct: number }) {
  return (
    <div className="flex h-2 w-full overflow-hidden rounded-full bg-secondary">
      {forPct > 0 && <div className="bg-foreground" style={{ width: `${forPct}%` }} />}
      {againstPct > 0 && <div className="bg-foreground/30" style={{ width: `${againstPct}%` }} />}
      {abstainPct > 0 && <div className="bg-foreground/10" style={{ width: `${abstainPct}%` }} />}
    </div>
  );
}

function getActiveStage(statusKey: string): ProposalStage {
  if (statusKey.includes("voting")) return "voting";
  if (statusKey.includes("executing") || statusKey.includes("passed")) return "execution";
  if (statusKey.includes("rejected")) return "decision";
  return "discussion";
}

function GovernanceProgress({ statusKey }: { statusKey: string }) {
  const { t } = useTranslation();
  const activeStage = getActiveStage(statusKey);
  const activeIndex = ["discussion", "voting", "decision", "execution"].indexOf(activeStage);

  return (
    <Card className="border-border bg-card p-4 sm:p-5">
      <h2 className="mb-4 text-base font-medium">{t("proposalDetail.progressTitle")}</h2>
      <div className="grid gap-2 sm:grid-cols-4">
        {(["discussion", "voting", "decision", "execution"] as ProposalStage[]).map((stage, index) => {
          const isActive = activeStage === stage;
          const isDone = index < activeIndex;
          return (
            <div
              key={stage}
              className={`rounded-lg border px-3 py-2.5 text-sm ${
                isActive
                  ? "border-foreground/30 bg-secondary text-foreground"
                  : isDone
                    ? "border-border bg-background text-foreground"
                    : "border-border bg-background text-muted-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    isActive ? "bg-foreground" : isDone ? "bg-muted-foreground" : "bg-border"
                  }`}
                />
                <span>{t(`proposalDetail.stage.${stage}`)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function DecisionRecord({ statusKey }: { statusKey: string }) {
  const { t } = useTranslation();
  if (statusKey.includes("discussion") || statusKey.includes("voting")) return null;

  const recordKey = statusKey.includes("rejected") ? "rejected" : statusKey.includes("executing") ? "executing" : "passed";

  return (
    <Card className="border-border bg-card p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <FileCheck2 className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-base font-medium">{t("proposalDetail.decisionRecord")}</h2>
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="rounded-lg bg-secondary/60 p-3">
            <p className="text-sm font-medium">{t(`proposalDetail.record.${recordKey}.${item}.title`)}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{t(`proposalDetail.record.${recordKey}.${item}.desc`)}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ProposalDetailPage() {
  const { t } = useTranslation();
  const { id, proposalId } = useParams();
  const routeProposalId = Number(proposalId ?? id);
  const hasDaoContext = Boolean(proposalId);
  const proposal = proposals.find((p) => p.id === routeProposalId);

  const [myVote, setMyVote] = useState<VoteChoice>(null);
  const [votes, setVotes] = useState(() =>
    proposal ? { for: proposal.forVotes, against: proposal.againstVotes, abstain: proposal.abstain } : { for: 0, against: 0, abstain: 0 }
  );

  if (!proposal) {
    return (
      <div className="flex-1 p-8 text-center">
        <p className="text-muted-foreground">{t("proposalDetail.notFound")}</p>
        <Link to="/governance" className="mt-2 inline-block text-primary hover:underline">
          {t("proposalDetail.backToGovernance")}
        </Link>
      </div>
    );
  }

  const totalVotes = votes.for + votes.against + votes.abstain;
  const forPct = totalVotes ? (votes.for / totalVotes) * 100 : 0;
  const againstPct = totalVotes ? (votes.against / totalVotes) * 100 : 0;
  const abstainPct = totalVotes ? (votes.abstain / totalVotes) * 100 : 0;
  const isVoting = proposal.statusKey === "governance.filter.voting";
  const backPath = proposalBackPath(proposal, hasDaoContext);

  const handleVote = (choice: VoteChoice) => {
    if (!isVoting || !choice) return;
    setVotes((prev) => {
      const next = { ...prev };
      if (myVote) next[myVote]--;
      next[choice]++;
      return next;
    });
    setMyVote(choice);
  };

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
      <Link
        to={backPath}
        className="mb-5 inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {hasDaoContext
            ? t("proposalDetail.backToDao")
            : t("proposalDetail.backToGovernance")}
      </Link>

      <div className="mb-6 max-w-3xl">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <StatusBadge status={proposal.statusKey} labelKey={proposal.statusKey} />
          <span className="text-xs text-muted-foreground">#{proposal.id}</span>
          <span className="text-xs text-muted-foreground">{proposal.dao}</span>
        </div>
        <h1 className="text-xl font-semibold leading-tight">{t(proposal.titleKey)}</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{t(proposal.descKey)}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-5">
          <GovernanceProgress statusKey={proposal.statusKey} />

          <Card className="border-border bg-card p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-base font-medium">{t("proposalDetail.votingResult")}</h2>
              <span className="text-xs text-muted-foreground">{proposal.voters} {t("governance.voted")}</span>
            </div>

            <VoteBar forPct={forPct} againstPct={againstPct} abstainPct={abstainPct} />
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
              <span>{t("governance.voteFor")} {forPct.toFixed(0)}%</span>
              <span className="text-center">{t("governance.voteAgainst")} {againstPct.toFixed(0)}%</span>
              <span className="text-right">{t("governance.voteAbstain")} {abstainPct.toFixed(0)}%</span>
            </div>
          </Card>

          <DecisionRecord statusKey={proposal.statusKey} />

          <DiscussionThread
            title={t("governance.discussion")}
            placeholder={t("proposalDetail.commentPlaceholder")}
            messages={governanceComments.map((comment) => ({
              user: comment.user,
              time: t(comment.timeKey),
              text: t(comment.textKey),
            }))}
          />
        </div>

        <aside className="space-y-4">
          <Card className="border-border bg-card p-4">
            <h2 className="mb-4 text-base font-medium">{t("proposalDetail.info")}</h2>
            <div className="space-y-3 text-sm">
              {[
                [t("governance.proposer"), proposal.author],
                [t("proposalDetail.dao"), proposal.dao],
                [t("governance.deadline"), t(proposal.deadlineKey)],
                [t("governance.voterCount"), String(totalVotes)],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="text-right font-medium">{value}</span>
                </div>
              ))}
            </div>

            {isVoting ? (
              <div className="mt-5 space-y-2 border-t border-border pt-4">
                <p className="text-sm font-medium">{t("proposalDetail.currentAction")}</p>
                <Button
                  className="w-full justify-start bg-foreground text-background hover:bg-foreground/90"
                  onClick={() => handleVote("for")}
                >
                  <ThumbsUp className="h-4 w-4" />
                  {t("governance.voteFor")}
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start" onClick={() => handleVote("against")}>
                    <ThumbsDown className="h-4 w-4" />
                    {t("governance.voteAgainst")}
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleVote("abstain")}>
                    <MinusCircle className="h-4 w-4" />
                    {t("governance.voteAbstain")}
                  </Button>
                </div>
                {myVote && (
                  <p className="text-xs text-muted-foreground">
                    {t("proposalDetail.votedMessage", { choice: t(`governance.vote${myVote.charAt(0).toUpperCase()}${myVote.slice(1)}`) })}
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-5 space-y-2 border-t border-border pt-4">
                <p className="text-sm font-medium">{t("proposalDetail.currentAction")}</p>
                {proposal.statusKey.includes("discussion") ? (
                  <>
                    <Button className="w-full justify-start bg-foreground text-background hover:bg-foreground/90">
                      <MessageCircle className="h-4 w-4" />
                      {t("proposalDetail.action.joinDiscussion")}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileCheck2 className="h-4 w-4" />
                      {t("proposalDetail.action.viewDraft")}
                    </Button>
                  </>
                ) : proposal.statusKey.includes("executing") ? (
                  <>
                    <Button className="w-full justify-start bg-foreground text-background hover:bg-foreground/90">
                      <Clock className="h-4 w-4" />
                      {t("proposalDetail.action.updateExecution")}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileCheck2 className="h-4 w-4" />
                      {t("proposalDetail.action.voteDetails")}
                    </Button>
                  </>
                ) : proposal.statusKey.includes("rejected") ? (
                  <>
                    <Button className="w-full justify-start bg-foreground text-background hover:bg-foreground/90">
                      <XCircle className="h-4 w-4" />
                      {t("proposalDetail.action.rejectionReason")}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageCircle className="h-4 w-4" />
                      {t("proposalDetail.action.reopenDiscussion")}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="w-full justify-start bg-foreground text-background hover:bg-foreground/90">
                      <Users className="h-4 w-4" />
                      {t("proposalDetail.action.executionPlan")}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileCheck2 className="h-4 w-4" />
                      {t("proposalDetail.action.voteDetails")}
                    </Button>
                  </>
                )}
              </div>
            )}
          </Card>
        </aside>
      </div>
    </div>
  );
}
