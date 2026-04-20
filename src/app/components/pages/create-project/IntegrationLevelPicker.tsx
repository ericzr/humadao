import { useTranslation } from "react-i18next";
import { Link2 } from "lucide-react";
import { supportedLevelsFor } from "@/data";
import type { DAOModule, IntegrationLevel } from "@/types";

interface Props {
  module: DAOModule;
  value: IntegrationLevel;
  onChange: (level: IntegrationLevel) => void;
  /** Visual variant — `compact` for inline use under module cards. */
  variant?: "compact" | "default";
}

/**
 * Horizontal chip picker for integration depth. Filters to levels that the
 * given module actually supports (via SUPPORTED_LEVELS).
 *
 * Labels come from i18n: `dao.integration.level.<L0-L4>.label` and `.desc`.
 * A per-module-per-level override can also be placed at
 * `dao.integration.module.<moduleId>.<L0-L4>` if the generic description
 * needs nuancing (e.g. "Snapshot L3 = create proposals").
 */
export function IntegrationLevelPicker({ module, value, onChange, variant = "compact" }: Props) {
  const { t, i18n } = useTranslation();
  const supported = supportedLevelsFor(module);
  if (supported.length === 0) return null;

  const labelFor = (level: IntegrationLevel) => {
    const specific = `dao.integration.module.${module}.${level}`;
    const generic = `dao.integration.level.${level}.desc`;
    // If a module-specific key exists in the resource bundle, use it.
    const hasSpecific = i18n.exists(specific);
    return hasSpecific ? t(specific) : t(generic);
  };

  return (
    <div className={`flex flex-wrap gap-1.5 ${variant === "compact" ? "mt-2" : "mt-3"}`}>
      <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-wider">
        <Link2 className="w-3 h-3" />
        {t("dao.integration.depthLabel")}
      </span>
      {supported.map((level) => {
        const active = value === level;
        return (
          <button
            key={level}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(level);
            }}
            title={labelFor(level)}
            className={`text-[10px] px-2 py-0.5 rounded border transition ${
              active
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-muted-foreground hover:border-foreground/40"
            }`}
          >
            <span className="font-medium">{level}</span>
            <span className="ml-1 opacity-80">{t(`dao.integration.level.${level}.label`)}</span>
          </button>
        );
      })}
    </div>
  );
}
