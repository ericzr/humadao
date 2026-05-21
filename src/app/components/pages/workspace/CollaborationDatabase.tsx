import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  Columns3,
  FileText,
  ListFilter,
  Table2,
  Vote,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "../../ui/badge";
import { Card } from "../../ui/card";
import { cn } from "../../ui/utils";
import { StatusBadge } from "../../shared/StatusBadge";
import { DatabaseToolbar } from "../../shared/DatabaseToolbar";
import { ProposalVoteProgress } from "../../shared/ProposalVoteCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { myTasks, proposals } from "@/data";
import { proposalPath } from "@/app/utils/proposalRoutes";
import type { Proposal, Task } from "@/types";

type ItemKind = "task" | "vote";
type ItemStage = "open" | "inProgress" | "review" | "done";
type StageFilter = "all" | ItemStage;
type KindFilter = "all" | ItemKind;
type LayoutMode = "list" | "board";
type StatusFilter = "all" | "open" | "inProgress" | "review" | "done" | "voting" | "discussion";
type BoardStatus = "open" | "inProgress" | "review" | "done";

interface CollaborationItem {
  id: string;
  kind: ItemKind;
  titleKey: string;
  dao: string;
  statusKey: string;
  status: StatusFilter | "passed" | "rejected";
  boardStatus: BoardStatus;
  deadlineKey: string;
  meta: string;
  href: string;
  progress?: {
    forVotes: number;
    againstVotes: number;
    abstain: number;
  };
}

const STAGES: ItemStage[] = ["open", "inProgress", "review", "done"];
const STAGE_FILTERS: StageFilter[] = ["all", ...STAGES];
const KIND_FILTERS: KindFilter[] = ["all", "task", "vote"];
const BOARD_STATUSES: BoardStatus[] = ["open", "inProgress", "review", "done"];

const boardIcon: Record<BoardStatus, typeof Circle> = {
  open: Circle,
  inProgress: Clock,
  review: AlertCircle,
  done: CheckCircle2,
};

const boardColor: Record<BoardStatus, string> = {
  open: "text-muted-foreground",
  inProgress: "text-blue-500",
  review: "text-amber-500",
  done: "text-green-500",
};

const boardDot: Record<BoardStatus, string> = {
  open: "bg-border",
  inProgress: "bg-blue-500",
  review: "bg-amber-500",
  done: "bg-green-500",
};

function getTaskStatus(statusKey: string): BoardStatus {
  if (statusKey.includes("inProgress")) return "inProgress";
  if (statusKey.includes("review")) return "review";
  if (statusKey.includes("done")) return "done";
  return "open";
}

function getProposalStatus(statusKey: string): CollaborationItem["status"] {
  if (statusKey.includes("discussion")) return "discussion";
  if (statusKey.includes("passed")) return "passed";
  if (statusKey.includes("rejected")) return "rejected";
  return "voting";
}

function getVoteBoardStatus(status: CollaborationItem["status"]): BoardStatus {
  if (status === "passed" || status === "rejected") return "done";
  return "open";
}

function mapTask(task: Task): CollaborationItem {
  const status = getTaskStatus(task.statusKey);

  return {
    id: `task-${task.id}`,
    kind: "task",
    titleKey: task.titleKey,
    dao: task.dao,
    statusKey: task.statusKey,
    status,
    boardStatus: status,
    deadlineKey: task.deadlineKey,
    meta: task.reward,
    href: `/workspace/tasks/${task.id}`,
  };
}

function mapProposal(proposal: Proposal): CollaborationItem {
  const status = getProposalStatus(proposal.statusKey);

  return {
    id: `vote-${proposal.id}`,
    kind: "vote",
    titleKey: proposal.titleKey,
    dao: proposal.dao,
    statusKey: proposal.statusKey,
    status,
    boardStatus: getVoteBoardStatus(status),
    deadlineKey: proposal.deadlineKey,
    meta: `${proposal.voters}`,
    href: proposalPath(proposal),
    progress: proposal.forVotes > 0
      ? {
          forVotes: proposal.forVotes,
          againstVotes: proposal.againstVotes,
          abstain: proposal.abstain,
        }
      : undefined,
  };
}

