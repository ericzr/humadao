import type { Proposal, Comment } from "@/types";

export const proposals: Proposal[] = [
  { id: 1, daoId: "peaq", titleKey: "governance.proposal.treasury", author: "Alex.eth", dao: "peaq", statusKey: "governance.filter.voting", forVotes: 72, againstVotes: 18, abstain: 10, voters: 156, deadlineKey: "workspace.vote.treasuryDeadline", descKey: "governance.proposal.treasuryDesc", comments: 23 },
  { id: 2, daoId: "peaq", titleKey: "governance.proposal.incentive", author: "Sero", dao: "peaq", statusKey: "governance.filter.passed", forVotes: 91, againstVotes: 5, abstain: 4, voters: 312, deadlineKey: "dao.proposal.incentiveDeadline", descKey: "governance.proposal.incentiveDesc", comments: 45 },
  { id: 3, daoId: "lex-dao", titleKey: "governance.proposal.grading", author: "ifun", dao: "莱克斯DAO", statusKey: "governance.filter.discussion", forVotes: 0, againstVotes: 0, abstain: 0, voters: 0, deadlineKey: "workspace.vote.gradingDeadline", descKey: "governance.proposal.gradingDesc", comments: 12 },
  { id: 4, daoId: "metagame", titleKey: "governance.proposal.quadratic", author: "hamzat_iii", dao: "元游戏", statusKey: "governance.filter.voting", forVotes: 58, againstVotes: 32, abstain: 10, voters: 89, deadlineKey: "workspace.vote.treasuryDeadline", descKey: "governance.proposal.quadraticDesc", comments: 34 },
  { id: 5, daoId: "nation3", titleKey: "governance.proposal.crossDAO", author: "扎夫", dao: "Nation3", statusKey: "governance.filter.rejected", forVotes: 35, againstVotes: 55, abstain: 10, voters: 201, deadlineKey: "dao.proposal.incentiveDeadline", descKey: "governance.proposal.crossDAODesc", comments: 67 },
  { id: 6, daoId: "luboom-reactor", titleKey: "governance.proposal.luboomProtocol", author: "Sero", dao: "真知沉淀 - Luboom 反应器", statusKey: "governance.filter.executing", forVotes: 84, againstVotes: 6, abstain: 10, voters: 64, deadlineKey: "governance.deadline.executing", descKey: "governance.proposal.luboomProtocolDesc", comments: 9 },
  { id: 7, daoId: "free-living", titleKey: "governance.proposal.livingRules", author: "Anran", dao: "随心住", statusKey: "governance.filter.discussion", forVotes: 0, againstVotes: 0, abstain: 0, voters: 0, deadlineKey: "governance.deadline.discussion", descKey: "governance.proposal.livingRulesDesc", comments: 14 },
  { id: 8, daoId: "open-university", titleKey: "governance.proposal.openLearning", author: "Mori", dao: "开放大学", statusKey: "governance.filter.passed", forVotes: 88, againstVotes: 4, abstain: 8, voters: 118, deadlineKey: "governance.deadline.passed", descKey: "governance.proposal.openLearningDesc", comments: 18 },
];

export const governanceFilterKeys = [
  "governance.filter.all",
  "governance.filter.voting",
  "governance.filter.passed",
  "governance.filter.discussion",
  "governance.filter.executing",
  "governance.filter.rejected",
];

export const governanceComments: Comment[] = [
  { user: "Sero", textKey: "governance.comment.1", timeKey: "governance.comment.1Time" },
  { user: "ifun", textKey: "governance.comment.2", timeKey: "governance.comment.2Time" },
];
