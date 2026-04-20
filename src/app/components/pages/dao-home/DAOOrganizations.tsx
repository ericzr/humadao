import { Link, useParams } from "react-router";
import { Users, ArrowRight } from "lucide-react";
import { Card } from "../../ui/card";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { useTranslation } from "react-i18next";
import { myDAOs } from "@/data";

export function DAOOrganizations() {
  const { id } = useParams();
  const { t } = useTranslation();
  const dao = myDAOs.find((d) => d.id === id);
  const children = dao?.children ?? [];

  if (children.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="w-10 h-10 mx-auto text-muted-foreground/50 mb-3" />
        <p className="text-muted-foreground">{t("dao.orgs.empty")}</p>
        <p className="text-muted-foreground text-sm mt-1">{t("dao.orgs.emptyHint")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {t("dao.orgs.count", { count: children.length })}
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {children.map((sub) => (
          <Card key={sub.id} className="p-5 hover:bg-accent/50 transition-colors group">
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12 shrink-0">
                <AvatarFallback className={`${sub.color} text-white text-sm font-medium`}>
                  {sub.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium mb-1">{t(sub.nameKey as never)}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {t(`subDao.desc.${sub.id}` as never, { defaultValue: t("subDao.description") })}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {t("subDao.memberCount", { count: Math.floor(Math.random() * 200) + 20 })}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button asChild variant="ghost" size="sm" className="gap-1 text-primary">
                <Link to={`/dao/${id}/sub/${sub.id}`}>
                  {t("dao.orgs.view")} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
