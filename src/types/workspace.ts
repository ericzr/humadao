import type { LucideIcon } from "lucide-react";

export interface Task {
  id: string;
  titleKey: string;
  dao: string;
  statusKey: string;
  deadlineKey: string;
  reward: string;
}

export type WorkspaceTaskActivityType = "created" | "assigned" | "started" | "submitted" | "reviewed" | "comment";

export interface WorkspaceTaskActivity {
  type: WorkspaceTaskActivityType;
  user: string;
  textKey: string;
  timeKey: string;
}

export interface WorkspaceTaskDetail {
  id: string;
  objectiveKey: string;
  contextKey: string;
  sourceKey: string;
  assignee: string;
  reviewer: string;
  confirmer: string;
  priorityKey: string;
  settlementKey: string;
  tags: string[];
  checklistKeys: string[];
  evidenceKeys: string[];
  activities: WorkspaceTaskActivity[];
}

export type WorkspaceContributionType =
  | "coordination"
  | "education"
  | "community"
  | "documentation"
  | "content"
  | "review";

export type WorkspaceContributionStatus = "draft" | "pending" | "confirmed" | "settleable" | "settled";

export interface WorkspaceContributionRecord {
  id: string;
  titleKey: string;
  daoId: string;
  type: WorkspaceContributionType;
  status: WorkspaceContributionStatus;
  dateKey: string;
  hours: number;
  reward: string;
}

export type WorkspaceDAOStatus = "active" | "watching" | "paused";

export interface WorkspaceDAORecord {
  daoId: string;
  roleKey: string;
  status: WorkspaceDAOStatus;
  activeTasks: number;
  contributionCount: number;
  pendingVotes: number;
  lastActivityKey: string;
}

export interface Notification {
  textKey: string;
  timeKey: string;
  linkTo?: string;
  read?: boolean;
}

export interface QuickLink {
  labelKey: string;
  to: string;
  icon: LucideIcon;
}

export interface StatItem {
  labelKey: string;
  value: string;
  icon: LucideIcon;
}
