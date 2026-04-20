import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type WalletTier = 1 | 2 | 3 | 4;
export type WalletStatus = "disconnected" | "connecting" | "connected";

export interface ECNYWallet {
  id: string;
  bank: string;
  bankKey: string;
  tier: WalletTier;
  balance: number;
  displayName: string;
  avatar: string;
  transactions: WalletTransaction[];
}

export interface WalletTransaction {
  id: string;
  type: "in" | "out";
  amount: number;
  label: string;
  labelKey: string;
  time: string;
}

interface WalletContextType {
  status: WalletStatus;
  wallet: ECNYWallet | null;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  connectWithBank: (bankKey: string) => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

const MOCK_WALLETS: Record<string, ECNYWallet> = {
  icbc: {
    id: "138****8866",
    bank: "中国工商银行",
    bankKey: "icbc",
    tier: 2,
    balance: 2680.5,
    displayName: "Alex",
    avatar: "A",
    transactions: [
      { id: "t1", type: "in", amount: 500, label: "DAO 贡献奖励", labelKey: "wallet.tx.daoReward", time: "2026-03-25" },
      { id: "t2", type: "out", amount: 120, label: "治理提案质押", labelKey: "wallet.tx.govStake", time: "2026-03-24" },
      { id: "t3", type: "in", amount: 200, label: "赏金任务结算", labelKey: "wallet.tx.bountySettle", time: "2026-03-22" },
      { id: "t4", type: "out", amount: 50, label: "NFT 铸造", labelKey: "wallet.tx.nftMint", time: "2026-03-20" },
    ],
  },
  boc: {
    id: "139****2200",
    bank: "中国银行",
    bankKey: "boc",
    tier: 2,
    balance: 1450.0,
    displayName: "Alex",
    avatar: "A",
    transactions: [
      { id: "t1", type: "in", amount: 300, label: "DAO 贡献奖励", labelKey: "wallet.tx.daoReward", time: "2026-03-25" },
      { id: "t2", type: "out", amount: 80, label: "治理提案质押", labelKey: "wallet.tx.govStake", time: "2026-03-23" },
    ],
  },
  ccb: {
    id: "137****5511",
    bank: "中国建设银行",
    bankKey: "ccb",
    tier: 3,
    balance: 860.25,
    displayName: "Alex",
    avatar: "A",
    transactions: [
      { id: "t1", type: "in", amount: 150, label: "赏金任务结算", labelKey: "wallet.tx.bountySettle", time: "2026-03-24" },
    ],
  },
};

export function WalletProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<WalletStatus>("disconnected");
  const [wallet, setWallet] = useState<ECNYWallet | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const connectWithBank = useCallback((bankKey: string) => {
    setStatus("connecting");
    setTimeout(() => {
      const w = MOCK_WALLETS[bankKey] ?? MOCK_WALLETS.icbc;
      setWallet(w);
      setStatus("connected");
      setDialogOpen(false);
    }, 1200);
  }, []);

  const disconnect = useCallback(() => {
    setWallet(null);
    setStatus("disconnected");
  }, []);

  return (
    <WalletContext.Provider
      value={{ status, wallet, dialogOpen, setDialogOpen, connectWithBank, disconnect }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
