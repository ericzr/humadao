import { useMemo, useState } from "react";
import { FileText, PenLine } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { StatusBadge } from "../../shared/StatusBadge";
import { DatabaseToolbar } from "../../shared/DatabaseToolbar";
import { workspaceContributions, myDAOs } from "@/data";
import type { WorkspaceContributionRecord, WorkspaceContributionStatus } from "@/types";

type FilterStatus = "all" | WorkspaceContributionStatus;

interface ContributionDatabaseProps {
  onLogContribution: () => void;
}

const FILTERS: FilterStatus[] = ["all", "draft", "pending", "confirmed", "settleable", "settled"];

function getDAOName(daoId: string, t: ReturnType<typeof useTranslation>["t"]) {
  const dao = myDAOs.find((item) => item.id === daoId);
  return dao ? t(dao.nameKey) : daoId;
}

function ContributionRow({ record }: { record: WorkspaceContributionRecord }) {
  const { t } = useTranslation();
  const daoName = getDAOName(record.daoId, t);

  return (
    <div className="grid gap-3 border-b border-border px-3 py-3 last:border-b-0 md:grid-cols-[minmax(220px,1.4fr)_160px_110px_120px_80px_90px_120px] md:items-center">
      <div className="min-w-0">
        <div className="flex items-start gap-2">
          <FileText className="mt-0.5 w-4 h-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <p className="text-sm font-medium leading-snug">{t(record.titleKey)}</p>
            <p className="text-xs text-muted-foreground mt-1 md:hidden">
              {daoName} · {t(record.dateKey)} · {record.hours}h · {record.reward}
            </p>
          </div>
        </div>
      </div>

      <p className="hidden truncate text-sm text-muted-foreground md:block">{daoName}</p>
      <p className="hidden text-sm text-muted-foreground md:block">
        {t(`workspace.contribDatabase.type.${record.type}`)}
      </p>
      <div>
        <StatusBadge status={record.status} labelKey={`workspace.contribDatabase.status.${record.status}`} />
      </div>
      <p className="hidden text-sm text-muted-foreground md:block">{record.hours}h</p>
      <p className="hidden text-sm font-medium md:block">{record.reward}</p>

      <Button
        variant={record.status === "settleable" ? "default" : "ghost"}
        size="sm"
        className="justify-start px-0 md:justify-end md:px-3"
      >
        {t(`workspace.contribDatabase.action.${record.status}`)}
      </Button>
    </div>
  );
}

export function ContributionDatabase({ onLogContribution }: ContributionDatabaseProps) {
  const { t } = useTranslation();
  const [status, setStatus] = useState<FilterStatus>("all");
  const [query, setQuery] = useState("");

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return workspaceContributions.filter((record) => {
      const daoName = getDAOName(record.daoId, t);
      const statusMatches = status === "all" || record.status === status;
      const text = `${t(record.titleKey)} ${daoName} ${t(`workspace.contribDatabase.type.${record.type}`)} ${record.reward}`.toLowerCase();
      const queryMatches = normalizedQuery.length === 0 || text.includes(normalizedQuery);
      return statusMatches && queryMatches;
    });
  }, [query, status, t]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2>{t("workspace.contribDatabase.title")}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t("workspace.contribDatabase.desc")}
          </p>
        </div>
        <Button onClick={onLogContribution} className="w-full sm:w-auto sm:self-start lg:self-auto">
          <PenLine className="w-4 h-4" />
          {t("workspace.contrib.logTitle")}
        </Button>
      </div>

      <Card className="overflow-hidden border-border bg-card">
        <DatabaseToolbar
          filters={FILTERS}
          activeFilter={status}
          getFilterLabel={(item) => t(`workspace.contribDatabase.filter.${item}`)}
          onFilterChange={setStatus}
          query={query}
          onQueryChange={setQuery}
          searchPlaceholder={t("workspace.contribDatabase.search")}
        />

        <div className="hidden grid-cols-[minmax(220px,1.4fr)_160px_110px_120px_80px_90px_120px] border-b border-border px-3 py-2 text-xs text-muted-foreground md:grid">
          <span>{t("workspace.contribDatabase.columns.record")}</span>
          <span>{t("workspace.contribDatabase.columns.dao")}</span>
          <span>{t("workspace.contribDatabase.columns.type")}</span>
          <span>{t("workspace.contribDatabase.columns.status")}</span>
          <span>{t("workspace.contribDatabase.columns.hours")}</span>
          <span>{t("workspace.contribDatabase.columns.reward")}</span>
          <span className="text-right">{t("workspace.contribDatabase.columns.action")}</span>
        </div>

        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => <ContributionRow key={record.id} record={record} />)
        ) : (
          <div className="px-3 py-10 text-center text-sm text-muted-foreground">
            {t("workspace.contribDatabase.empty")}
          </div>
        )}
      </Card>
    </div>
  );
}
