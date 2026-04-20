import type { DAOModule, DAOPreset, DAOProjectType, IntegrationLevel } from "@/types";

/**
 * Ordered list of all modules — this is also the canonical Tab render order.
 * Tabs are rendered in this order, filtered by a DAO's enabled modules.
 */
export const MODULE_ORDER: DAOModule[] = [
  "protocolCard",
  "constitution",
  "profile",
  "lineage",
  "subOrgs",
  "bounties",
  "proposals",
  "paramGov",
  "tokenGov",
  "budget",
  "metrics",
  "arbitration",
  "contributions",
  "kanban",
  "events",
  "discussion",
  "docs",
  "notionEmbed",
  "discordEmbed",
  "snapshot",
  "safe",
];

/**
 * Module metadata — labelKey points to i18n under `dao.module.*`;
 * descKey under `dao.module.<id>Desc`. Used by the creation wizard's
 * module picker and future admin panel.
 */
export interface DAOModuleMeta {
  id: DAOModule;
  labelKey: string;
  descKey: string;
  /** Other modules this one implicitly needs. */
  requires?: DAOModule[];
  /** Visual grouping in the picker. */
  group: "core" | "basic" | "governance" | "economic" | "advanced" | "integration";
}

export const MODULE_META: Record<DAOModule, DAOModuleMeta> = {
  profile:       { id: "profile",       group: "core",        labelKey: "dao.module.profile.label",       descKey: "dao.module.profile.desc" },
  lineage:       { id: "lineage",       group: "core",        labelKey: "dao.module.lineage.label",       descKey: "dao.module.lineage.desc" },
  protocolCard:  { id: "protocolCard",  group: "core",        labelKey: "dao.module.protocolCard.label",  descKey: "dao.module.protocolCard.desc" },

  discussion:    { id: "discussion",    group: "basic",       labelKey: "dao.module.discussion.label",    descKey: "dao.module.discussion.desc" },
  events:        { id: "events",        group: "basic",       labelKey: "dao.module.events.label",        descKey: "dao.module.events.desc" },
  docs:          { id: "docs",          group: "basic",       labelKey: "dao.module.docs.label",          descKey: "dao.module.docs.desc" },

  proposals:     { id: "proposals",     group: "governance",  labelKey: "dao.module.proposals.label",     descKey: "dao.module.proposals.desc" },
  constitution:  { id: "constitution",  group: "governance",  labelKey: "dao.module.constitution.label",  descKey: "dao.module.constitution.desc" },
  bounties:      { id: "bounties",      group: "governance",  labelKey: "dao.module.bounties.label",      descKey: "dao.module.bounties.desc" },
  kanban:        { id: "kanban",        group: "governance",  labelKey: "dao.module.kanban.label",        descKey: "dao.module.kanban.desc" },
  contributions: { id: "contributions", group: "governance",  labelKey: "dao.module.contributions.label", descKey: "dao.module.contributions.desc" },

  budget:        { id: "budget",        group: "economic",    labelKey: "dao.module.budget.label",        descKey: "dao.module.budget.desc",        requires: ["proposals"] },
  tokenGov:      { id: "tokenGov",      group: "economic",    labelKey: "dao.module.tokenGov.label",      descKey: "dao.module.tokenGov.desc",      requires: ["proposals"] },

  arbitration:   { id: "arbitration",   group: "advanced",    labelKey: "dao.module.arbitration.label",   descKey: "dao.module.arbitration.desc" },
  paramGov:      { id: "paramGov",      group: "advanced",    labelKey: "dao.module.paramGov.label",      descKey: "dao.module.paramGov.desc",      requires: ["proposals"] },
  metrics:       { id: "metrics",       group: "advanced",    labelKey: "dao.module.metrics.label",       descKey: "dao.module.metrics.desc" },
  subOrgs:       { id: "subOrgs",       group: "advanced",    labelKey: "dao.module.subOrgs.label",       descKey: "dao.module.subOrgs.desc" },

  notionEmbed:   { id: "notionEmbed",   group: "integration", labelKey: "dao.module.notionEmbed.label",   descKey: "dao.module.notionEmbed.desc" },
  discordEmbed:  { id: "discordEmbed",  group: "integration", labelKey: "dao.module.discordEmbed.label",  descKey: "dao.module.discordEmbed.desc" },
  snapshot:      { id: "snapshot",      group: "integration", labelKey: "dao.module.snapshot.label",      descKey: "dao.module.snapshot.desc" },
  safe:          { id: "safe",          group: "integration", labelKey: "dao.module.safe.label",          descKey: "dao.module.safe.desc" },
};

