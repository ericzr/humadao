import { Link } from "react-router";
import { Star } from "lucide-react";
import { Card } from "../../ui/card";
import { SkillBadgeGroup } from "../../common/SkillBadge";
import { useTranslation } from "react-i18next";
import { topContributors } from "@/data";

export function TopContributors() {
  const { t } = useTranslation();

  return (
    <Card className="bg-card border-border p-4 sm:p-5 lg:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2"><Star className="w-4 h-4 text-muted-foreground" /> {t("discover.topContributors")}</h3>
        <Link to="/contributors" className="text-muted-foreground hover:text-foreground transition text-xs">{t("discover.viewAll")}</Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {topContributors.map((c) => (
          <Link to={`/profile/${c.id}`} key={c.id} className="p-4 rounded-lg bg-secondary hover:bg-accent transition flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-foreground shrink-0">{c.name.charAt(0)}</div>
            <div className="min-w-0">
              <span className="text-sm block truncate">{c.name}</span>
              <p className="text-muted-foreground text-xs">{t("discover.reputation")}：{c.rep.toLocaleString()}</p>
              <div className="mt-1">
                <SkillBadgeGroup skills={c.skills} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
