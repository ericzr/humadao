import { ChevronRight, MessageCircle, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Card } from "../ui/card";
import { StatusBadge } from "./StatusBadge";
import { proposalPath } from "@/app/utils/proposalRoutes";
import type { Proposal } from "@/types";

interface ProposalVoteCardProps {
  proposal: Proposal;
  compact?: boolean;
  selected?: boolean;
  onSelect?: (proposal: Proposal) => void;
  showDao?: boolean;
  className?: string;
}

export function ProposalVoteProgress({
  forVotes,
  againstVotes,
  abstain,
}: {
  forVotes: number;
  againstVotes: number;
  abstain: number;
}) {
  const { t } = useTranslation();
  if (forVotes <= 0 && againstVotes <= 0 && abstain <= 0) return null;

  return (
    <div className="mt-3">
      <div className="flex h-1.5 overflow-hidden rounded-full bg-secondary">
        <div className="bg-foreground" style={{ width: `${forVotes}%` }} />
        <div className="bg-foreground/30" style={{ width: `${againstVotes}%` }} />
        <div className="bg-foreground/10" style={{ width: `${abstain}%` }} />
      </div>
      <div className="mt-1 flex justify-between text-[0.65rem] text-muted-foreground">
        <span>{t("governance.for")} {forVotes}%</span>
        <span>{t("governance.against")} {againstVotes}%</span>
        <span>{t("governance.abstain")} {abstain}%</span>
      </div>
    </div>
  );
}

function VoteBar({ proposal }: { proposal: Proposal }) {
  return (
    <ProposalVoteProgress
      forVotes={proposal.forVotes}
      againstVotes={proposal.againstVotes}
      abstain={proposal.abstain}
    />
  );
}

export function ProposalVoteCard({
  proposal,
  compact = false,
  selected = false,
  onSelect,
  showDao = true,
  className = "",
}: ProposalVoteCardProps) {
  const { t } = useTranslation();

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium leading-snug">{t(proposal.titleKey)}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>{proposal.author}</span>
            {showDao && (
              <>
                <span>·</span>
                <span>{proposal.dao}</span>
              </>
            )}
            {!compact && (
              <>
                <span>·</span>
                <span>{t(proposal.deadlineKey)}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <StatusBadge status={proposal.statusKey} labelKey={proposal.statusKey} />
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Users className="h-3 w-3" />
          {proposal.voters} {t("governance.voted")}
        </span>
        <span className="inline-flex items-center gap-1">
          <MessageCircle className="h-3 w-3" />
          {proposal.comments} {t("governance.comments")}
        </span>
      </div>

      <VoteBar proposal={proposal} />
    </>
  );

  if (onSelect) {
    return (
      <Card
        onClick={() => onSelect(proposal)}
        className={`border-border bg-card p-4 transition sm:p-5 ${
          selected ? "ring-1 ring-foreground/20" : "cursor-pointer hover:border-foreground/20"
        } ${className}`}
      >
        {content}
      </Card>
    );
  }

  return (
    <Link
      to={proposalPath(proposal)}
      className={`block rounded-lg border border-border bg-card p-4 transition hover:border-foreground/20 ${className}`}
    >
      {content}
    </Link>
  );
}
