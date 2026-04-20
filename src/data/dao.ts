import type { DAO, DAOBrief, DAOProfile } from "@/types";
import { PRESETS } from "./daoPresets";

const profiles: Record<string, DAOProfile> = {
  "luboom-reactor": {
    values: { love: 58, commons: 82, justice: 70, truth: 95, valueCreation: 86, freedom: 72, order: 68 },
    spectrum: { visionVsTask: 28, coreAuthVsBroadGov: 58, longVsShort: 22 },
  },
  "agent-market": {
    values: { love: 42, commons: 66, justice: 61, truth: 78, valueCreation: 94, freedom: 74, order: 64 },
    spectrum: { visionVsTask: 72, coreAuthVsBroadGov: 44, longVsShort: 46 },
  },
  "agent-farm": {
    values: { love: 54, commons: 76, justice: 68, truth: 83, valueCreation: 92, freedom: 58, order: 72 },
    spectrum: { visionVsTask: 66, coreAuthVsBroadGov: 40, longVsShort: 60 },
  },
  "agent-market": {
    values: { love: 42, commons: 66, justice: 61, truth: 78, valueCreation: 94, freedom: 74, order: 64 },
    spectrum: { visionVsTask: 72, coreAuthVsBroadGov: 44, longVsShort: 46 },
  },
  "agent-farm": {
    values: { love: 54, commons: 76, justice: 68, truth: 83, valueCreation: 92, freedom: 58, order: 72 },
    spectrum: { visionVsTask: 66, coreAuthVsBroadGov: 40, longVsShort: 60 },
  },
  "protocol-crowdsourcing": {
    values: { love: 45, commons: 78, justice: 74, truth: 76, valueCreation: 90, freedom: 82, order: 58 },
    spectrum: { visionVsTask: 64, coreAuthVsBroadGov: 62, longVsShort: 52 },
  },
  "trusted-food": {
    values: { love: 74, commons: 88, justice: 90, truth: 91, valueCreation: 80, freedom: 46, order: 84 },
    spectrum: { visionVsTask: 40, coreAuthVsBroadGov: 54, longVsShort: 28 },
  },
  "healing-jewelry": {
    values: { love: 80, commons: 58, justice: 50, truth: 56, valueCreation: 78, freedom: 76, order: 42 },
    spectrum: { visionVsTask: 36, coreAuthVsBroadGov: 48, longVsShort: 30 },
  },
  "community-eldercare": {
    values: { love: 96, commons: 92, justice: 86, truth: 62, valueCreation: 68, freedom: 50, order: 74 },
    spectrum: { visionVsTask: 22, coreAuthVsBroadGov: 68, longVsShort: 14 },
  },
  "open-university": {
    values: { love: 86, commons: 94, justice: 82, truth: 88, valueCreation: 72, freedom: 72, order: 62 },
    spectrum: { visionVsTask: 18, coreAuthVsBroadGov: 70, longVsShort: 18 },
  },
  "city-energy-station": {
    values: { love: 62, commons: 80, justice: 76, truth: 84, valueCreation: 88, freedom: 48, order: 82 },
    spectrum: { visionVsTask: 52, coreAuthVsBroadGov: 46, longVsShort: 36 },
  },
  "free-living": {
    values: { love: 76, commons: 84, justice: 72, truth: 64, valueCreation: 70, freedom: 90, order: 44 },
    spectrum: { visionVsTask: 24, coreAuthVsBroadGov: 64, longVsShort: 24 },
  },
  "visual-books": {
    values: { love: 68, commons: 74, justice: 58, truth: 82, valueCreation: 84, freedom: 78, order: 52 },
    spectrum: { visionVsTask: 34, coreAuthVsBroadGov: 56, longVsShort: 34 },
  },
};

