import type { LucideIcon } from "lucide-react";
import type { DAOProfile } from "./dao-tags";

export type DAOProjectType =
  | "socialPublic" | "techInternet" | "mediaContent" | "toolsProduct"
  | "education" | "research" | "publicGood" | "communityLife"
  | "cultureArt" | "business" | "industryChange" | "localSpace"
  | "manufacturing" | "healthCare" | "ecoAgriculture" | "infrastructure";
export type DAOMode = "online" | "offline" | "hybrid";

export type DAOLifecycle = "incubating" | "active" | "dormant" | "archived";

export type DAORelation = "project" | "regional" | "functional" | "ideological" | "experimental";

export interface ForkRecord {
  fromId: string;
  date: string;
  reason: string;
  inherited: ForkInheritance;
}

export interface ForkInheritance {
  mission: boolean;
  members: boolean;
  knowledgeBase: boolean;
  treasury: boolean;
  reputation: boolean;
  federation: boolean;
}

export interface LocalizedText {
  zh: string;
  en: string;
}

export interface DAOShowcase {
  stage: LocalizedText;
  vision: LocalizedText;
  consensus: LocalizedText;
  businessModel: LocalizedText;
  collaborationModel: LocalizedText;
  participation: LocalizedText;
}

/**
 * Minimum Viable Action Protocol — the four structural cells that every
 * huma dao community is expected to declare before collaboration begins.
 *  - sharedGoal     共同目标：大家在做什么事、为何值得投入
 *  - roleInterface  角色接口：可以进来的身份、承担的范围
 *  - settlementRule 结算规则：贡献、激励、认可、分配的规则
 *  - exitClause     分歧出口：出现不同意时如何暂停、申诉、分叉
 */
export interface DAOProtocol {
  sharedGoal: LocalizedText;
  roleInterface: LocalizedText;
  settlementRule: LocalizedText;
  exitClause: LocalizedText;
}

/**
 * Modular governance modules that a DAO can opt into.
 * Rendered as Tabs on the DAO detail page. Creator picks a preset
 * (or Custom) at creation time; can be reconfigured later.
 */
export type DAOModule =
  // Core — always on in practice
  | "profile"        // About / positioning / values
  | "lineage"        // Parent / children / fork history
  | "protocolCard"   // Minimum Viable Action Protocol (4 cells)
  // Basic collaboration
  | "discussion"     // Progress updates / long-form threads
  | "events"         // Calendar / sessions / activities
  | "docs"           // Documents / knowledge base
  // Governance
  | "proposals"      // Proposal + voting
  | "constitution"   // Long-form charter (heavier than protocolCard)
  | "bounties"       // Bounty categories / tasks
  | "kanban"         // Shared board
  | "contributions"  // Contribution log
  // Economic
  | "budget"         // Budget & distribution
  | "tokenGov"       // Token-weighted governance
  // Advanced governance
  | "arbitration"    // Dispute resolution
  | "paramGov"       // Parameter-change proposals (for protocol DAOs)
  | "metrics"        // Protocol / health metrics dashboard
  | "subOrgs"        // Child DAO registry
  // External integrations
  | "notionEmbed"
  | "discordEmbed"
  | "snapshot"
  | "safe";

/**
 * Depth of integration for external-tool modules (notionEmbed, discordEmbed,
 * snapshot, safe). Higher = more coupling, more surface area for failure, but
 * richer in-product experience.
 *   L0 external link        — open in new tab only, no embedding
 *   L1 embedded iframe      — render inside humadao, read-only
 *   L2 read-only API        — fetch & display structured content natively
 *   L3 two-way write        — create / update resources from humadao
 *   L4 event-driven sync    — webhooks / realtime (e.g. Discord bot)
 */
export type IntegrationLevel = "L0" | "L1" | "L2" | "L3" | "L4";

/** Preset templates that pre-select a sensible module bundle at creation. */
export type DAOPreset =
  | "lite"       // Interest / reading group — low governance density
  | "study"      // Learning community / cohort
  | "standard"   // Online project — default DAO
  | "protocol"   // Fat-protocol governance layer
  | "care"       // Community eldercare / public-good ops
  | "custom";

export interface DAO {
  id: string;
  nameKey: string;
  descKey: string;
  members: number;
  avatar?: string;
  color?: string;
  catKeys: string[];
  featured: boolean;
  profile?: DAOProfile;
  projectType?: DAOProjectType;
  mode?: DAOMode;
  region?: string;
  locationId?: string;
  lifecycle?: DAOLifecycle;
  originId?: string;
  childIds?: string[];
  forkHistory?: ForkRecord[];
  relation?: DAORelation;
  foundedDate?: string;
  showcase?: DAOShowcase;
  protocol?: DAOProtocol;
  /**
   * Opt-in governance modules. When omitted, the DAO falls back to the
   * legacy full-tab set (grandfathered) — see getDAOModules() in @/data/dao.
   */
  modules?: DAOModule[];
  /** Preset used at creation; mostly informational, modules are the source of truth. */
  preset?: DAOPreset;
  /**
   * Per-module integration depth. Only meaningful for modules in
   * INTEGRATION_MODULES — other keys are ignored.
   */
  integrationLevels?: Partial<Record<DAOModule, IntegrationLevel>>;
  /**
   * Per-module deep configuration (quorum, treasury address, space id...).
   * Shape is declared by MODULE_CONFIG_SCHEMA — the UI validates against it.
   */
  moduleConfig?: Partial<Record<DAOModule, Record<string, string | number>>>;
}

export type DAOModuleConfig = Partial<Record<DAOModule, Record<string, string | number>>>;

export interface DAOBrief {
  id: string;
  nameKey: string;
  avatar: string;
  color: string;
  parentId?: string;
  children?: DAOBrief[];
  profile?: DAOProfile;
  lifecycle?: DAOLifecycle;
  relation?: DAORelation;
}

export interface DAOMembership {
  nameKey?: string;
  name?: string;
  roleKey: string;
  tasks: number;
}

export interface BountyCategory {
  nameKey: string;
  icon: LucideIcon;
  tasks: number;
  contributors: number;
}

export interface DAOProposal {
  titleKey: string;
  statusKey: string;
  votes: { for: number; against: number };
  deadlineKey: string;
}

export interface ProgressUpdate {
  titleKey: string;
  dateKey: string;
  typeKey: string;
}
