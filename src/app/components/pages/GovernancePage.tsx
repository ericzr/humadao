import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { ProposalList } from "./governance/ProposalList";
import { ProposalDetail } from "./governance/ProposalDetail";
import { proposals, governanceFilterKeys } from "@/data";
import type { Proposal } from "@/types";

export function GovernancePage() {
  const { t } = useTranslation();
  const [selectedProposal, setSelectedProposal] = useState<Proposal>(proposals[0]);
  const [filterKey, setFilterKey] = useState("governance.filter.all");

  const filtered = filterKey === "governance.filter.all" ? proposals : proposals.filter((p) => p.statusKey === filterKey);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="mb-2">{t("governance.title")}</h1>
      <p className="text-muted-foreground mb-6">{t("governance.subtitle")}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {([
          { labelKey: "governance.activeProposals", value: "2" },
          { labelKey: "governance.passedThisMonth", value: "5" },
          { labelKey: "governance.totalVoters", value: "758" },
          { labelKey: "governance.participationRate", value: "67%" },
        ]).map((s) => (
          <Card key={s.labelKey} className="bg-card border-border p-3 sm:p-4 text-center">
            <p className="text-2xl">{s.value}</p>
            <p className="text-muted-foreground text-xs">{t(s.labelKey)}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        <div>
          <ProposalList
            proposals={filtered}
            selectedId={selectedProposal.id}
            onSelect={setSelectedProposal}
            filterKeys={governanceFilterKeys}
            activeFilter={filterKey}
            onFilterChange={setFilterKey}
          />
          <Button className="w-full mt-4 bg-foreground text-background hover:bg-foreground/90">{t("governance.createProposal")}</Button>
        </div>
        <div className="hidden lg:block">
          <ProposalDetail proposal={selectedProposal} />
        </div>
      </div>
    </div>
  );
}
