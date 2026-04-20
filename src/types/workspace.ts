import type { LucideIcon } from "lucide-react";

export interface Task {
  titleKey: string;
  dao: string;
  statusKey: string;
  deadlineKey: string;
  reward: string;
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
