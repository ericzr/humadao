import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Loader2, Landmark, Smartphone, ShieldCheck } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { useTranslation } from "react-i18next";
import { cn } from "../ui/utils";

const BANKS = [
  { key: "icbc", nameKey: "wallet.bank.icbc", color: "bg-red-600" },
  { key: "boc", nameKey: "wallet.bank.boc", color: "bg-red-700" },
  { key: "ccb", nameKey: "wallet.bank.ccb", color: "bg-blue-700" },
  { key: "abc", nameKey: "wallet.bank.abc", color: "bg-green-700" },
  { key: "bocom", nameKey: "wallet.bank.bocom", color: "bg-blue-600" },
  { key: "psbc", nameKey: "wallet.bank.psbc", color: "bg-green-600" },
];

export function WalletConnectDialog() {
  const { t } = useTranslation();
  const { dialogOpen, setDialogOpen, status, connectWithBank } = useWallet();
  const isConnecting = status === "connecting";

  return (
    <DialogPrimitive.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-[70] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-[70] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <div className="p-6 space-y-5">
            {/* header */}
            <div className="space-y-1.5">
              <DialogPrimitive.Title className="text-lg font-semibold text-foreground">
                {t("wallet.connectTitle")}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="text-sm text-muted-foreground">
                {t("wallet.connectDesc")}
              </DialogPrimitive.Description>
            </div>

            {isConnecting ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">{t("wallet.connecting")}</p>
              </div>
            ) : (
              <>
                {/* e-CNY App */}
                <button
                  onClick={() => connectWithBank("icbc")}
                  className="w-full flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition group"
                >
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{t("wallet.ecnyApp")}</p>
                    <p className="text-xs text-muted-foreground">{t("wallet.ecnyAppDesc")}</p>
                  </div>
                </button>

                {/* banks */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">{t("wallet.bankAuth")}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {BANKS.map((bank) => (
                      <button
                        key={bank.key}
                        onClick={() => connectWithBank(bank.key)}
                        className="flex items-center gap-2.5 p-3 rounded-lg border border-border hover:bg-accent/50 transition"
                      >
                        <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0", bank.color)}>
                          <Landmark className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm text-foreground truncate">{t(bank.nameKey as never)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* security note */}
                <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{t("wallet.securityNote")}</span>
                </div>
              </>
            )}
          </div>

          <DialogPrimitive.Close className="absolute top-4 right-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity text-muted-foreground">
            <X className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
