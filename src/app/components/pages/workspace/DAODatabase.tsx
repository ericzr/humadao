import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { StatusBadge } from "../../shared/StatusBadge";
import { DatabaseToolbar } from "../../shared/DatabaseToolbar";
import { myDAOs, workspaceDAORecords } from "@/data";
import type { WorkspaceDAORecord, WorkspaceDAOStatus } from "@/types";

type DAOFilter = "all" | WorkspaceDAOStatus;

const FILTERS: DAOFilter[] = ["all", "active", "watching", "paused"];

function getDAO(daoId: string) {
  return myDAOs.find((dao) => dao.id === daoId);
}

function DAORow({ record }: { record: WorkspaceDAORecord }) {
  const { t } = useTranslation();
  const dao = getDAO(record.daoId);
  const name = dao ? t(dao.nameKey) : record.daoId;

  return (
    <div className="grid gap-3 border-b border-border px-3 py-3 last:border-b-0 md:grid-cols-[minmax(220px,1.4fr)_120px_100px_90px_90px_130px_110px] md:items-center">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-md ${dao?.color ?? "bg-slate-500"} flex items-center justify-center text-sm text-white shrink-0`}>
            {dao?.avatar ?? name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{name}</p>
            <p className="text-xs text-muted-foreground mt-1 md:hidden">
              {t(record.roleKey as never)} · {record.activeTasks} {t("workspace.daoDatabase.short.tasks")} · {record.pendingVotes} {t("workspace.daoDatabase.short.votes")}
            </p>
          </div>
        </div>
      </div>

      <p className="hidden text-sm text-muted-foreground md:block">{t(record.roleKey as never)}</p>

      <div>
        <StatusBadge status={record.status} labelKey={`workspace.daoDatabase.status.${record.status}`} />
      </div>

      <p className="hidden text-sm md:block">{record.activeTasks}</p>
      <p className="hidden text-sm md:block">{record.contributionCount}</p>
      <p className="hidden text-sm text-muted-foreground md:block">{t(record.lastActivityKey)}</p>

      <Button asChild variant="ghost" size="sm" className="justify-start px-0 md:justify-end md:px-3">
        <Link to={`/dao/${record.daoId}`}>
          {t("workspace.daoDatabase.open")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
}

export function DAODatabase() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<DAOFilter>("all");
  const [query, setQuery] = useState("");

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return workspaceDAORecords.filter((record) => {
      const dao = getDAO(record.daoId);
      const name = dao ? t(dao.nameKey) : record.daoId;
      const statusMatches = status === "all" || record.status === status;
      const text = `${name} ${t(record.roleKey as never)} ${t(record.lastActivityKey)}`.toLowerCase();
      const queryMatches = normalizedQuery.length === 0 || text.includes(normalizedQuery);
      return statusMatches && queryMatches;
    });
  }, [query, status, t]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2>{t("workspace.daoDatabase.title")}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t("workspace.daoDatabase.desc")}
          </p>
        </div>
        <Button asChild variant="outline" className="w-full sm:w-auto sm:self-start lg:self-auto">
          <Link to="/town-hall">
            <Building2 className="w-4 h-4" />
            {t("workspace.daoDatabase.findMore")}
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden border-border bg-card">
        <DatabaseToolbar
          filters={FILTERS}
          activeFilter={status}
          getFilterLabel={(item) => t(`workspace.daoDatabase.filter.${item}`)}
          onFilterChange={setStatus}
          query={query}
          onQueryChange={setQuery}
          searchPlaceholder={t("workspace.daoDatabase.search")}
        />

        <div className="hidden grid-cols-[minmax(220px,1.4fr)_120px_100px_90px_90px_130px_110px] border-b border-border px-3 py-2 text-xs text-muted-foreground md:grid">
          <span>{t("workspace.daoDatabase.columns.dao")}</span>
          <span>{t("workspace.daoDatabase.columns.role")}</span>
          <span>{t("workspace.daoDatabase.columns.status")}</span>
          <span>{t("workspace.daoDatabase.columns.tasks")}</span>
          <span>{t("workspace.daoDatabase.columns.contrib")}</span>
          <span>{t("workspace.daoDatabase.columns.activity")}</span>
          <span className="text-right">{t("workspace.daoDatabase.columns.action")}</span>
        </div>

        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => <DAORow key={record.daoId} record={record} />)
        ) : (
          <div className="px-3 py-10 text-center text-sm text-muted-foreground">
            {t("workspace.daoDatabase.empty")}
          </div>
        )}
      </Card>
    </div>
  );
}
