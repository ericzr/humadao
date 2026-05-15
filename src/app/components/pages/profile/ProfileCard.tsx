import { useEffect, useState } from "react";
import {
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Link as LinkIcon,
  MapPin,
  MessageCircle,
  Pencil,
  Plus,
  Twitter,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../ui/sheet";
import { Textarea } from "../../ui/textarea";
import { SkillBadgeGroup } from "../../common/SkillBadge";
import { contributorSkillOrder } from "@/data";
import { getLocationPath, locationTree } from "@/data/location";
import type { Contributor, ContributorProfileLink, ContributorSkill } from "@/types";

type AvailabilityStatus = "open" | "selective" | "focused" | "unavailable";
type ProfileLinkType = ContributorProfileLink["type"];

const linkIcons: Record<ContributorProfileLink["type"], typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  website: Globe,
  telegram: MessageCircle,
  external: ExternalLink,
};

const availabilityStatuses: AvailabilityStatus[] = ["open", "selective", "focused", "unavailable"];
const profileLinkTypes: ProfileLinkType[] = ["github", "website", "twitter", "linkedin", "telegram", "external"];

const availabilityBadgeClass: Record<AvailabilityStatus, string> = {
  open: "bg-green-500/10 text-green-600 dark:text-green-400 border-0",
  selective: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-0",
  focused: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-0",
  unavailable: "bg-secondary text-muted-foreground border-0",
};

interface ProfileCardProps {
  contributor: Contributor;
  editable?: boolean;
}

function getInitialAvailabilityStatus(contributor: Contributor): AvailabilityStatus {
  return contributor.available ? "open" : "unavailable";
}

function getDefaultLinkLabel(type: ProfileLinkType) {
  const labels: Record<ProfileLinkType, string> = {
    github: "GitHub",
    linkedin: "LinkedIn",
    twitter: "X",
    website: "Website",
    telegram: "Telegram",
    external: "Link",
  };

  return labels[type];
}

