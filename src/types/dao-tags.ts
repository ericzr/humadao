/* ── 价值观坐标系 (Soul) ── */

export const VALUE_DIMENSIONS = [
  "love",
  "commons",
  "justice",
  "truth",
  "valueCreation",
  "freedom",
  "order",
] as const;

export type ValueDimension = (typeof VALUE_DIMENSIONS)[number];

/** 0–100 per dimension */
export type ValuesProfile = Record<ValueDimension, number>;

/* ── 运行与分配坐标系 (Institution) ── */

export const SPECTRUM_AXES = [
  "visionVsTask",
  "coreAuthVsBroadGov",
  "longVsShort",
] as const;

export type SpectrumAxis = (typeof SPECTRUM_AXES)[number];

/** 0 = left pole, 100 = right pole */
export type SpectrumProfile = Record<SpectrumAxis, number>;

/* ── Composite profile ── */

export interface DAOProfile {
  values: ValuesProfile;
  spectrum: SpectrumProfile;
}

/* ── Presets ── */

export type DAOArchetype = "idealCommunity" | "projectExecution" | "crowdsourcing" | "publicGood";

export const DAO_PRESETS: Record<DAOArchetype, DAOProfile> = {
  idealCommunity: {
    values: { love: 90, commons: 90, justice: 60, truth: 50, valueCreation: 50, freedom: 85, order: 40 },
    spectrum: { visionVsTask: 15, coreAuthVsBroadGov: 75, longVsShort: 15 },
  },
  projectExecution: {
    values: { love: 30, commons: 40, justice: 50, truth: 80, valueCreation: 90, freedom: 40, order: 85 },
    spectrum: { visionVsTask: 80, coreAuthVsBroadGov: 25, longVsShort: 70 },
  },
  crowdsourcing: {
    values: { love: 30, commons: 55, justice: 40, truth: 50, valueCreation: 85, freedom: 90, order: 35 },
    spectrum: { visionVsTask: 85, coreAuthVsBroadGov: 35, longVsShort: 85 },
  },
  publicGood: {
    values: { love: 90, commons: 85, justice: 85, truth: 60, valueCreation: 40, freedom: 60, order: 50 },
    spectrum: { visionVsTask: 15, coreAuthVsBroadGov: 80, longVsShort: 20 },
  },
};

export const DEFAULT_VALUES: ValuesProfile = {
  love: 50, commons: 50, justice: 50, truth: 50,
  valueCreation: 50, freedom: 50, order: 50,
};

export const DEFAULT_SPECTRUM: SpectrumProfile = {
  visionVsTask: 50, coreAuthVsBroadGov: 50, longVsShort: 50,
};
