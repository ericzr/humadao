import type { DAOModule, DAOModuleConfig } from "@/types";

/**
 * Client-side overrides for a DAO's per-module deep configuration.
 * Parallel to daoModuleOverrides / daoIntegrationOverrides.
 *
 * Stored as { [daoId]: { [module]: { fieldKey: value, ... } } }.
 * Values are string | number to match MODULE_CONFIG_SCHEMA field types.
 */

const STORAGE_KEY = "humadao:dao-module-config";

type Store = Record<string, DAOModuleConfig>;
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
    // ignore quota errors
  }
}

const listeners = new Set<Listener>();
const emit = () => listeners.forEach((l) => l());

export const daoModuleConfigOverrides = {
  get(daoId: string): DAOModuleConfig | undefined {
    return read()[daoId];
  },
  setModule(daoId: string, module: DAOModule, value: Record<string, string | number>) {
    const store = read();
    const current = store[daoId] ?? {};
    current[module] = value;
    store[daoId] = current;
    write(store);
    emit();
  },
  setAll(daoId: string, value: DAOModuleConfig) {
    const store = read();
    store[daoId] = value;
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
