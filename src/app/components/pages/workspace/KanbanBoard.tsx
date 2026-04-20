import { useState } from "react";
import { Link } from "react-router";
import { Clock, CheckCircle2, AlertCircle, Inbox, GripVertical } from "lucide-react";
import { Badge } from "../../ui/badge";
import { useTranslation } from "react-i18next";
import { myTasks } from "@/data";
import type { Task } from "@/types";

type KanbanStatus = "open" | "inProgress" | "review" | "done";

const STATUS_ORDER: KanbanStatus[] = ["open", "inProgress", "review", "done"];

const statusConfig: Record<
  KanbanStatus,
  { icon: typeof Inbox; colorClass: string; dotClass: string }
> = {
  open:       { icon: Inbox,         colorClass: "text-muted-foreground", dotClass: "bg-border" },
  inProgress: { icon: Clock,         colorClass: "text-blue-500",         dotClass: "bg-blue-500" },
  review:     { icon: AlertCircle,   colorClass: "text-amber-500",        dotClass: "bg-amber-500" },
  done:       { icon: CheckCircle2,  colorClass: "text-green-500",        dotClass: "bg-green-500" },
};

function getStatus(statusKey: string): KanbanStatus {
  if (statusKey.includes("open"))       return "open";
  if (statusKey.includes("inProgress")) return "inProgress";
  if (statusKey.includes("review"))     return "review";
  if (statusKey.includes("done"))       return "done";
  return "open";
}

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

function TaskCard({ task, isDragging }: TaskCardProps) {
  const { t } = useTranslation();
  const status = getStatus(task.statusKey);
  const { icon: Icon, colorClass } = statusConfig[status];

  return (
    <div
      className={`bg-card border border-border rounded-lg p-3 cursor-grab active:cursor-grabbing select-none transition-all ${
        isDragging ? "opacity-50 scale-95 shadow-lg" : "hover:border-foreground/20 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0 mt-0.5" />
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-snug">{t(task.titleKey)}</p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-[0.65rem] text-muted-foreground truncate">{task.dao}</span>
            <span className="text-[0.65rem] text-muted-foreground">·</span>
            <span className="text-[0.65rem] text-muted-foreground">{t(task.deadlineKey)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-border/60">
        <div className={`flex items-center gap-1 text-[0.65rem] ${colorClass}`}>
          <Icon className="w-3 h-3" />
          {t(task.statusKey)}
        </div>
        {task.reward && (
          <span className="text-xs font-medium text-foreground">{task.reward}</span>
        )}
      </div>
    </div>
  );
}

interface KanbanColumnProps {
  status: KanbanStatus;
  tasks: Task[];
  onDragOver: (e: React.DragEvent, status: KanbanStatus) => void;
  onDrop: (e: React.DragEvent, status: KanbanStatus) => void;
  draggingKey: string | null;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDragEnd: () => void;
}

function KanbanColumn({
  status,
  tasks,
  onDragOver,
  onDrop,
  draggingKey,
  onDragStart,
  onDragEnd,
}: KanbanColumnProps) {
  const { t } = useTranslation();
  const { dotClass } = statusConfig[status];

  return (
    <div
      className="flex flex-col w-[220px] sm:w-[200px] md:flex-1 md:min-w-[160px] shrink-0"
      onDragOver={(e) => onDragOver(e, status)}
      onDrop={(e) => onDrop(e, status)}
    >
      {/* Column header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className={`w-2 h-2 rounded-full shrink-0 ${dotClass}`} />
        <span className="text-xs font-medium text-foreground">{t(`workspace.kanban.${status}`)}</span>
        <Badge className="ml-auto bg-secondary text-muted-foreground border-0 text-[0.6rem] h-4 px-1.5">
          {tasks.length}
        </Badge>
      </div>

      {/* Drop zone */}
      <div className="flex-1 space-y-2 min-h-[120px] rounded-lg p-1 transition-colors">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-[80px] rounded-lg border-2 border-dashed border-border/50">
            <p className="text-[0.65rem] text-muted-foreground/50">{t("workspace.kanban.emptyCol")}</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.titleKey}
              draggable
              onDragStart={(e) => onDragStart(e, task)}
              onDragEnd={onDragEnd}
            >
              <TaskCard task={task} isDragging={draggingKey === task.titleKey} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function KanbanBoard() {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState<Task[]>(myTasks);
  const [draggingKey, setDraggingKey] = useState<string | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<KanbanStatus | null>(null);

  const grouped = STATUS_ORDER.reduce<Record<KanbanStatus, Task[]>>(
    (acc, status) => {
      acc[status] = tasks.filter((task) => getStatus(task.statusKey) === status);
      return acc;
    },
    { open: [], inProgress: [], review: [], done: [] }
  );

  function handleDragStart(e: React.DragEvent, task: Task) {
    e.dataTransfer.setData("taskKey", task.titleKey);
    setDraggingKey(task.titleKey);
  }

  function handleDragOver(e: React.DragEvent, status: KanbanStatus) {
    e.preventDefault();
    setDragOverStatus(status);
  }

  function handleDrop(e: React.DragEvent, targetStatus: KanbanStatus) {
    e.preventDefault();
    const taskKey = e.dataTransfer.getData("taskKey");
    setTasks((prev) =>
      prev.map((task) =>
        task.titleKey === taskKey
          ? { ...task, statusKey: `workspace.status.${targetStatus}` }
          : task
      )
    );
    setDraggingKey(null);
    setDragOverStatus(null);
  }

  function handleDragEnd() {
    setDraggingKey(null);
    setDragOverStatus(null);
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-5">
      {/* Board header */}
      <div className="flex items-center justify-between mb-5">
        <h2>{t("workspace.kanban.title")}</h2>
        <Link to="/bounties" className="text-muted-foreground hover:text-foreground transition text-sm">
          {t("workspace.viewAll")}
        </Link>
      </div>

      {/* Columns */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {STATUS_ORDER.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={grouped[status]}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            draggingKey={draggingKey}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>

      {dragOverStatus && (
        <p className="text-xs text-muted-foreground mt-2 text-center">
          → {t(`workspace.kanban.${dragOverStatus}`)}
        </p>
      )}
    </div>
  );
}
