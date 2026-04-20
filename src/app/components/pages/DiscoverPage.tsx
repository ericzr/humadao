import { Search } from "lucide-react";
import { Input } from "../ui/input";
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

      <div className="relative mb-8 max-w-2xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder={t("discover.searchPlaceholder")} className="pl-10 bg-card border-border" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <ProjectClusters />
        <TrendingDAOs />
        <HotBounties />
        <TopContributors />
      </div>
    </div>
  );
}
