import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { Card, CardContent } from "../../ui/card";
import { Sparkles, Link2, Settings } from "lucide-react";
import type { DAOModule } from "@/types";
import {
  MODULE_META,
  isIntegrationModule,
  hasModuleConfig,
  configSchemaFor,
} from "@/data";
import { findDAOById } from "@/data/dao";
import { useDAOIntegrationLevels } from "@/app/hooks/useDAOIntegrationLevels";
import { useDAOModuleConfig } from "@/app/hooks/useDAOModuleConfig";

interface ModulePlaceholderProps {
  module: DAOModule;
}

/**
 * Fallback UI for modules that are enabled in a DAO's preset but whose
 * dedicated component isn't built yet. Lets the module architecture roll out
 * before every feature is implemented — users see the slot, not a broken tab.
 *
 * For integration / configurable modules, we surface the resolved settings
 * (depth level + config fields) so admins can see their config take effect
 * even before the real feature lands.
 */
export function ModulePlaceholder({ module }: ModulePlaceholderProps) {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const dao = id ? findDAOById(id) : undefined;
  const meta = MODULE_META[module];

  const levels = useDAOIntegrationLevels(dao);
  const configs = useDAOModuleConfig(dao);

  const level = isIntegrationModule(module) ? levels[module] : undefined;
  const config = hasModuleConfig(module) ? configs[module] : undefined;
  const schema = hasModuleConfig(module) ? configSchemaFor(module) : [];

  const resolveLabel = (fieldKey: string) => {
    const key = `dao.moduleConfig.${module}.${fieldKey}.label`;
    return i18n.exists(key) ? t(key) : fieldKey;
  };

  return (
    <Card className="border-dashed bg-card/50">
      <CardContent className="p-8 sm:p-10 flex flex-col items-center text-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-medium text-sm">{t(meta.labelKey)}</p>
          <p className="text-muted-foreground text-xs mt-1 max-w-md leading-5">
            {t(meta.descKey)}
          </p>
        </div>
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider mt-2">
          {t("dao.module.comingSoon")}
        </p>

        {(level || (config && schema.length > 0)) && (
          <div className="mt-4 w-full max-w-md border-t border-border pt-4 space-y-2 text-left">
            {level && (
              <div className="flex items-center gap-2 text-xs">
                <Link2 className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">{t("dao.integration.depthLabel")}:</span>
                <span className="font-medium">{level}</span>
                <span className="text-muted-foreground">· {t(`dao.integration.level.${level}.label`)}</span>
              </div>
            )}
            {config && schema.length > 0 && (
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <Settings className="w-3 h-3" />
                  {t("dao.moduleConfig.sectionLabel")}
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
                  {schema.map((f) => {
                    const v = config[f.key];
                    return (
                      <div key={f.key} className="contents">
                        <span className="text-muted-foreground">{resolveLabel(f.key)}</span>
                        <span className="font-mono text-[11px] break-all">
                          {v === undefined || v === "" ? (
                            <span className="text-muted-foreground/60">—</span>
                          ) : (
                            <>
                              {String(v)}
                              {f.unit && <span className="text-muted-foreground/70">{f.unit}</span>}
                            </>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
