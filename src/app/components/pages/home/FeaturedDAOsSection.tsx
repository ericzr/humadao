import { Link } from "react-router";
import { ArrowRight, Users } from "lucide-react";
import { Card } from "../../ui/card";
import { useTranslation } from "react-i18next";
import { listFeaturedDAOs } from "@/services/mock";

export function FeaturedDAOsSection() {
  const { t } = useTranslation();
  const featuredDAOs = listFeaturedDAOs(3);

  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2>{t("home.activeOrgs")}</h2>
          <Link to="/town-hall" className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition text-sm">
            {t("home.viewAll")} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {featuredDAOs.map((dao) => (
            <Link to={`/dao/${dao.id}`} key={dao.id}>
              <Card className="bg-card border-border p-5 hover:border-foreground/20 transition cursor-pointer h-full">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-foreground mb-3">
                  {(dao.avatar ?? t(dao.nameKey).charAt(0)).charAt(0)}
                </div>
                <p className="mb-0.5">{t(dao.nameKey)}</p>
                <p className="text-muted-foreground mb-3 text-xs line-clamp-2">{t(dao.descKey)}</p>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Users className="w-3 h-3" /> {dao.members.toLocaleString()} {t("home.members")}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
