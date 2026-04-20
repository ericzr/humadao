import { useTranslation } from "react-i18next";
import { Card } from "../../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { ValuesRadarChart } from "../../shared/ValuesRadarChart";
import { SpectrumBar } from "../../shared/SpectrumBar";
import {
  VALUE_DIMENSIONS,
  SPECTRUM_AXES,
  DAO_PRESETS,
  DEFAULT_VALUES,
  DEFAULT_SPECTRUM,
  type ValuesProfile,
  type SpectrumProfile,
  type DAOArchetype,
} from "@/types/dao-tags";

interface Props {
  values: ValuesProfile;
  spectrum: SpectrumProfile;
  onValuesChange: (v: ValuesProfile) => void;
  onSpectrumChange: (s: SpectrumProfile) => void;
}

const PRESET_KEYS: (DAOArchetype | "none")[] = ["none", "idealCommunity", "projectExecution", "crowdsourcing", "publicGood"];

const presetI18n: Record<string, string> = {
  none: "create.profile.presetNone",
  idealCommunity: "create.profile.presetIdealCommunity",
  projectExecution: "create.profile.presetProjectExecution",
  crowdsourcing: "create.profile.presetCrowdsourcing",
  publicGood: "create.profile.presetPublicGood",
};

export function DAOProfileSection({ values, spectrum, onValuesChange, onSpectrumChange }: Props) {
  const { t } = useTranslation();

  const applyPreset = (key: string) => {
    if (key === "none") {
      onValuesChange({ ...DEFAULT_VALUES });
      onSpectrumChange({ ...DEFAULT_SPECTRUM });
    } else {
      const preset = DAO_PRESETS[key as DAOArchetype];
      onValuesChange({ ...preset.values });
      onSpectrumChange({ ...preset.spectrum });
    }
  };

  const updateValue = (dim: keyof ValuesProfile, v: number) => {
    onValuesChange({ ...values, [dim]: v });
  };

  const updateSpectrum = (axis: keyof SpectrumProfile, v: number) => {
    onSpectrumChange({ ...spectrum, [axis]: v });
  };

  return (
    <Card className="bg-card border-border p-4 sm:p-6 space-y-6">
      <div>
        <h2>{t("create.profile.title")}</h2>
        <p className="text-muted-foreground text-sm mt-1">{t("create.profile.desc")}</p>
      </div>

      <div>
        <label className="text-muted-foreground mb-1 block text-sm">{t("create.profile.presetLabel")}</label>
        <Select onValueChange={applyPreset}>
          <SelectTrigger className="bg-secondary border-border w-full sm:w-64">
            <SelectValue placeholder={t("create.profile.presetNone")} />
          </SelectTrigger>
          <SelectContent>
            {PRESET_KEYS.map((k) => (
              <SelectItem key={k} value={k}>{t(presetI18n[k] as never)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="mb-3">{t("create.profile.valuesTitle")}</h3>
        <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
          <div className="space-y-3">
            {VALUE_DIMENSIONS.map((dim) => (
              <div key={dim} className="flex items-center gap-3">
                <span className="text-sm w-16 shrink-0 text-right text-muted-foreground">
                  {t(`daoProfile.value.${dim}` as never)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={values[dim]}
                  onChange={(e) => updateValue(dim, Number(e.target.value))}
                  className="flex-1 h-1.5 accent-primary"
                />
                <span className="text-xs w-8 text-muted-foreground tabular-nums">{values[dim]}</span>
              </div>
            ))}
          </div>
          <div className="hidden md:block">
            <ValuesRadarChart values={values} size={180} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3">{t("create.profile.spectrumTitle")}</h3>
        <div className="space-y-4">
          {SPECTRUM_AXES.map((axis) => {
            const labels = t(`daoProfile.spectrum.${axis}` as never, { returnObjects: true }) as [string, string];
            return (
              <div key={axis}>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{labels[0]}</span>
                  <span>{labels[1]}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={spectrum[axis]}
                  onChange={(e) => updateSpectrum(axis, Number(e.target.value))}
                  className="w-full h-1.5 accent-primary"
                />
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
