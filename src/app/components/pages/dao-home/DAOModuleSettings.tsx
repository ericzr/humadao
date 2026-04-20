import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Check, Minus, Plus, RotateCcw, Save } from "lucide-react";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import {
  MODULE_ORDER,
  MODULE_META,
  orderedModules,
  withDependencies,
  daoModuleOverrides,
  daoIntegrationOverrides,
  daoModuleConfigOverrides,
  resolveModules,
  isIntegrationModule,
  defaultLevelFor,
  hasModuleConfig,
  defaultConfigFor,
} from "@/data";
import type { DAO, DAOModule, DAOModuleConfig, DAOModuleMeta, IntegrationLevel } from "@/types";
import { useDAOModules } from "@/app/hooks/useDAOModules";
import { useDAOIntegrationLevels } from "@/app/hooks/useDAOIntegrationLevels";
import { useDAOModuleConfig } from "@/app/hooks/useDAOModuleConfig";
import { IntegrationLevelPicker } from "../create-project/IntegrationLevelPicker";
import { ModuleConfigEditor } from "../create-project/ModuleConfigEditor";

interface Props {
  dao: DAO;
  onClose: () => void;
}

/**
 * Core identity modules — removing these would break the DAO homepage, so
 * we always force them on regardless of user toggles.
 */
const LOCKED: DAOModule[] = ["profile", "lineage", "protocolCard"];

const GROUPS: DAOModuleMeta["group"][] = [
  "core",
  "basic",
  "governance",
  "economic",
  "advanced",
  "integration",
];

