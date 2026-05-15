import { CheckCircle2, Circle, Clock, FileCheck, MessageCircle, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";

type StatusTone = "neutral" | "active" | "warning" | "success" | "blocked" | "archived";

interface StatusBadgeProps {
  labelKey?: string;
  label?: string;
  status?: string;
  className?: string;
  showIcon?: boolean;
}

const toneClass: Record<StatusTone, string> = {
  neutral: "border-transparent bg-secondary text-muted-foreground",
  active: "border-transparent bg-blue-500/10 text-blue-600 dark:text-blue-400",
  warning: "border-transparent bg-amber-500/10 text-amber-600 dark:text-amber-400",
  success: "border-transparent bg-green-500/10 text-green-600 dark:text-green-400",
  blocked: "border-transparent bg-red-500/10 text-red-600 dark:text-red-400",
  archived: "border-transparent bg-muted text-muted-foreground",
};

function getTone(status = ""): StatusTone {
  if (status.includes("rejected") || status.includes("blocked")) return "blocked";
  if (status.includes("done") || status.includes("settled") || status.includes("passed") || status.includes("completed")) return "success";
  if (status.includes("review") || status.includes("pending") || status.includes("voting") || status.includes("settleable")) return "warning";
  if (status.includes("inProgress") || status.includes("executing") || status.includes("confirmed") || status.includes("active")) return "active";
  if (status.includes("paused") || status.includes("draft")) return "archived";
  return "neutral";
}

function getIcon(status = "") {
  if (status.includes("rejected") || status.includes("blocked")) return XCircle;
  if (status.includes("done") || status.includes("settled") || status.includes("passed") || status.includes("completed")) return CheckCircle2;
  if (status.includes("review") || status.includes("pending") || status.includes("voting") || status.includes("settleable")) return Clock;
  if (status.includes("discussion")) return MessageCircle;
  if (status.includes("inProgress") || status.includes("executing") || status.includes("confirmed") || status.includes("active")) return FileCheck;
  return Circle;
}

export function StatusBadge({ labelKey, label, status, className, showIcon = true }: StatusBadgeProps) {
  const { t } = useTranslation();
  const Icon = getIcon(status ?? labelKey);

  return (
    <Badge className={cn("h-6 rounded-md px-2 text-[0.7rem] font-medium", toneClass[getTone(status ?? labelKey)], className)}>
      {showIcon && <Icon className="h-3.5 w-3.5" />}
      {labelKey ? t(labelKey) : label}
    </Badge>
  );
}