export function ProfileCard({ contributor, editable = false }: ProfileCardProps) {
  const { t } = useTranslation();
  const [editOpen, setEditOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: contributor.name,
    bio: contributor.bio,
    availabilityStatus: getInitialAvailabilityStatus(contributor),
    skills: contributor.skills,
    customSkills: [] as string[],
    languages: contributor.profile.languages,
    links: contributor.profile.links,
  });
  const [draftProfile, setDraftProfile] = useState(profile);
  const [languageInput, setLanguageInput] = useState("");
  const [customSkillInput, setCustomSkillInput] = useState("");
  const locationLabel = contributor.locationId
    ? getLocationPath(contributor.locationId, locationTree, t)
    : null;

  const openEditor = () => {
    setDraftProfile(profile);
    setLanguageInput("");
    setCustomSkillInput("");
    setEditOpen(true);
  };

  useEffect(() => {
    const nextProfile = {
      name: contributor.name,
      bio: contributor.bio,
      availabilityStatus: getInitialAvailabilityStatus(contributor),
      skills: contributor.skills,
      customSkills: [] as string[],
      languages: contributor.profile.languages,
      links: contributor.profile.links,
    };
    setProfile(nextProfile);
    setDraftProfile(nextProfile);
    setLanguageInput("");
    setCustomSkillInput("");
  }, [contributor]);

  const saveProfile = () => {
    const nextSkills = draftProfile.skills.length > 0 ? draftProfile.skills : contributor.skills;
    const nextLanguages = draftProfile.languages
      .map((language) => language.trim())
      .filter(Boolean);
    const nextCustomSkills = draftProfile.customSkills
      .map((skill) => skill.trim())
      .filter(Boolean);
    const nextLinks = draftProfile.links
      .map((link) => ({
        ...link,
        href: link.href.trim(),
        label: link.label.trim() || getDefaultLinkLabel(link.type),
      }))
      .filter((link) => link.href);

    setProfile({
      name: draftProfile.name.trim() || contributor.name,
      bio: draftProfile.bio.trim() || contributor.bio,
      availabilityStatus: draftProfile.availabilityStatus,
      skills: nextSkills,
      customSkills: nextCustomSkills,
      languages: nextLanguages,
      links: nextLinks,
    });
    setEditOpen(false);
  };

  const toggleSkill = (skill: ContributorSkill) => {
    setDraftProfile((current) => {
      const exists = current.skills.includes(skill);
      return {
        ...current,
        skills: exists
          ? current.skills.filter((item) => item !== skill)
          : [...current.skills, skill],
      };
    });
  };

  const addLanguage = () => {
    const next = languageInput.trim();
    if (!next) return;
    setDraftProfile((current) => ({
      ...current,
      languages: current.languages.includes(next) ? current.languages : [...current.languages, next],
    }));
    setLanguageInput("");
  };

  const removeLanguage = (language: string) => {
    setDraftProfile((current) => ({
      ...current,
      languages: current.languages.filter((item) => item !== language),
    }));
  };

  const addCustomSkill = () => {
    const next = customSkillInput.trim();
    if (!next) return;
    setDraftProfile((current) => ({
      ...current,
      customSkills: current.customSkills.includes(next) ? current.customSkills : [...current.customSkills, next],
    }));
    setCustomSkillInput("");
  };

  const removeCustomSkill = (skill: string) => {
    setDraftProfile((current) => ({
      ...current,
      customSkills: current.customSkills.filter((item) => item !== skill),
    }));
  };

  const updateLink = (index: number, patch: Partial<ContributorProfileLink>) => {
    setDraftProfile((current) => ({
      ...current,
      links: current.links.map((link, linkIndex) => {
        if (linkIndex !== index) return link;
        const nextType = patch.type ?? link.type;
        return {
          ...link,
          ...patch,
          label: patch.type ? getDefaultLinkLabel(nextType) : patch.label ?? link.label,
        };
      }),
    }));
  };

  const addLink = () => {
    setDraftProfile((current) => ({
      ...current,
      links: [
        ...current.links,
        { type: "website", label: getDefaultLinkLabel("website"), href: "" },
      ],
    }));
  };

  const removeLink = (index: number) => {
    setDraftProfile((current) => ({
      ...current,
      links: current.links.filter((_, linkIndex) => linkIndex !== index),
    }));
  };

  return (
    <>
      <section className="border-b border-border pb-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex min-w-0 gap-4">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 shrink-0">
              <AvatarFallback className="bg-accent text-foreground text-2xl">
                {profile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="mb-0">{profile.name}</h1>
                <Badge className={availabilityBadgeClass[profile.availabilityStatus]}>
                  {t(`profile.availability.${profile.availabilityStatus}`)}
                </Badge>
              </div>
              {!editable && (
                <p className="mt-1 text-muted-foreground leading-6 max-w-2xl">
                  {contributor.profile.headline}
                </p>
              )}
              {locationLabel && (
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <Badge variant="outline" className="text-muted-foreground gap-1">
                    <MapPin className="w-3 h-3" />
                    {locationLabel}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 md:pt-1">
            {profile.links.map((link) => {
              const Icon = linkIcons[link.type] ?? LinkIcon;
              return (
                <a
                  key={`${link.type}-${link.label}`}
                  href={link.href}
                  className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition"
                  aria-label={link.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base">{t("profile.about")}</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-6 max-w-3xl">{profile.bio}</p>
          </div>
          {editable && (
            <Button variant="outline" size="sm" className="shrink-0 gap-1.5" onClick={openEditor}>
              <Pencil className="w-4 h-4" />
              {t("profile.editProfile")}
            </Button>
          )}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
              {t("profile.skills")}
            </p>
            <SkillBadgeGroup skills={profile.skills} max={8} size="md" />
            {profile.customSkills.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {profile.customSkills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-[0.7rem]">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
              {t("profile.languages")}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {profile.languages.map((language) => (
                <Badge key={language} variant="secondary" className="text-[0.7rem]">
                  {language}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {editable && (
        <Sheet open={editOpen} onOpenChange={setEditOpen}>
          <SheetContent className="overflow-hidden sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>{t("profile.editProfile")}</SheetTitle>
              <SheetDescription>{t("profile.profileEditHint")}</SheetDescription>
            </SheetHeader>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-2 space-y-6">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("profile.editSection.basic")}
                </p>
                <div>
                  <label htmlFor="profile-display-name" className="text-sm font-medium">
                    {t("profile.displayName")}
                  </label>
                  <Input
                    id="profile-display-name"
                    value={draftProfile.name}
                    onChange={(event) =>
                      setDraftProfile((current) => ({ ...current, name: event.target.value }))
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">{t("profile.availabilityStatus")}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {availabilityStatuses.map((status) => {
                      const active = draftProfile.availabilityStatus === status;
                      return (
                        <button
                          key={status}
                          type="button"
                          aria-pressed={active}
                          aria-label={t(`profile.availability.${status}`)}
                          onClick={() =>
                            setDraftProfile((current) => ({
                              ...current,
                              availabilityStatus: status,
                            }))
                          }
                          className={`rounded-md border px-2.5 py-1.5 text-xs transition ${
                            active
                              ? "border-foreground bg-foreground text-background"
                              : "border-border bg-secondary text-foreground hover:border-foreground/30"
                          }`}
                          title={t(`profile.availabilityDesc.${status}`)}
                        >
                          {t(`profile.availability.${status}`)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("profile.editSection.about")}
                </p>
                <div>
                  <label htmlFor="profile-bio" className="text-sm font-medium">
                    {t("profile.about")}
                  </label>
                  <Textarea
                    id="profile-bio"
                    value={draftProfile.bio}
                    onChange={(event) =>
                      setDraftProfile((current) => ({ ...current, bio: event.target.value }))
                    }
                    className="mt-2 min-h-28"
                    placeholder={t("profile.bioPlaceholder")}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("profile.editSection.capability")}
                </p>
                <div>
                  <p className="text-sm font-medium mb-2">{t("profile.skills")}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {contributorSkillOrder.map((skill) => {
                      const active = draftProfile.skills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`rounded-md border px-2.5 py-1 text-xs transition ${
                            active
                              ? "border-foreground bg-foreground text-background"
                              : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {t(`contributors.skill.${skill}`)}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {draftProfile.customSkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1 text-xs">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeCustomSkill(skill)}
                          aria-label={t("profile.removeCustomSkill", { skill })}
                          className="rounded-full hover:text-foreground"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Input
                      id="profile-custom-skill-input"
                      value={customSkillInput}
                      onChange={(event) => setCustomSkillInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          addCustomSkill();
                        }
                      }}
                      placeholder={t("profile.customSkillPlaceholder")}
                    />
                    <Button type="button" variant="outline" onClick={addCustomSkill}>
                      <Plus className="w-4 h-4" />
                      <span>{t("profile.addCustomSkill")}</span>
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">{t("profile.languages")}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {draftProfile.languages.map((language) => (
                      <Badge key={language} variant="secondary" className="gap-1 text-xs">
                        {language}
                        <button
                          type="button"
                          onClick={() => removeLanguage(language)}
                          aria-label={t("profile.removeLanguage", { language })}
                          className="rounded-full hover:text-foreground"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Input
                      id="profile-language-input"
                      value={languageInput}
                      onChange={(event) => setLanguageInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          addLanguage();
                        }
                      }}
                      placeholder={t("profile.languagePlaceholder")}
                    />
                    <Button type="button" variant="outline" onClick={addLanguage}>
                      <Plus className="w-4 h-4" />
                      <span>{t("profile.addLanguage")}</span>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("profile.editSection.media")}
                </p>
                <div className="space-y-2">
                  {draftProfile.links.map((link, index) => (
                    <div key={`${link.type}-${index}`} className="rounded-lg border border-border p-3">
                      <div className="flex flex-wrap gap-1.5">
                        {profileLinkTypes.map((type) => {
                          const active = link.type === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => updateLink(index, { type })}
                              className={`rounded-md border px-2 py-1 text-[0.7rem] transition ${
                                active
                                  ? "border-foreground bg-foreground text-background"
                                  : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {t(`profile.linkType.${type}`)}
                            </button>
                          );
                        })}
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Input
                          value={link.href}
                          onChange={(event) => updateLink(index, { href: event.target.value })}
                          placeholder={t("profile.mediaUrlPlaceholder")}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeLink(index)}
                          aria-label={t("profile.removeMediaLink")}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addLink}>
                    <Plus className="w-4 h-4" />
                    <span>{t("profile.addMediaLink")}</span>
                  </Button>
                </div>
              </div>
            </div>
            <SheetFooter className="border-t border-border bg-background sm:flex-row">
              <Button variant="outline" onClick={() => setEditOpen(false)}>
                {t("common.cancel")}
              </Button>
              <Button onClick={saveProfile}>{t("profile.saveProfile")}</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
