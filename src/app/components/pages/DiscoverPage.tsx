import { Link } from "react-router";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { TrendingDAOs } from "./discover/TrendingDAOs";
import { HotBounties } from "./discover/HotBounties";
import { TopContributors } from "./discover/TopContributors";
import { ProjectClusters } from "./discover/ProjectClusters";

export function DiscoverPage() {
  const { t } = useTranslation();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <h1 className="mb-2">{t("discover.title")}</h1>
      <p className="text-muted-foreground mb-6">{t("discover.subtitle")}</p>

      <div className="relative mb-5 max-w-2xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder={t("discover.searchPlaceholder")} className="pl-10 bg-card border-border" />
      </div>

      <Card className="bg-card border-border p-4 sm:p-5 mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            {t("discover.position.eyebrow")}
          </p>
          <p className="text-sm text-muted-foreground leading-6">
            {t("discover.position.desc")}
          </p>
        </div>
        <Button asChild size="sm" variant="outline" className="self-start sm:self-center border-border gap-1.5 shrink-0">
          <Link to="/town-hall">
            {t("discover.position.townHall")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <ProjectClusters />
        <TrendingDAOs />
        <HotBounties />
        <TopContributors />
      </div>
    </div>
  );
}
