import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState, useCallback } from "react";

interface Section {
  id: string;
  title: string;
  content: string[];
}

const sections: Section[] = [
  {
    id: "abstract",
    title: "执行摘要",
    content: [
      "这个世界并不缺少效率工具。缺少的，是一种让人与人之间的协作关系不再被岗位、组织边界和雇佣合同所垄断的基础设施。",
      "huma dao 的出发点，不是把传统公司搬到线上，也不是把 DAO 理想化为一切组织问题的终极答案。它所回应的是一个更深的时代命题：当 AI、agent、自动化工作流和知识库持续吸收旧有的技能、岗位与流程之后，人类将围绕什么继续形成协作、治理、分配与共同体。",
      "我们的回答是：人类将围绕共识继续协作。不是强制的统一思想，而是在差异中形成的最小可行动协议。不是所有人都参与所有治理，而是在需要时，任何人都有权参与关乎自身的决策。不是用 DAO 替代公司，而是为公司之外、公司之间、以及无数自由协作节点之间，提供一层可治理、可记录、可分配的网络。",
      "huma dao，是 AI / Agent 时代的人类共识协作与治理层。",
    ],
  },
  {
    id: "core-judgments",
    title: "八个核心判断",
    content: [
      "第一，AI / agent 冲击的不只是具体岗位，更是在重写知识、技能、流程与组织的边界。",
      "第二，生产力革命正在走向知识平权和能力模块化，这为人类社会的协作重组提供了物质基础。",
      "第三，人类独有的价值正在从执行标准化流程转向赋予方向、形成承认、承担后果、进行照护、共同生活。",
      "第四，未来协作的重心将从岗位协作转向使命协作，从单一组织优化转向跨组织网络协作。",
      "第五，huma dao 不是替代公司，而是补足公司之外、之间、之上的协作空间。",
      "第六，未来组织不应被设计成单一固定容器，而应被设计成可分化、可继承、可再协作的海星式谱系网络。",
      "第七，DAO 不应被狭义理解为链上投票工具，而应被理解为一种面向未来协作社会的组织语法。",
      "第八，衡量 huma dao 的标准，不在概念是否动人，而在于它是否帮助现实世界中的人和事形成更有效、更可治理、更可分配的协作。",
    ],
  },
  {
    id: "part1",
    title: "第一编 底层哲学：我们相信的世界",
    content: [
      "§ 一、人的本质是关系，不是孤岛",
      "一切关于组织、协作和治理的讨论，最终都要回到一个根本问题：人是什么。",
      "人不是原子化的理性经济人，不是等待被管理的生产要素，也不是平台算法中的一个数据节点。人是关系的存在。人在关系中诞生，在关系中成长，在关系中定义自己是谁、可以成为什么。离开了与他人的连接，人既无法认识自身，也无法创造意义。",
      "这意味着，任何组织形式的设计，首先要回答的不是如何提升效率，而是如何让人与人之间的关系变得更正当、更可持续、更有尊严。一个把人仅仅当作执行单元来编排的系统，无论技术多先进，都在背离人的本质。",
      "§ 二、劳动的本来面目：创造，而非谋生",
      "在漫长的历史中，劳动被窄化为一件不得不做的事情。人们为了生存而劳动，为了薪酬而工作，为了考核而完成指标。劳动的意义被外在化了，它变成了一种交换筹码，而不是人表达自身、参与世界、创造价值的内在需要。",
      "但劳动的本来面目并非如此。人天然地需要创造。一个孩子在沙滩上堆城堡，没有人给他发工资；一个程序员在深夜写开源代码，没有人给他发绩效；一个母亲日复一日地照护家人，这份劳动甚至不被经济系统承认为劳动。然而这些行为中蕴含着人最深的驱动力：把自己内在的东西带到世界上来，让世界因为自己的存在而有所不同。",
      "当生产力发展到足够高的水平，当人类不再需要用全部时间换取基本生存，劳动就有可能回到它的本来面目：不是谋生的手段，而是人的第一需要。人们将因为热爱而创造，因为使命而协作，因为关怀而照护。而一个真正先进的协作系统，应当为这种劳动形态的回归提供制度支撑。",
      "§ 三、共有、共治、共创：我们相信的文明形态",
      "所谓共有，不是否定个体劳动的差异和贡献的不同，而是相信生产力发展的成果不应被少数人垄断。知识应当是公共的，工具应当是可及的，技术红利应当转化为全体人的能力提升，而不只是资本的收益增厚。当 AI 把知识变成知识库、把技能变成 skills、把流程变成 workflow，这些本身就是人类文明共同积累的成果，它们理应惠及所有人。",
      "所谓共治，不是要求所有人对所有事情都投票表决，而是相信每一个人都不应是自己所在世界的旁观者。大众不是 NPC。人有权参与关乎自身生活的决策，有权知晓资源如何被分配，有权对不正当的权力说不。治理不是少数管理者的特权，而是人作为共同体成员的基本能力和基本权利。",
      "所谓共创，不是否定分工和专业化，而是相信每一个人的创造力都值得被释放。一个好的系统不是把人压缩进预定义的岗位，而是让人以自己的方式、自己的节奏、自己的能力参与到值得做的事情中去。贡献应该被看见，劳动应该被承认，价值应该被正当分配。",
      "这三者合在一起，构成了一种文明理想：在这种文明中，人不再是组织的附庸，组织是人的延伸；劳动不再是被迫的交换，而是自由的创造；治理不再是自上而下的控制，而是共同生活的协商。",
      "§ 四、DAO 作为理想国的最小单元",
      "如果我们接受这样的文明理想，那么问题就变成了：这个理想如何落地？",
      "我们的回答是 DAO——不是狭义的链上投票工具，而是一种组织语法：一群人围绕共同的目标和规则，形成可协作、可治理、可演化的共同体。",
      "在这个意义上，DAO 是理想国的最小单元。它不需要领土，不需要血统，不需要暴力机器。它只需要共识：一群人认同某些原则、愿意遵守某些规则、愿意为某些目标共同承担后果。这种共同体可以很小，小到几个人围绕一个开源项目协作；也可以很大，大到跨越国界、语言和文化，围绕一个人类议题形成持续的治理网络。",
      "我们不认为 DAO 会取代国家，也不认为它应该取代国家。但我们相信，当越来越多的人能够围绕共识自由组建治理共同体，人类社会就多了一种不依赖强制的组织方式。这个世界允许一切理念和共识百花齐放——这本身就是自由的含义。",
    ],
  },
  {
    id: "part2",
    title: "第二编 时代判断：生产力革命之后的人类问题",
    content: [
      "§ 一、一场不只是提效的革命",
      "AI、agent、知识库和自动化工作流的兴起，不只是让人们更快完成旧工作。它正在将过去由人类长期内化的知识、技能与流程，逐步拆解为可复用的模块、可训练的策略、可调用的接口和可复制的执行链。曾经以岗位形式存在的能力，正在被外化为 skills、workflow、playbook 和 agent 协同系统。",
      "这意味着，生产力革命的核心并不只是某个岗位消失或新增，而是整个社会的价值创造方式正在被重构：知识不再被少数人垄断，技能不再是不可复制的个人资产，流程不再必须依附于组织内部的层级分工。我们正在走向一个知识平权、能力模块化、生产力大爆发的时代。",
      "§ 二、公司制仍然有效，但边界正在显现",
      "现代公司与集团金字塔并不是错误制度。对于目标明确、时效要求高、责任链清晰、需要统一调度的大规模协作，中央集权、角色分工和命令链依然是极其高效的组织形式。",
      "但公司制也有清晰边界。它擅长组织既定目标的内部执行，却不擅长承载跨组织协作、开放式贡献、非标准劳动的承认、长期共同体关系，以及那些既需要公共性又需要执行力的复杂协作空间。随着生产力革命推进，这些边界外的协作关系会越来越重要。",
      "§ 三、生产力与生产关系的矛盾正在激化",
      "每一次重大的生产力革命，都会引发生产关系的重组。蒸汽机催生了工厂制和产业工人阶级；电力和流水线催生了科层制企业和白领阶层；互联网催生了平台经济和零工劳动。每一次，旧的组织形式都无法完全容纳新的生产力，于是新的组织关系在矛盾中诞生。",
      "今天的 AI / agent 革命，正在制造同样的矛盾。一方面，生产力前所未有地被释放——一个人借助 AI 和 agent 可以完成过去一个小团队才能完成的工作。另一方面，现有的组织形式、分配制度和治理机制，仍然建立在工业时代的假设之上：人必须进入雇佣关系才能进入生产网络，贡献只有通过劳动合同才能被承认，价值只有通过工资才能被分配。",
      "这个矛盾的结果是：生产力在爆发，但大量有能力、有创造力的人找不到正当的协作入口；技术红利在增长，但分配渠道仍然高度集中；组织形式在老化，但新的替代方案尚未成形。",
      "§ 四、被忽视的危机：意义感的丧失与劳动的异化",
      "生产力革命带来的不只是效率问题，还有一个更深层的人的问题。",
      "当越来越多的工作被自动化吸收，当人的劳动不断被评估、量化、外包和替代，很多人正在经历一种深层的意义危机：我的工作到底有什么价值？我是不是随时可以被替换？我在这个组织中到底算什么？这种危机不只是经济问题，更是存在问题。人需要感到自己的劳动是有意义的、被需要的、被承认的。",
      "同样值得关注的是劳动的异化。在当前的协作体系中，大量真正重要的劳动——照护、教育、社区维护、调解、陪伴、文化传承——长期被低估甚至不被记录。这些劳动不容易量化，不容易商品化，却是人类共同体得以存续的基础。任何面向未来的协作系统，如果不能承认这些劳动的价值，就只是在用新技术复制旧的不公。",
      "§ 五、自动化之后如何共同生活",
      "如果知识、技能和流程不断被自动化吸收，那么人类面临的核心问题将不再只是如何保住岗位，而是：什么样的事情仍然值得由人共同决定；什么样的关系必须由人来维系；什么样的价值不能被完全平台化和商品化；技术红利应该如何被正当地分配。",
      "因此，下一阶段真正重要的，不是再发明一个更炫的效率工具，而是重新设计人与人、人与组织、人与 agent 之间的协作关系。生产力爆发之后，我们的社会需要更好的治理工具和协作工具去承接这样的世界。",
      "§ 六、人类独有的是什么",
      "如果 AI 能吸收越来越多标准化知识工作，那么人类的独特性就不能再简单理解为比机器更会做事。人类更深的独特性，在于人的处境性、脆弱性和关系性：人会爱、会痛、会失去、会在乎，因而也会真正为正义、体面、伤害与幸福赋予含义。",
      "人类还拥有意义赋予的能力。AI 擅长在既定目标下优化，但它不天然知道什么值得做、什么值得珍惜、什么不能交换、什么样的未来值得被追求。方向的设定、边界的划定、后果的承担，仍然属于人的领域。",
      "人类协作中不可替代的部分包括：提出值得解决的问题，而不仅是优化既有目标；形成彼此承认的关系，让责任、信任、声誉和合法性得以成立；共同承担后果，因为技术和制度最终作用于人的生活；在照护、教育、调解、陪伴与文化维系中保持人的在场；围绕公共问题组织共同体，而不是把一切压缩成交易和任务。",
      "§ 七、新共识的六条主线",
      "未来社会真正需要重新组织起来的，不再只是如何更有效率地工作，而是围绕以下六条主线形成新的公共共识：",
      "方向共识——生产力优先用于什么，什么样的增长值得追求。让人围绕值得投入的使命聚合，而不只围绕短期利润聚合。",
      "分配共识——AI 增值如何在平台、资本、组织、贡献者与社会之间分配。让收益、权力、声誉与责任形成可讨论的制度安排。",
      "边界共识——哪些领域不能彻底商品化，哪些关系要保留公共性与人类在场。为技术效率设置公共边界，防止一切都被平台化。",
      "时间共识——释放出的时间是走向空虚，还是走向学习、创造、照护与公共参与。把自由时间转化为学习、创造与公共生活。",
      "承认共识——哪些难量化但重要的劳动仍应被承认、记录与分配。把非标准劳动纳入可记录、可评价、可分配的体系。",
      "好生活共识——未来追求的是更强机器，还是更成熟的公共生活与共同体。让组织服务于人的发展，而不是让人仅服从组织。",
    ],
  },
  {
    id: "part3",
    title: "第三编 组织理论：为什么要这样做",
    content: [
      "§ 一、从岗位-公司制走向角色-网络制",
      "工业时代的主导逻辑，是以公司为基本单元、以岗位为主要分工方式、以雇佣关系为参与入口、以层级管理为协调机制、以工资为主要分配形式。它解决了大规模工业生产与标准化服务的问题，因此在近代社会中极其成功。",
      "但在 AI / agent 时代，更有可能出现的是另一种逻辑：组织网络成为基本单元，角色成为主要分工方式，任务、项目与提案成为运行节点，协作协议与共同体规则成为参与入口，多元激励和可迁移信誉成为价值分配的新结构。",
      "这并不意味着公司会消失，而是意味着人类社会的组织谱系会更加丰富：公司仍然存在，但其外部、之间和之上的协作网络会变得更加重要。",
      "§ 二、不是替代公司，而是补足公司之外的协作空间",
      "huma dao 的现实价值，不在于替代一切企业、否定一切中心，或把所有组织都改造成全员投票的 DAO。真正成熟的判断是：不同问题需要不同组织形态。",
      "huma dao 的现实定位：不是公司的替代品，而是公司之外、之间、之上的协作基础设施。不是否定中心，而是让中心不再垄断一切协作入口、贡献记录与价值分配。不是把所有问题都推向共同治理，而是为不同问题配置不同层级的决策与协作方式。不是自我感动式组织想象，而是要提升现实世界中的协作能力与生产能力。",
      "§ 三、从统一共识到最小共识",
      "过去对 DAO 的直觉，容易把共识理解成统一思想、共同投票、价值观高度一致。但现实中，统一共识是一件成本极高、耗时极长、且常常不真实的事情。很多组织不是死于没有理想，而是死于前期过度追求先统一，最终在长时间讨论中耗散了行动力。",
      "因此，huma dao 所主张的共识，不是所有人观点一致，而是：在差异仍然存在的前提下，人们对某些事实、目标、规则和后果形成足够的共同承认，从而使持续协作成为可能。",
      "我们称之为最小可行动协议。它至少包含四个部分：共同目标——这一次我们到底要一起完成什么；角色接口——谁负责什么，谁与谁交接，谁拥有哪类权限与资源；结算规则——贡献怎么记，收益怎么分，信誉怎么积累；分歧出口——谈不拢怎么办，谁来仲裁，如何退出，是否允许分叉。",
      "这样一来，组织的起点就不再是先统一世界观，而是先建立一套足够小、足够清晰的协作协议，让行动先发生，再在行动中形成更深的认同、文化与共同体。高高山顶立，深深海底行——宏大的理想需要最小的起步单元。",
      "§ 四、海星式组织：可分化自治网络",
      "事物的发展从来不是沿着一条静止不变的轨道线性延长，而是在矛盾、差异、新条件和新能力的推动下不断分化、重组、跃迁和再组织。围绕统一目标形成的协作单位——无论是企业、公司、团体还是 DAO——都不可能永远保持最初的边界、认同和结构。",
      "在传统公司逻辑中，分歧常被视为失控，分裂常被视为失败；但在 huma dao 的理解中，分化并不一定意味着瓦解。很多时候它恰恰说明某个方向已经成长到足以独立承担目标、形成规则、聚集成员并继续向前。",
      "海星式组织的比喻，意味着一个成熟的自治组织不应依赖单一中心才能存在，而应具备从局部分支中再生完整能力的可能。像海星一样，一个分支被切下之后，未必只是残片，它有可能在新的条件中成长为新的完整个体。",
      "这意味着 huma dao 在产品层面需要支持：谱系化组织结构（母体 DAO、子 DAO、分支 DAO、联邦关系和合流记录）；宪章与规则分层（不可轻易更动的底层原则、可演化的中层规则和可试验的上层模块）；模块继承与重组；跨组织身份与角色迁移；贡献与信誉延续；完整生命周期支持（发起、孵化、成长、分化、联邦化、合流、休眠与归档）。",
      "§ 五、DAO 组织识别框架",
      "不同 DAO 不应被混作一种模板。huma dao 用两套坐标去识别一个组织：一套回答它信什么，一套回答它怎么聚合、怎么协作、怎么治理。前者是组织的灵魂，后者是组织的制度。",
      "价值观坐标系包含八个维度：关怀/爱（是否重视人、理解人、支持成长）；共益/共有（是否强调共同创造、共同分享、共同治理）；正义（是否追求公平分配、透明规则、程序公正）；求真（是否尊重事实、证据、实践反馈）；价值创造（是否能形成真实成果与持续造血能力）；自由（是否允许自主参与、自由退出、角色流动）；秩序（是否具备清晰规则、协作流程、责任边界）。",
      "组织运行坐标系包含四组关键维度：愿景驱动 ↔ 任务驱动；核心共建 ↔ 开放协作；长期共建 ↔ 短期参与；核心决策 ↔ 共同治理。",
      "§ 六、基本原则",
      "以下七条原则构成 huma dao 的制度底座：使命先于组织边界——组织存在的第一理由是使命、问题和共同目标，而不是组织自身的延续；角色先于岗位——每个人都可以基于能力、兴趣和贡献，以不同角色参与不同组织；贡献先于身份——人的价值不应只由学历、头衔、公司背景定义，而应由真实贡献和协作记录支撑；治理先于管理黑箱——重要规则、资源分配和公共决策，应尽可能通过公开透明的治理过程实现；声誉是可迁移的社会资本——个体在一个组织中形成的贡献、评价与信誉，应能够跨组织积累和迁移；多元激励优于单一工资逻辑——未来组织中的激励不仅包括报酬，还包括声誉、治理权、学习机会、关系网络与社会影响力；公共性与效率并重——不追求为了去中心化而牺牲一切效率，也不接受为了效率彻底压制参与与自治。",
    ],
  },
  {
    id: "part4",
    title: "第四编 产品定位：解决哪些问题",
    content: [
      "§ 一、huma dao 的重新定位",
      "在 AI / agent 时代，huma dao 不应被理解为 DAO 协作工具，而应被理解为一套面向未来协作社会的人类共识协作与治理基础设施。它不去和 AI 争夺执行效率，而是组织那些 AI 做不了、公司制装不下、跨组织又没人接得住的人类协作。",
      "一句话定义：huma dao——AI / Agent 时代的人类共识协作与治理层。",
      "产品层面的实现目标：基于最小共识的低摩擦、高尊重、快反馈、可治理、可分配的协作基础设施。",
      "huma dao 不是一个只服务 Web3 社区的链上投票工具；不是一个披着 DAO 外衣的远程接单平台；不是一个否定所有中心、要求所有问题都全员治理的乌托邦系统；不是 ERP、CRM 或项目管理软件的简单替代。",
      "huma dao 真正要组织的对象：值得投入的使命；可以持续协作的关系；可被承认的贡献；可被共同决定的规则；可被正当分配的价值；可被持续演化的组织。",
      "§ 二、现实中的问题",
      "人找不到真正适合自己的组织与项目——现有平台大多围绕招聘、岗位或临时外包展开，很难承载长期共建、治理参与和多角色协作。有能力、有热情的人，往往找不到一个正当的入口去参与值得做的事。",
      "项目找不到可信任的贡献者——传统简历和平台评分无法准确体现一个人的真实协作能力、治理参与能力与长期信誉。信任的建立成本极高，而一旦信任无法迁移，每一次新的协作都要从零开始。",
      "组织协作信息碎片化——项目管理、即时沟通、治理决策、资金分配、个人履历往往散落在不同平台，无法形成完整闭环。协作的全貌无处可见。",
      "治理与贡献脱节——现实中很多组织治理只属于少数管理者，而大量实际贡献者难以进入决策过程。贡献越多的人，未必拥有越多的发言权。",
      "非标准劳动价值长期被低估——组织协调、教育新人、维护社区、调解冲突、照护关系等劳动，很难被制度化记录和激励。系统只奖励短期、可量化、可交易的劳动，复制着旧制度的偏差。",
      "个体价值无法跨组织迁移——一个人在不同组织中的经验、信誉与贡献成果往往无法带走，协作社会难以形成真正的公共信用网络。",
      "大量协作节点缺乏组织能力——生产力革命创造了大量高生产率的个体和小团队，但这些节点缺少低摩擦的协作、可信的分配机制、共识形成和跨节点连接的基础设施。他们有能力，却没有组织。",
      "§ 三、面向未来的使命方向",
      "未来的组织不一定先围绕岗位形成，而会越来越多围绕使命形成。使命驱动的网络，不是因为一个老板或一份工作聚在一起，而是因为一件值得长期投入的事，把不同的人、角色、知识、资源和关系组织起来。",
      "教育与成长——围绕学习、共学、青年成长、新大学和知识共同体组织长期协作。开放研究——围绕某个议题、学科或行业问题组织研究、资料整理与知识生产。公共社会——围绕社区互助、公共议题、城市共治和社会行动形成长期网络。文化媒体——围绕独立媒体、内容共创、艺术生产和文化保育形成共同体。现实生活——围绕共居、家庭支持、身心成长和现实共同体建设协作。新型生产——让不同角色自由进入项目协作，以网络化方式组织专业能力。行业变革——以重塑某个行业的规则、基础设施和协作关系为目标。地方与空间——围绕街区、乡村、工坊、共享空间和在地文化共同治理。照护与健康——围绕心理支持、老人照护、护理协作和社区健康组织长期关系。生态与农业——围绕生态修复、农业网络、食物共同体与可持续生活协作。未来文明实验——围绕新的组织、关系、教育、经济与生活方式做长期实验。人机协作——围绕人类、agent、知识库和 workflow 的协同规则探索。",
    ],
  },
  {
    id: "part5",
    title: "第五编 产品系统：解决方案",
    content: [
      "§ 一、核心对象模型",
      "huma dao 的系统不应只围绕项目和任务建模，而要围绕一种更完整的协作社会对象模型来建模：人（拥有能力、角色、贡献记录、信誉、治理参与和协作关系的自主协作者）；组织（共同价值、规则、资源、治理与关系网络的容器）；项目（围绕某一目标发起的行动单元）；任务（最小可执行、可协作、可结算的工作单元）；提案（集体讨论、决策、资源配置与规则修改的入口）；贡献（任务之外的组织维护、教育支持、调解、传播等价值行为）；信誉（基于历史行为形成的可迁移信用）；宪章（定义组织底层原则、可演化规则与可试验模块）；谱系（组织的来源、分支、联邦与合流关系）；Agent / Workflow（被组织接入的自动化执行单元与知识工作流）。",
      "§ 二、产品模块全景",
      "市政厅——公共广场，面向人找项目、项目找人、使命展示和组织发现。项目空间——围绕一个目标的协作工作台，承载愿景、任务、提案、预算、进展与文档。贡献者网络——展示个人的多角色能力、历史贡献、信誉、当前参与组织与可接协作状态。治理中心——发起提案、讨论、投票、追踪执行、处理规则更新和争议仲裁。个人工作台——承载我的组织、我的项目、任务板、投票、收益、通知和聊天。谱系与分叉中心——管理组织的孵化、分叉、继承、联邦化和合流。Agent / Workflow Registry——接入和管理自动化流程、知识库、权限、审计与协作接口。",
      "§ 三、关键机制设计",
      "多角色系统——同一个人在不同组织、不同项目和不同阶段拥有不同角色。角色先于岗位，关系先于编制。",
      "贡献记录系统——记录任务交付之外的治理参与、组织维护、教育支持、协调和照护劳动。让不可量化的劳动进入制度。",
      "信誉系统——形成个人可迁移信誉、组织本地信誉和谱系继承信誉三层结构。信誉是协作社会的公共信用。",
      "分层参与机制——观察者、临时贡献者、活跃成员、核心共建者、治理成员、协调角色等分层参与。平衡开放性与执行效率。",
      "治理机制——支持核心决策、代表治理、共同治理、议题分权和混合治理。不是一人一票的教条，而是可配置的治理框架。",
      "分配机制——支持报酬、积分、声誉、治理权、长期权益与公共认可等多元激励。",
      "人机协作机制——把 agent 与 workflow 作为可审计、可授权、可协作的执行单元接入组织。",
      "分叉与继承机制——支持子 DAO 孵化、规则继承、预算分叉、知识库继承和合流记录。允许分歧，支持演化。",
      "§ 四、治理哲学与制度边界",
      "huma dao 不把 DAO 神化为天然完美的治理答案。任何自治组织都必须面对协作成本、信息不对称、权力集中风险、参与疲劳、决策效率、责任归属与冲突处理。先进的组织不是没有中心，而是拥有更透明、更可问责、更可调整的权力结构。",
      "不是所有问题都适合共同治理：高风险、高时效、高责任密度问题应允许核心决策。不是所有贡献都能被完全量化：制度设计必须保护照护、教育、组织维护与文化劳动。不是所有去中心化都更好：关键在于根据议题和层级配置合适的治理形式。不是所有分歧都要压制：系统应支持讨论、调解、试验性分支和正式分叉。不是所有技术能力都应自动接管：在伦理、责任和公共合法性相关场景，应保留人的在场。",
      "§ 五、技术路线：现状、展望与视角",
      "huma dao 的信誉记录、贡献追溯、治理投票和价值分配，需要一个不可篡改、可追溯、公开透明的底层技术支撑。区块链技术天然适合承载这些需求。然而，当前区块链领域仍以投机、炒作和概念套利为主流生态，真正服务于实体协作和社会治理的应用极为有限。在中国，Token 发行受到严格限制，这既是约束，也是一种保护——它迫使我们回到技术的本质价值，而非金融化的泡沫。",
      "数字人民币及其智能合约能力的持续发展，为 huma dao 提供了一条务实可行的技术路径。通过数字人民币的可编程特性，贡献结算、预算分配、条件触发的激励发放等机制，可以在合规框架下逐步实现。随着监管体系和技术基础的成熟，huma dao 将探索将信誉系统、贡献记录和治理投票逐步接入可信的分布式基础设施，实现数据的透明、可验证和不可篡改。",
      "huma dao 对底层技术的选择遵循三个原则：第一，技术服务于协作，而不是协作服务于技术——不会为了上链而上链，为了去中心化而去中心化；第二，合规优先，在有权利机构监管的框架下稳步推进；第三，保持架构开放，不锁定于单一技术栈，在条件成熟时能够无缝对接更成熟的分布式基础设施。",
    ],
  },
  {
    id: "part6",
    title: "第六编 路线、风险与远方",
    content: [
      "§ 一、典型应用场景",
      "使命驱动共同体——教育、研究、文化、公益、照护等长期共同体。跨组织联合项目——企业、社区、研究者、志愿者和公共机构共同推进的议题网络。分布式专业协作——设计、开发、研究、运营等角色自由流动参与的项目网络。母体-子体网络——一个母体组织孵化多个子项目、子组织并保持谱系关系。地方与现实共同体——街区、乡村、空间、合作社与数字市政厅结合的线下协作。人机混编组织——以人类定义目标、规则与边界，以 agent 执行大量工作流的协作单元。",
      "§ 二、阶段性路线图",
      "阶段一 · 协作基础设施——市政厅、项目空间、贡献者网络、任务板、基础提案与投票。形成人找项目—项目找人—接任务—沉淀贡献的闭环。",
      "阶段二 · 治理与信誉系统——引入章程模块、分层参与、信誉系统、预算与分配看板、多类型提案模板。让治理从概念变为可操作的制度。",
      "阶段三 · 谱系与网络协作——支持母体/子体 DAO、分叉与合流、跨组织身份与贡献护照、联盟协作。让组织从单体走向网络。",
      "阶段四 · Agent 协作层——接入 agent/workflow registry、知识库、审计和权限体系。形成可治理的人机混编协作单元。",
      "阶段五 · 组织生态——形成模板市场、行业解决方案、治理训练体系与面向未来协作社会的组织标准探索。",
      "§ 三、风险与挑战",
      "任何值得做的事情都伴随着风险。huma dao 必须诚实地面对以下挑战：开放参与与高质量执行之间的矛盾；自由流动与长期承诺之间的矛盾；治理理想与现实效率之间的矛盾；平台化与公共性之间的张力；技术系统与社会现实之间的落差；自动化收益高度集中所带来的分配风险；组织创新滑向概念化、仪式化、自我感动的风险。衡量 huma dao 的标准，绝不是概念是否动人，而是它是否真的帮助更多人进入协作。",
      "§ 四、远方：围绕共识的治理共同体",
      "人类社会的组织形式从来不是一成不变的。从部落到城邦，从封建领地到民族国家，每一次生产力的跃迁都催生了新的共同体形态。今天，我们站在又一个门槛上。",
      "当知识不再被垄断，当技能可以被模块化调用，当生产力的天花板被 AI 不断抬高，人类组织共同体的方式也必然发生变化。未来的共同体，不一定要绑定于领土和血统。它可以围绕共识产生——一群人认同某些原则，愿意遵守某些规则，愿意为某些目标承担共同的后果。这种共同体可以跨越地理、语言和文化的边界，只要共识足够真实、规则足够清晰、治理足够正当。",
      "我们不知道这样的未来何时到来，也不试图给出一个精确的时间表。但我们相信，每一个围绕共识自由组建的治理共同体，都是通往那个未来的一小步。huma dao 所做的，就是让这一小步变得可能。",
    ],
  },
  {
    id: "epilogue",
    title: "结语",
    content: [
      "当知识、技能与流程不断被自动化之后，人类仍然需要彼此。因为只有人能够共同赋予方向、形成承认、承担后果，并把值得存在的事物带到世界上来。",
      "huma dao 所组织的，不只是任务协作，而是这种面向未来的人类共识、关系与共同创造。",
      "如果说工业时代最核心的问题是如何组织大规模生产，那么 AI / agent 时代更核心的问题，也许就是：如何让自由的人，在新的生产力条件下，围绕值得做的事形成既能执行、又能治理、既能开放、又能负责、既能分化、又能继续前行的协作网络。",
      "这是一个无限的世界，藏着无限的美好。",
    ],
  },
  {
    id: "manifesto",
    title: "宣言",
    content: [
      "我们相信，未来的人不应被固定在单一岗位和封闭组织中。",
      "我们相信，组织应当服务于人的创造力，而不是让人服从组织的边界。",
      "我们相信，贡献应该被看见，治理应该被参与，价值应该被透明分配。",
      "我们相信，大众不是旁观者，是可以参与自己所在世界的治理的。",
      "我们相信，AI 释放生产力之后，人类更需要新的协作关系。",
      "我们相信，这个世界允许一切理念和共识百花齐放。",
      "huma dao，不只是一套 DAO 工具，而是面向未来协作文明的基础设施。",
      "让每个人都能以自己的方式，去创造、去参与、去连接世界的共识。",
    ],
  },
];

