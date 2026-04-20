import { useMemo } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { ProfileCard } from "./profile/ProfileCard";
import { ReputationCard } from "./profile/ReputationCard";
import { ContributionList } from "./profile/ContributionList";
import { ContributionTimeline } from "./profile/ContributionTimeline";
import { CrossDAOIdentity } from "./profile/CrossDAOIdentity";
import { getContributorById, getContributorTimeline } from "@/data";

export function ProfilePage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const contributor = useMemo(() => getContributorById(id), [id]);
  const timeline = useMemo(
    () => getContributorTimeline(contributor.id),
    [contributor.id]
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-5 lg:gap-6 items-start">

        {/* ── Left sidebar ── */}
        <div className="space-y-4">
          <ProfileCard contributor={contributor} />
          <ReputationCard contributor={contributor} />
        </div>

        {/* ── Right: tabbed content ── */}
        <div className="min-w-0">
          <Tabs defaultValue="works">
            <TabsList className="bg-secondary mb-5 w-full sm:w-auto">
              <TabsTrigger value="works" className="flex-1 sm:flex-none">
                {t("profile.tab.works")}
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex-1 sm:flex-none">
                {t("profile.tab.timeline")}
              </TabsTrigger>
              <TabsTrigger value="daos" className="flex-1 sm:flex-none">
                {t("profile.tab.daos")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="works" className="mt-0">
              <ContributionList contributor={contributor} timeline={timeline} />
            </TabsContent>

            <TabsContent value="timeline" className="mt-0">
              <ContributionTimeline contributor={contributor} timeline={timeline} />
            </TabsContent>

            <TabsContent value="daos" className="mt-0">
              <CrossDAOIdentity contributor={contributor} />
            </TabsContent>
          </Tabs>
        </div>

      </div>
    </div>
  );
}
