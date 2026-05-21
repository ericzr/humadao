import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { proposals } from "@/data";
import { findDAOById } from "@/data/dao";

export function GovernancePage() {
  const { t } = useTranslation();
  const daoIds = Array.from(new Set(proposals.map((proposal) => proposal.daoId)));
  const daoSummaries = daoIds
    .map((daoId) => {
      const dao = findDAOById(daoId);
      const records = proposals.filter((proposal) => proposal.daoId === daoId);
      return dao ? { dao, records } : undefined;
    })
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
      <section className="mb-6 border-b border-border pb-5">
        <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
          {t("governance.directoryTitle")}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
          {t("governance.directorySubtitle")}
        </p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {daoSummaries.map((summary) => {
          if (!summary) return null;
          const activeCount = summary.records.filter((proposal) =>
            proposal.statusKey.includes("voting") || proposal.statusKey.includes("discussion")
          ).length;

          return (
            <Card key={summary.dao.id} className="flex flex-col gap-4 border-border bg-card p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{t(summary.dao.nameKey as never)}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("governance.directoryStats", {
                    total: summary.records.length,
                    active: activeCount,
                  })}
                </p>
              </div>
              <Button asChild variant="outline" className="mt-auto justify-between border-border">
                <Link to={`/dao/${summary.dao.id}/governance`}>
                  {t("dao.governancePage.viewAll")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
