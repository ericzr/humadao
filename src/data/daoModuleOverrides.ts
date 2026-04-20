import type { DAOModule } from "@/types";

/**
 * Client-side overrides for a DAO's module set, backed by localStorage.
 *
 * The production system will persist this on-chain / in the DAO registry; for
 * the demo we keep it browser-local so the "Slim down legacy DAO" wizard can
 * produce visible, reversible changes without touching the seed data in
 * `src/data/dao.ts`.
 *
 * Keyed by DAO id. `null` value = explicit opt-out (treated as "no override").
 */

const STORAGE_KEY = "humadao:dao-module-overrides";

type Store = Record<string, DAOModule[]>;

type Listener = () => void;

function read(): Store {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed ? (parsed as Store) : {};
  } catch {
    return {};
  }
}

function write(store: Store) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore quota / private-mode errors; override simply won't persist
  }
}

const listeners = new Set<Listener>();

function emit() {
  for (const l of listeners) l();
}

export const daoModuleOverrides = {
  get(daoId: string): DAOModule[] | undefined {
    return read()[daoId];
  },
  set(daoId: string, modules: DAOModule[]) {
    const store = read();
    store[daoId] = modules;
    write(store);
    emit();
  },
  clear(daoId: string) {
    const store = read();
    delete store[daoId];
    write(store);
    emit();
  },
  subscribe(fn: Listener): () => void {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
