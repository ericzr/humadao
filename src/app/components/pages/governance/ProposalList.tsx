import { useTranslation } from "react-i18next";
import { ProposalSummaryCard } from "../../shared/ProposalSummaryCard";
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
          <ProposalSummaryCard
            key={p.id}
            proposal={p}
            selected={selectedId === p.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
