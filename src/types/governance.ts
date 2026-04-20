export interface Proposal {
  id: number;
  titleKey: string;
  author: string;
  dao: string;
  statusKey: string;
  forVotes: number;
  againstVotes: number;
  abstain: number;
  voters: number;
  deadlineKey: string;
  descKey: string;
  comments: number;
}

export interface Comment {
  user: string;
  textKey: string;
  timeKey: string;
}
