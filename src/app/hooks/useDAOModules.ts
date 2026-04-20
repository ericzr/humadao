import { useSyncExternalStore, useMemo } from "react";
import { daoModuleOverrides, resolveModules, orderedModules } from "@/data";
import type { DAO, DAOModule } from "@/types";

/**
 * Reactive resolver for a DAO's effective module list.
 * Priority:
 *   1. Client-side override from daoModuleOverrides (set via the settings wizard)
 *   2. dao.modules declared on the seed data (new modular DAOs)
 *   3. LEGACY_MODULES (legacy grandfathered DAOs)
 *
 * Returned list is always in canonical MODULE_ORDER.
 */
export function useDAOModules(dao: DAO | undefined): DAOModule[] {
  const override = useSyncExternalStore(
    daoModuleOverrides.subscribe,
    () => (dao ? daoModuleOverrides.get(dao.id) : undefined),
    () => undefined,
  );

  return useMemo(() => {
    if (!dao) return [];
    const base = override ?? resolveModules(dao.modules, dao.projectType);
    return orderedModules(base);
  }, [dao, override]);
}
