import { Link } from "react-router";
import {
  ArrowRight,
  ClipboardList,
  FileText,
  MessageSquareText,
  Plus,
  Search,
  Sprout,
  UsersRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

const seeds = [
  {
    id: "care",
    titleKey: "discover.seeds.care.title",
    descKey: "discover.seeds.care.desc",
    needKey: "discover.seeds.care.need",
    nextKey: "discover.seeds.care.next",
  },
  {
    id: "learning",
    titleKey: "discover.seeds.learning.title",
    descKey: "discover.seeds.learning.desc",
    needKey: "discover.seeds.learning.need",
    nextKey: "discover.seeds.learning.next",
  },
  {
    id: "protocol",
    titleKey: "discover.seeds.protocol.title",
    descKey: "discover.seeds.protocol.desc",
    needKey: "discover.seeds.protocol.need",
    nextKey: "discover.seeds.protocol.next",
  },
] as const;

const actions = [
  {
    id: "case",
    icon: FileText,
    titleKey: "discover.actions.case.title",
    descKey: "discover.actions.case.desc",
    metaKey: "discover.actions.case.meta",
  },
  {
    id: "interview",
    icon: MessageSquareText,
    titleKey: "discover.actions.interview.title",
    descKey: "discover.actions.interview.desc",
    metaKey: "discover.actions.interview.meta",
  },
  {
    id: "map",
    icon: UsersRound,
    titleKey: "discover.actions.map.title",
    descKey: "discover.actions.map.desc",
    metaKey: "discover.actions.map.meta",
  },
] as const;

const drafts = [
  {
    id: "care-protocol",
    titleKey: "discover.drafts.careProtocol.title",
    descKey: "discover.drafts.careProtocol.desc",
    stateKey: "discover.drafts.careProtocol.state",
  },
  {
    id: "learning-charter",
    titleKey: "discover.drafts.learningCharter.title",
    descKey: "discover.drafts.learningCharter.desc",
    stateKey: "discover.drafts.learningCharter.state",
  },
] as const;

export function DiscoverPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5 p-4 sm:p-6 lg:p-8">
      <section className="border-b border-border pb-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <Sprout className="h-3.5 w-3.5" />
              {t("discover.eyebrow")}
            </div>
            <h1 className="mb-2 text-2xl sm:text-3xl">{t("discover.title")}</h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              {t("discover.subtitle")}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Button asChild>
              <Link to="/create-project">
                <Plus className="h-4 w-4" />
                {t("discover.startSeed")}
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-border">
              <Link to="/town-hall">
                {t("discover.townHall")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Card className="gap-0 overflow-hidden border-border bg-card">
        <div className="border-b border-border p-4 sm:p-5">
          <div className="relative max-w-3xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("discover.searchPlaceholder")}
              className="h-11 border-border bg-background pl-10"
            />
          </div>
        </div>
        <div className="grid gap-px bg-border lg:grid-cols-3">
          <div className="bg-card p-4 sm:p-5">
            <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
              {t("discover.origin.problem")}
            </p>
            <p className="text-sm leading-6">{t("discover.origin.problemDesc")}</p>
          </div>
          <div className="bg-card p-4 sm:p-5">
            <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
              {t("discover.origin.people")}
            </p>
            <p className="text-sm leading-6">{t("discover.origin.peopleDesc")}</p>
          </div>
          <div className="bg-card p-4 sm:p-5">
            <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
              {t("discover.origin.action")}
            </p>
            <p className="text-sm leading-6">{t("discover.origin.actionDesc")}</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg">{t("discover.seedTitle")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t("discover.seedDesc")}</p>
            </div>
          </div>

          <div className="space-y-3">
            {seeds.map((seed) => (
              <Link
                key={seed.id}
                to="/create-project"
                className="group block rounded-lg border border-border bg-card p-4 transition hover:border-foreground/30 sm:p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="border-border text-muted-foreground">
                        {t("discover.seedBadge")}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{t(seed.needKey)}</span>
                    </div>
                    <h3 className="text-base">{t(seed.titleKey)}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                      {t(seed.descKey)}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <div className="mt-4 border-t border-border pt-3 text-sm text-muted-foreground">
                  <span className="text-foreground">{t("discover.nextStep")}</span>
                  <span className="ml-2">{t(seed.nextKey)}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <aside className="space-y-5">
          <section className="space-y-3">
            <div>
              <h2 className="text-lg">{t("discover.actionTitle")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t("discover.actionDesc")}</p>
            </div>
            <div className="space-y-2">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.id}
                    to="/create-project"
                    className="flex gap-3 rounded-lg border border-border bg-card p-3 transition hover:border-foreground/30"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm">{t(action.titleKey)}</h3>
                        <span className="text-xs text-muted-foreground">{t(action.metaKey)}</span>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {t(action.descKey)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="space-y-3">
            <div>
              <h2 className="text-lg">{t("discover.draftTitle")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t("discover.draftDesc")}</p>
            </div>
            <div className="space-y-2">
              {drafts.map((draft) => (
                <Link
                  key={draft.id}
                  to="/create-project"
                  className="block rounded-lg border border-border bg-card p-4 transition hover:border-foreground/30"
                >
                  <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <ClipboardList className="h-3.5 w-3.5" />
                    {t(draft.stateKey)}
                  </div>
                  <h3 className="text-sm">{t(draft.titleKey)}</h3>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {t(draft.descKey)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
