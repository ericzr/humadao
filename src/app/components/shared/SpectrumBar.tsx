import { useTranslation } from "react-i18next";
import { SPECTRUM_AXES, type SpectrumProfile } from "@/types/dao-tags";

interface Props {
  spectrum: SpectrumProfile;
}

export function SpectrumBar({ spectrum }: Props) {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      {SPECTRUM_AXES.map((axis) => {
        const labels = t(`daoProfile.spectrum.${axis}` as never, { returnObjects: true }) as [string, string];
        const value = spectrum[axis];
        return (
          <div key={axis}>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>{labels[0]}</span>
              <span>{labels[1]}</span>
            </div>
            <div className="relative h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-primary/70 transition-all"
                style={{ width: `${value}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background shadow-sm transition-all"
                style={{ left: `calc(${value}% - 6px)` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
