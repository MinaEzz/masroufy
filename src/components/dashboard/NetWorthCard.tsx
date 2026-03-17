"use client";

import { useTranslations } from "next-intl";
import { type IAccount } from "@/types/dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wallet } from "lucide-react";

interface NetWorthCardProps {
  accounts: IAccount[];
}

export default function NetWorthCard({ accounts }: NetWorthCardProps) {
  const t = useTranslations("Dashboard");

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  // Format currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 2,
  });

  return (
    <Card className="relative overflow-hidden border-primary/20 bg-card shadow-[0_0_30px_rgba(16,185,129,0.1)]">
      {/* Subtle Glow Background Effect */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-medium text-foreground">
            {t("netWorthTitle")}
          </CardTitle>
          <CardDescription>{t("netWorthDesc")}</CardDescription>
        </div>
        <div className="rounded-full bg-primary/20 p-3 text-primary">
          <Wallet className="h-6 w-6" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold tracking-tight text-white">
          {formatter.format(totalBalance)}
        </div>
      </CardContent>
    </Card>
  );
}
