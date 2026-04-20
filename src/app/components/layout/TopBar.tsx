import { Sun, Moon, Globe, Wallet } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { useTranslation } from "react-i18next";
import { useWallet } from "@/contexts/WalletContext";
import { WalletConnectDialog } from "../wallet/WalletConnectDialog";
import { WalletInfoPopover } from "../wallet/WalletInfoPopover";

const languages = [
  { code: "zh", label: "中文" },
  { code: "en", label: "English" },
];

export function TopBar() {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { status, setDialogOpen } = useWallet();

  const currentLang = languages.find((l) => l.code === lang);

  return (
    <>
      <header className="h-12 border-b border-border bg-background/80 backdrop-blur-sm flex items-center gap-2 px-3 md:px-5 shrink-0 sticky top-0 z-40 min-w-0">
        <SidebarTrigger className="-ml-1 shrink-0" />
        <Separator orientation="vertical" className="mr-1 h-4 md:hidden shrink-0" />

        <div className="flex-1 min-w-0" />

        <button
          onClick={() => {
            const next = theme === "dark" ? "light" : "dark";
            if (document.startViewTransition) {
              document.startViewTransition(() => setTheme(next));
            } else {
              setTheme(next);
            }
          }}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition shrink-0"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-8 px-2.5 rounded-lg flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{currentLang?.label}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((l) => (
              <DropdownMenuItem key={l.code} onClick={() => i18n.changeLanguage(l.code)} className={lang === l.code ? "bg-accent" : ""}>
                {l.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {status === "connected" ? (
          <WalletInfoPopover />
        ) : (
          <Button
            className="h-8 bg-foreground text-background hover:bg-foreground/90 gap-1.5 text-sm"
            onClick={() => setDialogOpen(true)}
          >
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">{t("connectWallet")}</span>
          </Button>
        )}
      </header>

      <WalletConnectDialog />
    </>
  );
}
