import { townHallDAOs } from "./dao";
import type {
  ContributionRecord,
  Contributor,
  ContributorAssignmentScope,
  ContributorAssignmentStatus,
  ContributorContributionArea,
  ContributorHistoryPoint,
  ContributorProfile,
  ContributorProfileLink,
  ContributorReputationBreakdown,
  ContributorRole,
  ContributorRoleAssignment,
  ContributorSkill,
  SkillLayer,
  TopContributor,
} from "@/types";

function assignment(
  daoId: string,
  role: ContributorRole,
  scope: ContributorAssignmentScope,
  status: ContributorAssignmentStatus,
  since: string,
  reputation: number,
  contributionAreas: ContributorContributionArea[],
  note: string,
  until?: string,
): ContributorRoleAssignment {
  return {
    daoId,
    role,
    scope,
    status,
    since,
    until,
    reputation,
    contributionAreas,
    note,
  };
}

function links(...items: Array<[ContributorProfileLink["type"], string, string]>): ContributorProfileLink[] {
  return items.map(([type, label, href]) => ({ type, label, href }));
}

function reputationBreakdown(values: number[]): ContributorReputationBreakdown[] {
  const keys: ContributorReputationBreakdown["labelKey"][] = [
    "profile.rep.taskCompletion",
    "profile.rep.governance",
    "profile.rep.communityEngagement",
    "profile.rep.peerReview",
    "profile.rep.mentorship",
  ];

  return keys.map((labelKey, index) => ({ labelKey, value: values[index] ?? 0 }));
}

function reputationHistory(points: Array<[string, number]>): ContributorHistoryPoint[] {
  return points.map(([label, value]) => ({ label, value }));
}

function profile(data: ContributorProfile): ContributorProfile {
  return data;
}

/** Mapping from skill value cluster to its layer */
export const skillLayerMap: Record<ContributorSkill, SkillLayer> = {
  // Layer 1: Human Core (4 clusters)
  directionSensing: 1,
  consensusBuilding: 1,
  emotionalCare: 1,
  governanceDecision: 1,
  // Layer 2: Human-led, AI-assisted (6 clusters)
  structureDesign: 2,
  narrativeExpression: 2,
  experienceAesthetics: 2,
  networkWeaving: 2,
  productInsight: 2,
  knowledgeProduction: 2,
  // Layer 3: Execution (6 clusters)
  engineering: 3,
  creativeProduction: 3,
  operationsData: 3,
  educationTraining: 3,
  careService: 3,
  fieldExecution: 3,
};

/** Get the layer for a skill */
export function getSkillLayer(skill: ContributorSkill): SkillLayer {
  return skillLayerMap[skill];
}

/** Sort skills by layer (L1 first) */
export function sortSkillsByLayer(skills: ContributorSkill[]): ContributorSkill[] {
  return [...skills].sort((a, b) => skillLayerMap[a] - skillLayerMap[b]);
}

export const contributorSkillOrder: ContributorSkill[] = [
  // Layer 1: Human Core
  "directionSensing",
  "consensusBuilding",
  "emotionalCare",
  "governanceDecision",
  // Layer 2: Human-led
  "structureDesign",
  "narrativeExpression",
  "experienceAesthetics",
  "networkWeaving",
  "productInsight",
  "knowledgeProduction",
  // Layer 3: Execution
  "engineering",
  "creativeProduction",
  "operationsData",
  "educationTraining",
  "careService",
  "fieldExecution",
];

