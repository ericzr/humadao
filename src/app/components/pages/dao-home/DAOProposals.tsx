import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import { Gavel, Users, Clock, CheckCircle2 } from "lucide-react";
import { findDAOById } from "@/data/dao";
import { useDAOModuleConfig } from "@/app/hooks/useDAOModuleConfig";

const proposals = [
  { titleKey: "dao.proposal.treasury" as const, statusKey: "dao.proposal.treasuryStatus" as const, votes: { for: 72, against: 18 }, deadlineKey: "dao.proposal.treasuryDeadline" as const },
  { titleKey: "dao.proposal.incentive" as const, statusKey: "dao.proposal.incentiveStatus" as const, votes: { for: 91, against: 5 }, deadlineKey: "dao.proposal.incentiveDeadline" as const },
  { titleKey: "dao.proposal.grading" as const, statusKey: "dao.proposal.gradingStatus" as const, votes: { for: 0, against: 0 }, deadlineKey: "dao.proposal.gradingDeadline" as const },
];

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
        {proposals.map((p) => (
          <Card key={p.titleKey} className="bg-card border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <span>{t(p.titleKey)}</span>
              <Badge className="bg-secondary text-muted-foreground border-0">{t(p.statusKey)}</Badge>
            </div>
            {p.votes.for > 0 && (
              <div className="mt-2">
                <div className="flex justify-between text-muted-foreground mb-1 text-xs">
                  <span>{t("dao.for")} {p.votes.for}%</span>
                  <span>{t("dao.against")} {p.votes.against}%</span>
                </div>
                <Progress value={p.votes.for} className="h-1.5" />
              </div>
            )}
            <p className="text-muted-foreground mt-2 text-xs">{t(p.deadlineKey)}</p>
          </Card>
        ))}
      </div>
    </>
  );
}
