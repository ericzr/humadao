import { Link } from "react-router";
import { ChevronRight, MessageCircle, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card } from "../ui/card";
import { StatusBadge } from "./StatusBadge";
import { proposalPath } from "@/app/utils/proposalRoutes";
import type { Proposal } from "@/types";

interface ProposalSummaryCardProps {
  proposal: Proposal;
  selected?: boolean;
  onSelect?: (proposal: Proposal) => void;
  compact?: boolean;
  showDao?: boolean;
  className?: string;
}

function VoteBar({ proposal }: { proposal: Proposal }) {
  const { t } = useTranslation();
  if (proposal.forVotes <= 0 && proposal.againstVotes <= 0 && proposal.abstain <= 0) return null;

  return (
    <div className="mt-3">
      <div className="flex h-1.5 overflow-hidden rounded-full bg-secondary">
        <div className="bg-foreground" style={{ width: `${proposal.forVotes}%` }} />
        <div className="bg-foreground/30" style={{ width: `${proposal.againstVotes}%` }} />
        <div className="bg-foreground/10" style={{ width: `${proposal.abstain}%` }} />
      </div>
      <div className="mt-1 flex justify-between text-[0.65rem] text-muted-foreground">
        <span>{t("governance.for")} {proposal.forVotes}%</span>
        <span>{t("governance.against")} {proposal.againstVotes}%</span>
        <span>{t("governance.abstain")} {proposal.abstain}%</span>
      </div>
    </div>
  );
}

export function ProposalSummaryCard({
  proposal,
  selected = false,
  onSelect,
  compact = false,
  showDao = true,
  className = "",
}: ProposalSummaryCardProps) {
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
            <span>·</span>
            <span>{t(proposal.deadlineKey)}</span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <StatusBadge status={proposal.statusKey} labelKey={proposal.statusKey} />
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <VoteBar proposal={proposal} />

      {!compact && (
        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Users className="h-3 w-3" />
            {proposal.voters} {t("governance.voted")}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            {proposal.comments} {t("governance.comments")}
          </span>
        </div>
      )}
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