export const contributors: Contributor[] = [
  {
    id: "sero",
    name: "Sero | 猎人工坊",
    rep: 11540,
    typeKey: "contributors.reputation",
    bio: "软件工程师、播客主持人和协议协作发起者，长期参与开源、研究与跨语言内容共建。",
    available: true,
    participationLevel: "governance",
    skills: ["directionSensing", "consensusBuilding", "governanceDecision", "structureDesign", "narrativeExpression", "knowledgeProduction"],
    roleAssignments: [
      assignment("luboom-reactor", "initiator", "dao", "active", "2026-01", 94, ["research", "content", "governance"], "发起真知沉淀方向与基础协作协议。"),
      assignment("open-university", "coBuilder", "initiative", "active", "2026-02", 86, ["research", "education"], "共建开放课程框架与知识沉淀方法。"),
      assignment("protocol-crowdsourcing", "reviewer", "project", "advising", "2026-03", 82, ["governance", "research"], "参与协议任务争议规则和评价机制审阅。"),
      assignment("visual-books", "coBuilder", "initiative", "active", "2026-03", 78, ["education", "content"], "把研究内容转成可视化书籍结构。"),
    ],
    contributionAreas: ["research", "content", "governance"],
    collaborationModes: ["online", "hybrid", "longTerm", "visionDriven"],
    locationId: "cn-shanghai",
    profile: profile({
      headline: "把研究、内容与协议设计连接起来的长期共建者。",
      languages: ["中文", "English"],
      focus: "当前重点在于把研究、治理和知识产品之间的关系沉淀成可复用的协作结构。",
      links: links(
        ["github", "GitHub", "#"],
        ["website", "Website", "#"],
        ["twitter", "X", "#"],
      ),
      featuredWorks: [
        {
          title: "Luboom 反应器共识骨架",
          summary: "把主题反应器、研究节点和共识沉淀方法做成第一版可运行的原型结构。",
          daoId: "luboom-reactor",
          skillTags: ["consensusBuilding", "knowledgeProduction", "narrativeExpression"],
        },
        {
          title: "开放大学课程母版",
          summary: "将课程、共同阅读和长期研究任务编排成可持续共学协议。",
          daoId: "open-university",
          skillTags: ["emotionalCare", "structureDesign", "governanceDecision"],
        },
      ],
      reviews: [
        {
          from: "ifun",
          relationship: "长期协作者",
          duration: "2 个月",
          highlight: "擅长把抽象愿景拆成别人可以接手的协作模块，既能写也能落地。",
        },
        {
          from: "Mori",
          relationship: "课程共建者",
          duration: "1 个月",
          highlight: "在开放大学项目里同时承担发起者与研究者角色，跨项目切换非常清晰。",
        },
      ],
      reputationBreakdown: reputationBreakdown([4180, 2490, 2010, 1640, 1220]),
      reputationHistory: reputationHistory([
        ["Oct", 8340],
        ["Nov", 9020],
        ["Dec", 9680],
        ["Jan", 10320],
        ["Feb", 10980],
        ["Mar", 11540],
      ]),
      earningsUsd: 8620,
      revenueShare: 6.5,
    }),
  },
  {
    id: "ifun",
    name: "ifun",
    rep: 10092,
    typeKey: "contributors.reputation",
    bio: "DAO 运营贡献者，擅长图形、模板、流程整理和日常协调，能把复杂协作跑顺。",
    available: true,
    participationLevel: "core",
    skills: ["consensusBuilding", "networkWeaving", "structureDesign", "operationsData", "fieldExecution"],
    roleAssignments: [
      assignment("luboom-reactor", "coordinator", "dao", "active", "2026-01", 90, ["coordination", "community"], "维护日常节奏、发布与协作看板。"),
      assignment("open-university", "coordinator", "initiative", "active", "2026-02", 84, ["education", "coordination"], "把课程排期、招募和反馈流程跑顺。"),
      assignment("community-eldercare", "host", "project", "active", "2026-02", 76, ["community", "care"], "支持社区志愿者连接和线下协作活动。"),
      assignment("visual-books", "coBuilder", "project", "advising", "2026-03", 73, ["content", "task"], "参与内容版式与叙事包装。"),
    ],
    contributionAreas: ["coordination", "community", "education"],
    collaborationModes: ["online", "hybrid", "longTerm", "taskDriven"],
    locationId: "cn-hangzhou",
    profile: profile({
      headline: "让愿景型项目具备执行秩序和协作体验的运营型共建者。",
      languages: ["中文", "English"],
      focus: "关注从发起阶段到稳定运行阶段之间的组织节奏、协作模板和公共表达。",
      links: links(
        ["website", "Portfolio", "#"],
        ["telegram", "Telegram", "#"],
        ["twitter", "X", "#"],
      ),
      featuredWorks: [
        {
          title: "开放大学开营模版",
          summary: "设计了从报名、入组到反馈复盘的一体化运营流程。",
          daoId: "open-university",
          skillTags: ["structureDesign", "networkWeaving", "emotionalCare"],
        },
        {
          title: "社区化养老志愿者面板",
          summary: "帮助照护协作者和社区居民建立透明的协作看板与沟通节奏。",
          daoId: "community-eldercare",
          skillTags: ["emotionalCare", "networkWeaving", "fieldExecution"],
        },
      ],
      reviews: [
        {
          from: "安然",
          relationship: "社区项目协作者",
          duration: "1 个月",
          highlight: "非常擅长把照护型劳动从无形工作，转成能被看见和被接力的协作流程。",
        },
        {
          from: "Sero | 猎人工坊",
          relationship: "发起搭档",
          duration: "2 个月",
          highlight: "能在不稀释愿景的前提下，把复杂事情整理成清楚的步骤和模板。",
        },
      ],
      reputationBreakdown: reputationBreakdown([2980, 1700, 2940, 1210, 1262]),
      reputationHistory: reputationHistory([
        ["Oct", 7420],
        ["Nov", 8030],
        ["Dec", 8640],
        ["Jan", 9170],
        ["Feb", 9680],
        ["Mar", 10092],
      ]),
      earningsUsd: 6940,
      revenueShare: 4.5,
    }),
  },
  {
    id: "zafu",
    name: "扎夫",
    rep: 8150,
    typeKey: "contributors.reputation",
    bio: "社区运营与传播策略协作者，熟悉组织氛围维护、外部沟通和增长策划。",
    available: false,
    participationLevel: "active",
    skills: ["narrativeExpression", "networkWeaving", "productInsight", "creativeProduction"],
    roleAssignments: [
      assignment("agent-market", "host", "dao", "paused", "2026-02", 82, ["community", "content"], "曾负责早期市场传播和首批合作方沟通。"),
      assignment("visual-books", "connector", "initiative", "active", "2026-03", 74, ["content", "community"], "连接内容创作者与潜在渠道资源。"),
      assignment("free-living", "coordinator", "project", "active", "2026-03", 69, ["community", "coordination"], "协助体验营招募与社区叙事。"),
    ],
    contributionAreas: ["community", "content", "coordination"],
    collaborationModes: ["online", "shortTerm", "taskDriven"],
    locationId: "cn-shenzhen",
    profile: profile({
      headline: "偏传播与连接型的项目催化者，擅长把外部的人带进来。",
      languages: ["中文"],
      focus: "当前更关注如何为新项目建立第一批外部认知、叙事和可信入口。",
      links: links(
        ["twitter", "X", "#"],
        ["website", "Notes", "#"],
        ["external", "Portfolio", "#"],
      ),
      featuredWorks: [
        {
          title: "随心住社区叙事页",
          summary: "梳理自由居住实验的参与理由、体验入口和对外沟通路径。",
          daoId: "free-living",
          skillTags: ["narrativeExpression", "networkWeaving"],
        },
      ],
      reviews: [
        {
          from: "Lena",
          relationship: "内容协作者",
          duration: "3 周",
          highlight: "对项目的外部感知很敏锐，能迅速判断别人为什么愿意加入。",
        },
      ],
      reputationBreakdown: reputationBreakdown([1820, 970, 2680, 1180, 1500]),
      reputationHistory: reputationHistory([
        ["Oct", 5630],
        ["Nov", 6180],
        ["Dec", 6790],
        ["Jan", 7340],
        ["Feb", 7810],
        ["Mar", 8150],
      ]),
      earningsUsd: 3810,
      revenueShare: 2.2,
    }),
  },
  {
    id: "sagittarius",
    name: "射手座",
    rep: 4750,
    typeKey: "contributors.prestige",
    bio: "多语种研究与翻译型人才，适合教育、出版、国际连接和长期知识沉淀项目。",
    available: true,
    participationLevel: "active",
    skills: ["emotionalCare", "directionSensing", "knowledgeProduction", "educationTraining"],
    roleAssignments: [
      assignment("open-university", "coBuilder", "initiative", "active", "2026-02", 80, ["education", "research"], "支持课程翻译、本地化和联合阅读。"),
      assignment("visual-books", "coBuilder", "project", "active", "2026-03", 72, ["research", "content"], "参与多语种资料编目与可视化书稿整理。"),
      assignment("luboom-reactor", "connector", "project", "advising", "2026-03", 66, ["research", "community"], "连接跨语言研究者和海外案例素材。"),
    ],
    contributionAreas: ["research", "education", "content"],
    collaborationModes: ["online", "longTerm", "visionDriven"],
    locationId: "cn-beijing",
    profile: profile({
      headline: "在语言、研究和教育之间建立桥梁的长期知识协作者。",
      languages: ["中文", "English", "Français"],
      focus: "希望把跨语言知识沉淀引入开放大学与可视化书籍项目，让内容天然可迁移。",
      links: links(
        ["website", "Reading Notes", "#"],
        ["external", "Mirror", "#"],
      ),
      featuredWorks: [
        {
          title: "开放大学双语课程包",
          summary: "将课程结构与共学导读同步整理为中英双语版本。",
          daoId: "open-university",
          skillTags: ["emotionalCare", "knowledgeProduction", "educationTraining"],
        },
      ],
      reviews: [
        {
          from: "Mori",
          relationship: "共学策划搭档",
          duration: "1 个月",
          highlight: "翻译不是简单转述，而是把知识重新组织给不同背景的人理解。",
        },
      ],
      reputationBreakdown: reputationBreakdown([980, 560, 930, 860, 1420]),
      reputationHistory: reputationHistory([
        ["Oct", 2860],
        ["Nov", 3250],
        ["Dec", 3640],
        ["Jan", 4020],
        ["Feb", 4380],
        ["Mar", 4750],
      ]),
      earningsUsd: 2280,
      revenueShare: 1.6,
    }),
  },
  {
    id: "hamzat",
    name: "hamzat_iii",
    rep: 4609,
    typeKey: "contributors.reputation",
    bio: "技术与内容复合型协作者，可同时承担开发、内容写作、分析和社媒执行。",
    available: true,
    participationLevel: "active",
    skills: ["productInsight", "narrativeExpression", "engineering", "creativeProduction"],
    roleAssignments: [
      assignment("agent-market", "coBuilder", "dao", "active", "2026-02", 81, ["task", "content"], "参与市场原型、案例展示和产品联调。"),
      assignment("agent-farm", "coordinator", "project", "active", "2026-02", 76, ["task", "coordination"], "维护自动化流程样板与交付材料。"),
      assignment("protocol-crowdsourcing", "coBuilder", "initiative", "advising", "2026-03", 68, ["task", "community"], "支持前端体验与协作叙事包装。"),
    ],
    contributionAreas: ["task", "content", "community"],
    collaborationModes: ["online", "hybrid", "shortTerm", "taskDriven"],
    locationId: "ng-lagos",
    profile: profile({
      headline: "能同时在产品、开发和传播之间切换的复合型执行者。",
      languages: ["English"],
      focus: "目前在探索如何为自动化和市场型项目快速搭建高可信的前端演示。",
      links: links(
        ["github", "GitHub", "#"],
        ["linkedin", "LinkedIn", "#"],
        ["twitter", "X", "#"],
      ),
      featuredWorks: [
        {
          title: "Agent 市场第一版发布页",
          summary: "完成市场卡片、服务入口和合作案例展示的前端样板。",
          daoId: "agent-market",
          skillTags: ["engineering", "narrativeExpression"],
        },
      ],
      reviews: [
        {
          from: "tnrdd",
          relationship: "技术协作伙伴",
          duration: "3 周",
          highlight: "写代码的时候也会主动考虑内容表达和最终用户怎么理解。",
        },
      ],
      reputationBreakdown: reputationBreakdown([1760, 620, 780, 689, 760]),
      reputationHistory: reputationHistory([
        ["Oct", 2490],
        ["Nov", 2960],
        ["Dec", 3370],
        ["Jan", 3810],
        ["Feb", 4230],
        ["Mar", 4609],
      ]),
      earningsUsd: 2960,
      revenueShare: 2.8,
    }),
  },
  {
    id: "bbb",
    name: "bbbbbbbbb",
    rep: 4000,
    typeKey: "contributors.prestige",
    bio: "Web3 开发者，专注智能合约与前端开发，适合任务型或协议型项目攻坚。",
    available: false,
    participationLevel: "temporary",
    skills: ["directionSensing", "governanceDecision", "engineering"],
    roleAssignments: [
      assignment("protocol-crowdsourcing", "coBuilder", "project", "completed", "2026-02", 74, ["task", "governance"], "完成了一期任务协议与签名流原型。"),
      assignment("agent-market", "reviewer", "project", "paused", "2026-03", 61, ["task", "governance"], "审查服务条款与交付流程。"),
    ],
    contributionAreas: ["task", "governance"],
    collaborationModes: ["online", "shortTerm", "taskDriven"],
    locationId: "cn-chengdu",
    profile: profile({
      headline: "偏协议与实现层的短周期攻坚型开发者。",
      languages: ["中文"],
      focus: "更适合在边界明确、技术要求高的任务里提供集中输出。",
      links: links(
        ["github", "GitHub", "#"],
        ["external", "Showcase", "#"],
      ),
      featuredWorks: [
        {
          title: "协议任务签名流",
          summary: "为协议型众包平台搭了一版签名确认与状态切换原型。",
          daoId: "protocol-crowdsourcing",
          skillTags: ["engineering", "governanceDecision"],
        },
      ],
      reviews: [
        {
          from: "Sero | 猎人工坊",
          relationship: "协议审阅者",
          duration: "2 周",
          highlight: "适合明确边界后的快速推进，但更偏任务型协作。",
        },
      ],
      reputationBreakdown: reputationBreakdown([1800, 870, 330, 620, 380]),
      reputationHistory: reputationHistory([
        ["Oct", 2210],
        ["Nov", 2620],
        ["Dec", 3030],
        ["Jan", 3410],
        ["Feb", 3720],
        ["Mar", 4000],
      ]),
      earningsUsd: 2520,
      revenueShare: 1.1,
    }),
  },
  {
    id: "v3dant",
    name: "v3dant.eth",
    rep: 1750,
    typeKey: "contributors.prestige",
    bio: "擅长运营、翻译和线下聚会组织，适合地方节点、社区共建和跨文化连接。",
    available: true,
    participationLevel: "active",
    skills: ["emotionalCare", "networkWeaving", "fieldExecution"],
    roleAssignments: [
      assignment("city-energy-station", "host", "dao", "active", "2026-02", 74, ["community", "coordination"], "试运营线下活动与城市节点连接。"),
      assignment("community-eldercare", "connector", "project", "active", "2026-03", 68, ["community", "care"], "帮助本地志愿者和空间建立联系。"),
    ],
    contributionAreas: ["community", "education", "coordination"],
    collaborationModes: ["offline", "hybrid", "visionDriven", "longTerm"],
    locationId: "in-bangalore",
    profile: profile({
      headline: "偏空间节点与线下社区的人际连接型协作者。",
      languages: ["English", "Hindi"],
      focus: "想把线下节点经验带入 huma dao 的现实协作场景，比如空间、养老和城市项目。",
      links: links(
        ["website", "Notes", "#"],
        ["telegram", "Telegram", "#"],
      ),
      featuredWorks: [
        {
          title: "城市能量泵站线下试点",
          summary: "组织了几次小规模线下活动，用来验证城市节点的聚合方式。",
          daoId: "city-energy-station",
          skillTags: ["fieldExecution", "networkWeaving"],
        },
      ],
      reviews: [
        {
          from: "安然",
          relationship: "节点协作搭档",
          duration: "2 周",
          highlight: "很会照顾现场的协作氛围，让第一次见面的人也能马上进入连接状态。",
        },
      ],
      reputationBreakdown: reputationBreakdown([360, 180, 520, 250, 440]),
      reputationHistory: reputationHistory([
        ["Oct", 820],
        ["Nov", 980],
        ["Dec", 1180],
        ["Jan", 1360],
        ["Feb", 1560],
        ["Mar", 1750],
      ]),
      earningsUsd: 920,
      revenueShare: 0.8,
    }),
  },
  {
    id: "tnrdd",
    name: "tnrdd",
    rep: 1400,
    typeKey: "contributors.prestige",
    bio: "全栈开发工程师，适合产品原型、平台底层和任务驱动型项目。",
    available: true,
    participationLevel: "temporary",
    skills: ["structureDesign", "engineering", "operationsData"],
    roleAssignments: [
      assignment("agent-farm", "coBuilder", "project", "active", "2026-02", 70, ["task", "coordination"], "搭建自动化农场原型控制台。"),
      assignment("agent-market", "coordinator", "project", "active", "2026-03", 64, ["task", "content"], "维护演示数据和接入脚本。"),
    ],
    contributionAreas: ["task", "coordination"],
    collaborationModes: ["online", "shortTerm", "taskDriven"],
    locationId: "cn-nanjing",
    profile: profile({
      headline: "偏原型和底层串联的工程协作者。",
      languages: ["中文"],
      focus: "适合在快速验证阶段把不同模块先接起来，让项目能跑起来再慢慢抽象。",
      links: links(
        ["github", "GitHub", "#"],
      ),
      featuredWorks: [
        {
          title: "自动化农场控制台样板",
          summary: "把工作流田块、状态面板和结算区接成可浏览的前端原型。",
          daoId: "agent-farm",
          skillTags: ["engineering", "operationsData"],
        },
      ],
      reviews: [
        {
          from: "hamzat_iii",
          relationship: "联调伙伴",
          duration: "10 天",
          highlight: "很适合在短时间里把复杂概念先做成能演示的东西。",
        },
      ],
      reputationBreakdown: reputationBreakdown([620, 150, 180, 210, 240]),
      reputationHistory: reputationHistory([
        ["Oct", 620],
        ["Nov", 760],
        ["Dec", 920],
        ["Jan", 1090],
        ["Feb", 1250],
        ["Mar", 1400],
      ]),
      earningsUsd: 1180,
      revenueShare: 0.9,
    }),
  },
  {
    id: "late",
    name: "拉特桑",
    rep: 1300,
    typeKey: "contributors.prestige",
    bio: "链上与公共数据分析师，擅长验证、证据整理和治理信息支持。",
    available: false,
    participationLevel: "observer",
    skills: ["directionSensing", "governanceDecision", "knowledgeProduction", "operationsData"],
    roleAssignments: [
      assignment("trusted-food", "coBuilder", "project", "advising", "2026-02", 69, ["research", "governance"], "协助设计可信食安数据与验证逻辑。"),
      assignment("protocol-crowdsourcing", "reviewer", "project", "paused", "2026-03", 58, ["research", "governance"], "参与纠纷证据链设计。"),
    ],
    contributionAreas: ["research", "governance"],
    collaborationModes: ["online", "shortTerm", "taskDriven"],
    locationId: "cn-guangzhou",
    profile: profile({
      headline: "偏验证、证据和规则支持的数据型协作者。",
      languages: ["中文"],
      focus: "更关注如何让不可见的证据和验证行为进入可信记录。",
      links: links(
        ["website", "Dashboard", "#"],
      ),
      featuredWorks: [
        {
          title: "可信食品安全验证指标",
          summary: "整理了产地、检测与流通验证中需要被记录的关键数据字段。",
          daoId: "trusted-food",
          skillTags: ["knowledgeProduction", "operationsData"],
        },
      ],
      reviews: [
        {
          from: "Sero | 猎人工坊",
          relationship: "治理协作方",
          duration: "2 周",
          highlight: "能让原本模糊的验证过程变成别人可复核的证据结构。",
        },
      ],
      reputationBreakdown: reputationBreakdown([340, 260, 120, 340, 240]),
      reputationHistory: reputationHistory([
        ["Oct", 710],
        ["Nov", 820],
        ["Dec", 940],
        ["Jan", 1080],
        ["Feb", 1200],
        ["Mar", 1300],
      ]),
      earningsUsd: 840,
      revenueShare: 0.7,
    }),
  },
  {
    id: "lena",
    name: "Lena",
    rep: 2250,
    typeKey: "contributors.reputation",
    bio: "视觉设计、品牌系统与信息可视化表达协作者，适合书籍、教育和叙事型项目。",
    available: true,
    participationLevel: "active",
    skills: ["experienceAesthetics", "narrativeExpression", "creativeProduction"],
    roleAssignments: [
      assignment("visual-books", "coBuilder", "dao", "active", "2026-02", 83, ["content", "task"], "负责可视化书籍整体视觉系统。"),
      assignment("healing-jewelry", "coBuilder", "project", "active", "2026-03", 71, ["content", "community"], "参与疗愈珠宝项目的品牌语言与叙事。"),
      assignment("open-university", "coBuilder", "initiative", "advising", "2026-03", 62, ["education", "content"], "协助课程内容可视化表达。"),
    ],
    contributionAreas: ["content", "education", "task"],
    collaborationModes: ["online", "hybrid", "visionDriven", "longTerm"],
    locationId: "de-berlin",
    profile: profile({
      headline: "把复杂概念翻译成直观体验和视觉秩序的设计协作者。",
      languages: ["English", "Deutsch"],
      focus: "希望把设计从装饰层提升到知识组织、教育传播和关系感知层。",
      links: links(
        ["website", "Portfolio", "#"],
        ["linkedin", "LinkedIn", "#"],
      ),
      featuredWorks: [
        {
          title: "可视化书籍叙事系统",
          summary: "建立了页面结构、章节语言和信息可视化节奏。",
          daoId: "visual-books",
          skillTags: ["experienceAesthetics", "creativeProduction"],
        },
        {
          title: "疗愈珠宝品牌骨架",
          summary: "把疗愈、材料与叙事做成统一的视觉识别系统。",
          daoId: "healing-jewelry",
          skillTags: ["experienceAesthetics", "narrativeExpression"],
        },
      ],
      reviews: [
        {
          from: "扎夫",
          relationship: "内容伙伴",
          duration: "3 周",
          highlight: "设计不仅有美感，也能帮项目更清楚地表达自己是谁。",
        },
      ],
      reputationBreakdown: reputationBreakdown([720, 230, 430, 310, 560]),
      reputationHistory: reputationHistory([
        ["Oct", 1080],
        ["Nov", 1320],
        ["Dec", 1570],
        ["Jan", 1810],
        ["Feb", 2050],
        ["Mar", 2250],
      ]),
      earningsUsd: 1740,
      revenueShare: 1.9,
    }),
  },
  {
    id: "anran",
    name: "安然",
    rep: 3660,
    typeKey: "contributors.reputation",
    bio: "社区照护与养老项目协作者，擅长陪伴设计、志愿者组织和社区关系维护。",
    available: true,
    participationLevel: "core",
    skills: ["emotionalCare", "consensusBuilding", "networkWeaving", "careService"],
    roleAssignments: [
      assignment("community-eldercare", "coBuilder", "dao", "active", "2026-01", 91, ["care", "community", "coordination"], "搭建照护协作原型和志愿者协同机制。"),
      assignment("free-living", "host", "initiative", "active", "2026-03", 74, ["care", "community"], "探索共居和照护之间的社区支持结构。"),
      assignment("city-energy-station", "coordinator", "project", "advising", "2026-03", 63, ["coordination", "community"], "为线下空间活动提供主持与关系维护方法。"),
    ],
    contributionAreas: ["care", "community", "coordination"],
    collaborationModes: ["offline", "hybrid", "longTerm", "visionDriven"],
    locationId: "cn-suzhou",
    profile: profile({
      headline: "把照护、陪伴和现实共同体组织起来的长期协作者。",
      languages: ["中文"],
      focus: "最关注如何让照护劳动被记录、被尊重、被制度性承认，而不是永远隐形。",
      links: links(
        ["website", "Community Notes", "#"],
        ["telegram", "Telegram", "#"],
      ),
      featuredWorks: [
        {
          title: "社区养老协作地图",
          summary: "把居民、志愿者、照护节点和日常事务组织成可接力的协作结构。",
          daoId: "community-eldercare",
          skillTags: ["emotionalCare", "consensusBuilding", "careService"],
        },
      ],
      reviews: [
        {
          from: "ifun",
          relationship: "项目运营搭档",
          duration: "1 个月",
          highlight: "非常清楚哪些工作是照护核心，哪些工作可以被结构化协作接住。",
        },
      ],
      reputationBreakdown: reputationBreakdown([860, 520, 940, 470, 870]),
      reputationHistory: reputationHistory([
        ["Oct", 1940],
        ["Nov", 2270],
        ["Dec", 2610],
        ["Jan", 2980],
        ["Feb", 3340],
        ["Mar", 3660],
      ]),
      earningsUsd: 2130,
      revenueShare: 3.1,
    }),
  },
  {
    id: "mori",
    name: "Mori",
    rep: 2980,
    typeKey: "contributors.reputation",
    bio: "开放课程设计者与学习共同体策划者，擅长把知识组织成长期共学结构。",
    available: true,
    participationLevel: "governance",
    skills: ["emotionalCare", "consensusBuilding", "knowledgeProduction", "educationTraining"],
    roleAssignments: [
      assignment("open-university", "initiator", "dao", "active", "2026-01", 88, ["education", "research", "governance"], "发起开放大学的课程与共学机制。"),
      assignment("luboom-reactor", "coBuilder", "initiative", "active", "2026-02", 72, ["research", "education"], "将反应器内容转成课程与共学材料。"),
      assignment("visual-books", "coBuilder", "project", "active", "2026-03", 64, ["education", "content"], "参与书籍化之后的学习路径设计。"),
    ],
    contributionAreas: ["education", "research", "governance"],
    collaborationModes: ["online", "hybrid", "longTerm", "visionDriven"],
    locationId: "jp-tokyo",
    profile: profile({
      headline: "长期共学与知识共同体的组织者。",
      languages: ["中文", "日本語", "English"],
      focus: "想把知识生产从一次性内容变成长期的共学关系和可持续成长路径。",
      links: links(
        ["website", "Learning Lab", "#"],
        ["external", "Notes", "#"],
      ),
      featuredWorks: [
        {
          title: "开放大学共学协议",
          summary: "设计了导师、学习者和共同编辑者之间的长期协作方式。",
          daoId: "open-university",
          skillTags: ["emotionalCare", "consensusBuilding", "educationTraining"],
        },
      ],
      reviews: [
        {
          from: "射手座",
          relationship: "课程翻译伙伴",
          duration: "1 个月",
          highlight: "擅长把抽象研究议题变成别人真能参与进去的学习路径。",
        },
      ],
      reputationBreakdown: reputationBreakdown([620, 540, 510, 430, 880]),
      reputationHistory: reputationHistory([
        ["Oct", 1410],
        ["Nov", 1680],
        ["Dec", 1950],
        ["Jan", 2260],
        ["Feb", 2610],
        ["Mar", 2980],
      ]),
      earningsUsd: 1860,
      revenueShare: 2.4,
    }),
  },
];