function ItemTypeBadge({ kind }: { kind: ItemKind }) {
  const { t } = useTranslation();
  const Icon = kind === "task" ? FileText : Vote;

  return (
    <Badge variant="secondary" className="h-6 rounded-md gap-1.5">
      <Icon className="h-3.5 w-3.5" />
      {t(`workspace.items.kind.${kind}`)}
    </Badge>
  );
}

function ItemRow({ item }: { item: CollaborationItem }) {
  const { t } = useTranslation();
  const Icon = item.kind === "task" ? FileText : Vote;

  return (
    <Link
      to={item.href}
      className="grid min-w-[620px] grid-cols-[minmax(200px,1.5fr)_80px_minmax(120px,0.8fr)_100px_32px] items-center gap-3 border-b border-border px-3 py-3 transition last:border-b-0 hover:bg-secondary/30"
    >
      <div className="min-w-0">
        <div className="flex items-start gap-2.5">
          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <p className="text-sm font-medium leading-snug">{t(item.titleKey)}</p>
          </div>
        </div>
      </div>

      <ItemTypeBadge kind={item.kind} />
      <p className="truncate text-sm text-muted-foreground">{item.dao}</p>
      <div>
        <StatusBadge status={item.statusKey} labelKey={item.statusKey} />
      </div>
      <ChevronRight className="justify-self-end h-4 w-4 text-muted-foreground" />

      {item.progress && (
        <div className="col-start-1 col-end-6 ml-6 pl-1">
          <ProposalVoteProgress
            forVotes={item.progress.forVotes}
            againstVotes={item.progress.againstVotes}
            abstain={item.progress.abstain}
          />
        </div>
      )}
    </Link>
  );
}

function BoardCard({ item }: { item: CollaborationItem }) {
  const { t } = useTranslation();
  const Icon = item.kind === "task" ? FileText : Vote;
  const StatusIcon = boardIcon[item.boardStatus];

  return (
    <Link
      to={item.href}
      className="block rounded-lg border border-border bg-card p-3 transition hover:border-foreground/20 hover:shadow-sm"
    >
      <div className="flex items-start gap-2">
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-snug">{t(item.titleKey)}</p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <ItemTypeBadge kind={item.kind} />
            <StatusBadge status={item.statusKey} labelKey={item.statusKey} />
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5 text-xs">
        <span className={`inline-flex min-w-0 items-center gap-1 ${boardColor[item.boardStatus]}`}>
          <StatusIcon className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{item.dao}</span>
        </span>
        <span className="shrink-0 text-muted-foreground">{t(item.deadlineKey)}</span>
      </div>
    </Link>
  );
}

