import { useTranslation } from "react-i18next";
import { Settings } from "lucide-react";
import { Input } from "../../ui/input";
import { configSchemaFor } from "@/data";
import type { DAOModule } from "@/types";

interface Props {
  module: DAOModule;
  value: Record<string, string | number>;
  onChange: (next: Record<string, string | number>) => void;
}

/**
 * Generic per-module config form. Fields come from MODULE_CONFIG_SCHEMA —
 * this component is purely a renderer, no module-specific logic.
 *
 * i18n convention:
 *   dao.moduleConfig.<moduleId>.<fieldKey>.{label,placeholder,help}
 */
export function ModuleConfigEditor({ module, value, onChange }: Props) {
  const { t, i18n } = useTranslation();
  const schema = configSchemaFor(module);
  if (schema.length === 0) return null;

  const maybe = (key: string, fallback?: string) =>
    i18n.exists(key) ? t(key) : (fallback ?? "");

  const setField = (k: string, v: string | number) => {
    onChange({ ...value, [k]: v });
  };

  return (
    <div className="mt-3 pt-3 border-t border-border/60 space-y-2.5">
      <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        <Settings className="w-3 h-3" />
        {t("dao.moduleConfig.sectionLabel")}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {schema.map((f) => {
          const base = `dao.moduleConfig.${module}.${f.key}`;
          const label = maybe(`${base}.label`, f.key);
          const placeholder = maybe(`${base}.placeholder`);
          const help = maybe(`${base}.help`);
          const raw = value[f.key];
          return (
            <label key={f.key} className="block" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs text-muted-foreground">
                  {label}
                  {f.required && <span className="text-red-400 ml-0.5">*</span>}
                </span>
                {f.unit && <span className="text-[10px] text-muted-foreground/70">{f.unit}</span>}
              </div>
              <Input
                type={f.type === "number" ? "number" : f.type === "url" ? "url" : "text"}
                value={raw ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  if (f.type === "number") {
                    const n = v === "" ? "" : Number(v);
                    if (n === "" ) setField(f.key, "");
                    else if (!Number.isNaN(n)) setField(f.key, n);
                  } else {
                    setField(f.key, v);
                  }
                }}
                onKeyDown={(e) => {
                  // Stop bubbling so the parent toggle card doesn't fire on Enter.
                  if (e.key === "Enter" || e.key === " ") e.stopPropagation();
                }}
                placeholder={placeholder}
                min={f.min}
                max={f.max}
                className="bg-background border-border h-8 text-sm"
              />
              {help && <p className="text-[10px] text-muted-foreground/80 mt-1">{help}</p>}
            </label>
          );
        })}
      </div>
    </div>
  );
}
