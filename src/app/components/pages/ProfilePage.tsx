import { useMemo } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { ProfileCard } from "./profile/ProfileCard";
import { ContributionList } from "./profile/ContributionList";
import { ContributionArchive } from "./profile/ContributionArchive";
import { ProfileProposalList } from "./profile/ProfileProposalList";
import { getContributorById, getContributorTimeline } from "@/data";

export function ProfilePage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const isOwnProfile = !id;
  const contributor = useMemo(() => getContributorById(id), [id]);
  const timeline = useMemo(
    () => getContributorTimeline(contributor.id),
    [contributor.id]
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <ProfileCard contributor={contributor} editable={isOwnProfile} />

      <div className="mt-6">
        <Tabs defaultValue="organizations">
          <div className="mb-5 overflow-x-auto pb-1">
            <TabsList className="h-10 rounded-lg">
              <TabsTrigger value="organizations" className="rounded-md">
                {t("profile.tab.organizations")}
              </TabsTrigger>
              <TabsTrigger value="contributions" className="rounded-md">
                {t("profile.tab.contributions")}
              </TabsTrigger>
              <TabsTrigger value="proposals" className="rounded-md">
                {t("profile.tab.proposals")}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="organizations" className="mt-0">
            <ContributionList contributor={contributor} />
          </TabsContent>

          <TabsContent value="contributions" className="mt-0">
            <ContributionArchive contributor={contributor} timeline={timeline} />
          </TabsContent>

          <TabsContent value="proposals" className="mt-0">
            <ProfileProposalList contributor={contributor} timeline={timeline} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