export const townHallDAOs: DAO[] = [
  {
    id: "luboom-reactor",
    nameKey: "townHall.dao.luboomReactor",
    descKey: "townHall.dao.luboomReactorDesc",
    members: 264,
    avatar: "L",
    color: "bg-sky-600",
    catKeys: ["knowledge", "protocol", "research"],
    featured: true,
    profile: profiles["luboom-reactor"],
    projectType: "research",
    mode: "hybrid",
    region: "asia",
    locationId: "cn",
    lifecycle: "incubating",
    foundedDate: "2026-01",
    showcase: {
      stage: {
        zh: "正在搭建第一代反应器：把真知提炼、项目试验与共识沉淀做成一个持续迭代的知识飞轮。",
        en: "Building the first reactor loop: turning distilled insight, live experiments, and shared consensus into a compounding knowledge flywheel.",
      },
      vision: {
        zh: "将分散在个人经验、项目复盘与社会试验中的真知沉淀为可传承、可协作、可继续生成新行动的公共反应器。",
        en: "Distill scattered insight from lived experience, project retrospectives, and social experiments into a public reactor that can be inherited, collaborated on, and turned into new action.",
      },
      consensus: {
        zh: "我们相信真正稀缺的不是信息，而是被验证过、能进入共同实践的真知；知识不该停留在个人脑海，而应沉淀为共同体资产。",
        en: "We believe the scarce resource is not information but validated insight that can enter collective practice; knowledge should not remain locked in individuals but become a commons asset.",
      },
      businessModel: {
        zh: "通过研究会员、专题反应器、知识产品、策划服务与组织共建营收，反哺长期研究与沉淀基础设施。",
        en: "Revenue comes from research memberships, thematic reactors, knowledge products, strategic services, and co-building programs that fund the long-term knowledge infrastructure.",
      },
      collaborationModel: {
        zh: "采用研究者 + 编辑者 + 实践者的协作结构，以主题反应器为单位持续收集、验证、编排与发布洞见。",
        en: "It runs through a researcher-editor-practitioner structure, with themed reactors continuously collecting, validating, composing, and publishing insight.",
      },
      participation: {
        zh: "适合研究者、写作者、策展人、教育者、产品人和长期关注社会协作的人作为共建者、供稿者或主题发起人加入。",
        en: "It welcomes researchers, writers, curators, educators, product builders, and long-horizon social collaborators as co-builders, contributors, or thematic initiators.",
      },
    },
  },
  {
    id: "agent-market",
    nameKey: "townHall.dao.agentMarket",
    descKey: "townHall.dao.agentMarketDesc",
    members: 198,
    avatar: "A",
    color: "bg-indigo-600",
    catKeys: ["agent", "marketplace", "service"],
    featured: true,
    profile: profiles["agent-market"],
    projectType: "toolsProduct",
    mode: "online",
    region: "global",
    lifecycle: "incubating",
    foundedDate: "2026-02",
    preset: "protocol",
    modules: PRESETS.protocol.modules,
    showcase: {
      stage: {
        zh: "正在定义 agent 的上架标准、交易界面、服务评价与可信交付流程。",
        en: "Defining listing standards, transaction UX, service reviews, and trusted delivery flows for agents.",
      },
      vision: {
        zh: "打造一个让个人、团队与组织可以发现、比较、组合并持续雇用 agent 能力的开放市场。",
        en: "Create an open market where individuals, teams, and organizations can discover, compare, compose, and continuously employ agent capabilities.",
      },
      consensus: {
        zh: "agent 不应该只是技术玩具，而应成为可被组织、可被评价、可被长期协作调用的新型生产力单元。",
        en: "Agents should not remain technical toys; they should become organized, reviewable, and reusable productivity units in long-term collaboration.",
      },
      businessModel: {
        zh: "以成交抽成、订阅工具位、认证服务与企业级接入费形成收入，同时沉淀优质 agent 生态与服务标准。",
        en: "Revenue comes from transaction fees, subscription placement, verification services, and enterprise onboarding while building a high-quality agent ecosystem and service standard.",
      },
      collaborationModel: {
        zh: "市场运营者、agent 开发者、场景策划者与客户共同参与，围绕模板、评价、交付与持续优化形成闭环。",
        en: "Operators, agent builders, scenario designers, and clients co-create the loop around templates, reviews, delivery, and continuous optimization.",
      },
      participation: {
        zh: "适合 agent 开发者、服务整合者、交付经理、产品策划和首批行业合作方加入。",
        en: "It is suited for agent builders, service integrators, delivery managers, product strategists, and early industry partners.",
      },
    },
  },
  {
    id: "agent-farm",
    nameKey: "townHall.dao.agentFarm",
    descKey: "townHall.dao.agentFarmDesc",
    members: 144,
    avatar: "F",
    color: "bg-emerald-600",
    catKeys: ["automation", "ops", "production"],
    featured: false,
    profile: profiles["agent-farm"],
    projectType: "ecoAgriculture",
    mode: "hybrid",
    region: "asia",
    locationId: "cn",
    lifecycle: "incubating",
    foundedDate: "2026-02",
    showcase: {
      stage: {
        zh: "正在从几个高频重复场景开始，把任务拆解、工作流编排和收益结算做成自动化农场样板。",
        en: "Starting from a few high-frequency scenarios to turn task decomposition, workflow orchestration, and payout settlement into a repeatable automation farm model.",
      },
      vision: {
        zh: "把大量重复性、流程性和策略性的数字劳动组织成可耕作、可扩容、可分润的自动化农场。",
        en: "Organize repetitive, process-heavy, and strategy-driven digital labor into automation farms that can be cultivated, scaled, and shared in value.",
      },
      consensus: {
        zh: "自动化的价值不应只归平台所有，参与设计、维护、训练与运营的人都应分享到收益和治理权。",
        en: "The value of automation should not accrue only to the platform; people who design, maintain, train, and operate it should share in rewards and governance.",
      },
      businessModel: {
        zh: "通过自动化服务费、行业解决方案、托管运营与流程收益分成实现营收。",
        en: "Revenue comes from automation service fees, industry solutions, managed operations, and revenue sharing from process output.",
      },
      collaborationModel: {
        zh: "由流程架构师、场景专家、训练维护者和结算协调者共同维护多个自动化田块。",
        en: "Multiple automation plots are maintained by workflow architects, domain experts, trainers, maintainers, and settlement coordinators.",
      },
      participation: {
        zh: "适合流程设计者、数据整理者、行业专家、自动化运维者和渠道合作方加入。",
        en: "It welcomes workflow designers, data curators, domain experts, automation operators, and channel partners.",
      },
    },
  },
  {
    id: "protocol-crowdsourcing",
    nameKey: "townHall.dao.protocolCrowdsourcing",
    descKey: "townHall.dao.protocolCrowdsourcingDesc",
    members: 236,
    avatar: "C",
    color: "bg-violet-600",
    catKeys: ["protocol", "labor", "platform"],
    featured: false,
    profile: profiles["protocol-crowdsourcing"],
    projectType: "toolsProduct",
    mode: "online",
    region: "global",
    lifecycle: "active",
    foundedDate: "2025-12",
    showcase: {
      stage: {
        zh: "正在完善任务协议、信誉入档、纠纷处理和长期协作者激励规则。",
        en: "Refining task protocols, reputation logging, dispute handling, and long-term contributor incentives.",
      },
      vision: {
        zh: "把众包从临时接单平台升级为协议化协作网络，让任务、规则、结算和声誉都能在公共协议中运转。",
        en: "Upgrade crowdsourcing from a one-off gig platform into a protocol-based collaboration network where tasks, rules, settlement, and reputation operate through a shared protocol.",
      },
      consensus: {
        zh: "众包不应建立在廉价、不可迁移和不被承认的劳动上，而应让贡献进入长期信用与组织成长体系。",
        en: "Crowdsourcing should not rely on cheap, non-portable, unrecognized labor; contribution should feed into long-term credit and organizational growth.",
      },
      businessModel: {
        zh: "以协议服务费、企业接入、履约保障、评分认证与高质量任务市场形成收入。",
        en: "Revenue comes from protocol service fees, enterprise access, fulfillment guarantees, reputation certification, and premium task markets.",
      },
      collaborationModel: {
        zh: "发起方发布协议化任务，协作者按角色进入，评审者和协调者共同完成交付、评价和纠纷处理。",
        en: "Initiators publish protocolized tasks, contributors join by role, and reviewers plus coordinators complete delivery, evaluation, and dispute resolution.",
      },
      participation: {
        zh: "适合平台设计者、任务发起方、自由协作者、审核者与合作机构加入。",
        en: "It fits platform designers, task initiators, independent collaborators, reviewers, and institutional partners.",
      },
    },
  },
  {
    id: "trusted-food",
    nameKey: "townHall.dao.trustedFood",
    descKey: "townHall.dao.trustedFoodDesc",
    members: 318,
    avatar: "T",
    color: "bg-green-700",
    catKeys: ["food", "trust", "infrastructure"],
    featured: true,
    profile: profiles["trusted-food"],
    projectType: "infrastructure",
    mode: "hybrid",
    region: "asia",
    locationId: "cn",
    lifecycle: "incubating",
    foundedDate: "2026-01",
    showcase: {
      stage: {
        zh: "正在围绕产地节点、检测流程、可信记录与消费者验证入口设计最小可行架构。",
        en: "Designing the minimum viable architecture across origin nodes, testing flows, trusted records, and consumer verification touchpoints.",
      },
      vision: {
        zh: "重建食品安全中的信任基础设施，让生产、检测、流通与消费环节能形成可验证、可追责、可协作的公共网络。",
        en: "Rebuild trust infrastructure for food safety so production, testing, circulation, and consumption can form a verifiable, accountable, collaborative public network.",
      },
      consensus: {
        zh: "食品安全不该完全依赖单点机构和黑箱背书，而应让多方节点共同维护可信记录与公共责任。",
        en: "Food safety should not depend solely on single institutions and black-box endorsements; multiple nodes should co-maintain trusted records and public accountability.",
      },
      businessModel: {
        zh: "通过节点接入费、检测服务、品牌认证、供应链协作 SaaS 和消费者可信验证服务形成收入。",
        en: "Revenue comes from node onboarding, testing services, brand certification, supply-chain collaboration SaaS, and consumer verification services.",
      },
      collaborationModel: {
        zh: "生产者、检测方、物流节点、门店、消费者与社区监督者共同接入，形成一个分布式的可信食品网络。",
        en: "Producers, labs, logistics nodes, stores, consumers, and community stewards participate together to form a distributed trusted food network.",
      },
      participation: {
        zh: "适合农业基地、检测机构、供应链团队、社区组织、产品设计者与公共议题研究者加入。",
        en: "It welcomes farms, testing labs, supply-chain teams, community organizations, product designers, and public-interest researchers.",
      },
    },
  },
  {
    id: "healing-jewelry",
    nameKey: "townHall.dao.healingJewelry",
    descKey: "townHall.dao.healingJewelryDesc",
    members: 112,
    avatar: "J",
    color: "bg-rose-600",
    catKeys: ["lifestyle", "healing", "brand"],
    featured: false,
    profile: profiles["healing-jewelry"],
    projectType: "cultureArt",
    mode: "hybrid",
    region: "asia",
    locationId: "cn",
    lifecycle: "incubating",
    foundedDate: "2026-03",
    preset: "lite",
    modules: PRESETS.lite.modules,
    showcase: {
      stage: {
        zh: "正在测试首批产品线、叙事方法、线下体验和社群共创路径。",
        en: "Testing the first product line, storytelling method, offline experiences, and community co-creation paths.",
      },
      vision: {
        zh: "把珠宝从单纯消费品转化为身心疗愈、空间仪式与生活方式表达的媒介，并建立围绕它的长期社区。",
        en: "Turn jewelry from a pure consumer object into a medium for healing, ritual, and lifestyle expression, while building a long-term community around it.",
      },
      consensus: {
        zh: "疗愈不是神秘口号，而是人与材料、叙事、仪式和关系重新建立连接的过程。",
        en: "Healing is not a mystical slogan but a process of reconnecting people with materials, narratives, rituals, and relationships.",
      },
      businessModel: {
        zh: "通过产品销售、定制设计、线下体验、内容会员与品牌合作形成多层收入结构。",
        en: "A multi-layered model built on product sales, custom design, offline experiences, content memberships, and brand collaborations.",
      },
      collaborationModel: {
        zh: "设计师、疗愈实践者、内容创作者、空间主理人与社群共创者共同推进品牌和产品演化。",
        en: "Designers, healing practitioners, creators, space hosts, and community co-builders evolve the brand and products together.",
      },
      participation: {
        zh: "适合设计师、材料研究者、内容创作者、空间策划人和线下社群组织者加入。",
        en: "It is open to designers, material researchers, creators, spatial curators, and offline community organizers.",
      },
    },
  },
  {
    id: "community-eldercare",
    nameKey: "townHall.dao.communityEldercare",
    descKey: "townHall.dao.communityEldercareDesc",
    members: 286,
    avatar: "E",
    color: "bg-amber-600",
    catKeys: ["care", "community", "aging"],
    featured: true,
    profile: profiles["community-eldercare"],
    projectType: "healthCare",
    mode: "offline",
    region: "asia",
    locationId: "cn-suzhou",
    lifecycle: "incubating",
    foundedDate: "2026-01",
    preset: "care",
    modules: PRESETS.care.modules,
    showcase: {
      stage: {
        zh: "正在搭建以社区节点为基础的照护网络模型，梳理服务包、协作者角色与持续运营机制。",
        en: "Building a neighborhood-based care network model, defining service packages, collaborator roles, and long-term operations.",
      },
      vision: {
        zh: "让养老从家庭独自承担和机构单点承接，转向社区共建、邻里支持与多角色协同的照护共同体。",
        en: "Shift eldercare away from isolated family burden and single-institution delivery toward neighborhood co-building and multi-role care communities.",
      },
      consensus: {
        zh: "养老首先是关系工程与社区工程，不只是服务采购；照护劳动必须被看见、被组织、被正当回报。",
        en: "Eldercare is first a relationship and community project, not just a purchased service; care work must be seen, organized, and fairly rewarded.",
      },
      businessModel: {
        zh: "通过会员制服务、社区照护包、合作机构项目、培训认证和公共资源共建形成可持续收入。",
        en: "Sustainable revenue comes from memberships, care packages, institutional partnerships, training and certification, and co-built public resources.",
      },
      collaborationModel: {
        zh: "家庭成员、社区主理人、护理者、志愿者、健康协作者与在地空间共同形成弹性照护网络。",
        en: "Families, community hosts, caregivers, volunteers, health collaborators, and local spaces form a flexible care network together.",
      },
      participation: {
        zh: "适合社区组织者、护理人员、社工、健康从业者、空间节点与志愿者加入。",
        en: "It is ideal for community organizers, caregivers, social workers, health practitioners, spatial nodes, and volunteers.",
      },
    },
  },
  {
    id: "open-university",
    nameKey: "townHall.dao.openUniversity",
    descKey: "townHall.dao.openUniversityDesc",
    members: 342,
    avatar: "U",
    color: "bg-blue-700",
    catKeys: ["education", "learning", "commons"],
    featured: true,
    profile: profiles["open-university"],
    projectType: "education",
    mode: "hybrid",
    region: "global",
    lifecycle: "active",
    foundedDate: "2025-11",
    preset: "study",
    modules: PRESETS.study.modules,
    showcase: {
      stage: {
        zh: "正在形成第一批课程、共学节点、导师网络与开放学位叙事框架。",
        en: "Shaping the first learning paths, study circles, mentor network, and narrative for open credentials.",
      },
      vision: {
        zh: "建设一个以共学、问题导向、真实项目和跨学科成长为核心的开放大学共同体。",
        en: "Build an open university community centered on co-learning, problem-led education, real projects, and cross-disciplinary growth.",
      },
      consensus: {
        zh: "教育不应只是一纸学历和标准化筛选，而应成为人们持续生成能力、关系与使命感的共同体过程。",
        en: "Education should not be reduced to credentials and standardized filtering; it should be a communal process for generating capability, relationships, and purpose.",
      },
      businessModel: {
        zh: "通过学习会员、课程计划、导师陪伴、共学营、认证服务与组织合作项目形成收入。",
        en: "Revenue is built from memberships, cohort programs, mentor support, study camps, credentialing, and organization-based learning partnerships.",
      },
      collaborationModel: {
        zh: "学习者、导师、研究者、策展人和项目发起人共同组织课程、议题、实践与知识沉淀。",
        en: "Learners, mentors, researchers, curators, and initiators co-organize curricula, themes, practice, and knowledge capture.",
      },
      participation: {
        zh: "适合学习者、导师、课程设计者、研究者、教育创业者与地方共学节点加入。",
        en: "It welcomes learners, mentors, curriculum designers, researchers, edu-builders, and local study nodes.",
      },
    },
  },
  {
    id: "city-energy-station",
    nameKey: "townHall.dao.cityEnergyStation",
    descKey: "townHall.dao.cityEnergyStationDesc",
    members: 124,
    avatar: "P",
    color: "bg-cyan-700",
    catKeys: ["city", "infrastructure", "space"],
    featured: false,
    profile: profiles["city-energy-station"],
    projectType: "infrastructure",
    mode: "offline",
    region: "asia",
    locationId: "cn",
    lifecycle: "incubating",
    foundedDate: "2026-03",
    showcase: {
      stage: {
        zh: "正在定义泵站的空间功能、节点运营模型与城市协作接口。",
        en: "Defining the spatial functions, node operations, and city collaboration interfaces for the station model.",
      },
      vision: {
        zh: "在城市中建设能够为个体、社群和项目持续补充连接、资源、活动与行动能量的泵站网络。",
        en: "Build a network of urban stations that continuously replenish connection, resources, events, and action energy for people, communities, and projects.",
      },
      consensus: {
        zh: "城市不缺空间本身，缺的是能够让关系重新流动、协作重新生成的公共能量节点。",
        en: "Cities do not lack space itself; they lack public energy nodes where relationships can flow again and collaboration can regenerate.",
      },
      businessModel: {
        zh: "通过空间会员、活动服务、品牌合作、城市项目共建和节点运营授权形成收入。",
        en: "Revenue comes from memberships, event services, brand partnerships, co-built city programs, and node operation licensing.",
      },
      collaborationModel: {
        zh: "由空间运营者、社区策展人、议题发起人、城市伙伴与在地志愿者共同维护节点活力。",
        en: "Node vitality is maintained by space operators, community curators, thematic initiators, city partners, and local volunteers.",
      },
      participation: {
        zh: "适合空间主理人、社区策展者、城市研究者、活动组织者与地方协作伙伴加入。",
        en: "It suits space hosts, community curators, urban researchers, event organizers, and local collaboration partners.",
      },
    },
  },
  {
    id: "free-living",
    nameKey: "townHall.dao.freeLiving",
    descKey: "townHall.dao.freeLivingDesc",
    members: 174,
    avatar: "S",
    color: "bg-fuchsia-600",
    catKeys: ["living", "community", "housing"],
    featured: false,
    profile: profiles["free-living"],
    projectType: "localSpace",
    mode: "hybrid",
    region: "asia",
    locationId: "cn",
    lifecycle: "incubating",
    foundedDate: "2026-02",
    showcase: {
      stage: {
        zh: "正在梳理居住节点、短住长住规则、住户协作机制与空间服务体系。",
        en: "Structuring living nodes, short and long stay rules, resident collaboration mechanisms, and service systems.",
      },
      vision: {
        zh: "让人们能在不同城市和社区中以更自由、更低摩擦、更具关系感的方式流动与居住。",
        en: "Enable people to move and live across cities and communities with more freedom, lower friction, and stronger relational belonging.",
      },
      consensus: {
        zh: "居住不应只是房屋交易，而应是一种关系组织、生活方式和共同体支持网络。",
        en: "Living should not be reduced to housing transactions; it is a way of organizing relationships, lifestyle, and communal support.",
      },
      businessModel: {
        zh: "通过会员网络、短住长住服务费、空间合作、城市节点运营和社群活动形成收入。",
        en: "Revenue is generated through membership networks, stay services, space partnerships, city node operations, and community programming.",
      },
      collaborationModel: {
        zh: "由住户、空间节点、在地接待者、生活服务协作者和社区运营者共同组成柔性居住网络。",
        en: "Residents, space nodes, local hosts, lifestyle service collaborators, and operators form a flexible living network together.",
      },
      participation: {
        zh: "适合空间提供者、城市节点主理人、服务协作者、共居实验者和长期流动工作者加入。",
        en: "It welcomes space providers, city node hosts, service collaborators, co-living experimenters, and long-term mobile workers.",
      },
    },
  },
  {
    id: "visual-books",
    nameKey: "townHall.dao.visualBooks",
    descKey: "townHall.dao.visualBooksDesc",
    members: 152,
    avatar: "V",
    color: "bg-purple-600",
    catKeys: ["publishing", "design", "education"],
    featured: false,
    profile: profiles["visual-books"],
    projectType: "mediaContent",
    mode: "hybrid",
    region: "global",
    lifecycle: "active",
    foundedDate: "2025-10",
    showcase: {
      stage: {
        zh: "正在推进首批选题试制，把知识表达、视觉编辑和出版协作沉淀为标准流程。",
        en: "Moving the first titles into production while standardizing knowledge expression, visual editing, and publishing collaboration.",
      },
      vision: {
        zh: "把复杂知识、社会议题与跨学科内容转化为更具感受力、结构感和传播力的可视化书籍。",
        en: "Transform complex knowledge, social issues, and cross-disciplinary content into visual books with stronger readability, structure, and transmission power.",
      },
      consensus: {
        zh: "知识传播不该只依赖长文本和学术门槛，好的表达形式本身就是公共教育的一部分。",
        en: "Knowledge transmission should not depend only on long-form text and academic thresholds; expressive formats are themselves part of public education.",
      },
      businessModel: {
        zh: "通过图书销售、定制出版、课程衍生、版权合作和知识视觉化服务形成收入。",
        en: "Revenue comes from book sales, custom publishing, educational extensions, rights partnerships, and knowledge visualization services.",
      },
      collaborationModel: {
        zh: "作者、编辑、视觉设计师、研究者和传播者围绕选题共同生产高质量内容产品。",
        en: "Authors, editors, visual designers, researchers, and communicators co-produce high-quality content products around each title.",
      },
      participation: {
        zh: "适合作者、编辑、设计师、研究者、出版人和课程策划者加入。",
        en: "It is suited for authors, editors, designers, researchers, publishers, and curriculum strategists.",
      },
    },
  },
];

export const myDAOs: DAOBrief[] = townHallDAOs.map((dao) => ({
  id: dao.id,
  nameKey: dao.nameKey,
  avatar: dao.avatar ?? dao.id.charAt(0).toUpperCase(),
  color: dao.color ?? "bg-slate-500",
  profile: dao.profile,
  lifecycle: dao.lifecycle,
  relation: dao.relation,
}));

export function findDAOById(id: string): DAO | undefined {
  return townHallDAOs.find((dao) => dao.id === id);
}

export function getDAOLineage(id: string): { parent?: DAO; current: DAO; children: DAO[] } | undefined {
  const current = findDAOById(id);
  if (!current) return undefined;
  const parent = current.originId ? findDAOById(current.originId) : undefined;
  const children = townHallDAOs.filter((dao) => dao.originId === id);
  return { parent, current, children };
}
