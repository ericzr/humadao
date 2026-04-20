import { Wallet, Search, Vote, Coins, type LucideIcon } from "lucide-react";
import { Card } from "../../ui/card";
import { useTranslation } from "react-i18next";

const steps: { step: number; titleKey: string; descKey: string; icon: LucideIcon }[] = [
  { step: 1, titleKey: "home.journey.connectTitle", descKey: "home.journey.connectDesc", icon: Wallet },
  { step: 2, titleKey: "home.journey.discoverTitle", descKey: "home.journey.discoverDesc", icon: Search },
  { step: 3, titleKey: "home.journey.contributeTitle", descKey: "home.journey.contributeDesc", icon: Vote },
  { step: 4, titleKey: "home.journey.earnTitle", descKey: "home.journey.earnDesc", icon: Coins },
];

function StepCard({ s, t }: { s: (typeof steps)[number]; t: (k: string) => string }) {
  const Icon = s.icon;
  return (
    <Card className="bg-card border-border px-4 py-4 lg:px-5 lg:py-[18px] h-full flex flex-col gap-0">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-7 h-7 rounded-md bg-foreground/[0.06] flex items-center justify-center shrink-0">
          <Icon className="w-3.5 h-3.5 text-foreground/65" />
        </div>
        <span className="text-[10px] font-mono text-muted-foreground/35 leading-none tracking-wider uppercase">
          Step {String(s.step).padStart(2, "0")}
        </span>
      </div>
      <p className="text-[13px] font-medium leading-tight">{t(s.titleKey)}</p>
      <p className="text-muted-foreground text-[11px] leading-relaxed mt-1">{t(s.descKey)}</p>
    </Card>
  );
}

export function StatsSection() {
  const { t } = useTranslation();

  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-4xl mx-auto">
        {/* desktop: 4-column horizontal flow (lg+) */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_2rem_1fr_2rem_1fr_2rem_1fr] items-center">
          {steps.map((s, i) => (
            <div key={s.step} className="contents">
              <StepCard s={s} t={t} />
              {i < steps.length - 1 && (
                <div className="flex items-center h-full px-0.5">
                  <svg viewBox="0 0 40 12" className="w-full h-3" preserveAspectRatio="none">
                    <line x1="0" y1="6" x2="30" y2="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" className="text-muted-foreground/25" />
                    <path d="M28 2 L36 6 L28 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/35" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* tablet & mobile: S-shaped 2×2 */}
        <div className="lg:hidden">
          {/* row 1 */}
          <div className="grid grid-cols-[1fr_2rem_1fr] items-center">
            <StepCard s={steps[0]} t={t} />
            <div className="flex items-center h-full px-0.5">
              <svg viewBox="0 0 32 12" className="w-full h-3" preserveAspectRatio="none">
                <line x1="0" y1="6" x2="22" y2="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" className="text-muted-foreground/25" />
                <path d="M20 2 L28 6 L20 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/35" />
              </svg>
            </div>
            <StepCard s={steps[1]} t={t} />
          </div>

          {/* vertical connector aligned right */}
          <div className="grid grid-cols-[1fr_2rem_1fr]">
            <div />
            <div />
            <div className="flex justify-center py-1">
              <svg viewBox="0 0 12 28" className="w-3 h-6">
                <line x1="6" y1="0" x2="6" y2="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" className="text-muted-foreground/25" />
                <path d="M2 16 L6 24 L10 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/35" />
              </svg>
            </div>
          </div>

          {/* row 2: reversed (step 4 ← step 3) */}
          <div className="grid grid-cols-[1fr_2rem_1fr] items-center">
            <StepCard s={steps[3]} t={t} />
            <div className="flex items-center h-full px-0.5">
              <svg viewBox="0 0 32 12" className="w-full h-3" preserveAspectRatio="none">
                <line x1="10" y1="6" x2="32" y2="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" className="text-muted-foreground/25" />
                <path d="M12 2 L4 6 L12 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/35" />
              </svg>
            </div>
            <StepCard s={steps[2]} t={t} />
          </div>
        </div>
      </div>
    </section>
  );
}
