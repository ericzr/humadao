import { Code, Target, Globe, Megaphone, BookOpen, Pen, Users } from "lucide-react";
import { Card } from "../../ui/card";
import { useTranslation } from "react-i18next";

const bountyCategories = [
  { nameKey: "dao.cat.engineering" as const, icon: Code, tasks: 5, contributors: 12 },
  { nameKey: "dao.cat.grants" as const, icon: Target, tasks: 3, contributors: 8 },
  { nameKey: "dao.cat.ecosystem" as const, icon: Globe, tasks: 2, contributors: 4 },
  { nameKey: "dao.cat.community" as const, icon: Megaphone, tasks: 7, contributors: 24 },
  { nameKey: "dao.cat.education" as const, icon: BookOpen, tasks: 1, contributors: 0 },
  { nameKey: "dao.cat.content" as const, icon: Pen, tasks: 4, contributors: 5 },
];

export function BountyCategories() {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="mb-4">{t("dao.bountyCategories")}</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {bountyCategories.map((c) => (
          <Card key={c.nameKey} className="bg-card border-border p-4 hover:border-foreground/20 transition cursor-pointer">
            <div className="flex items-center gap-2.5 mb-3">
              <c.icon className="w-5 h-5 text-muted-foreground" />
              <span>{t(c.nameKey)}</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground text-xs">
              <span>{c.tasks} {t("dao.tasks")}</span>
              <span><Users className="w-3 h-3 inline" /> {c.contributors}</span>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
