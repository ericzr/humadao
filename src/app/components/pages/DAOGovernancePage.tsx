import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ProposalList } from "./governance/ProposalList";
import { ProposalDetail } from "./governance/ProposalDetail";
import { proposals, governanceFilterKeys } from "@/data";
import { findDAOById } from "@/data/dao";
import type { Proposal } from "@/types";

function isActiveProposal(proposal: Proposal) {
  return proposal.statusKey.includes("voting") || proposal.statusKey.includes("discussion");
}

export function DAOGovernancePage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const dao = id ? findDAOById(id) : undefined;
  const daoProposals = useMemo(
    () => proposals.filter((proposal) => proposal.daoId === id),
    [id]
  );
  const [selectedProposalId, setSelectedProposalId] = useState<number | undefined>(daoProposals[0]?.id);
  const [filterKey, setFilterKey] = useState("governance.filter.all");

  const filtered = filterKey === "governance.filter.all"
    ? daoProposals
    : daoProposals.filter((proposal) => proposal.statusKey === filterKey);
  const selectedProposal = daoProposals.find((proposal) => proposal.id === selectedProposalId) ?? filtered[0] ?? daoProposals[0];
  const activeCount = daoProposals.filter(isActiveProposal).length;
  const passedCount = daoProposals.filter((proposal) => proposal.statusKey.includes("passed")).length;
  const totalVoters = daoProposals.reduce((sum, proposal) => sum + proposal.voters, 0);
  const averageTurnout = daoProposals.length > 0
    ? Math.round(daoProposals.reduce((sum, proposal) => sum + proposal.forVotes + proposal.againstVotes + proposal.abstain, 0) / daoProposals.length)
    : 0;

  if (!dao) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>{t("dao.governancePage.notFound")}</p>
        <Link to="/town-hall" className="mt-2 inline-block text-primary hover:underline">
          {t("dao.governancePage.backTownHall")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
      <Link to={`/dao/${dao.id}`} className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        {t("dao.governancePage.backToDAO")}
      </Link>

      <div className="mb-6 flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="mb-2 text-sm text-muted-foreground">{t(dao.nameKey as never)}</p>
          <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
            {t("dao.governancePage.title")}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            {t("dao.governancePage.subtitle")}
          </p>
        </div>
        <Button asChild className="w-full gap-1.5 sm:w-auto">
          <Link to={`/dao/${dao.id}/proposals/new`}>
            <Plus className="h-4 w-4" />
            {t("governance.createProposal")}
          </Link>
        </Button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { labelKey: "governance.activeProposals", value: String(activeCount) },
          { labelKey: "governance.passedThisMonth", value: String(passedCount) },
          { labelKey: "governance.totalVoters", value: String(totalVoters) },
          { labelKey: "governance.participationRate", value: `${averageTurnout}%` },
        ].map((stat) => (
          <Card key={stat.labelKey} className="border-border bg-card p-3 sm:p-4">
            <p className="text-xl font-semibold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{t(stat.labelKey)}</p>
          </Card>
        ))}
      </div>

      {daoProposals.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">
            <ProposalList
              proposals={filtered}
              selectedId={selectedProposal?.id ?? 0}
              onSelect={(proposal) => setSelectedProposalId(proposal.id)}
              filterKeys={governanceFilterKeys}
              activeFilter={filterKey}
              onFilterChange={setFilterKey}
            />
            {filtered.length === 0 && (
              <Card className="mt-3 border-dashed bg-card/50 p-8 text-center text-sm text-muted-foreground">
                {t("dao.governancePage.emptyFilter")}
              </Card>
            )}
          </div>
          {selectedProposal && (
            <aside className="hidden lg:block">
              <ProposalDetail proposal={selectedProposal} />
            </aside>
          )}
        </div>
      ) : (
        <Card className="border-dashed bg-card/50 p-10 text-center text-sm text-muted-foreground">
          {t("dao.proposalsEmpty")}
        </Card>
      )}
    </div>
  );
}
