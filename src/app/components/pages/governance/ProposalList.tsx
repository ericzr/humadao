import { Link } from "react-router";
import { Users, MessageCircle, ExternalLink } from "lucide-react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { useTranslation } from "react-i18next";
import type { Proposal } from "@/types";

interface ProposalListProps {
  proposals: Proposal[];
  selectedId: number;
  onSelect: (p: Proposal) => void;
  filterKeys: string[];
  activeFilter: string;
  onFilterChange: (key: string) => void;
}

export function ProposalList({ proposals, selectedId, onSelect, filterKeys, activeFilter, onFilterChange }: ProposalListProps) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {filterKeys.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-3 py-1 rounded-full transition text-sm ${activeFilter === f ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
          >
            {t(f)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {proposals.map((p) => (
          <Card
            key={p.id}
            onClick={() => onSelect(p)}
            className={`bg-card border-border p-4 sm:p-5 cursor-pointer transition ${selectedId === p.id ? "ring-1 ring-foreground/20" : "hover:border-foreground/20"}`}
          >
            <div className="flex items-start justify-between mb-2 gap-2">
              <span className="min-w-0">{t(p.titleKey)}</span>
              <Badge className="bg-secondary text-muted-foreground border-0 shrink-0">{t(p.statusKey)}</Badge>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground text-xs flex-wrap">
              <span>{p.author}</span><span>·</span><span>{p.dao}</span><span>·</span><span>{t(p.deadlineKey)}</span>
            </div>
            {p.forVotes > 0 && (
              <div className="mt-3">
                <div className="flex gap-0.5 h-2 rounded-full overflow-hidden bg-secondary">
                  <div className="bg-foreground rounded-l-full" style={{ width: `${p.forVotes}%` }} />
                  <div className="bg-foreground/30" style={{ width: `${p.againstVotes}%` }} />
                  <div className="bg-foreground/10 rounded-r-full" style={{ width: `${p.abstain}%` }} />
                </div>
                <div className="flex justify-between mt-1 text-muted-foreground text-[0.7rem]">
                  <span>{t("governance.for")} {p.forVotes}%</span>
                  <span>{t("governance.against")} {p.againstVotes}%</span>
                  <span>{t("governance.abstain")} {p.abstain}%</span>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 mt-2 text-muted-foreground text-xs">
              <span><Users className="w-3 h-3 inline" /> {p.voters} {t("governance.voted")}</span>
              <span><MessageCircle className="w-3 h-3 inline" /> {p.comments} {t("governance.comments")}</span>
              <Link
                to={`/governance/${p.id}`}
                className="ml-auto hover:text-foreground transition"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
