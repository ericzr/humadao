import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Card } from "../../ui/card";
import { CheckCircle2, Clock, Gavel, Users } from "lucide-react";
import { ProposalVoteCard } from "../../shared/ProposalVoteCard";
import { proposals } from "@/data";
import { findDAOById } from "@/data/dao";
import { useDAOModuleConfig } from "@/app/hooks/useDAOModuleConfig";

export function DAOProposals() {
  const { t } = useTranslation();
  const { id } = useParams();
  const dao = id ? findDAOById(id) : undefined;

  // Pull the configured governance params (quorum / voting period / approval).
  // Falls back to schema defaults if no override exists.
  const config = useDAOModuleConfig(dao).proposals;
  const quorum = config?.quorumPct;
  const votingDays = config?.votingDays;
  const approval = config?.approvalPct;
  const daoProposals = proposals.filter((proposal) => proposal.daoId === id);

  return (
    <>
      <h2 className="mb-3">{t("dao.proposals")}</h2>

      {(quorum !== undefined || votingDays !== undefined || approval !== undefined) && (
        <Card className="bg-accent/30 border-border p-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <Gavel className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">{t("dao.moduleConfig.sectionLabel")}:</span>
            {quorum !== undefined && (
              <span className="inline-flex items-center gap-1">
                <Users className="w-3 h-3 text-muted-foreground" />
                {t("dao.moduleConfig.proposals.quorumPct.label")} <b className="font-medium">{quorum}%</b>
              </span>
            )}
            {votingDays !== undefined && (
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                {t("dao.moduleConfig.proposals.votingDays.label")} <b className="font-medium">{votingDays}</b>
              </span>
            )}
            {approval !== undefined && (
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-muted-foreground" />
                {t("dao.moduleConfig.proposals.approvalPct.label")} <b className="font-medium">{approval}%</b>
              </span>
            )}
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {daoProposals.slice(0, 3).map((p) => (
          <ProposalVoteCard key={p.id} proposal={p} compact showDao={false} />
        ))}
        {daoProposals.length === 0 && (
          <Card className="border-dashed bg-card/50 p-6 text-center text-sm text-muted-foreground">
            {t("dao.proposalsEmpty")}
          </Card>
        )}
      </div>
    </>
  );
}
