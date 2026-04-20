import { useMemo, useState, useCallback } from "react";
import { Search, SlidersHorizontal, ChevronDown, ChevronRight, RotateCcw, Check } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ReputationIcon } from "../icons/ReputationIcon";
import { LocationPicker } from "../common/LocationPicker";
import { useTranslation } from "react-i18next";
import { ContributorCard } from "./contributors/ContributorCard";
import { contributorSkillOrder, contributors, townHallDAOs, getSkillLayer, isLocationMatch } from "@/data";
import type {
  ContributorRole,
  ContributorSkill,
  CollaborationMode,
  SkillLayer,
} from "@/types";

const MODES: Array<"all" | CollaborationMode> = ["all", "online", "offline", "hybrid"];

const ROLE_FILTERS: Array<"all" | ContributorRole> = [
  "all",
  "initiator",
  "coBuilder",
  "coordinator",
  "reviewer",
  "connector",
  "host",
];

export function ContributorsPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [sortByRep, setSortByRep] = useState(false);
  const [locationId, setLocationId] = useState<string | null>(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [mode, setMode] = useState<"all" | CollaborationMode>("all");
  const [role, setRole] = useState<"all" | ContributorRole>("all");
  const [selectedSkills, setSelectedSkills] = useState<ContributorSkill[]>([]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const daoNameMap = new Map(townHallDAOs.map((dao) => [dao.id, t(dao.nameKey).toLowerCase()]));

    const result = contributors.filter((contributor) => {
      const matchesSearch =
        !q ||
        contributor.name.toLowerCase().includes(q) ||
        contributor.bio.toLowerCase().includes(q) ||
        contributor.locationId?.toLowerCase().includes(q) ||
        contributor.skills.some((item) => t(`contributors.skill.${item}`).toLowerCase().includes(q)) ||
        contributor.roleAssignments.some((item) => t(`contributors.role.${item.role}`).toLowerCase().includes(q)) ||
        contributor.contributionAreas.some((item) => t(`contributors.contribution.${item}`).toLowerCase().includes(q)) ||
        contributor.roleAssignments.some((item) => daoNameMap.get(item.daoId)?.includes(q));

      const matchesAvailability = !availableOnly || contributor.available;
      const matchesLocation = !locationId || isLocationMatch(contributor.locationId, locationId);
      const matchesMode = mode === "all" || contributor.collaborationModes.includes(mode);
      const matchesRole = role === "all" || contributor.roleAssignments.some((item) => item.role === role);
      const matchesSkill =
        selectedSkills.length === 0 || selectedSkills.some((skill) => contributor.skills.includes(skill));

      return matchesSearch && matchesAvailability && matchesLocation && matchesMode && matchesRole && matchesSkill;
    });

    // Sort by reputation score (descending)
    if (sortByRep) {
      result.sort((a, b) => b.rep - a.rep);
    }

    return result;
  }, [availableOnly, locationId, mode, role, search, selectedSkills, sortByRep, t]);

  const activeFilterCount = (availableOnly ? 1 : 0) + (mode !== "all" ? 1 : 0) + (selectedSkills.length > 0 ? 1 : 0);

  const resetFilters = () => {
    setAvailableOnly(false);
    setMode("all");
    setSelectedSkills([]);
  };

  const toggleSkill = useCallback((skill: ContributorSkill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="mb-2">{t("contributors.title")}</h1>
      <p className="text-muted-foreground mb-6">{t("contributors.subtitle")}</p>

      {/* Top bar: Search + Sort toggles + Filter button */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t("contributors.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Sort by reputation toggle (click again to deselect) */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setSortByRep((v) => !v)}
              className={`relative flex items-center justify-center w-9 h-9 rounded-md border transition ${
                sortByRep
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              <ReputationIcon className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            {t("contributors.sort.reputation")}
          </TooltipContent>
        </Tooltip>

        {/* Location picker */}
        <LocationPicker value={locationId} onChange={setLocationId} />

        {/* Filter panel toggle */}
        <Button
          variant="outline"
          size="sm"
          className="h-9 text-xs border-border gap-1.5 shrink-0"
          onClick={() => setShowFilterPanel((v) => !v)}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          {t("contributors.filter.filterBtn")}
          {activeFilterCount > 0 && (
            <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[0.6rem] leading-none">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown className={`w-3 h-3 transition-transform ${showFilterPanel ? "rotate-180" : ""}`} />
        </Button>
      </div>

      {/* Role pills */}
      <div className="overflow-x-auto scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-3">
        <div className="flex gap-1.5 w-max">
          {ROLE_FILTERS.map((value) => (
            <button
              key={value}
              onClick={() => setRole(value)}
              className={`px-3 py-1 rounded-full transition text-xs whitespace-nowrap ${
                role === value
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {value === "all" ? t("contributors.roleFilter.all") : t(`contributors.role.${value}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Collapsible filter panel */}
      {showFilterPanel && (
        <div className="border border-border rounded-lg p-4 space-y-5 bg-card mb-4">
          {/* Availability toggle */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{t("contributors.filter.availability")}</span>
            <button
              onClick={() => setAvailableOnly((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                availableOnly ? "bg-primary" : "bg-secondary"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                  availableOnly ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Mode filter */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">{t("filter.mode")}</p>
            <div className="flex flex-wrap gap-1.5">
              {MODES.map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-2.5 py-1 rounded-full text-xs transition ${
                    mode === m
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(`filter.mode${m.charAt(0).toUpperCase() + m.slice(1)}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Skill filter (collapsible, multi-select) */}
          <SkillLayerFilterPills
            label={t("contributors.filter.skill")}
            skills={contributorSkillOrder}
            selectedSkills={selectedSkills}
            onToggleSkill={toggleSkill}
            onClearSkills={() => setSelectedSkills([])}
          />

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1" onClick={resetFilters}>
              <RotateCcw className="w-3 h-3" />
              {t("contributors.filter.reset")}
            </Button>
            <Button size="sm" className="text-xs gap-1" onClick={() => setShowFilterPanel(false)}>
              <Check className="w-3 h-3" />
              {t("contributors.filter.confirm")}
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filtered.map((contributor) => (
          <ContributorCard key={contributor.id} {...contributor} />
        ))}
      </div>
    </div>
  );
}

const layerPillStyles: Record<SkillLayer, { active: string; inactive: string }> = {
  1: {
    active: "bg-[#854f0b] text-white dark:bg-amber-700",
    inactive: "bg-[#faeed9] text-[#633806] hover:bg-[#f5dfc0] dark:bg-amber-900/30 dark:text-amber-200 dark:hover:bg-amber-900/50",
  },
  2: {
    active: "bg-[#0f6e56] text-white dark:bg-emerald-700",
    inactive: "bg-[#e1f5ee] text-[#085041] hover:bg-[#cdeee2] dark:bg-emerald-900/30 dark:text-emerald-200 dark:hover:bg-emerald-900/50",
  },
  3: {
    active: "bg-[#534ab7] text-white dark:bg-violet-700",
    inactive: "bg-[#eeedfe] text-[#3c3489] hover:bg-[#dddcfd] dark:bg-violet-900/30 dark:text-violet-200 dark:hover:bg-violet-900/50",
  },
};

function SkillLayerFilterPills({
  label,
  skills,
  selectedSkills,
  onToggleSkill,
  onClearSkills,
}: {
  label: string;
  skills: ContributorSkill[];
  selectedSkills: ContributorSkill[];
  onToggleSkill: (skill: ContributorSkill) => void;
  onClearSkills: () => void;
}) {
  const { t } = useTranslation();
  const [expandedLayer, setExpandedLayer] = useState<SkillLayer | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<SkillLayer, ContributorSkill[]>();
    for (const skill of skills) {
      const layer = getSkillLayer(skill);
      const list = map.get(layer) ?? [];
      list.push(skill);
      map.set(layer, list);
    }
    return map;
  }, [skills]);

  const layerSelectedCount = useCallback(
    (layer: SkillLayer) => {
      const layerSkills = grouped.get(layer) ?? [];
      return layerSkills.filter((s) => selectedSkills.includes(s)).length;
    },
    [grouped, selectedSkills]
  );

  const toggleLayer = useCallback((layer: SkillLayer) => {
    setExpandedLayer((prev) => (prev === layer ? null : layer));
  }, []);

  return (
    <div>
      <p className="text-xs text-muted-foreground mb-2">{label}</p>
      <div className="space-y-1.5">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={onClearSkills}
            className={`px-2.5 py-1 rounded-full text-xs transition ${
              selectedSkills.length === 0
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("contributors.filter.all")}
          </button>
          {([1, 2, 3] as SkillLayer[]).map((layer) => {
            const styles = layerPillStyles[layer];
            const isExpanded = expandedLayer === layer;
            const count = layerSelectedCount(layer);
            const hasActiveSkill = count > 0;
            return (
              <button
                key={layer}
                onClick={() => toggleLayer(layer)}
                className={`px-2.5 py-1 rounded-full text-xs transition inline-flex items-center gap-1 ${
                  hasActiveSkill ? styles.active : styles.inactive
                }`}
              >
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
                {t(`contributors.skillLayer.${layer}`)}
                {count > 0 && (
                  <span className="ml-0.5 px-1 py-0.5 rounded-full bg-white/20 text-[0.6rem] leading-none">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {([1, 2, 3] as SkillLayer[]).map((layer) => {
          if (expandedLayer !== layer) return null;
          const layerSkills = grouped.get(layer);
          if (!layerSkills) return null;
          const styles = layerPillStyles[layer];
          return (
            <div key={layer} className="flex flex-wrap gap-1.5 pl-1 pt-1">
              {layerSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => onToggleSkill(skill)}
                  className={`px-2.5 py-1 rounded-full text-xs transition ${
                    selectedSkills.includes(skill) ? styles.active : styles.inactive
                  }`}
                >
                  {t(`contributors.skill.${skill}`)}
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
