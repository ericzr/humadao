import type { Proposal, Comment } from "@/types";

export const proposals: Proposal[] = [
  { id: 1, titleKey: "governance.proposal.treasury", author: "Alex.eth", dao: "peaq", statusKey: "governance.filter.voting", forVotes: 72, againstVotes: 18, abstain: 10, voters: 156, deadlineKey: "workspace.vote.treasuryDeadline", descKey: "governance.proposal.treasuryDesc", comments: 23 },
  { id: 2, titleKey: "governance.proposal.incentive", author: "Sero", dao: "peaq", statusKey: "governance.filter.passed", forVotes: 91, againstVotes: 5, abstain: 4, voters: 312, deadlineKey: "dao.proposal.incentiveDeadline", descKey: "governance.proposal.incentiveDesc", comments: 45 },
  { id: 3, titleKey: "governance.proposal.grading", author: "ifun", dao: "莱克斯DAO", statusKey: "governance.filter.discussion", forVotes: 0, againstVotes: 0, abstain: 0, voters: 0, deadlineKey: "workspace.vote.gradingDeadline", descKey: "governance.proposal.gradingDesc", comments: 12 },
  { id: 4, titleKey: "governance.proposal.quadratic", author: "hamzat_iii", dao: "元游戏", statusKey: "governance.filter.voting", forVotes: 58, againstVotes: 32, abstain: 10, voters: 89, deadlineKey: "workspace.vote.treasuryDeadline", descKey: "governance.proposal.quadraticDesc", comments: 34 },
  { id: 5, titleKey: "governance.proposal.crossDAO", author: "扎夫", dao: "Nation3", statusKey: "governance.filter.rejected", forVotes: 35, againstVotes: 55, abstain: 10, voters: 201, deadlineKey: "dao.proposal.incentiveDeadline", descKey: "governance.proposal.crossDAODesc", comments: 67 },
];

export const governanceFilterKeys = [
  "governance.filter.all",
  "governance.filter.voting",
  "governance.filter.passed",
  "governance.filter.discussion",
  "governance.filter.rejected",
];

export const governanceComments: Comment[] = [
  { user: "Sero", textKey: "governance.comment.1", timeKey: "governance.comment.1Time" },
  { user: "ifun", textKey: "governance.comment.2", timeKey: "governance.comment.2Time" },
];
