import { useSyncExternalStore, useMemo } from "react";
import { daoModuleConfigOverrides, configSchemaFor, defaultConfigFor } from "@/data";
import type { DAO, DAOModule, DAOModuleConfig } from "@/types";

/**
 * Resolve effective per-module config for a DAO.
 * Priority per module:
 *   1. override (daoModuleConfigOverrides)
 *   2. dao.moduleConfig (seed)
 *   3. schema defaults
 *
 * Fields not declared by the schema are silently dropped so stale data
 * can never produce a broken form row.
 */
export function useDAOModuleConfig(dao: DAO | undefined): DAOModuleConfig {
  const override = useSyncExternalStore(
    daoModuleConfigOverrides.subscribe,
    () => (dao ? daoModuleConfigOverrides.get(dao.id) : undefined),
    () => undefined,
  );

  return useMemo(() => {
    if (!dao) return {};
    const out: DAOModuleConfig = {};
    const seed = dao.moduleConfig ?? {};
    for (const m of dao.modules ?? []) {
      const schema = configSchemaFor(m);
      if (schema.length === 0) continue;
      const merged: Record<string, string | number> = { ...defaultConfigFor(m) };
      for (const f of schema) {
        const fromSeed = seed[m]?.[f.key];
        const fromOverride = override?.[m]?.[f.key];
        if (fromOverride !== undefined) merged[f.key] = fromOverride;
        else if (fromSeed !== undefined) merged[f.key] = fromSeed;
      }
      out[m] = merged;
    }
    return out;
  }, [dao, override]);
}
