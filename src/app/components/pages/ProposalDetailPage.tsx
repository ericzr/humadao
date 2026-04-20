import { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, ThumbsUp, ThumbsDown, MinusCircle, MessageCircle, Clock, CheckCircle, XCircle, Users, Calendar } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { proposals, governanceComments } from "@/data";

type VoteChoice = "for" | "against" | "abstain" | null;

const statusConfig: Record<string, { icon: typeof Clock; className: string }> = {
  "governance.filter.voting": { icon: Clock, className: "bg-yellow-500/10 text-yellow-400" },
  "governance.filter.passed": { icon: CheckCircle, className: "bg-green-500/10 text-green-400" },
  "governance.filter.rejected": { icon: XCircle, className: "bg-red-500/10 text-red-400" },
  "governance.filter.discussion": { icon: MessageCircle, className: "bg-blue-500/10 text-blue-400" },
};

function VoteBar({ forPct, againstPct, abstainPct }: { forPct: number; againstPct: number; abstainPct: number }) {
  return (
    <div className="w-full h-3 rounded-full bg-secondary overflow-hidden flex">
      {forPct > 0 && <div className="bg-green-500 transition-all duration-500" style={{ width: `${forPct}%` }} />}
      {againstPct > 0 && <div className="bg-red-500 transition-all duration-500" style={{ width: `${againstPct}%` }} />}
      {abstainPct > 0 && <div className="bg-muted-foreground/30 transition-all duration-500" style={{ width: `${abstainPct}%` }} />}
    </div>
  );
}

export function ProposalDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const proposal = proposals.find((p) => p.id === Number(id));

  const [myVote, setMyVote] = useState<VoteChoice>(null);
  const [votes, setVotes] = useState(() =>
    proposal ? { for: proposal.forVotes, against: proposal.againstVotes, abstain: proposal.abstain } : { for: 0, against: 0, abstain: 0 }
  );

  if (!proposal) {
    return (
      <div className="flex-1 p-8 text-center">
        <p className="text-muted-foreground">{t("proposalDetail.notFound")}</p>
        <Link to="/governance" className="text-primary hover:underline mt-2 inline-block">{t("proposalDetail.backToGovernance")}</Link>
      </div>
    );
  }

  const totalVotes = votes.for + votes.against + votes.abstain;
  const forPct = totalVotes ? (votes.for / totalVotes) * 100 : 0;
  const againstPct = totalVotes ? (votes.against / totalVotes) * 100 : 0;
  const abstainPct = totalVotes ? (votes.abstain / totalVotes) * 100 : 0;

  const isVoting = proposal.statusKey === "governance.filter.voting";

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

  const { icon: StatusIcon, className: statusClass } = statusConfig[proposal.statusKey] ?? statusConfig["governance.filter.discussion"];

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl">
      <Link to="/governance" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm mb-4">
        <ArrowLeft className="w-4 h-4" /> {t("proposalDetail.backToGovernance")}
      </Link>

      <div className="flex items-start gap-3 mb-4">
        <Badge className={`${statusClass} border-0 shrink-0`}>
          <StatusIcon className="w-3 h-3 mr-1" /> {t(proposal.statusKey)}
        </Badge>
        <span className="text-muted-foreground text-sm">#{proposal.id}</span>
      </div>

      <h1 className="text-xl font-semibold mb-2">{t(proposal.titleKey)}</h1>
      <p className="text-muted-foreground mb-6">{t(proposal.descKey)}</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { icon: Users, labelKey: "governance.proposer", value: proposal.author },
          { icon: Users, labelKey: "proposalDetail.dao", value: proposal.dao },
          { icon: Calendar, labelKey: "governance.deadline", value: t(proposal.deadlineKey) },
          { icon: Users, labelKey: "governance.voterCount", value: (totalVotes).toString() },
        ].map((item) => (
          <Card key={item.labelKey} className="p-3">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
              <item.icon className="w-3 h-3" /> {t(item.labelKey)}
            </div>
            <p className="text-sm font-medium">{item.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-4 sm:p-5 mb-6">
        <h2 className="mb-4">{t("proposalDetail.votingResult")}</h2>
        <VoteBar forPct={forPct} againstPct={againstPct} abstainPct={abstainPct} />
        <div className="flex justify-between text-sm mt-2">
          <span className="text-green-400">{t("governance.voteFor")} {forPct.toFixed(1)}% ({votes.for})</span>
          <span className="text-red-400">{t("governance.voteAgainst")} {againstPct.toFixed(1)}% ({votes.against})</span>
          <span className="text-muted-foreground">{t("governance.voteAbstain")} {abstainPct.toFixed(1)}% ({votes.abstain})</span>
        </div>

        {isVoting && (
          <div className="mt-4 pt-4 border-t border-border">
            <h3 className="text-sm mb-3">{myVote ? t("proposalDetail.changeVote") : t("proposalDetail.castVote")}</h3>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={myVote === "for" ? "default" : "outline"}
                className={myVote === "for" ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                onClick={() => handleVote("for")}
              >
                <ThumbsUp className="w-4 h-4 mr-1" /> {t("governance.voteFor")}
              </Button>
              <Button
                variant={myVote === "against" ? "default" : "outline"}
                className={myVote === "against" ? "bg-red-600 hover:bg-red-700 text-white" : ""}
                onClick={() => handleVote("against")}
              >
                <ThumbsDown className="w-4 h-4 mr-1" /> {t("governance.voteAgainst")}
              </Button>
              <Button
                variant={myVote === "abstain" ? "default" : "outline"}
                className={myVote === "abstain" ? "bg-muted-foreground hover:bg-muted-foreground/80 text-white" : ""}
                onClick={() => handleVote("abstain")}
              >
                <MinusCircle className="w-4 h-4 mr-1" /> {t("governance.voteAbstain")}
              </Button>
            </div>
            {myVote && (
              <p className="text-sm text-muted-foreground mt-2">{t("proposalDetail.votedMessage", { choice: t(`governance.vote${myVote.charAt(0).toUpperCase()}${myVote.slice(1)}`) })}</p>
            )}
          </div>
        )}
      </Card>

      <Card className="p-4 sm:p-5">
        <h2 className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-4 h-4" /> {t("governance.discussion")}
          <Badge className="bg-secondary text-muted-foreground border-0 text-[0.7rem]">{proposal.comments}</Badge>
        </h2>
        <div className="space-y-3">
          {governanceComments.map((c, i) => (
            <div key={i} className="bg-secondary rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-foreground text-sm font-medium">{c.user}</span>
                <span className="text-muted-foreground text-[0.7rem]">{t(c.timeKey)}</span>
              </div>
              <p className="text-muted-foreground text-sm">{t(c.textKey)}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
