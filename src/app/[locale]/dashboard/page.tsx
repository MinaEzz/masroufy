import NetWorthCard from "@/components/dashboard/NetWorthCard";
import WalletsList from "@/components/dashboard/WalletsList";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import AddTransactionModal from "@/components/dashboard/AddTransactionModal";
import { mockAccounts, mockTransactions } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 pb-20 md:pb-8 relative">
      {/* Top Banner: Net Worth */}
      <section>
        <NetWorthCard accounts={mockAccounts} />
      </section>

      {/* Middle Section: Wallets list */}
      <section>
        <WalletsList accounts={mockAccounts} />
      </section>

      {/* Bottom Section: Operations */}
      <section className="flex-1">
        <RecentTransactions transactions={mockTransactions} />
      </section>

      {/* Floating Action Button (Mobile) - Static on Desktop within logic */}
      <AddTransactionModal />
    </div>
  );
}