export const topContributors: TopContributor[] = contributors
  .slice()
  .sort((a, b) => b.rep - a.rep)
  .slice(0, 3)
  .map(({ id, name, rep, skills }) => ({
    id,
    name,
    rep,
    skills: skills.slice(0, 2),
  }));

export const contributionTimeline: ContributionRecord[] = [
  {
    id: "sero-1",
    contributorId: "sero",
    type: "proposal",
    title: "提交 Luboom 反应器第一版协作协议",
    daoId: "luboom-reactor",
    date: "2026-03-18",
    desc: "将研究、编辑、实践三类角色接口整理成第一版最小可行动协议。",
    status: "已进入执行",
    role: "initiator",
  },
  {
    id: "sero-2",
    contributorId: "sero",
    type: "education",
    title: "发起开放大学首轮主题共学",
    daoId: "open-university",
    date: "2026-03-09",
    desc: "把研究资料整理成课程导引与共学任务。",
    status: "进行中",
    role: "coBuilder",
  },
  {
    id: "ifun-1",
    contributorId: "ifun",
    type: "community",
    title: "完成社区化养老志愿者入组流程",
    daoId: "community-eldercare",
    date: "2026-03-20",
    desc: "把招募、排班和反馈复盘整理成协作模板。",
    status: "已上线",
    role: "host",
  },
  {
    id: "ifun-2",
    contributorId: "ifun",
    type: "task",
    title: "建立开放大学开营运营面板",
    daoId: "open-university",
    date: "2026-03-11",
    desc: "梳理课程开营、报名和成员引导流程。",
    status: "已完成",
    role: "coordinator",
  },
  {
    id: "zafu-1",
    contributorId: "zafu",
    type: "community",
    title: "为随心住项目完成第一轮种子用户沟通",
    daoId: "free-living",
    date: "2026-03-16",
    desc: "整理参与意向、体验预期和对外传播线索。",
    status: "已回收反馈",
    role: "coordinator",
  },
  {
    id: "sagittarius-1",
    contributorId: "sagittarius",
    type: "education",
    title: "交付开放大学双语课程导读",
    daoId: "open-university",
    date: "2026-03-12",
    desc: "完成中英双语版本的导学与讨论问题设计。",
    status: "已发布",
    role: "coBuilder",
  },
  {
    id: "hamzat-1",
    contributorId: "hamzat",
    type: "task",
    title: "完成 Agent 市场首页可交互原型",
    daoId: "agent-market",
    date: "2026-03-17",
    desc: "搭建服务卡片、案例区和接入流程展示。",
    status: "已交付",
    role: "coBuilder",
  },
  {
    id: "hamzat-2",
    contributorId: "hamzat",
    type: "task",
    title: "优化自动化农场演示工作流",
    daoId: "agent-farm",
    date: "2026-03-08",
    desc: "补齐流程状态展示与说明文案。",
    status: "审核中",
    role: "coordinator",
  },
  {
    id: "bbb-1",
    contributorId: "bbb",
    type: "review",
    title: "审阅协议型众包签名与交付逻辑",
    daoId: "protocol-crowdsourcing",
    date: "2026-03-06",
    desc: "围绕任务确认、履约与争议处理做技术审阅。",
    status: "已采纳",
    role: "reviewer",
  },
  {
    id: "v3dant-1",
    contributorId: "v3dant",
    type: "community",
    title: "组织城市能量泵站第一次线下试点活动",
    daoId: "city-energy-station",
    date: "2026-03-14",
    desc: "验证线下节点聚合和活动后的跟进机制。",
    status: "已复盘",
    role: "host",
  },
  {
    id: "tnrdd-1",
    contributorId: "tnrdd",
    type: "task",
    title: "搭建自动化农场控制台演示版",
    daoId: "agent-farm",
    date: "2026-03-13",
    desc: "将流程田块、运行状态与收益结算接成单页原型。",
    status: "已完成",
    role: "coBuilder",
  },
  {
    id: "late-1",
    contributorId: "late",
    type: "review",
    title: "整理可信食安验证证据链",
    daoId: "trusted-food",
    date: "2026-03-05",
    desc: "补齐产地、检测与流通节点的核心验证字段。",
    status: "待进一步验证",
    role: "coBuilder",
  },
  {
    id: "lena-1",
    contributorId: "lena",
    type: "task",
    title: "完成可视化书籍第一章样张",
    daoId: "visual-books",
    date: "2026-03-19",
    desc: "建立章节版式、配色和视觉叙事节奏。",
    status: "已展示",
    role: "coBuilder",
  },
  {
    id: "lena-2",
    contributorId: "lena",
    type: "community",
    title: "定义疗愈珠宝项目的品牌语言",
    daoId: "healing-jewelry",
    date: "2026-03-07",
    desc: "梳理材料、疗愈叙事与社群表达方式。",
    status: "进行中",
    role: "coBuilder",
  },
  {
    id: "anran-1",
    contributorId: "anran",
    type: "community",
    title: "发布社区化养老陪伴者协作机制",
    daoId: "community-eldercare",
    date: "2026-03-21",
    desc: "将照护劳动拆成陪伴、协调、反馈和支持四类角色。",
    status: "已启用",
    role: "coBuilder",
  },
  {
    id: "anran-2",
    contributorId: "anran",
    type: "governance",
    title: "参与随心住共居支持规则讨论",
    daoId: "free-living",
    date: "2026-03-10",
    desc: "围绕共居中的照护责任和公共空间使用提出建议。",
    status: "已记录意见",
    role: "host",
  },
  {
    id: "mori-1",
    contributorId: "mori",
    type: "proposal",
    title: "提交开放大学长期共学节奏提案",
    daoId: "open-university",
    date: "2026-03-15",
    desc: "提出季度主题、导师机制和成果沉淀方式。",
    status: "已通过",
    role: "initiator",
  },
  {
    id: "mori-2",
    contributorId: "mori",
    type: "education",
    title: "设计 Luboom 反应器研究者训练营",
    daoId: "luboom-reactor",
    date: "2026-03-04",
    desc: "让研究贡献者更快理解反应器的工作流和输出标准。",
    status: "筹备中",
    role: "coBuilder",
  },
];

