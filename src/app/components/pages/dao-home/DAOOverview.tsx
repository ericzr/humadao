import { useTranslation } from "react-i18next";
import { Card } from "../../ui/card";
import { MinimumProtocolCard } from "./MinimumProtocolCard";
import type { DAO, LocalizedText } from "@/types";

function localizeText(copy: LocalizedText | undefined, language: string) {
  if (!copy) return "";
  return language.startsWith("en") ? copy.en : copy.zh;
}

interface DAOOverviewProps {
  dao: DAO;
  showProtocolCard: boolean;
}

export function DAOOverview({ dao, showProtocolCard }: DAOOverviewProps) {
  const { t, i18n } = useTranslation();

  const overviewCopy = [
    ["dao.overview.goal", dao.showcase?.vision],
    ["dao.showcase.consensus", dao.showcase?.consensus],
    ["dao.showcase.businessModel", dao.showcase?.businessModel],
    ["dao.overview.collaboration", dao.showcase?.collaborationModel],
    ["dao.overview.participation", dao.showcase?.participation],
    ["dao.overview.stage", dao.showcase?.stage],
  ] as const;

  return (
    <div className="space-y-5">
      <Card className="gap-0 overflow-hidden border-border bg-card">
        <div className="border-b border-border bg-card p-4 pb-4 sm:p-5 sm:pb-4">
          <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
            {t("dao.overview.eyebrow")}
          </p>
          <h2 className="text-lg sm:text-xl">{t("dao.overview.title")}</h2>
        </div>

        <div className="max-h-[280px] min-w-0 overflow-y-auto px-4 pb-4 pt-3 pr-5 sm:px-5 sm:pb-5 sm:pt-3 sm:pr-6">
          {overviewCopy.map(([labelKey, copy]) => (
            <section key={labelKey} className="min-w-0 pb-4 last:pb-0">
              <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                {t(labelKey)}
              </p>
              <p className="text-sm leading-6 text-muted-foreground">
                {copy ? localizeText(copy, i18n.language) : t("dao.aboutDesc")}
              </p>
            </section>
          ))}

          <p className="border-t border-border pt-3 text-xs text-muted-foreground">
            {t("dao.overview.scrollHint")}
          </p>
        </div>
      </Card>

      {showProtocolCard && <MinimumProtocolCard dao={dao} compact />}
    </div>
  );
}