const sectionsEn: Section[] = [
  {
    id: "abstract",
    title: "Executive Summary",
    content: [
      "The world does not lack efficiency tools. What it lacks is infrastructure that frees the collaborative relationships between people from the monopoly of positions, organizational boundaries, and employment contracts.",
      "huma dao does not aim to move traditional companies online, nor does it idealize DAOs as the ultimate answer to all organizational problems. It responds to a deeper question of our era: after AI, agents, automated workflows, and knowledge bases continuously absorb old skills, positions, and processes, around what will humans continue to form collaboration, governance, distribution, and community?",
      "Our answer is: humans will continue to collaborate around consensus. Not forced uniformity, but the minimum viable action agreements formed amid differences. Not everyone participating in all governance, but anyone having the right to participate in decisions that concern them. Not replacing companies with DAOs, but providing a layer of governable, recordable, and distributable networks beyond, between, and above companies.",
      "huma dao is the human consensus collaboration and governance layer for the AI / Agent era.",
    ],
  },
  {
    id: "core-judgments",
    title: "Eight Core Judgments",
    content: [
      "First, AI / agents are not just impacting specific positions — they are rewriting the boundaries of knowledge, skills, processes, and organizations.",
      "Second, the productivity revolution is moving toward knowledge equity and capability modularization, providing the material basis for reorganizing human collaboration.",
      "Third, uniquely human value is shifting from executing standardized processes to setting direction, forming recognition, bearing consequences, providing care, and living together.",
      "Fourth, the center of gravity of future collaboration will shift from position-based to mission-based, from single-organization optimization to cross-organizational network collaboration.",
      "Fifth, huma dao does not replace companies — it fills the collaborative space beyond, between, and above them.",
      "Sixth, future organizations should not be designed as single fixed containers, but as starfish-like lineage networks that can differentiate, inherit, and re-collaborate.",
      "Seventh, DAOs should not be narrowly understood as on-chain voting tools, but as an organizational grammar for a future collaborative society.",
      "Eighth, the measure of huma dao is not whether its concepts are inspiring, but whether it helps real people and real endeavors form more effective, governable, and distributable collaboration.",
    ],
  },
  {
    id: "part1",
    title: "Part I: Foundational Philosophy",
    content: [
      "§ The Essence of Being Human Is Relationship",
      "Humans are relational beings. We are born in relationships, grow in relationships, and define who we are and who we can become in relationships. Any organizational design must first answer not how to improve efficiency, but how to make relationships between people more just, sustainable, and dignified.",
      "§ The True Nature of Labor: Creation, Not Survival",
      "When productivity reaches a sufficiently high level, labor can return to its true nature: not a means of survival, but a primary human need. People will create out of passion, collaborate out of mission, and care out of concern. A truly advanced collaborative system should provide institutional support for this return.",
      "§ Shared Ownership, Shared Governance, Shared Creation",
      "Together, these three form a civilizational ideal: in such a civilization, people are no longer appendages of organizations — organizations are extensions of people; labor is no longer forced exchange but free creation; governance is no longer top-down control but negotiation of shared living.",
      "§ DAO as the Minimum Unit of the Ideal",
      "DAO — not a narrow on-chain voting tool, but an organizational grammar: a group of people forming a collaborative, governable, and evolvable community around shared goals and rules. A DAO needs no territory, no bloodline, no violence apparatus. It only needs consensus.",
    ],
  },
  {
    id: "part2",
    title: "Part II: Era Judgment",
    content: [
      "§ A Revolution Beyond Efficiency",
      "AI, agents, knowledge bases, and automated workflows are not just helping people complete old work faster. They are deconstructing human-internalized knowledge, skills, and processes into reusable modules, trainable strategies, callable interfaces, and replicable execution chains.",
      "§ Companies Are Still Effective, But Boundaries Are Emerging",
      "The modern company is not a flawed institution, but it has clear boundaries. It excels at internal execution of established goals but struggles with cross-organizational collaboration, open contributions, recognition of non-standard labor, and long-term community relationships.",
      "§ The Crisis of Meaning and Alienation of Labor",
      "Many people are experiencing a deep crisis of meaning: What is the value of my work? Am I replaceable at any moment? A system that only cares about efficiency while ignoring meaning will produce many productive but unbelonging individuals.",
      "§ What Is Uniquely Human",
      "Humans' deeper uniqueness lies in our situatedness, vulnerability, and relationality: we love, hurt, lose, and care — and therefore truly assign meaning to justice, dignity, harm, and happiness. The setting of direction, drawing of boundaries, and bearing of consequences still belong to the human domain.",
    ],
  },
  {
    id: "part3",
    title: "Part III: Organization Theory",
    content: [
      "§ From Position-Company to Role-Network",
      "In the AI / agent era, a new logic is more likely to emerge: organizational networks as the basic unit, roles as the primary division of labor, tasks and proposals as operational nodes, collaborative agreements as participation entries, and multi-dimensional incentives as the new distribution structure.",
      "§ From Unified Consensus to Minimum Consensus",
      "huma dao's advocated consensus is not unanimity, but a minimum viable action agreement: shared goals, role interfaces, settlement rules, and divergence exits. Let action happen first, then form deeper identity, culture, and community through action.",
      "§ Starfish Organizations: Differentiable Autonomous Networks",
      "Like a starfish, a severed branch is not necessarily just a fragment — it may grow into a new complete organism under new conditions. huma dao supports lineage structures, layered charters, modular inheritance, cross-organizational identity migration, and complete lifecycle management.",
      "§ Core Principles",
      "Mission before organizational boundaries · Roles before positions · Contribution before identity · Governance before management black boxes · Reputation as portable social capital · Multi-dimensional incentives over single salary logic · Public value and efficiency in balance.",
    ],
  },
  {
    id: "part4",
    title: "Part IV: Product Positioning",
    content: [
      "§ Repositioning huma dao",
      "One-line definition: huma dao — the human consensus collaboration and governance layer for the AI / Agent era. Product goal: low-friction, high-respect, fast-feedback, governable, and distributable collaborative infrastructure based on minimum consensus.",
      "§ Real-World Problems",
      "People cannot find organizations and projects that truly match them. Projects cannot find trustworthy contributors. Organizational collaboration information is fragmented. Governance and contribution are disconnected. Non-standard labor value is chronically underestimated. Individual value cannot migrate across organizations. Numerous collaboration nodes lack organizational capacity.",
      "§ Future Mission Directions",
      "Education & Growth · Open Research · Public Society · Culture & Media · Real Life · New Production · Industry Transformation · Local & Spatial · Care & Health · Ecology & Agriculture · Future Civilization Experiments · Human-Machine Collaboration.",
    ],
  },
  {
    id: "part5",
    title: "Part V: Product System",
    content: [
      "§ Core Object Model",
      "Person · Organization · Project · Task · Proposal · Contribution · Reputation · Charter · Lineage · Agent / Workflow — a complete collaborative society object model.",
      "§ Product Module Overview",
      "City Hall · Project Space · Contributor Network · Governance Center · Personal Workspace · Lineage & Fork Center · Agent / Workflow Registry.",
      "§ Key Mechanism Design",
      "Multi-role system · Contribution recording · Reputation system · Layered participation · Governance mechanisms · Distribution mechanisms · Human-machine collaboration · Fork and inheritance mechanisms.",
      "§ Governance Philosophy",
      "Advanced organizations are not without center, but have more transparent, accountable, and adjustable power structures. Not all issues are suitable for collective governance; not all contributions can be fully quantified; not all decentralization is better.",
      "§ Technology Roadmap",
      "huma dao follows three technology principles: technology serves collaboration, not the other way around; compliance first; architecture remains open and not locked to a single technology stack.",
    ],
  },
  {
    id: "part6",
    title: "Part VI: Roadmap, Risks & Vision",
    content: [
      "§ Phased Roadmap",
      "Phase 1: Collaborative Infrastructure — City Hall, Project Space, Contributor Network, Task Board, basic proposals and voting.",
      "Phase 2: Governance & Reputation — Charter module, layered participation, reputation system, budget dashboard, proposal templates.",
      "Phase 3: Lineage & Network Collaboration — Parent/child DAOs, forks and merges, cross-organizational identity and contribution passports.",
      "Phase 4: Agent Collaboration Layer — Agent/workflow registry, knowledge base, audit and permission systems.",
      "Phase 5: Organizational Ecosystem — Template marketplace, industry solutions, governance training systems.",
      "§ Risks & Challenges",
      "Contradictions between open participation and high-quality execution; between free flow and long-term commitment; between governance ideals and practical efficiency; between platformization and public value. The measure of huma dao is never whether concepts are inspiring, but whether it truly helps more people enter collaboration.",
    ],
  },
  {
    id: "epilogue",
    title: "Epilogue",
    content: [
      "After knowledge, skills, and processes are continuously absorbed by automation, humans still need each other. Because only humans can collectively assign direction, form recognition, bear consequences, and bring things worth existing into the world.",
      "What huma dao organizes is not just task collaboration, but the human consensus, relationships, and shared creation oriented toward the future.",
      "If the core question of the industrial era was how to organize large-scale production, then the core question of the AI / agent era may be: how can free people, under new productive conditions, form collaborative networks around things worth doing — networks that can execute and govern, be open and responsible, differentiate and keep moving forward.",
      "This is an infinite world, hiding infinite beauty.",
    ],
  },
  {
    id: "manifesto",
    title: "Manifesto",
    content: [
      "We believe that people of the future should not be fixed in single positions and closed organizations.",
      "We believe that organizations should serve human creativity, not make people submit to organizational boundaries.",
      "We believe that contributions should be seen, governance should be participated in, and value should be transparently distributed.",
      "We believe that the masses are not spectators — they can participate in the governance of their own world.",
      "We believe that after AI unleashes productivity, humanity needs new collaborative relationships even more.",
      "We believe that this world allows all ideas and consensus to bloom.",
      "huma dao is not just a set of DAO tools, but infrastructure for a future collaborative civilization.",
      "Let everyone, in their own way, create, participate, and connect with the world's consensus.",
    ],
  },
];