/**
 * Preset bundles — picked at DAO creation time.
 * Modules list is canonical; `recommended` is a flag for UI ordering.
 */
export interface DAOPresetMeta {
  id: DAOPreset;
  labelKey: string;
  descKey: string;
  modules: DAOModule[];
}

export const PRESETS: Record<DAOPreset, DAOPresetMeta> = {
  lite: {
    id: "lite",
    labelKey: "dao.preset.lite.label",
    descKey: "dao.preset.lite.desc",
    modules: [
      "profile", "lineage", "protocolCard",
      "events", "discussion",
      "notionEmbed",
    ],
  },
  study: {
    id: "study",
    labelKey: "dao.preset.study.label",
    descKey: "dao.preset.study.desc",
    modules: [
      "profile", "lineage", "protocolCard",
      "events", "discussion", "docs",
      "kanban", "contributions",
    ],
  },
  standard: {
    id: "standard",
    labelKey: "dao.preset.standard.label",
    descKey: "dao.preset.standard.desc",
    modules: [
      "profile", "lineage", "protocolCard", "constitution",
      "discussion", "docs",
      "proposals", "bounties", "kanban", "contributions",
      "budget",
      "subOrgs",
    ],
  },
  protocol: {
    id: "protocol",
    labelKey: "dao.preset.protocol.label",
    descKey: "dao.preset.protocol.desc",
    modules: [
      "profile", "lineage", "protocolCard", "constitution",
      "discussion", "docs",
      "proposals", "paramGov", "tokenGov",
      "budget", "metrics", "arbitration",
      "contributions", "bounties",
      "snapshot", "safe",
    ],
  },
  care: {
    id: "care",
    labelKey: "dao.preset.care.label",
    descKey: "dao.preset.care.desc",
    modules: [
      "profile", "lineage", "protocolCard", "constitution",
      "events", "discussion", "docs",
      "proposals", "bounties", "contributions",
      "budget", "arbitration",
    ],
  },
  custom: {
    id: "custom",
    labelKey: "dao.preset.custom.label",
    descKey: "dao.preset.custom.desc",
    modules: [
      "profile", "lineage", "protocolCard",
    ],
  },
};

/**
 * Suggest a preset from an existing `projectType` so legacy DAOs can be
 * grandfathered into a sensible default without a manual migration.
 */
export function presetForProjectType(pt?: DAOProjectType): DAOPreset {
  switch (pt) {
    case "toolsProduct":
    case "techInternet":
    case "infrastructure":
      return "protocol";
    case "education":
    case "research":
    case "mediaContent":
      return "study";
    case "healthCare":
    case "publicGood":
    case "communityLife":
    case "socialPublic":
      return "care";
    case "cultureArt":
    case "localSpace":
      return "lite";
    default:
      return "standard";
  }
}

/**
 * Full tab set used by legacy DAOs — matches the pre-modularity UI so that
 * existing DAOs don't silently lose tabs. New DAOs should declare `modules`
 * explicitly via a preset.
 */
export const LEGACY_MODULES: DAOModule[] = [
  "profile", "lineage", "protocolCard", "constitution",
  "discussion", "docs",
  "proposals", "bounties", "subOrgs",
  "budget",
];

/**
 * Resolve a DAO's effective module list.
 * - Explicit `modules` wins (new modular DAOs)
 * - Otherwise return LEGACY_MODULES for backward compatibility
 *
 * `projectType` is currently accepted but unused for resolution so the
 * migration from legacy → preset-driven can be staged without surprise
 * regressions. Use presetForProjectType() directly when opting a DAO in.
 */
export function resolveModules(
  modules: DAOModule[] | undefined,
  _projectType?: DAOProjectType,
): DAOModule[] {
  if (modules && modules.length > 0) return modules;
  return LEGACY_MODULES;
}

/** Filter a module list into canonical render order. */
export function orderedModules(modules: DAOModule[]): DAOModule[] {
  const set = new Set(modules);
  return MODULE_ORDER.filter((m) => set.has(m));
}

/**
 * Modules that represent an external-tool integration. Only these have
 * meaningful `IntegrationLevel` — other modules ignore the value.
 */
