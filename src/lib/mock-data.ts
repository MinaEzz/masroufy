import { AccountType, TransactionType, IAccount, ICategory, ITransaction } from "@/types/dashboard";

export const mockCategories: ICategory[] = [
  { id: "cat_1", name: "Food", i18nKey: "categories.food", icon: "pizza", color: "#f59e0b", isDefault: true },
  { id: "cat_2", name: "Transport", i18nKey: "categories.transport", icon: "car", color: "#3b82f6", isDefault: true },
  { id: "cat_3", name: "Salary", i18nKey: "categories.salary", icon: "briefcase", color: "#10b981", isDefault: true },
  { id: "cat_4", name: "Shopping", i18nKey: "categories.shopping", icon: "shopping-bag", color: "#a855f7", isDefault: true },
];

export const mockAccounts: IAccount[] = [
  {
    id: "acc_1",
    name: "Cash Wallet",
    type: AccountType.CASH,
    balance: 2450.00,
    currency: "EGP",
    color: "#10b981",
    icon: "banknote",
    isArchived: false,
  },
  {
    id: "acc_2",
    name: "Bank Misr Debit",
    type: AccountType.DEBIT,
    balance: 15420.50,
    currency: "EGP",
    color: "#3b82f6",
    icon: "credit-card",
    isArchived: false,
  },
  {
    id: "acc_3",
    name: "Vodafone Cash",
    type: AccountType.VODAFONE_CASH,
    balance: 850.00,
    currency: "EGP",
    color: "#ef4444",
    icon: "smartphone",
    isArchived: false,
  },
  {
    id: "acc_4",
    name: "CIB Credit Card",
    type: AccountType.CREDIT,
    balance: -4500.00,
    creditLimit: 20000.00,
    currency: "EGP",
    color: "#f59e0b",
    icon: "credit-card",
    isArchived: false,
  }
];

export const mockTransactions: ITransaction[] = [
  {
    id: "txn_1",
    accountId: "acc_2", // Bank Misr
    categoryId: "cat_3", // Salary
    type: TransactionType.INCOME,
    amount: 15000,
    note: "March Salary",
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    category: mockCategories[2],
    account: mockAccounts[1]
  },
  {
    id: "txn_2",
    accountId: "acc_1", // Cash
    categoryId: "cat_1", // Food
    type: TransactionType.EXPENSE,
    amount: 120,
    note: "Lunch at Restaurant",
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    category: mockCategories[0],
    account: mockAccounts[0]
  },
  {
    id: "txn_3",
    accountId: "acc_2", // Bank Debit
    toAccountId: "acc_3", // Vodafone Cash
    type: TransactionType.TRANSFER,
    amount: 500,
    note: "Transfer to E-Wallet",
    date: new Date(),
    account: mockAccounts[1],
    toAccount: mockAccounts[2]
  },
  {
    id: "txn_4",
    accountId: "acc_4", // CIB Credit
    categoryId: "cat_4", // Shopping
    type: TransactionType.EXPENSE,
    amount: 4500,
    note: "New Laptop RAM",
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
    category: mockCategories[3],
    account: mockAccounts[3]
  }
];
