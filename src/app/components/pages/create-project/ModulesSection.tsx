import { useMemo } from "react";
import { Check, Layers } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import {
  MODULE_ORDER,
  MODULE_META,
  PRESETS,
  orderedModules,
  withDependencies,
  isIntegrationModule,
  defaultLevelFor,
  hasModuleConfig,
  defaultConfigFor,
} from "@/data";
import type { DAOModule, DAOModuleConfig, DAOPreset, IntegrationLevel } from "@/types";
import type { CreateDAOFormData } from "../CreateProjectPage";
import { IntegrationLevelPicker } from "./IntegrationLevelPicker";
import { ModuleConfigEditor } from "./ModuleConfigEditor";

interface Props {
  form?: CreateDAOFormData;
  update?: (patch: Partial<CreateDAOFormData>) => void;
}

const GROUPS: DAOModuleMeta["group"][] = [
  "core",
  "basic",
  "governance",
  "economic",
  "advanced",
  "integration",
];

type DAOModuleMeta = (typeof MODULE_META)[keyof typeof MODULE_META];

const PRESET_ORDER: DAOPreset[] = ["lite", "study", "standard", "protocol", "care", "custom"];

/**
 * Locked modules — removing them from the module set would break the
 * DAO identity page. Kept always on regardless of user toggles.
 */
const LOCKED: DAOModule[] = ["profile", "lineage", "protocolCard"];

export function ModulesSection({ form, update }: Props) {
  const { t } = useTranslation();
  const preset = form?.preset ?? "standard";
  const selected = useMemo(() => new Set(form?.modules ?? PRESETS.standard.modules), [form?.modules]);

  const currentLevels = form?.integrationLevels ?? {};
  const currentConfig = form?.moduleConfig ?? {};

  const reconcileLevels = (modules: DAOModule[]): Partial<Record<DAOModule, IntegrationLevel>> => {
    const out: Partial<Record<DAOModule, IntegrationLevel>> = {};
    for (const m of modules) {
      if (!isIntegrationModule(m)) continue;
      out[m] = currentLevels[m] ?? defaultLevelFor(m);
    }
    return out;
  };

  const reconcileConfig = (modules: DAOModule[]): DAOModuleConfig => {
    const out: DAOModuleConfig = {};
    for (const m of modules) {
      if (!hasModuleConfig(m)) continue;
      out[m] = currentConfig[m] ?? defaultConfigFor(m);
    }
    return out;
  };

  const applyPreset = (p: DAOPreset) => {
    const next = orderedModules(withDependencies([...PRESETS[p].modules, ...LOCKED]));
    update?.({
      preset: p,
      modules: next,
      integrationLevels: reconcileLevels(next),
      moduleConfig: reconcileConfig(next),
    });
  };

  const toggleModule = (m: DAOModule) => {
    if (LOCKED.includes(m)) return;
    const next = new Set(selected);
    if (next.has(m)) {
      next.delete(m);
      // drop dependents that now have missing requires
      for (const other of Array.from(next)) {
        const reqs = MODULE_META[other]?.requires ?? [];
        if (reqs.some((r) => !next.has(r))) next.delete(other);
      }
    } else {
      next.add(m);
      for (const r of MODULE_META[m]?.requires ?? []) next.add(r);
    }
    const modules = orderedModules(Array.from(next));
    update?.({
      preset: "custom",
      modules,
      integrationLevels: reconcileLevels(modules),
      moduleConfig: reconcileConfig(modules),
    });
  };

  const setLevel = (m: DAOModule, level: IntegrationLevel) => {
    update?.({
      integrationLevels: { ...currentLevels, [m]: level },
    });
  };

  const setConfig = (m: DAOModule, value: Record<string, string | number>) => {
    update?.({
      moduleConfig: { ...currentConfig, [m]: value },
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

  const previewTabs = useMemo(
    () => orderedModules(Array.from(selected)).filter((m) => m !== "protocolCard"),
    [selected],
  );

  return (
    <div className="space-y-4">
      {/* Preset picker */}
      <Card className="bg-card border-border p-4 sm:p-6 space-y-4">
        <div>
          <h2>{t("create.modules.presetTitle")}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t("create.modules.presetDesc")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRESET_ORDER.map((p) => {
            const meta = PRESETS[p];
            const active = preset === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => applyPreset(p)}
                className={`text-left rounded-lg border p-3 transition ${
                  active
                    ? "border-foreground bg-accent"
                    : "border-border bg-secondary hover:border-foreground/40"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-medium text-sm">{t(meta.labelKey)}</span>
                  {active && <Check className="w-4 h-4 text-foreground shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {t(meta.descKey)}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-[10px] border-border text-muted-foreground">
                    {meta.modules.length} {t("create.modules.modulesSuffix")}
                  </Badge>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Module fine-tuning */}
      <Card className="bg-card border-border p-4 sm:p-6 space-y-4">
        <div>
          <h2>{t("create.modules.tuneTitle")}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t("create.modules.tuneDesc")}</p>
        </div>

        <div className="space-y-5">
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
                    return (
                      <div
                        key={m}
                        role="button"
                        tabIndex={locked ? -1 : 0}
                        aria-disabled={locked}
                        aria-pressed={active}
                        onClick={() => !locked && toggleModule(m)}
                        onKeyDown={(e) => {
                          if (locked) return;
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleModule(m);
                          }
                        }}
                        className={`text-left rounded-lg border p-3 transition select-none ${
                          active
                            ? "border-foreground bg-accent"
                            : "border-border bg-secondary hover:border-foreground/40"
                        } ${locked ? "opacity-80 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{t(meta.labelKey)}</span>
                              {locked && (
                                <Badge variant="outline" className="text-[10px] border-border text-muted-foreground">
                                  {t("create.modules.locked")}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed mt-1 line-clamp-2">
                              {t(meta.descKey)}
                            </p>
                            {requires.length > 0 && (
                              <div className="text-[10px] text-muted-foreground mt-1">
                                {t("create.modules.requires")}: {requires.map((r) => t(MODULE_META[r].labelKey)).join("、")}
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
                            value={currentLevels[m] ?? defaultLevelFor(m)!}
                            onChange={(level) => setLevel(m, level)}
                          />
                        )}
                        {active && hasModuleConfig(m) && (
                          <ModuleConfigEditor
                            module={m}
                            value={currentConfig[m] ?? defaultConfigFor(m)}
                            onChange={(v) => setConfig(m, v)}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Live preview */}
      <Card className="bg-card border-border p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-base">{t("create.modules.previewTitle")}</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-3">{t("create.modules.previewDesc")}</p>
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
    </div>
  );
}