export const INTEGRATION_MODULES: DAOModule[] = [
  "notionEmbed",
  "discordEmbed",
  "snapshot",
  "safe",
];

/**
 * Which depth levels each integration module actually supports. Not every
 * tool can go L0→L4 — e.g. Notion has no realtime event channel in our
 * stack, Safe has no "embed iframe" (it's a deep-link flow).
 */
export const SUPPORTED_LEVELS: Record<string, IntegrationLevel[]> = {
  notionEmbed:  ["L0", "L1", "L2"],
  discordEmbed: ["L0", "L1", "L4"],
  snapshot:     ["L0", "L1", "L2", "L3"],
  safe:         ["L0", "L2", "L3"],
};

/** Sensible default when a user first enables an integration module. */
export const DEFAULT_LEVEL: Record<string, IntegrationLevel> = {
  notionEmbed:  "L1",
  discordEmbed: "L0",
  snapshot:     "L1",
  safe:         "L2",
};

export function isIntegrationModule(m: DAOModule): boolean {
  return INTEGRATION_MODULES.includes(m);
}

export function defaultLevelFor(m: DAOModule): IntegrationLevel | undefined {
  return DEFAULT_LEVEL[m];
}

export function supportedLevelsFor(m: DAOModule): IntegrationLevel[] {
  return SUPPORTED_LEVELS[m] ?? [];
}

/**
 * Per-module deep configuration schema.
 *
 * Each entry is a declarative list of form fields. The UI renders these
 * generically so adding a new module's config only requires extending this
 * object + i18n keys — no component changes.
 *
 * Field keys are relative; the full i18n path for a label is
 * `dao.moduleConfig.<moduleId>.<fieldKey>.label` (same for placeholder / help).
 */
export type ConfigFieldType = "text" | "number" | "url";

export interface ConfigField {
  key: string;
  type: ConfigFieldType;
  required?: boolean;
  /** Used as `defaultValue` when no user input exists. */
  default?: string | number;
  /** For `type: "number"` — display suffix, e.g. "%", " days". */
  unit?: string;
  min?: number;
  max?: number;
}

export type ModuleConfigValue = Record<string, string | number>;

export const MODULE_CONFIG_SCHEMA: Partial<Record<DAOModule, ConfigField[]>> = {
  proposals: [
    { key: "quorumPct",   type: "number", default: 10, min: 0,  max: 100, unit: "%" },
    { key: "votingDays",  type: "number", default: 5,  min: 1,  max: 30 },
    { key: "approvalPct", type: "number", default: 50, min: 0,  max: 100, unit: "%" },
  ],
  budget: [
    { key: "treasuryAddress", type: "text" },
    { key: "currency",        type: "text", default: "USDC" },
  ],
  tokenGov: [
    { key: "symbol",   type: "text" },
    { key: "contract", type: "text" },
  ],
  snapshot: [
    { key: "spaceId", type: "text", required: true },
  ],
  safe: [
    { key: "chainId", type: "number", default: 1, min: 1 },
    { key: "address", type: "text",   required: true },
  ],
  notionEmbed: [
    { key: "pageUrl", type: "url" },
  ],
  discordEmbed: [
    { key: "serverId",  type: "text" },
    { key: "inviteUrl", type: "url" },
  ],
};

export function configSchemaFor(m: DAOModule): ConfigField[] {
  return MODULE_CONFIG_SCHEMA[m] ?? [];
}

export function hasModuleConfig(m: DAOModule): boolean {
  return (MODULE_CONFIG_SCHEMA[m]?.length ?? 0) > 0;
}

/** Seed default values for a module's schema. */
export function defaultConfigFor(m: DAOModule): ModuleConfigValue {
  const out: ModuleConfigValue = {};
  for (const f of configSchemaFor(m)) {
    if (f.default !== undefined) out[f.key] = f.default;
  }
  return out;
}

/** Apply dependency resolution — ensure `requires` are included. */
export function withDependencies(modules: DAOModule[]): DAOModule[] {
  const set = new Set(modules);
  let changed = true;
  while (changed) {
    changed = false;
    for (const m of Array.from(set)) {
      const reqs = MODULE_META[m]?.requires ?? [];
      for (const r of reqs) {
        if (!set.has(r)) {
          set.add(r);
          changed = true;
        }
      }
    }
  }
  return Array.from(set);
}
