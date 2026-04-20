import type { Task, Notification } from "@/types";

export const myTasks: Task[] = [
  { titleKey: "workspace.task.design", dao: "元游戏", statusKey: "workspace.status.open", deadlineKey: "workspace.task.designDeadline", reward: "¥800" },
  { titleKey: "workspace.task.research", dao: "Nation3", statusKey: "workspace.status.open", deadlineKey: "workspace.task.researchDeadline", reward: "¥600" },
  { titleKey: "workspace.task.frontend", dao: "peaq", statusKey: "workspace.status.inProgress", deadlineKey: "workspace.task.frontendDeadline", reward: "¥500" },
  { titleKey: "workspace.task.contract", dao: "元游戏", statusKey: "workspace.status.inProgress", deadlineKey: "workspace.task.contractDeadline", reward: "¥1,200" },
  { titleKey: "workspace.task.docs", dao: "莱克斯DAO", statusKey: "workspace.status.review", deadlineKey: "workspace.task.docsDeadline", reward: "¥200" },
  { titleKey: "workspace.task.discord", dao: "peaq", statusKey: "workspace.status.done", deadlineKey: "workspace.task.discordDeadline", reward: "¥300" },
];

export const notifications: Notification[] = [
  { textKey: "workspace.notif.1", timeKey: "workspace.notif.1Time", linkTo: "/bounties/frontend-ui" },
  { textKey: "workspace.notif.2", timeKey: "workspace.notif.2Time", linkTo: "/bounties" },
  { textKey: "workspace.notif.3", timeKey: "workspace.notif.3Time", linkTo: "/governance" },
  { textKey: "workspace.notif.4", timeKey: "workspace.notif.4Time", linkTo: "/workspace" },
];
