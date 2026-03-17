"use client";

import { type IAccount, AccountType } from "@/types/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, CreditCard, Landmark, Smartphone, WalletCards } from "lucide-react";

interface WalletCardProps {
  account: IAccount;
}

export default function WalletCard({ account }: WalletCardProps) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: account.currency || "EGP",
    minimumFractionDigits: 2,
  });

  // Decide icon based on Account type/icon
  const getIcon = () => {
    switch (account.type) {
      case AccountType.CASH:
        return <Coins className="h-5 w-5" />;
      case AccountType.DEBIT:
        return <Landmark className="h-5 w-5" />;
      case AccountType.CREDIT:
        return <CreditCard className="h-5 w-5" />;
      case AccountType.VODAFONE_CASH:
        return <Smartphone className="h-5 w-5" />;
      default:
        return <WalletCards className="h-5 w-5" />;
    }
  };

  const isCredit = account.type === AccountType.CREDIT;
  const cardColor = account.color || "#10b981";

  return (
    <Card className="flex flex-col justify-between overflow-hidden relative transition-all hover:-translate-y-1 hover:shadow-md h-[140px] border-border bg-card">
      <div 
        className="absolute top-0 left-0 w-1 h-full" 
        style={{ backgroundColor: cardColor }} 
      />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground truncate pe-2">
          {account.name}
        </CardTitle>
        <div 
          className="rounded-full p-2" 
          style={{ backgroundColor: `${cardColor}20`, color: cardColor }}
        >
          {getIcon()}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold tracking-tight text-white mb-1">
          {formatter.format(account.balance)}
        </div>
        {isCredit && typeof account.creditLimit === 'number' && (
          <p className="text-xs text-muted-foreground">
            Limit: {formatter.format(account.creditLimit)}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
