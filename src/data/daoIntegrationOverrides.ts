import type { DAOModule, IntegrationLevel } from "@/types";

/**
 * Client-side overrides for a DAO's per-module integration depth.
 * Parallel to daoModuleOverrides — kept separate because modules and
 * integration levels are orthogonal concerns (a DAO may opt into a
 * module at default depth without ever overriding its module set).
 *
 * Stored as { [daoId]: { [module]: "L0" | "L1" | ... } }.
 */

const STORAGE_KEY = "humadao:dao-integration-levels";

type LevelMap = Partial<Record<DAOModule, IntegrationLevel>>;
type Store = Record<string, LevelMap>;
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
    // ignore
  }
}

const listeners = new Set<Listener>();
const emit = () => listeners.forEach((l) => l());

export const daoIntegrationOverrides = {
  get(daoId: string): LevelMap | undefined {
    return read()[daoId];
  },
  setLevel(daoId: string, module: DAOModule, level: IntegrationLevel) {
    const store = read();
    const current = store[daoId] ?? {};
    current[module] = level;
    store[daoId] = current;
    write(store);
    emit();
  },
  setAll(daoId: string, levels: LevelMap) {
    const store = read();
    store[daoId] = levels;
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