export function WhitepaperPage() {
  const { i18n } = useTranslation();
  const isZh = i18n.language === "zh";
  const data = isZh ? sections : sectionsEn;
  const [activeId, setActiveId] = useState(data[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    observerRef.current?.disconnect();
    const headings = data.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!headings.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );
    headings.forEach((h) => observerRef.current!.observe(h));
    return () => observerRef.current?.disconnect();
  }, [data]);

  const tocList = (
    <ol className="space-y-1">
      {data.map((s, i) => {
        const active = s.id === activeId;
        return (
          <li key={s.id}>
            <button
              onClick={() => handleClick(s.id)}
              className={`text-left w-full text-[13px] leading-snug py-1 transition-colors ${
                active
                  ? "text-foreground font-medium"
                  : "text-muted-foreground/70 hover:text-foreground"
              }`}
            >
              <span className="text-muted-foreground/40 font-mono text-[11px] mr-1.5">{String(i + 1).padStart(2, "0")}</span>
              {s.title}
            </button>
          </li>
        );
      })}
    </ol>
  );

  return (
    <div className="xl:pr-64">
      {/* fixed right sidebar TOC — xl and above */}
      <nav className="hidden xl:flex fixed top-20 right-6 2xl:right-10 z-30 w-56 max-h-[calc(100vh-6rem)] flex-col">
        <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider shrink-0">
          {isZh ? "目录" : "Contents"}
        </p>
        <div className="border-l border-border pl-4 overflow-y-auto overscroll-contain pr-1">
          {tocList}
        </div>
      </nav>

      <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
        {/* header */}
        <div className="text-center mb-12 pt-4">
          <p className="text-xs tracking-widest text-muted-foreground/50 uppercase mb-3">Whitepaper · V5.0</p>
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-3">HUMA DAO</h1>
          <p className="text-muted-foreground text-sm">{isZh ? "人类共识协作与治理层" : "Human Consensus Collaboration & Governance Layer"}</p>
          <p className="text-muted-foreground/60 text-xs mt-2">{isZh ? "让每个人都能以自己的方式，去创造、去参与、去连接世界的共识。" : "Let everyone, in their own way, create, participate, and connect with the world's consensus."}</p>
        </div>

        {/* mobile TOC — visible below xl */}
        <nav className="xl:hidden mb-12 p-5 rounded-xl border border-border bg-card">
          <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">{isZh ? "目录" : "Contents"}</p>
          {tocList}
        </nav>

        {/* sections */}
        <div className="space-y-10">
          {data.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-20">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-border">{s.title}</h2>
              <div className="space-y-3">
                {s.content.map((p, pi) => {
                  if (p.startsWith("§")) {
                    return <h3 key={pi} className="text-sm font-semibold text-foreground/80 mt-5 mb-1">{p.slice(2)}</h3>;
                  }
                  return <p key={pi} className="text-sm text-muted-foreground leading-relaxed">{p}</p>;
                })}
              </div>
            </section>
          ))}
        </div>

        {/* footer */}
        <div className="mt-16 mb-8 text-center">
          <div className="inline-block border border-border rounded-xl p-6 bg-card">
            <p className="text-xs text-muted-foreground/50 mb-2">{isZh ? "概念白皮书 · 署名：张润泽" : "Conceptual Whitepaper · By Zhang Runze"}</p>
            <p className="text-sm text-muted-foreground">HUMA DAO · V5.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
