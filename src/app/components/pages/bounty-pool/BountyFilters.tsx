import { useTranslation } from "react-i18next";
import { Search, SlidersHorizontal, ChevronDown, RotateCcw, Check } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { LocationPicker } from "../../common/LocationPicker";

const MODES = ["all", "online", "offline", "hybrid"] as const;

interface BountyFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  skills: string[];
  activeSkills: string[];
  onToggleSkill: (skill: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  showPanel: boolean;
  onTogglePanel: () => void;
  locationId: string | null;
  onLocationChange: (id: string | null) => void;
}

export function BountyFilters({
  search, onSearchChange, skills, activeSkills, onToggleSkill,
  sort, onSortChange, showPanel, onTogglePanel,
  locationId, onLocationChange,
}: BountyFiltersProps) {
  const { t } = useTranslation();

  const activeCount = activeSkills.length;

  return (
    <div className="space-y-3 mb-6">
      {/* search + sort + location + filter button */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-0 basis-40">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t("bounty.searchByName")}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Select value={sort} onValueChange={onSortChange}>
            <SelectTrigger className="w-auto bg-card border-border h-9 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">{t("bounty.sortNewest")}</SelectItem>
              <SelectItem value="amount">{t("bounty.sortAmount")}</SelectItem>
              <SelectItem value="deadline">{t("bounty.sortDeadline")}</SelectItem>
            </SelectContent>
          </Select>

          <LocationPicker value={locationId} onChange={onLocationChange} />

          <Button
            variant="outline"
            size="sm"
            className="h-9 text-xs border-border gap-1.5 shrink-0"
            onClick={onTogglePanel}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t("bounty.filter")}</span>
            {activeCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[0.6rem] leading-none">
                {activeCount}
              </span>
            )}
            <ChevronDown className={`w-3 h-3 transition-transform ${showPanel ? "rotate-180" : ""}`} />
          </Button>
        </div>
      </div>

      {/* skills pills — horizontal scrollable */}
      <div className="overflow-x-auto scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex gap-1.5 w-max">
          <button
            onClick={() => {
              activeSkills.forEach((s) => onToggleSkill(s));
            }}
            className={`px-3 py-1 rounded-full transition text-xs whitespace-nowrap ${
              activeSkills.length === 0
                ? "bg-foreground text-background"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("bounty.allSkills")}
          </button>
          {skills.map((s) => (
            <button
              key={s}
              onClick={() => onToggleSkill(s)}
              className={`px-3 py-1 rounded-full transition text-xs whitespace-nowrap ${
                activeSkills.includes(s)
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(s)}
            </button>
          ))}
        </div>
      </div>

      {/* expandable filter panel */}
      <div className={showPanel ? "" : "hidden"}>
        <div className="border border-border rounded-lg p-4 space-y-4 bg-card">
          {/* 参与形式 */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">{t("filter.mode")}</p>
            <div className="flex flex-wrap gap-1.5">
              {MODES.map((m) => (
                <button
                  key={m}
                  className="px-2.5 py-1 rounded-full bg-secondary text-muted-foreground hover:text-foreground text-xs transition"
                >
                  {t(`filter.mode${m.charAt(0).toUpperCase() + m.slice(1)}`)}
                </button>
              ))}
            </div>
          </div>

          {/* 语言 */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">{t("bounty.language")}</p>
            <div className="flex flex-wrap gap-1.5">
              {(["bounty.lang.en", "bounty.lang.zh", "bounty.lang.ja"]).map((l) => (
                <button
                  key={l}
                  className="px-2.5 py-1 rounded-full bg-secondary text-muted-foreground hover:text-foreground text-xs transition"
                >
                  {t(l)}
                </button>
              ))}
            </div>
          </div>

          {/* 重置 + 确定 */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1">
              <RotateCcw className="w-3 h-3" />
              {t("bounty.reset" as never)}
            </Button>
            <Button size="sm" className="text-xs gap-1" onClick={onTogglePanel}>
              <Check className="w-3 h-3" />
              {t("bounty.confirm" as never)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
