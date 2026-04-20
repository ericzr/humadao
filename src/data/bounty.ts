import type { Bounty, BountyDetail } from "@/types";

export const bountySkillKeys = [
  "bounty.skill.dev", "bounty.skill.design", "bounty.skill.translation",
  "bounty.skill.writing", "bounty.skill.marketing", "bounty.skill.community",
  "bounty.skill.product", "bounty.skill.research", "bounty.skill.ops", "bounty.skill.data",
];

export const bounties: Bounty[] = [
  { id: "ai-workflow", titleKey: "bounty.item.aiWorkflow", daoKey: "bounty.item.aiWorkflowDao", timeKey: "bounty.item.aiWorkflowTime", amount: null, statusKey: "bounty.item.aiWorkflowStatus", skills: ["bounty.skill.dev"] },
  { id: "hire-web3", titleKey: "bounty.item.hireWeb3", daoKey: "bounty.item.hireWeb3Dao", timeKey: "bounty.item.hireWeb3Time", amount: "¥2,000", statusKey: "bounty.item.hireWeb3Status", skills: ["bounty.skill.dev"] },
  { id: "first-bounty", titleKey: "bounty.item.firstBounty", daoKey: "bounty.item.firstBountyDao", timeKey: "bounty.item.firstBountyTime", amount: null, statusKey: "bounty.item.firstBountyStatus", skills: ["bounty.skill.dev"] },
  { id: "solidity-audit", titleKey: "bounty.item.solidityAudit", daoKey: "bounty.item.solidityAuditDao", timeKey: "bounty.item.solidityAuditTime", amount: "¥16,500", statusKey: "bounty.item.solidityAuditStatus", skills: ["bounty.skill.dev"] },
  { id: "storage", titleKey: "bounty.item.storage", daoKey: "Velera", timeKey: "bounty.item.storageTime", amount: "¥5,000", statusKey: "bounty.item.storageStatus", skills: ["bounty.skill.dev"] },
  { id: "frontend-ui", titleKey: "bounty.item.frontendUI", daoKey: "MetaDAO", timeKey: "bounty.item.frontendUITime", amount: "¥3,000", statusKey: "bounty.item.frontendUIStatus", skills: ["bounty.skill.design", "bounty.skill.dev"] },
  { id: "gov-docs", titleKey: "bounty.item.govDocs", daoKey: "Nation3", timeKey: "bounty.item.govDocsTime", amount: "¥800", statusKey: "bounty.item.govDocsStatus", skills: ["bounty.skill.writing"] },
  { id: "translation", titleKey: "bounty.item.translation", daoKey: "Aave DAO", timeKey: "bounty.item.translationTime", amount: "¥1,200", statusKey: "bounty.item.translationStatus", skills: ["bounty.skill.translation"] },
];

export const bountyDetails: Record<string, BountyDetail> = {
  "frontend-ui": {
    id: "frontend-ui",
    titleKey: "bounty.item.frontendUI",
    daoKey: "MetaDAO",
    timeKey: "bounty.item.frontendUITime",
    amount: "¥3,000",
    statusKey: "bounty.item.frontendUIStatus",
    skills: ["bounty.skill.design", "bounty.skill.dev"],
    status: "open",
    descKey: "bountyDetail.frontendUI.desc",
    deliverables: [
      "bountyDetail.frontendUI.d1",
      "bountyDetail.frontendUI.d2",
      "bountyDetail.frontendUI.d3",
    ],
    applicants: 5,
    deadlineKey: "bountyDetail.frontendUI.deadline",
    creatorName: "Sero",
    timeline: [
      { type: "created", user: "Sero", textKey: "bountyDetail.frontendUI.t1", timeKey: "bountyDetail.frontendUI.t1Time" },
      { type: "comment", user: "ifun", textKey: "bountyDetail.frontendUI.t2", timeKey: "bountyDetail.frontendUI.t2Time" },
    ],
  },
  "solidity-audit": {
    id: "solidity-audit",
    titleKey: "bounty.item.solidityAudit",
    daoKey: "bounty.item.solidityAuditDao",
    timeKey: "bounty.item.solidityAuditTime",
    amount: "¥16,500",
    statusKey: "bounty.item.solidityAuditStatus",
    skills: ["bounty.skill.dev"],
    status: "in_progress",
    descKey: "bountyDetail.solidityAudit.desc",
    deliverables: [
      "bountyDetail.solidityAudit.d1",
      "bountyDetail.solidityAudit.d2",
    ],
    applicants: 12,
    deadlineKey: "bountyDetail.solidityAudit.deadline",
    creatorName: "Alex.eth",
    timeline: [
      { type: "created", user: "Alex.eth", textKey: "bountyDetail.solidityAudit.t1", timeKey: "bountyDetail.solidityAudit.t1Time" },
      { type: "applied", user: "hamzat_iii", textKey: "bountyDetail.solidityAudit.t2", timeKey: "bountyDetail.solidityAudit.t2Time" },
      { type: "accepted", user: "Alex.eth", textKey: "bountyDetail.solidityAudit.t3", timeKey: "bountyDetail.solidityAudit.t3Time" },
    ],
  },
};