export function DAOModuleSettings({ dao, onClose }: Props) {
  const { t } = useTranslation();

  // Live resolved modules (override > seed > legacy). Used as baseline for diff.
  const current = useDAOModules(dao);
  const baseline = useMemo(() => new Set(current), [current]);

  // Working set the user is editing.
  const [selected, setSelected] = useState<Set<DAOModule>>(() => new Set(current));

  // Integration depth working copy.
  const currentLevels = useDAOIntegrationLevels(dao);
  const [levels, setLevels] = useState<Partial<Record<DAOModule, IntegrationLevel>>>(
    () => ({ ...currentLevels }),
  );

  // Module deep-config working copy.
  const currentConfig = useDAOModuleConfig(dao);
  const [config, setConfig] = useState<DAOModuleConfig>(() => ({ ...currentConfig }));

  // Is the DAO currently on LEGACY fallback (no explicit modules & no override)?
  const hasOverride =
    Boolean(daoModuleOverrides.get(dao.id)) ||
    Boolean(daoIntegrationOverrides.get(dao.id)) ||
    Boolean(daoModuleConfigOverrides.get(dao.id));
  const isLegacyFallback = !hasOverride && (!dao.modules || dao.modules.length === 0);

  const toggle = (m: DAOModule) => {
    if (LOCKED.includes(m)) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(m)) {
        next.delete(m);
        // Drop dependents whose requires are no longer satisfied.
        for (const other of Array.from(next)) {
          const reqs = MODULE_META[other]?.requires ?? [];
          if (reqs.some((r) => !next.has(r))) next.delete(other);
        }
      } else {
        next.add(m);
        for (const r of MODULE_META[m]?.requires ?? []) next.add(r);
      }
      return next;
    });
  };

  const modulesByGroup = useMemo(() => {
    const map = new Map<DAOModuleMeta["group"], DAOModule[]>();
    for (const m of MODULE_ORDER) {
      const g = MODULE_META[m].group;
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(m);
    }
    return map;
  }, []);

  // Diff: what would change if the user saved right now.
  const added = useMemo(
    () => orderedModules(Array.from(selected).filter((m) => !baseline.has(m))),
    [selected, baseline],
  );
  const removed = useMemo(
    () => orderedModules(Array.from(baseline).filter((m) => !selected.has(m))),
    [selected, baseline],
  );
  const handleSave = () => {
    const final = orderedModules(withDependencies([...Array.from(selected), ...LOCKED]));
    daoModuleOverrides.set(dao.id, final);
    // Persist only levels for modules that are actually enabled.
    const reconciledLevels: Partial<Record<DAOModule, IntegrationLevel>> = {};
    for (const m of final) {
      if (!isIntegrationModule(m)) continue;
      reconciledLevels[m] = levels[m] ?? defaultLevelFor(m);
    }
    daoIntegrationOverrides.setAll(dao.id, reconciledLevels);
    // Persist only configs for modules that are actually enabled.
    const reconciledConfig: DAOModuleConfig = {};
    for (const m of final) {
      if (!hasModuleConfig(m)) continue;
      reconciledConfig[m] = config[m] ?? defaultConfigFor(m);
    }
    daoModuleConfigOverrides.setAll(dao.id, reconciledConfig);
    onClose();
  };

  const handleReset = () => {
    daoModuleOverrides.clear(dao.id);
    daoIntegrationOverrides.clear(dao.id);
    daoModuleConfigOverrides.clear(dao.id);
    const fallback = orderedModules(resolveModules(dao.modules, dao.projectType));
    setSelected(new Set(fallback));
    // Reset working levels to seed defaults.
    const nextLevels: Partial<Record<DAOModule, IntegrationLevel>> = {};
    for (const m of fallback) {
      if (!isIntegrationModule(m)) continue;
      nextLevels[m] = dao.integrationLevels?.[m] ?? defaultLevelFor(m);
    }
    setLevels(nextLevels);
    // Reset working config to seed/defaults.
    const nextConfig: DAOModuleConfig = {};
    for (const m of fallback) {
      if (!hasModuleConfig(m)) continue;
      nextConfig[m] = { ...defaultConfigFor(m), ...(dao.moduleConfig?.[m] ?? {}) };
    }
    setConfig(nextConfig);
  };

  const setLevel = (m: DAOModule, level: IntegrationLevel) => {
    setLevels((prev) => ({ ...prev, [m]: level }));
  };

  const setModuleConfig = (m: DAOModule, v: Record<string, string | number>) => {
    setConfig((prev) => ({ ...prev, [m]: v }));
  };

  // Detect whether levels changed.
  const levelsDirty = useMemo(() => {
    const keys = new Set([...Object.keys(levels), ...Object.keys(currentLevels)]);
    for (const k of keys) {
      const a = levels[k as DAOModule];
      const b = currentLevels[k as DAOModule];
      if (selected.has(k as DAOModule) && a !== b) return true;
    }
    return false;
  }, [levels, currentLevels, selected]);

  // Detect whether any config field changed (only for currently-selected modules).
  const configDirty = useMemo(() => {
    for (const m of Array.from(selected)) {
      if (!hasModuleConfig(m)) continue;
      const a = config[m] ?? {};
      const b = currentConfig[m] ?? {};
      const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
      for (const k of keys) {
        if (a[k] !== b[k]) return true;
      }
    }
    return false;
  }, [config, currentConfig, selected]);

  const dirty = added.length > 0 || removed.length > 0 || levelsDirty || configDirty;

  const previewTabs = orderedModules(Array.from(selected)).filter((m) => m !== "protocolCard");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Button variant="ghost" size="sm" onClick={onClose} className="gap-1 text-muted-foreground">
            <ArrowLeft className="w-4 h-4" />
            {t("dao.moduleSettings.back")}
          </Button>
          <div className="min-w-0">
            <h2 className="text-lg truncate">{t("dao.moduleSettings.title")}</h2>
            <p className="text-xs text-muted-foreground truncate">{t("dao.moduleSettings.subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Status banner */}
      {isLegacyFallback && (
        <Card className="bg-accent/40 border-border p-4">
          <p className="text-sm">
            <span className="font-medium">{t("dao.moduleSettings.legacyTitle")}</span>
            <span className="text-muted-foreground ml-1">{t("dao.moduleSettings.legacyDesc")}</span>
          </p>
        </Card>
      )}

      {/* Diff preview */}
      {dirty && (
        <Card className="bg-card border-border p-4 space-y-3">
          <div className="text-sm font-medium">{t("dao.moduleSettings.diffTitle")}</div>
          {added.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-muted-foreground mr-1 inline-flex items-center gap-1">
                <Plus className="w-3 h-3 text-green-500" />
                {t("dao.moduleSettings.added")}
              </span>
              {added.map((m) => (
                <Badge key={m} className="bg-green-500/10 text-green-400 border border-green-500/30">
                  {t(MODULE_META[m].labelKey)}
                </Badge>
              ))}
            </div>
          )}
          {removed.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-muted-foreground mr-1 inline-flex items-center gap-1">
                <Minus className="w-3 h-3 text-red-500" />
                {t("dao.moduleSettings.removed")}
              </span>
              {removed.map((m) => (
                <Badge key={m} className="bg-red-500/10 text-red-400 border border-red-500/30">
                  {t(MODULE_META[m].labelKey)}
                </Badge>
              ))}
            </div>
          )}
          {removed.length > 0 && (
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("dao.moduleSettings.removedWarning")}
            </p>
          )}
        </Card>
      )}

      {/* Module grid */}
      <Card className="bg-card border-border p-4 sm:p-6 space-y-5">
        {GROUPS.map((group) => {
          const items = modulesByGroup.get(group) ?? [];
          if (items.length === 0) return null;
          return (
            <div key={group}>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                {t(`create.modules.group.${group}`)}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {items.map((m) => {
                  const active = selected.has(m);
                  const locked = LOCKED.includes(m);
                  const meta = MODULE_META[m];
                  const requires = meta.requires ?? [];
                  const isNew = active && !baseline.has(m);
                  const isGone = !active && baseline.has(m);
                  return (
                    <div
                      key={m}
                      role="button"
                      tabIndex={locked ? -1 : 0}
                      aria-disabled={locked}
                      aria-pressed={active}
                      onClick={() => !locked && toggle(m)}
                      onKeyDown={(e) => {
                        if (locked) return;
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggle(m);
                        }
                      }}
                      className={`text-left rounded-lg border p-3 transition select-none ${
                        active
                          ? "border-foreground bg-accent"
                          : "border-border bg-secondary hover:border-foreground/40"
                      } ${locked ? "opacity-80 cursor-not-allowed" : "cursor-pointer"} ${
                        isNew ? "ring-1 ring-green-500/40" : ""
                      } ${isGone ? "ring-1 ring-red-500/40" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-sm">{t(meta.labelKey)}</span>
                            {locked && (
                              <Badge variant="outline" className="text-[10px] border-border text-muted-foreground">
                                {t("create.modules.locked")}
                              </Badge>
                            )}
                            {isNew && (
                              <Badge className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/30">
                                +
                              </Badge>
                            )}
                            {isGone && (
                              <Badge className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/30">
                                −
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-1 line-clamp-2">
                            {t(meta.descKey)}
                          </p>
                          {requires.length > 0 && (
                            <div className="text-[10px] text-muted-foreground mt-1">
                              {t("create.modules.requires")}:{" "}
                              {requires.map((r) => t(MODULE_META[r].labelKey)).join("、")}
                            </div>
                          )}
                        </div>
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                            active ? "bg-foreground border-foreground" : "border-border"
                          }`}
                        >
                          {active && <Check className="w-3 h-3 text-background" />}
                        </div>
                      </div>
                      {active && isIntegrationModule(m) && (
                        <IntegrationLevelPicker
                          module={m}
                          value={levels[m] ?? defaultLevelFor(m)!}
                          onChange={(level) => setLevel(m, level)}
                        />
                      )}
                      {active && hasModuleConfig(m) && (
                        <ModuleConfigEditor
                          module={m}
                          value={config[m] ?? defaultConfigFor(m)}
                          onChange={(v) => setModuleConfig(m, v)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Card>

      {/* Preview */}
      <Card className="bg-card border-border p-4 sm:p-6">
        <div className="text-sm font-medium mb-2">{t("create.modules.previewTitle")}</div>
        <div className="flex flex-wrap gap-1.5">
          {previewTabs.length === 0 ? (
            <span className="text-sm text-muted-foreground">{t("create.modules.previewEmpty")}</span>
          ) : (
            previewTabs.map((m) => (
              <Badge key={m} className="bg-secondary text-foreground border border-border">
                {t(MODULE_META[m].labelKey)}
              </Badge>
            ))
          )}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3 pb-4">
        <Button
          variant="ghost"
          className="text-muted-foreground gap-1.5"
          onClick={handleReset}
          disabled={!hasOverride}
        >
          <RotateCcw className="w-4 h-4" />
          {t("dao.moduleSettings.reset")}
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="border-border text-muted-foreground">
            {t("dao.moduleSettings.cancel")}
          </Button>
          <Button onClick={handleSave} disabled={!dirty} className="gap-1.5">
            <Save className="w-4 h-4" />
            {t("dao.moduleSettings.save")}
          </Button>
        </div>
      </div>
    </div>
  );
}
