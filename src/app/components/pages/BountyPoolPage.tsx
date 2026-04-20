import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BountyFilters } from "./bounty-pool/BountyFilters";
import { BountyCard } from "./bounty-pool/BountyCard";
import { bountySkillKeys, bounties } from "@/data";

export function BountyPoolPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [activeSkills, setActiveSkills] = useState<string[]>([]);
  const [sort, setSort] = useState("newest");
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [locationId, setLocationId] = useState<string | null>(null);

  const toggleSkill = (skill: string) => {
    setActiveSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const filtered = bounties.filter(
    (b) =>
      t(b.titleKey).toLowerCase().includes(search.toLowerCase()) &&
      (activeSkills.length === 0 || b.skills.some((s) => activeSkills.includes(s)))
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto overflow-hidden">
      <div className="mb-6 sm:mb-8">
        <h1 className="mb-1">{t("bounty.title")}</h1>
        <p className="text-muted-foreground">{t("bounty.subtitle")}</p>
      </div>

      <BountyFilters
        search={search}
        onSearchChange={setSearch}
        skills={bountySkillKeys}
        activeSkills={activeSkills}
        onToggleSkill={toggleSkill}
        sort={sort}
        onSortChange={setSort}
        showPanel={showFilterPanel}
        onTogglePanel={() => setShowFilterPanel((v) => !v)}
        locationId={locationId}
        onLocationChange={setLocationId}
      />

      <p className="text-muted-foreground mb-4 text-sm">
        {filtered.length} {t("bounty.results")}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-w-0">
        {filtered.map((b, i) => (
          <BountyCard key={i} {...b} />
        ))}
      </div>
    </div>
  );
}
