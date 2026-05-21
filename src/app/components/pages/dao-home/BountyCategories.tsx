import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { ChevronRight, FileText, ListFilter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "../../ui/badge";
import { Card } from "../../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { DatabaseToolbar } from "../../shared/DatabaseToolbar";
import { StatusBadge } from "../../shared/StatusBadge";
import { bounties } from "@/data";
import { findDAOById } from "@/data/dao";
import type { Bounty } from "@/types";

type BountyStage = "all" | "open" | "active" | "review" | "done";

interface DAOBountyItem extends Bounty {
  id: string;
  stage: BountyStage;
}

const FILTERS: BountyStage[] = ["all", "open", "active", "review", "done"];

const daoTaskSeeds: Record<string, Array<Omit<DAOBountyItem, "daoKey" | "timeKey" | "amount" | "stage">>> = {
  "luboom-reactor": [
    {
      id: "luboom-consensus-outline",
      titleKey: "dao.taskDatabase.sample.luboomConsensus",
      statusKey: "workspace.status.pendingStart",
      skills: ["bounty.skill.research", "bounty.skill.writing"],
    },
    {
      id: "luboom-interview-notes",
      titleKey: "dao.taskDatabase.sample.luboomInterview",
      statusKey: "workspace.status.inProgress",
      skills: ["bounty.skill.research", "bounty.skill.community"],
    },
    {
      id: "luboom-editorial-review",
      titleKey: "dao.taskDatabase.sample.luboomEditorial",
      statusKey: "workspace.status.review",
      skills: ["bounty.skill.writing", "bounty.skill.product"],
    },
  ],
};

function normalizeName(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function getStage(statusKey: string): BountyStage {
  if (statusKey.includes("done") || statusKey.includes("completed")) return "done";
  if (statusKey.includes("review") || statusKey.includes("submitted")) return "review";
  if (statusKey.includes("inProgress") || statusKey.includes("progress") || statusKey.includes("applied")) return "active";
  if (statusKey.includes("assigned") || statusKey.includes("pendingStart")) return "open";
  return "open";
}

function daoScopedBounties(daoId: string | undefined, daoName: string, t: (key: string) => string): DAOBountyItem[] {
  const normalizedDao = normalizeName(daoName);
  const scoped = bounties.filter((bounty) => normalizeName(bounty.daoKey.startsWith("bounty.") ? t(bounty.daoKey) : bounty.daoKey).includes(normalizedDao));

  if (scoped.length > 0) {
    return scoped.map((bounty, index) => ({
      ...bounty,
      id: bounty.id ?? `dao-task-${index}`,
      stage: getStage(bounty.statusKey),
    }));
  }

  const seeds = daoId ? daoTaskSeeds[daoId] ?? [] : [];
  return seeds.map((task) => ({
    ...task,
    daoKey: daoName,
    timeKey: "workspace.task.designDeadline",
    amount: null,
    stage: getStage(task.statusKey),
  }));
}

function TaskRow({ task }: { task: DAOBountyItem }) {
  const { t } = useTranslation();
  const daoLabel = task.daoKey.startsWith("bounty.") ? t(task.daoKey) : task.daoKey;

  return (
    <Link
      to={`/bounties/${task.id}`}
      className="grid min-w-[620px] grid-cols-[minmax(220px,1.5fr)_96px_minmax(120px,0.8fr)_110px_32px] items-center gap-3 border-b border-border px-3 py-3 transition last:border-b-0 hover:bg-secondary/30"
    >
      <div className="min-w-0">
        <div className="flex items-start gap-2.5">
          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <p className="text-sm font-medium leading-snug">{t(task.titleKey)}</p>
            <p className="mt-1 truncate text-xs text-muted-foreground md:hidden">{daoLabel}</p>
          </div>
        </div>
      </div>

      <Badge variant="secondary" className="h-6 w-fit rounded-md text-[0.7rem]">
        {t("dao.taskDatabase.kind.task")}
      </Badge>
      <p className="truncate text-sm text-muted-foreground">{daoLabel}</p>
      <StatusBadge status={task.statusKey} labelKey={task.statusKey} />
      <ChevronRight className="h-4 w-4 justify-self-end text-muted-foreground" />
    </Link>
  );
}

export function BountyCategories() {
  const { t } = useTranslation();
  const { id } = useParams();
  const dao = id ? findDAOById(id) : undefined;
  const [stage, setStage] = useState<BountyStage>("all");
  const [query, setQuery] = useState("");
  const [skill, setSkill] = useState("all");

  const daoName = dao ? t(dao.nameKey) : "";
  const tasks = useMemo(() => daoScopedBounties(dao?.id, daoName, t), [dao?.id, daoName, t]);
  const skillOptions = useMemo(() => Array.from(new Set(tasks.flatMap((task) => task.skills))), [tasks]);

  const filteredTasks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return tasks.filter((task) => {
      const daoLabel = task.daoKey.startsWith("bounty.") ? t(task.daoKey) : task.daoKey;
      const stageMatches = stage === "all" || task.stage === stage;
      const skillMatches = skill === "all" || task.skills.includes(skill);
      const text = `${t(task.titleKey)} ${daoLabel} ${t(task.statusKey)} ${task.skills.map((item) => t(item)).join(" ")}`.toLowerCase();
      const queryMatches = normalizedQuery.length === 0 || text.includes(normalizedQuery);
      return stageMatches && skillMatches && queryMatches;
    });
  }, [query, skill, stage, t, tasks]);

  return (
    <Card className="overflow-hidden border-border bg-card">
      <DatabaseToolbar
        filters={FILTERS}
        activeFilter={stage}
        getFilterLabel={(item) => t(`dao.taskDatabase.filter.${item}`)}
        onFilterChange={setStage}
        query={query}
        onQueryChange={setQuery}
        searchPlaceholder={t("dao.taskDatabase.search")}
        searchClassName="w-full"
      >
        <Select value={skill} onValueChange={setSkill}>
          <SelectTrigger size="sm" className="h-8 w-[136px] shrink-0 border-0 bg-secondary/60">
            <ListFilter className="h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("dao.taskDatabase.skill.all")}</SelectItem>
            {skillOptions.map((item) => (
              <SelectItem key={item} value={item}>
                {t(item)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </DatabaseToolbar>

      <div className="overflow-x-auto">
        <div className="grid min-w-[620px] grid-cols-[minmax(220px,1.5fr)_96px_minmax(120px,0.8fr)_110px_32px] items-center gap-3 border-b border-border px-3 py-2 text-xs text-muted-foreground">
          <span className="pl-[26px]">{t("dao.taskDatabase.columns.task")}</span>
          <span>{t("dao.taskDatabase.columns.kind")}</span>
          <span>{t("dao.taskDatabase.columns.dao")}</span>
          <span>{t("dao.taskDatabase.columns.status")}</span>
          <span aria-hidden="true" />
        </div>

        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskRow key={task.id} task={task} />)
        ) : (
          <div className="px-3 py-12 text-center text-sm text-muted-foreground">
            {t("dao.taskDatabase.empty")}
          </div>
        )}
      </div>
    </Card>
  );
}
