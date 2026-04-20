import { Link } from "react-router";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { useTranslation } from "react-i18next";
import { listWorkspaceDAOs } from "@/services/mock";

const roleKeys = [
  "workspace.role.founder",
  "workspace.role.coordinator",
  "workspace.role.researcher",
  "workspace.role.contributor",
];

export function DAOList() {
  const { t } = useTranslation();
  const showcaseDAOs = listWorkspaceDAOs(6);

  return (
    <Card className="bg-card border-border p-4 sm:p-5">
      <h2 className="mb-4">{t("workspace.myDAOs")}</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {showcaseDAOs.map((dao, index) => {
          const name = t(dao.nameKey as never);
          return (
            <Link to={`/dao/${dao.id}`} key={dao.id}>
              <div className="bg-secondary rounded-lg p-3 sm:p-4 hover:ring-1 hover:ring-foreground/20 transition cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-full ${dao.color} flex items-center justify-center text-white text-xs`}>
                    {dao.avatar.charAt(0)}
                  </div>
                  <span className="text-sm truncate">{name}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground text-xs gap-2">
                  <Badge className="bg-accent text-muted-foreground border-0 text-[0.7rem]">
                    {t(roleKeys[index % roleKeys.length] as never)}
                  </Badge>
                  <span>{index + 2} {t("workspace.tasks")}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
