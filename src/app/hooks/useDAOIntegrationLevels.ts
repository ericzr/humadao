import { useSyncExternalStore, useMemo } from "react";
import {
  daoIntegrationOverrides,
  defaultLevelFor,
  isIntegrationModule,
  supportedLevelsFor,
} from "@/data";
import type { DAO, DAOModule, IntegrationLevel } from "@/types";

/**
 * Resolve the effective integration-depth map for a DAO.
 * Priority per module:
 *   1. local override (daoIntegrationOverrides)
 *   2. dao.integrationLevels (seed)
 *   3. DEFAULT_LEVEL
 *
 * Invalid values (level not in SUPPORTED_LEVELS for that module) are dropped
 * back to DEFAULT_LEVEL so stale data can't render a broken option.
 */
export function useDAOIntegrationLevels(
  dao: DAO | undefined,
): Partial<Record<DAOModule, IntegrationLevel>> {
  const override = useSyncExternalStore(
    daoIntegrationOverrides.subscribe,
    () => (dao ? daoIntegrationOverrides.get(dao.id) : undefined),
    () => undefined,
  );

  return useMemo(() => {
    if (!dao) return {};
    const out: Partial<Record<DAOModule, IntegrationLevel>> = {};
    const seed = dao.integrationLevels ?? {};
    for (const m of dao.modules ?? []) {
      if (!isIntegrationModule(m)) continue;
      const supported = supportedLevelsFor(m);
      const candidate = override?.[m] ?? seed[m] ?? defaultLevelFor(m);
      out[m] = candidate && supported.includes(candidate)
        ? candidate
        : defaultLevelFor(m);
    }
    return out;
  }, [dao, override]);
}
