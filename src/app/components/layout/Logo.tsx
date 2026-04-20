import iconPng from "@/assets/logo/icon.png";
import textSvgPaths from "@/assets/logo/text-zh-paths";
import enSvgPaths from "@/assets/logo/text-en-paths";
import { useTranslation } from "react-i18next";

interface LogoProps {
  collapsed?: boolean;
  className?: string;
}

function RotatingIcon({ size }: { size: number }) {
  return (
    <div className="shrink-0" style={{ width: size, height: size }}>
      <img
        src={iconPng}
        alt=""
        className="block w-full h-full dark:invert animate-[rhythmic-spin_2.5s_cubic-bezier(0.37,0,0.63,1)_infinite]"
        draggable={false}
      />
    </div>
  );
}

function EnglishLogo({ iconSize }: { iconSize: number }) {
  return (
    <div className="flex items-center gap-2">
      <RotatingIcon size={iconSize} />
      <div className="h-4 relative" style={{ width: 88 }}>
        <svg
          viewBox="410 58 1015 210"
          fill="none"
          preserveAspectRatio="xMinYMid meet"
          className="h-full w-full"
        >
          <path d={enSvgPaths.p3cc57200} fill="currentColor" />
          <path d={enSvgPaths.p320de000} fill="currentColor" />
          <path d={enSvgPaths.p1ec93d00} fill="currentColor" />
          <path d={enSvgPaths.p24536600} fill="currentColor" />
          <path d={enSvgPaths.p331a5300} fill="currentColor" />
          <path d={enSvgPaths.p96ab700} fill="currentColor" />
          <path d={enSvgPaths.p1d2bed00} fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

function ChineseLogo({ iconSize }: { iconSize: number }) {
  return (
    <div className="flex items-center gap-2">
      <RotatingIcon size={iconSize} />
      <div className="h-4 relative" style={{ width: 72 }}>
        <svg
          viewBox="380 30 850 300"
          fill="none"
          preserveAspectRatio="xMinYMid meet"
          className="h-full w-full"
        >
          <path d={textSvgPaths.p234a3700} fill="currentColor" />
          <path d={textSvgPaths.pff05d0} fill="currentColor" />
          <path d={textSvgPaths.p26fbb000} fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

export function Logo({ collapsed = false, className = "" }: LogoProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isEnglish = lang === "en";

  return (
    <div
      className={`flex items-center ${collapsed ? "justify-center" : ""} ${className}`}
    >
      {collapsed ? (
        <RotatingIcon size={22} />
      ) : isEnglish ? (
        <EnglishLogo iconSize={24} />
      ) : (
        <ChineseLogo iconSize={24} />
      )}

      <style>{`
        @keyframes rhythmic-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
