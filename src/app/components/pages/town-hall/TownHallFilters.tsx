import { useTranslation } from "react-i18next";
import { Button } from "../../ui/button";
import { RotateCcw, Check } from "lucide-react";
import { VALUE_DIMENSIONS, SPECTRUM_AXES, type ValueDimension, type SpectrumAxis } from "@/types/dao-tags";
import type { DAOProjectType } from "@/types";

const PROJECT_TYPES: DAOProjectType[] = [
  "socialPublic", "techInternet", "mediaContent", "toolsProduct",
  "education", "research", "publicGood", "communityLife",
  "cultureArt", "business", "industryChange", "localSpace",
  "manufacturing", "healthCare", "ecoAgriculture", "infrastructure",
];

const MODES = ["all", "online", "offline", "hybrid"] as const;

export type SortField = "members" | "activity" | null;

export interface TownHallFilterState {
  valueDim: ValueDimension | null;
  spectrumSelections: Partial<Record<SpectrumAxis, "left" | "right">>;
  projectType: string;
  sortField: SortField;
  mode: string;
  region: string;
}

export const defaultFilters: TownHallFilterState = {
  valueDim: null,
  spectrumSelections: {},
  projectType: "all",
  sortField: null,
  mode: "all",
  region: "global",
};

interface Props {
  filters: TownHallFilterState;
  onChange: (f: TownHallFilterState) => void;
  showPanel: boolean;
  onClose: () => void;
}

export function TownHallFilters({ filters, onChange, showPanel, onClose }: Props) {
  const { t } = useTranslation();
  const set = <K extends keyof TownHallFilterState>(key: K, value: TownHallFilterState[K]) =>
    onChange({ ...filters, [key]: value });

  const toggleValue = (dim: ValueDimension) => {
    set("valueDim", filters.valueDim === dim ? null : dim);
  };

  const setSpectrum = (axis: SpectrumAxis, side: "left" | "right" | null) => {
    const next = { ...filters.spectrumSelections };
    if (side === null) {
      delete next[axis];
    } else {
      next[axis] = side;
    }
    set("spectrumSelections", next);
  };

  const handleReset = () => onChange({ ...defaultFilters });

  return (
    <div className="space-y-3 mb-6">
      {/* 项目类型 — 单行横滑 */}
      <div className="overflow-x-auto scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex gap-1.5 w-max">
          <button
            onClick={() => set("projectType", "all")}
            className={`px-3 py-1 rounded-full transition text-xs whitespace-nowrap ${
              filters.projectType === "all"
                ? "bg-foreground text-background"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("townHall.filter.all")}
          </button>
          {PROJECT_TYPES.map((pt) => (
            <button
              key={pt}
              onClick={() => set("projectType", pt)}
              className={`px-3 py-1 rounded-full transition text-xs whitespace-nowrap ${
                filters.projectType === pt
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(`townHall.filter.projectTypes.${pt}` as never)}
            </button>
          ))}
        </div>
      </div>

      {/* 筛选面板 */}
      <div className={showPanel ? "" : "hidden"}>
        <div className="border border-border rounded-lg p-4 space-y-5 bg-card">
          {/* 核心价值观 — 单选 */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">{t("townHall.filter.values")}</p>
            <div className="flex flex-wrap gap-1.5">
              {VALUE_DIMENSIONS.map((dim) => (
                <button
                  key={dim}
                  onClick={() => toggleValue(dim)}
                  className={`px-2.5 py-1 rounded-full text-xs transition ${
                    filters.valueDim === dim
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(`daoProfile.value.${dim}` as never)}
                </button>
              ))}
            </div>
          </div>

          {/* 协作方式 — 三档光谱点 */}
          <div>
            <p className="text-xs text-muted-foreground mb-3">{t("townHall.filter.spectrum")}</p>
            <div className="space-y-3">
              {SPECTRUM_AXES.map((axis) => {
                const labels = t(`daoProfile.spectrum.${axis}` as never, { returnObjects: true }) as [string, string];
                const sel = filters.spectrumSelections[axis] ?? null;
                return (
                  <div key={axis} className="flex items-center gap-2">
                    <span className={`text-xs w-20 text-right shrink-0 transition-colors ${sel === "left" ? "text-primary font-medium" : "text-muted-foreground"}`}>
                      {labels[0]}
                    </span>
                    <div className="flex-1 flex items-center">
                      <div className="relative flex items-center w-full h-5">
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-border" />
                        {(["left", null, "right"] as const).map((side, i) => {
                          const isActive = sel === side;
                          const pos = i === 0 ? "left-0" : i === 1 ? "left-1/2 -translate-x-1/2" : "right-0";
                          return (
                            <button
                              key={side ?? "none"}
                              onClick={() => setSpectrum(axis, side)}
                              className={`absolute ${pos} w-4 h-4 rounded-full border-2 transition-all ${
                                isActive
                                  ? "bg-primary border-primary scale-125"
                                  : "bg-background border-border hover:border-foreground/40"
                              }`}
                              title={side === null ? t("townHall.filter.noFilter" as never) : ""}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <span className={`text-xs w-20 shrink-0 transition-colors ${sel === "right" ? "text-primary font-medium" : "text-muted-foreground"}`}>
                      {labels[1]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 参与形式 — 独立筛选，不再绑定区域 */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">{t("filter.mode")}</p>
            <div className="flex flex-wrap gap-1.5">
              {MODES.map((m) => (
                <button
                  key={m}
                  onClick={() => set("mode", m)}
                  className={`px-2.5 py-1 rounded-full text-xs transition ${
                    filters.mode === m
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(`filter.mode${m.charAt(0).toUpperCase() + m.slice(1)}`)}
                </button>
              ))}
            </div>
          </div>

          {/* 重置 + 确定 */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1" onClick={handleReset}>
              <RotateCcw className="w-3 h-3" />
              {t("townHall.filter.reset" as never)}
            </Button>
            <Button size="sm" className="text-xs gap-1" onClick={onClose}>
              <Check className="w-3 h-3" />
              {t("townHall.filter.confirm" as never)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
