import { Users } from "lucide-react";
import { useParams } from "react-router";
import { Button } from "../../ui/button";
import { useTranslation } from "react-i18next";
import { ValuesTags } from "../../shared/ValuesTags";
import { SpectrumTags } from "../../shared/SpectrumTags";
import { findDAOById } from "@/data/dao";
import type { LocalizedText } from "@/types";

function localizeText(copy: LocalizedText | undefined, language: string) {
  if (!copy) return "";
  return language.startsWith("en") ? copy.en : copy.zh;
}

export function DAOAboutPanel() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const dao = id ? findDAOById(id) : undefined;
  const profile = dao?.profile;

  return (
    <div className="w-full xl:w-72 p-5 sm:p-6 border-t xl:border-t-0 xl:border-l border-border space-y-5 shrink-0 overflow-y-auto xl:max-h-[calc(100vh-4rem)] scrollbar-none">
      <div>
        <h3 className="mb-2">{t("dao.about")}</h3>
        <p className="text-muted-foreground text-sm">
          {dao?.showcase ? localizeText(dao.showcase.consensus, i18n.language) : t("dao.aboutDesc")}
        </p>
        {profile && (
          <div className="flex flex-wrap gap-1 mt-3">
            <ValuesTags values={profile.values} />
            <SpectrumTags spectrum={profile.spectrum} />
          </div>
        )}
      </div>

      {dao?.showcase && (
        <>
          <div>
            <h3 className="mb-2">{t("dao.showcase.businessModel")}</h3>
            <p className="text-muted-foreground text-sm">
              {localizeText(dao.showcase.businessModel, i18n.language)}
            </p>
          </div>
          <div>
            <h3 className="mb-2">{t("dao.showcase.collaborationModel")}</h3>
            <p className="text-muted-foreground text-sm">
              {localizeText(dao.showcase.collaborationModel, i18n.language)}
            </p>
          </div>
        </>
      )}

      <div>
        <h3 className="mb-3">{t("dao.contributorsLabel")}</h3>
        <div className="flex -space-x-2 mb-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full bg-accent border-2 border-card flex items-center justify-center text-muted-foreground text-[0.7rem]"
            >
              {String.fromCharCode(65 + index)}
            </div>
          ))}
          <div className="w-8 h-8 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-muted-foreground text-[0.7rem]">
            +{Math.max(dao ? dao.members - 4 : 12, 12)}
          </div>
        </div>
        <Button variant="outline" className="w-full border-border text-foreground text-sm">
          <Users className="w-3 h-3 mr-1" /> {t("dao.inviteContributors")}
        </Button>
      </div>
    </div>
  );
}
