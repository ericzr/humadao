import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Wallet, LogOut, ArrowDownLeft, ArrowUpRight, Landmark, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";
import { useWallet, type WalletTier } from "@/contexts/WalletContext";
import { useTranslation } from "react-i18next";

const TIER_LABELS: Record<WalletTier, string> = {
  1: "wallet.tier.1",
  2: "wallet.tier.2",
  3: "wallet.tier.3",
  4: "wallet.tier.4",
};

const TIER_LIMITS: Record<WalletTier, string> = {
  1: "wallet.tierLimit.1",
  2: "wallet.tierLimit.2",
  3: "wallet.tierLimit.3",
  4: "wallet.tierLimit.4",
};

export function WalletInfoPopover() {
  const { t } = useTranslation();
  const { wallet, disconnect } = useWallet();
  if (!wallet) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-8 border-border text-foreground gap-1.5 text-sm"
        >
          <Wallet className="w-4 h-4" />
          <span className="hidden sm:inline">¥{wallet.balance.toLocaleString()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="p-4 space-y-4">
          {/* balance */}
          <div className="text-center space-y-1">
            <p className="text-xs text-muted-foreground">{t("wallet.balance")}</p>
            <p className="text-2xl font-bold text-foreground">
              ¥{wallet.balance.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}
            </p>
            <div className="inline-flex items-center gap-1 text-xs bg-muted/60 rounded-full px-2 py-0.5">
              <span className="text-muted-foreground">e-CNY</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{t("wallet.digitalRMB")}</span>
            </div>
          </div>

          {/* wallet info */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5" />
                {t("wallet.bank_label")}
              </span>
              <span className="text-foreground">{t(`wallet.bank.${wallet.bankKey}` as never)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t("wallet.walletId")}</span>
              <span className="text-foreground font-mono text-xs">{wallet.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t("wallet.tierLabel")}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-foreground">{t(TIER_LABELS[wallet.tier] as never)}</span>
                <span className="text-xs text-muted-foreground">({t(TIER_LIMITS[wallet.tier] as never)})</span>
              </div>
            </div>
          </div>

          {/* recent transactions */}
          {wallet.transactions.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium">{t("wallet.recentTx")}</p>
              <div className="space-y-1">
                {wallet.transactions.slice(0, 4).map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between py-1.5 text-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      {tx.type === "in" ? (
                        <ArrowDownLeft className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      )}
                      <span className="text-foreground truncate">{t(tx.labelKey as never)}</span>
                    </div>
                    <span className={tx.type === "in" ? "text-green-500 shrink-0" : "text-orange-500 shrink-0"}>
                      {tx.type === "in" ? "+" : "-"}¥{tx.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* disconnect */}
          <button
            onClick={disconnect}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition"
          >
            <LogOut className="w-4 h-4" />
            {t("wallet.disconnect")}
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
