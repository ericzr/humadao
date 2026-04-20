import { useState } from "react";
import { useNavigate } from "react-router";
import { Check, ChevronLeft, ChevronRight, Loader2, Rocket } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { BasicInfoSection } from "./create-project/BasicInfoSection";
import { CategoryTagsSection } from "./create-project/CategoryTagsSection";
import { DAOProfileSection } from "./create-project/DAOProfileSection";
import { SkillsSection } from "./create-project/SkillsSection";
import { FundingSection } from "./create-project/FundingSection";
import { LinksSection } from "./create-project/LinksSection";
import { DEFAULT_VALUES, DEFAULT_SPECTRUM, type ValuesProfile, type SpectrumProfile } from "@/types/dao-tags";
import { PRESETS, INTEGRATION_MODULES, defaultLevelFor, hasModuleConfig, defaultConfigFor } from "@/data";
import type { DAOModule, DAOModuleConfig, DAOPreset, IntegrationLevel } from "@/types";
import { ModulesSection } from "./create-project/ModulesSection";

export interface CreateDAOFormData {
  name: string;
  brief: string;
  description: string;
  logo: File | null;
  categories: string[];
  tags: string[];
  skills: string[];
  budget: string;
  tokenSymbol: string;
  revenueModel: string;
  website: string;
  github: string;
  discord: string;
  twitter: string;
  preset: DAOPreset;
  modules: DAOModule[];
  integrationLevels: Partial<Record<DAOModule, IntegrationLevel>>;
  moduleConfig: DAOModuleConfig;
}

/** Seed default integration levels for every integration module in the set. */
function defaultLevelsFor(modules: DAOModule[]): Partial<Record<DAOModule, IntegrationLevel>> {
  const out: Partial<Record<DAOModule, IntegrationLevel>> = {};
  for (const m of modules) {
    if (INTEGRATION_MODULES.includes(m)) {
      const lvl = defaultLevelFor(m);
      if (lvl) out[m] = lvl;
    }
  }
  return out;
}

/** Seed default config values for every configurable module in the set. */
function defaultConfigsFor(modules: DAOModule[]): DAOModuleConfig {
  const out: DAOModuleConfig = {};
  for (const m of modules) {
    if (hasModuleConfig(m)) out[m] = defaultConfigFor(m);
  }
  return out;
}

const emptyForm: CreateDAOFormData = {
  name: "",
  brief: "",
  description: "",
  logo: null,
  categories: [],
  tags: [],
  skills: [],
  budget: "",
  tokenSymbol: "",
  revenueModel: "",
  website: "",
  github: "",
  discord: "",
  twitter: "",
  preset: "standard",
  modules: [...PRESETS.standard.modules],
  integrationLevels: defaultLevelsFor(PRESETS.standard.modules),
  moduleConfig: defaultConfigsFor(PRESETS.standard.modules),
};

const STEPS = [
  "create.step.basic",
  "create.step.category",
  "create.step.modules",
  "create.step.profile",
  "create.step.skills",
  "create.step.funding",
  "create.step.links",
] as const;

function StepIndicator({ current, total, labels, t }: { current: number; total: number; labels: readonly string[]; t: (k: string) => string }) {
  return (
    <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 shrink-0">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              i < current ? "bg-primary text-primary-foreground" : i === current ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"
            }`}
          >
            {i < current ? <Check className="w-4 h-4" /> : i + 1}
          </div>
          <span className={`text-xs ${i === current ? "text-foreground font-medium" : "text-muted-foreground"} hidden sm:inline`}>
            {t(labels[i])}
          </span>
          {i < total - 1 && <div className={`w-6 h-px ${i < current ? "bg-primary" : "bg-border"}`} />}
        </div>
      ))}
    </div>
  );
}

export function CreateProjectPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<CreateDAOFormData>(emptyForm);
  const [valuesProfile, setValuesProfile] = useState<ValuesProfile>({ ...DEFAULT_VALUES });
  const [spectrumProfile, setSpectrumProfile] = useState<SpectrumProfile>({ ...DEFAULT_SPECTRUM });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (patch: Partial<CreateDAOFormData>) => setForm((prev) => ({ ...prev, ...patch }));

  const canNext = (): boolean => {
    if (step === 0) return form.name.trim().length > 0 && form.brief.trim().length > 0;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
          <Rocket className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="text-2xl mb-2">{t("create.successTitle")}</h1>
        <p className="text-muted-foreground mb-6">{t("create.successDesc")}</p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/")}>{t("create.backHome")}</Button>
          <Button onClick={() => { setForm(emptyForm); setStep(0); setSubmitted(false); setValuesProfile({ ...DEFAULT_VALUES }); setSpectrumProfile({ ...DEFAULT_SPECTRUM }); }}>{t("create.createAnother")}</Button>
        </div>
      </div>
    );
  }

  const sections = [
    <BasicInfoSection key="basic" form={form} update={update} />,
    <CategoryTagsSection key="cat" form={form} update={update} />,
    <ModulesSection key="modules" form={form} update={update} />,
    <DAOProfileSection key="profile" values={valuesProfile} spectrum={spectrumProfile} onValuesChange={setValuesProfile} onSpectrumChange={setSpectrumProfile} />,
    <SkillsSection key="skills" form={form} update={update} />,
    <FundingSection key="fund" form={form} update={update} />,
    <LinksSection key="links" form={form} update={update} />,
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <h1 className="mb-2">{t("create.title")}</h1>
      <p className="text-muted-foreground mb-6">{t("create.subtitle")}</p>

      <StepIndicator current={step} total={STEPS.length} labels={STEPS} t={t} />

      <div className="min-h-[300px]">{sections[step]}</div>

      <div className="flex items-center justify-between gap-3 mt-6 pb-8">
        <Button variant="outline" className="border-border text-muted-foreground" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
          <ChevronLeft className="w-4 h-4 mr-1" /> {t("create.prev")}
        </Button>

        <div className="flex gap-3">
          <Button variant="ghost" className="text-muted-foreground" onClick={() => navigate(-1)}>
            {t("create.saveDraft")}
          </Button>
          {step < STEPS.length - 1 ? (
            <Button className="bg-foreground text-background hover:bg-foreground/90 px-6" disabled={!canNext()} onClick={() => setStep((s) => s + 1)}>
              {t("create.next")} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button className="bg-foreground text-background hover:bg-foreground/90 px-8" disabled={submitting} onClick={handleSubmit}>
              {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              {t("create.publish")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