function CollaborationBoard({ items, stage }: { items: CollaborationItem[]; stage: StageFilter }) {
  const { t } = useTranslation();
  const isSingleStage = stage !== "all";
  const visibleStatuses = stage === "all" ? BOARD_STATUSES : [stage];
  const grouped = BOARD_STATUSES.reduce<Record<BoardStatus, CollaborationItem[]>>(
    (acc, status) => {
      acc[status] = items.filter((item) => item.boardStatus === status);
      return acc;
    },
    { open: [], inProgress: [], review: [], done: [] }
  );

  return (
    <div
      className={cn(
        "gap-3 p-3",
        isSingleStage
          ? "grid grid-cols-1 overflow-visible"
          : "flex overflow-x-auto scrollbar-none"
      )}
    >
      {visibleStatuses.map((status) => (
        <div
          key={status}
          className={cn(
            "min-w-0",
            isSingleStage ? "w-full" : "w-[260px] shrink-0 md:w-auto md:min-w-[220px] md:flex-1"
          )}
        >
          <div className="mb-3 flex items-center gap-2 px-1">
            <span className={`h-2 w-2 shrink-0 rounded-full ${boardDot[status]}`} />
            <span className="text-sm font-medium">{t(`workspace.items.board.${status}`)}</span>
            <Badge className="ml-auto h-5 border-0 bg-secondary px-1.5 text-[0.65rem] text-muted-foreground">
              {grouped[status].length}
            </Badge>
          </div>
          <div className={cn("space-y-2 rounded-lg bg-secondary/30 p-2", isSingleStage ? "min-h-[240px]" : "min-h-[320px]")}>
            {grouped[status].length > 0 ? (
              grouped[status].map((item) => <BoardCard key={item.id} item={item} />)
            ) : (
              <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-border/70 text-xs text-muted-foreground">
                {t("workspace.items.emptyColumn")}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CollaborationDatabase() {
  const { t } = useTranslation();
  const [stage, setStage] = useState<StageFilter>("all");
  const [kind, setKind] = useState<KindFilter>("all");
  const [layout, setLayout] = useState<LayoutMode>("list");
  const [query, setQuery] = useState("");

  const items = useMemo(
    () => [...myTasks.map(mapTask), ...proposals.map(mapProposal)],
    []
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const scoped = items.filter((item) => {
      const stageMatches = stage === "all" || item.boardStatus === stage;
      const kindMatches = kind === "all" || item.kind === kind;
      const text = `${t(item.titleKey)} ${item.dao} ${t(item.statusKey)} ${t(item.deadlineKey)} ${t(`workspace.items.kind.${item.kind}`)}`.toLowerCase();
      const queryMatches = normalizedQuery.length === 0 || text.includes(normalizedQuery);
      return stageMatches && kindMatches && queryMatches;
    });

    return scoped;
  }, [items, kind, query, stage, t]);

  return (
    <section>
      <Card className="overflow-hidden border-border bg-card">
        <DatabaseToolbar
          filters={STAGE_FILTERS}
          activeFilter={stage}
          getFilterLabel={(item) => t(`workspace.items.stage.${item}`)}
          onFilterChange={setStage}
          query={query}
          onQueryChange={setQuery}
          searchPlaceholder={t("workspace.items.search")}
          searchClassName="w-full"
          topRight={
            <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5">
              <button
                type="button"
                onClick={() => setLayout("list")}
                aria-label={t("workspace.items.layout.list")}
                title={t("workspace.items.layout.list")}
                className={`inline-flex h-8 w-8 items-center justify-center rounded transition ${
                  layout === "list" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Table2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setLayout("board")}
                aria-label={t("workspace.items.layout.board")}
                title={t("workspace.items.layout.board")}
                className={`inline-flex h-8 w-8 items-center justify-center rounded transition ${
                  layout === "board" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Columns3 className="h-4 w-4" />
              </button>
            </div>
          }
        >
          <Select value={kind} onValueChange={(value) => setKind(value as KindFilter)}>
            <SelectTrigger size="sm" className="h-8 w-[136px] shrink-0 border-0 bg-secondary/60">
              <ListFilter className="h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {KIND_FILTERS.map((item) => (
                <SelectItem key={item} value={item}>
                  {t(`workspace.items.kindFilter.${item}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </DatabaseToolbar>

        {layout === "board" ? (
          <CollaborationBoard items={filteredItems} stage={stage} />
        ) : (
          <div className="overflow-x-auto">
            <div className="grid min-w-[620px] grid-cols-[minmax(200px,1.5fr)_80px_minmax(120px,0.8fr)_100px_32px] items-center gap-3 border-b border-border px-3 py-2 text-xs text-muted-foreground">
              <span className="pl-[26px]">{t("workspace.items.columns.item")}</span>
              <span className="pl-2">{t("workspace.items.columns.kind")}</span>
              <span>{t("workspace.items.columns.dao")}</span>
              <span className="pl-1">{t("workspace.items.columns.status")}</span>
              <span aria-hidden="true" />
            </div>

            {filteredItems.length > 0 ? (
              filteredItems.map((item) => <ItemRow key={item.id} item={item} />)
            ) : (
              <div className="px-3 py-12 text-center text-sm text-muted-foreground">
                {t("workspace.items.empty")}
              </div>
            )}
          </div>
        )}
      </Card>
    </section>
  );
}
