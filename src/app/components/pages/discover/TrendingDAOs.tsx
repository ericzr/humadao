import { Link } from "react-router";
import { Flame, Users } from "lucide-react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { useTranslation } from "react-i18next";
import { listFeaturedDAOs } from "@/services/mock";
import type { ValuesProfile } from "@/types/dao-tags";

function topValue(values: ValuesProfile): string {
  let best: string = "love";
  let max = 0;
  for (const [k, v] of Object.entries(values)) {
    if (v > max) { max = v; best = k; }
  }
  return best;
}

const featured = listFeaturedDAOs(3).filter((dao) => dao.profile);

export function TrendingDAOs() {
  const { t } = useTranslation();

  return (
    <Card className="bg-card border-border p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-muted-foreground" />
          {t("discover.trendingDAO")}
        </h3>
        <Link to="/town-hall" className="text-muted-foreground hover:text-foreground transition text-xs">
          {t("discover.viewAll")}
        </Link>
      </div>
      <div className="space-y-3">
        {featured.map((dao) => {
          const valueDim = dao.profile ? topValue(dao.profile.values) : null;
          return (
            <Link to={`/dao/${dao.id}`} key={dao.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-accent transition">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-foreground text-xs shrink-0">
                  {String(t(dao.nameKey as never)).charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <span className="text-sm block truncate">{t(dao.nameKey as never)}</span>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Users className="w-3 h-3" /> {dao.members.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                {valueDim && (
                  <Badge variant="outline" className="text-muted-foreground text-[0.65rem] hidden sm:inline-flex">
                    {t(`daoProfile.value.${valueDim}` as never)}
                  </Badge>
                )}
                {dao.projectType && (
                  <Badge variant="outline" className="text-muted-foreground text-[0.65rem] hidden sm:inline-flex">
                    {t(`townHall.filter.projectTypes.${dao.projectType}` as never)}
                  </Badge>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
