import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router";
import { Search, Plus, ArrowRight, SlidersHorizontal, ChevronDown, Users, TrendingUp } from "lucide-react";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { LocationPicker } from "../common/LocationPicker";
import { useTranslation } from "react-i18next";
import { DAOCard } from "./town-hall/DAOCard";
import { TownHallFilters, defaultFilters, type TownHallFilterState, type SortField } from "./town-hall/TownHallFilters";
import { townHallDAOs, isLocationMatch } from "@/data";
import type { DAO } from "@/types";
import type { SpectrumAxis } from "@/types/dao-tags";

function applyFilters(daos: DAO[], search: string, filters: TownHallFilterState, locationId: string | null, t: (k: string) => string): DAO[] {
  let result = daos;

  if (search) {
    const q = search.toLowerCase();
    result = result.filter((d) => t(d.nameKey).toLowerCase().includes(q));
  }

  if (filters.valueDim) {
    result = result.filter((d) => {
      if (!d.profile) return false;
      return d.profile.values[filters.valueDim!] >= 65;
    });
  }

  const specKeys = Object.keys(filters.spectrumSelections) as SpectrumAxis[];
  if (specKeys.length > 0) {
    result = result.filter((d) => {
      if (!d.profile) return false;
      return specKeys.every((axis) => {
        const side = filters.spectrumSelections[axis];
        const v = d.profile!.spectrum[axis];
        return side === "left" ? v <= 35 : v >= 65;
      });
    });
  }

  if (filters.projectType !== "all") {
    result = result.filter((d) => d.projectType === filters.projectType);
  }

  if (filters.mode !== "all") {
    result = result.filter((d) => d.mode === filters.mode);
  }

  if (locationId) {
    result = result.filter((d) => isLocationMatch(d.locationId, locationId) || isLocationMatch(d.region, locationId));
  }

  if (filters.sortField) {
    result = [...result].sort((a, b) => b.members - a.members);
  }

  return result;
}

export function TownHallPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<TownHallFilterState>(defaultFilters);
  const [locationId, setLocationId] = useState<string | null>(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const filtered = useMemo(
    () => applyFilters(townHallDAOs, search, filters, locationId, t),
    [search, filters, locationId, t],
  );

  const activeFilterCount =
    (filters.valueDim ? 1 : 0) +
    Object.keys(filters.spectrumSelections).length +
    (filters.mode !== "all" ? 1 : 0);

  const toggleSort = useCallback((field: SortField) => {
    setFilters((prev) => {
      if (prev.sortField === field) return { ...prev, sortField: null };
      return { ...prev, sortField: field };
    });
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="mb-1">{t("townHall.title")}</h1>
        <p className="text-muted-foreground">{t("townHall.subtitle")}</p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t("townHall.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => toggleSort("members")}
                className={`relative flex items-center justify-center w-9 h-9 rounded-md border transition ${
                  filters.sortField === "members"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                <Users className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              {t("townHall.filter.sortMembers" as never)}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => toggleSort("activity")}
                className={`relative flex items-center justify-center w-9 h-9 rounded-md border transition ${
                  filters.sortField === "activity"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              {t("townHall.filter.sortActivity" as never)}
            </TooltipContent>
          </Tooltip>
        </div>

        <LocationPicker value={locationId} onChange={setLocationId} />

        <Button
          variant="outline"
          size="sm"
          className="h-9 text-xs border-border gap-1.5 shrink-0"
          onClick={() => setShowFilterPanel((v) => !v)}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          {t("townHall.filter.more" as never)}
          {activeFilterCount > 0 && (
            <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[0.6rem] leading-none">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown className={`w-3 h-3 transition-transform ${showFilterPanel ? "rotate-180" : ""}`} />
        </Button>
      </div>

      <TownHallFilters
        filters={filters}
        onChange={setFilters}
        showPanel={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
      />

      <p className="text-muted-foreground mb-4 text-sm">{filtered.length} {t("townHall.orgs")}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {filtered.map((dao) => (
          <DAOCard key={dao.id} dao={dao} />
        ))}
      </div>

      <Card className="mt-8 p-6 sm:p-8 border-dashed border-2 border-border bg-card/50 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Plus className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg font-medium mb-1">{t("townHall.createCTA")}</h3>
          <p className="text-muted-foreground text-sm">{t("townHall.createCTADesc")}</p>
        </div>
        <Button asChild className="shrink-0">
          <Link to="/create-project">
            {t("nav.createDAO")} <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </Card>
    </div>
  );
}
