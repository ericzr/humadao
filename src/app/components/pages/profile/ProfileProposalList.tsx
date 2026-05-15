import { useTranslation } from "react-i18next";
import { ContributionRecordCard } from "../../shared/ContributionRecordCard";
import { townHallDAOs } from "@/data";
import type { ContributionRecord, Contributor } from "@/types";

interface ProfileProposalListProps {
  contributor: Contributor;
  timeline: ContributionRecord[];
}

export function ProfileProposalList({ contributor, timeline }: ProfileProposalListProps) {
  const { t } = useTranslation();
  const daoMap = new Map(townHallDAOs.map((dao) => [dao.id, dao]));
  const proposalRecords = timeline.filter((record) => record.type === "proposal" || record.type === "governance");

  return (
    <section>
      <div className="mb-4">
        <div>
          <h2>{t("profile.proposals")}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{t("profile.proposalsHint")}</p>
        </div>
      </div>

      {proposalRecords.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
          {t("profile.proposalsEmpty", { name: contributor.name })}
        </div>
      ) : (
        <div className="space-y-3">
          {proposalRecords.map((record) => {
            const dao = daoMap.get(record.daoId);
            const proposalHref = record.proposalId
              ? `/dao/${record.daoId}/proposals/${record.proposalId}`
              : `/dao/${record.daoId}`;
            return <ContributionRecordCard key={record.id} record={record} dao={dao} href={record.proposalId ? proposalHref : undefined} />;
          })}
        </div>
      )}
    </section>
  );
}
