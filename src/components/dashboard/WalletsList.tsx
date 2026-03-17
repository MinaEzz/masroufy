"use client";

import { useTranslations } from "next-intl";
import { type IAccount } from "@/types/dashboard";
import WalletCard from "./WalletCard";

interface WalletsListProps {
  accounts: IAccount[];
}

export default function WalletsList({ accounts }: WalletsListProps) {
  const t = useTranslations("Dashboard");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          {t("myWallets")}
        </h2>
      </div>
      
      {/* Horizontal scrolling container on mobile, grid on desktop */}
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0">
        {accounts.map((account) => (
          <div key={account.id} className="min-w-[280px] sm:min-w-[300px] snap-center shrink-0 md:min-w-0">
            <WalletCard account={account} />
          </div>
        ))}
        {accounts.length === 0 && (
          <div className="text-center p-8 border border-dashed border-border rounded-lg text-muted-foreground w-full col-span-full">
            {t("noWallets")}
          </div>
        )}
      </div>
    </div>
  );
}
