import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Card } from "../../ui/card";
import { ValuesRadarChart } from "../../shared/ValuesRadarChart";
import { SpectrumBar } from "../../shared/SpectrumBar";
import { findDAOById } from "@/data/dao";
import type { LocalizedText } from "@/types";

function localizeText(copy: LocalizedText | undefined, language: string) {
  if (!copy) return "";
  return language.startsWith("en") ? copy.en : copy.zh;
}

export function DAOProfileTab() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const dao = id ? findDAOById(id) : undefined;
  const profile = dao?.profile;

  if (!dao) {
    return <p className="text-muted-foreground text-sm">{t("dao.aboutDesc")}</p>;
  }

  return (
    <div className="space-y-8">
      {dao.showcase && (
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["dao.showcase.vision", dao.showcase.vision],
            ["dao.showcase.consensus", dao.showcase.consensus],
            ["dao.showcase.businessModel", dao.showcase.businessModel],
            ["dao.showcase.collaborationModel", dao.showcase.collaborationModel],
            ["dao.showcase.participation", dao.showcase.participation],
            ["dao.showcase.stage", dao.showcase.stage],
          ].map(([labelKey, copy]) => (
            <Card key={labelKey} className="bg-card border-border p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{t(labelKey as never)}</p>
              <p className="text-sm text-muted-foreground leading-6">
                {localizeText(copy as LocalizedText, i18n.language)}
              </p>
            </Card>
          ))}
        </div>
      )}

      {profile && (
        <>
          <div>
            <h3 className="mb-3">{t("daoProfile.soulLabel")}</h3>
            <div className="max-w-xs mx-auto">
              <ValuesRadarChart values={profile.values} size={240} />
            </div>
          </div>
          <div>
            <h3 className="mb-4">{t("daoProfile.instLabel")}</h3>
            <div className="max-w-md">
              <SpectrumBar spectrum={profile.spectrum} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