const contributorIndex = new Map(contributors.map((contributor) => [contributor.id, contributor]));

function normalizeIdentity(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "");
}

export function getContributorById(id?: string) {
  if (!id) return contributors[0];

  const direct = contributorIndex.get(id);
  if (direct) return direct;

  const normalized = normalizeIdentity(id);
  return (
    contributors.find((contributor) => normalizeIdentity(contributor.id) === normalized)
    ?? contributors.find((contributor) => normalizeIdentity(contributor.name) === normalized)
    ?? contributors[0]
  );
}

export function getContributorTimeline(contributorId: string) {
  return contributionTimeline.filter((record) => record.contributorId === contributorId);
}

export function getContributorRoles(contributor: Contributor) {
  return Array.from(new Set(contributor.roleAssignments.map((assignmentItem) => assignmentItem.role)));
}

export function getContributorDaoIds(contributor: Contributor) {
  return Array.from(new Set(contributor.roleAssignments.map((assignmentItem) => assignmentItem.daoId)));
}

export function getContributorDaos(contributor: Contributor) {
  const daoIndex = new Map(townHallDAOs.map((dao) => [dao.id, dao]));
  return getContributorDaoIds(contributor)
    .map((daoId) => daoIndex.get(daoId))
    .filter((dao): dao is NonNullable<typeof dao> => Boolean(dao));
}
