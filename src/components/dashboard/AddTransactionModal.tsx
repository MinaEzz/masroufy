"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus, Loader2, Link2, FileText, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionType } from "@/types/dashboard";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Zod schema strictly typing amount as number
const transactionSchema = z.object({
  type: z.nativeEnum(TransactionType),
  amount: z.number().min(0.01, { message: "Amount must be greater than 0" }),
  note: z.string().optional(),
  accountId: z.string().min(1, "Account is required"),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

export default function AddTransactionModal() {
  const t = useTranslations("Dashboard");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TransactionType>(TransactionType.EXPENSE);

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: TransactionType.EXPENSE,
      amount: 0,
      note: "",
      accountId: "acc_1", // Default to cash for mock
    },
  });

  const onSubmit = async (data: TransactionFormValues) => {
    setIsLoading(true);
    try {
      console.log("Submit transaction:", { ...data, type: activeTab });
      await new Promise((res) => setTimeout(res, 800)); // Simulate fast save
      setOpen(false);
      form.reset();
    } finally {
      setIsLoading(false);
    }
  };

  const getTabColor = (type: TransactionType) => {
    if (activeTab !== type) return "text-muted-foreground hover:bg-muted/50";
    switch (type) {
      case TransactionType.INCOME: return "bg-emerald-500/10 text-emerald-500 shadow-sm ring-1 ring-emerald-500/20";
      case TransactionType.EXPENSE: return "bg-red-500/10 text-red-500 shadow-sm ring-1 ring-red-500/20";
      case TransactionType.TRANSFER: return "bg-blue-500/10 text-blue-500 shadow-sm ring-1 ring-blue-500/20";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.5)] md:static md:h-11 md:px-5 md:w-auto md:rounded-full md:shadow-sm bg-primary text-primary-foreground transition-all z-50 flex items-center justify-center font-medium cursor-pointer hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0">
          <Plus className="h-6 w-6 md:me-2 md:h-5 md:w-5" />
          <span className="hidden md:inline">{t("addTransaction")}</span>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-border/50 shadow-2xl bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
        
        {/* Subtle glow effect behind header based on type */}
        <div className={`absolute top-0 inset-x-0 h-32 opacity-20 blur-3xl rounded-full translate-y-[-50%] transition-colors duration-500 ${
          activeTab === TransactionType.INCOME ? "bg-emerald-500" :
          activeTab === TransactionType.EXPENSE ? "bg-red-500" : "bg-blue-500"
        }`} />

        <div className="px-6 pt-6 pb-2 relative z-10">
          <DialogHeader>
            <DialogTitle className="text-center font-semibold text-xl">
              {t("addTransaction")}
            </DialogTitle>
          </DialogHeader>

          {/* Custom Segmented Pills */}
          <div className="flex p-1 mt-6 bg-muted/40 rounded-full border border-border/50">
            {[TransactionType.EXPENSE, TransactionType.INCOME, TransactionType.TRANSFER].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setActiveTab(type);
                  form.setValue("type", type);
                }}
                className={`flex-1 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${getTabColor(type)}`}
              >
                {type === TransactionType.EXPENSE && t("expense")}
                {type === TransactionType.INCOME && t("income")}
                {type === TransactionType.TRANSFER && t("transfer")}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 pt-2 relative z-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* AMOUNT INPUT - MASSIVE & CLEAN */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center justify-center py-4">
                    <FormLabel className="sr-only">Amount</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center justify-center w-full">
                        <span className={`text-4xl font-light me-2 transition-colors ${
                          activeTab === TransactionType.INCOME ? "text-emerald-500" :
                          activeTab === TransactionType.EXPENSE ? "text-red-500" : "text-blue-500"
                        }`}>
                          {activeTab === TransactionType.EXPENSE ? "-" : activeTab === TransactionType.INCOME ? "+" : ""}
                        </span>
                        
                        <Input
                          type="number"
                          inputMode="decimal"
                          step="0.01"
                          placeholder="0.00"
                          className="h-20 w-full max-w-[200px] p-0 border-0 bg-transparent text-5xl font-bold text-center focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none appearance-none"
                          autoFocus
                          {...field}
                          value={field.value === 0 ? "" : field.value}
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                        />
                        <span className="text-xl font-medium text-muted-foreground ms-2">
                          EGP
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />

              {/* DETAILS SECTION */}
              <div className="space-y-4 bg-muted/20 p-4 rounded-2xl border border-border/40">
                
                {/* ACCOUNT PICKER MOCK */}
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Link2 className="h-4 w-4" />
                  </div>
                  <div className="flex-1 font-medium">Cash Wallet</div>
                  <div className="text-muted-foreground">Change</div>
                </div>
                
                <div className="h-px bg-border/50 w-full" />

                {/* NOTE INPUT */}
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3 space-y-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-focus-within:bg-primary/10 group-focus-within:text-primary">
                        <FileText className="h-4 w-4" />
                      </div>
                      <FormControl>
                        <Input
                          placeholder={t("notePlaceholder")}
                          className="h-auto p-0 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* ACTION BUTTON */}
              <Button 
                type="submit" 
                size="lg"
                disabled={isLoading}
                className={`w-full h-12 rounded-xl font-medium text-base transition-all duration-300 ${
                  activeTab === TransactionType.INCOME ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_4px_14px_rgba(16,185,129,0.4)]" :
                  activeTab === TransactionType.EXPENSE ? "bg-red-500 hover:bg-red-600 text-white shadow-[0_4px_14px_rgba(239,68,68,0.4)]" : 
                  "bg-blue-500 hover:bg-blue-600 text-white shadow-[0_4px_14px_rgba(59,130,246,0.4)]"
                }`}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    <span>{t("save")}</span>
                  </div>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
