import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Card } from "../../ui/card";
import { useTranslation } from "react-i18next";
import { listDAOClusters } from "@/services/mock";

export function ProjectClusters() {
  const { t } = useTranslation();
  const clusters = listDAOClusters();

  return (
    <Card className="bg-card border-border p-4 sm:p-5 lg:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h3>{t("discover.clusterTitle")}</h3>
        <Link to="/town-hall" className="text-muted-foreground hover:text-foreground transition text-xs">
          {t("discover.viewAll")}
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {clusters.map((cluster) => (
          <Link key={cluster.id} to="/town-hall" className="rounded-lg bg-secondary hover:bg-accent transition p-4">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-sm">{t(cluster.titleKey)}</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground leading-5 mb-3">
              {t(cluster.descKey)}
            </p>
            <div className="flex flex-wrap gap-1">
              {cluster.daos.slice(0, 3).map((dao) => (
                <span key={dao.id} className="rounded-full bg-card px-2 py-1 text-[0.65rem] text-muted-foreground">
                  {t(dao.nameKey)}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
