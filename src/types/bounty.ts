export type BountyStatus = "open" | "applied" | "in_progress" | "submitted" | "reviewing" | "completed" | "rejected";

export interface Bounty {
  id?: string;
  titleKey: string;
  daoKey: string;
  timeKey: string;
  amount: string | null;
  statusKey: string;
  skills: string[];
}

export interface BountyDetail extends Bounty {
  id: string;
  status: BountyStatus;
  descKey: string;
  deliverables: string[];
  applicants: number;
  deadlineKey: string;
  creatorName: string;
  timeline: BountyTimelineEvent[];
}

export interface BountyTimelineEvent {
  type: "created" | "applied" | "accepted" | "submitted" | "completed" | "comment";
  user: string;
  textKey: string;
  timeKey: string;
}

export interface HotBounty {
  titleKey: string;
  amount: string;
  applicants: number;
}
