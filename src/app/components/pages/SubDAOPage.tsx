import { useParams, Link } from "react-router";
import { ArrowLeft, Users as UsersIcon, Clock, Coins, Star } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useTranslation } from "react-i18next";
import { myDAOs } from "@/data";
import { BountyCategories } from "./dao-home/BountyCategories";
import { DAOProposals } from "./dao-home/DAOProposals";
import { ProgressUpdates } from "./dao-home/ProgressUpdates";

function findSubDAO(parentId: string, subId: string) {
  const parent = myDAOs.find((d) => d.id === parentId);
  if (!parent?.children) return null;
  const sub = parent.children.find((s) => s.id === subId);
  return sub ? { parent, sub } : null;
}

export function SubDAOPage() {
  const { id, subId } = useParams();
  const { t } = useTranslation();

  const result = findSubDAO(id!, subId!);
  if (!result) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">{t("subDao.notFound")}</p>
        <Button asChild variant="link" className="mt-2">
          <Link to="/">{t("subDao.backHome")}</Link>
        </Button>
      </div>
    );
  }

  const { parent, sub } = result;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <Link
        to={`/dao/${parent.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t(parent.nameKey as never)}
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-14 h-14 sm:w-16 sm:h-16 shrink-0">
            <AvatarFallback className={`${sub.color} text-white text-xl`}>
              {sub.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h1>{t(sub.nameKey as never)}</h1>
            <p className="text-muted-foreground text-sm">
              {t("subDao.partOf")} {t(parent.nameKey as never)}
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">
                <UsersIcon className="w-3 h-3" /> {t("subDao.memberCount", { count: 128 })}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-3 h-3" /> {t("subDao.since")}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Coins className="w-3 h-3" /> {t("subDao.budget")}
              </span>
            </div>
          </div>
        </div>
        <Button variant="outline" className="self-start shrink-0 border-border text-foreground hover:bg-accent">
          <Star className="w-4 h-4 mr-1" /> {t("dao.follow")}
        </Button>
      </div>

      <Card className="p-4 mb-6 bg-accent/50 border-border">
        <p className="text-sm text-muted-foreground">{t("subDao.description")}</p>
      </Card>

      <Tabs defaultValue="bounties">
        <TabsList className="bg-secondary mb-6 flex-wrap">
          <TabsTrigger value="bounties">{t("dao.tab.bounties")}</TabsTrigger>
          <TabsTrigger value="proposals">{t("dao.tab.proposals")}</TabsTrigger>
          <TabsTrigger value="updates">{t("dao.tab.updates")}</TabsTrigger>
        </TabsList>
        <TabsContent value="bounties"><BountyCategories /></TabsContent>
        <TabsContent value="proposals"><DAOProposals /></TabsContent>
        <TabsContent value="updates"><ProgressUpdates /></TabsContent>
      </Tabs>
    </div>
  );
}
