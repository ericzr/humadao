import { Shuffle, Eye, Scale, Fingerprint, Sprout, Compass } from "lucide-react";
import { Card } from "../../ui/card";
import { useTranslation } from "react-i18next";

const features = [
  { titleKey: "home.feat.roles" as const, descKey: "home.feat.rolesDesc" as const, icon: Shuffle },
  { titleKey: "home.feat.visible" as const, descKey: "home.feat.visibleDesc" as const, icon: Eye },
  { titleKey: "home.feat.governance" as const, descKey: "home.feat.governanceDesc" as const, icon: Scale },
  { titleKey: "home.feat.reputation" as const, descKey: "home.feat.reputationDesc" as const, icon: Fingerprint },
  { titleKey: "home.feat.beyond" as const, descKey: "home.feat.beyondDesc" as const, icon: Sprout },
  { titleKey: "home.feat.mission" as const, descKey: "home.feat.missionDesc" as const, icon: Compass },
];

export function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center mb-8">{t("home.whyHuma")}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <Card key={f.titleKey} className="bg-card border-border p-5 sm:p-6">
              <f.icon className="w-6 h-6 text-muted-foreground mb-3" />
              <h3 className="mb-1">{t(f.titleKey)}</h3>
              <p className="text-muted-foreground text-sm">{t(f.descKey)}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
