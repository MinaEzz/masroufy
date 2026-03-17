"use client";

import { useTranslations } from "next-intl";
import { type ITransaction, TransactionType } from "@/types/dashboard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, ArrowRightLeft } from "lucide-react";

interface RecentTransactionsProps {
  transactions: ITransaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const t = useTranslations("Dashboard");

  // Type Icon helper
  const getIcon = (type: TransactionType) => {
    switch (type) {
      case TransactionType.INCOME:
        return <ArrowUpRight className="h-4 w-4 text-emerald-500" />;
      case TransactionType.EXPENSE:
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      case TransactionType.TRANSFER:
        return <ArrowRightLeft className="h-4 w-4 text-blue-500" />;
    }
  };

  // Color helper based on transaction type
  const getAmountColor = (type: TransactionType) => {
    if (type === TransactionType.INCOME) return "text-emerald-500";
    if (type === TransactionType.EXPENSE) return "text-red-500";
    return "text-foreground";
  };

  const getAmountPrefix = (type: TransactionType) => {
    if (type === TransactionType.INCOME) return "+";
    if (type === TransactionType.EXPENSE) return "-";
    return "";
  };

  return (
    <Card className="border-border bg-card shadow-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">{t("recentTransactions")}</CardTitle>
      </CardHeader>
      
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground border border-dashed rounded-lg border-border">
            {t("noTransactions")}
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((txn) => (
              <div 
                key={txn.id} 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border group"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background border border-border group-hover:border-primary/30 transition-colors">
                    {getIcon(txn.type)}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none text-foreground">
                      {txn.note || (txn.category ? t(txn.category.i18nKey || "") : "Transaction")}
                    </p>
                    <p className="text-xs text-muted-foreground flex gap-2">
                      <span>{txn.account?.name}</span>
                      {txn.type === TransactionType.TRANSFER && txn.toAccount && (
                         <span>→ {txn.toAccount.name}</span>
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                  <span className={`font-semibold ${getAmountColor(txn.type)}`}>
                    {getAmountPrefix(txn.type)}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: txn.account?.currency || "EGP",
                    }).format(txn.amount)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Intl.DateTimeFormat("en-US", { 
                      month: "short", 
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit" 
                    }).format(txn.date)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
