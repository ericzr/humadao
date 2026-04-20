import {
  Github,
  Globe,
  Linkedin,
  Link as LinkIcon,
  MapPin,
  MessageCircle,
  Twitter,
  ExternalLink,
} from "lucide-react";
import { Card } from "../../ui/card";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { SkillBadgeGroup } from "../../common/SkillBadge";
import { useTranslation } from "react-i18next";
import type { Contributor, ContributorProfileLink } from "@/types";
import { getLocationPath, locationTree } from "@/data/location";

const linkIcons: Record<ContributorProfileLink["type"], typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  website: Globe,
  telegram: MessageCircle,
  external: ExternalLink,
};

interface ProfileCardProps {
  contributor: Contributor;
}

export function ProfileCard({ contributor }: ProfileCardProps) {
  const { t } = useTranslation();
  const locationLabel = contributor.locationId ? getLocationPath(contributor.locationId, locationTree, t) : null;

  return (
    <Card className="bg-card border-border p-5 sm:p-6">
      <div className="text-center">
        <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4">
          <AvatarFallback className="bg-accent text-foreground text-3xl">{contributor.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2>{contributor.name}</h2>
        <p className="text-muted-foreground mt-2 text-sm">{contributor.profile.headline}</p>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 flex-wrap text-xs">
        {locationLabel && (
          <Badge variant="outline" className="text-muted-foreground gap-1">
            <MapPin className="w-3 h-3" />
            {locationLabel}
          </Badge>
        )}
        <Badge variant="outline" className="text-muted-foreground">
          {t(`contributors.participation.${contributor.participationLevel}`)}
        </Badge>
        <Badge className={contributor.available ? "bg-green-500/10 text-green-600 dark:text-green-400 border-0" : "bg-secondary text-muted-foreground border-0"}>
          {contributor.available ? t("contributors.status.available") : t("contributors.status.unavailable")}
        </Badge>
      </div>

      <p className="text-muted-foreground mt-4 text-sm leading-6">{contributor.bio}</p>
      <p className="text-sm mt-3 leading-6">{contributor.profile.focus}</p>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">{t("profile.skills")}</p>
        <SkillBadgeGroup skills={contributor.skills} max={6} size="md" />
      </div>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">{t("profile.languages")}</p>
        <div className="flex flex-wrap gap-1.5">
          {contributor.profile.languages.map((language) => (
            <Badge key={language} variant="secondary" className="text-[0.7rem]">
              {language}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-5 flex-wrap">
        {contributor.profile.links.map((link) => {
          const Icon = linkIcons[link.type] ?? LinkIcon;
          return (
            <a
              key={`${link.type}-${link.label}`}
              href={link.href}
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition"
              aria-label={link.label}
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
      </div>
    </Card>
  );
}
