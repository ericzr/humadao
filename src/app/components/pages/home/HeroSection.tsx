import { Link } from "react-router";
import { FileText } from "lucide-react";
import { Button } from "../../ui/button";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
      <div className="relative mx-auto">
        <h1 className="mb-4 text-3xl sm:text-4xl leading-tight">
          {t("home.heroTitle")}
        </h1>
        <p className="text-muted-foreground mb-8 mx-auto text-base leading-relaxed max-w-xl text-balance">
          {t("home.heroDesc")}
        </p>
        <Link to="/whitepaper">
          <Button className="bg-foreground text-background hover:bg-foreground/90 px-6 py-2.5 gap-2">
            <FileText className="w-4 h-4" />
            {t("home.whitepaper")}
          </Button>
        </Link>
      </div>
    </section>
  );
}
