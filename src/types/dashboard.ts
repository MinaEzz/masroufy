export enum AccountType {
  CASH = "CASH",
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
  VODAFONE_CASH = "VODAFONE_CASH",
  OTHER = "OTHER",
}

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  TRANSFER = "TRANSFER",
}

export interface ICategory {
  id: string;
  name: string;
  i18nKey?: string | null;
  icon?: string | null;
  color?: string | null;
  isDefault: boolean;
}

export interface IAccount {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  color?: string | null;
  icon?: string | null;
  creditLimit?: number | null;
  isArchived: boolean;
}

export interface ITransaction {
  id: string;
  accountId: string;
  toAccountId?: string | null;
  categoryId?: string | null;
  type: TransactionType;
  amount: number;
  note?: string | null;
  date: Date;
  
  // Optional populated relationships for UI
  account?: IAccount;
  toAccount?: IAccount;
  category?: ICategory;
}
