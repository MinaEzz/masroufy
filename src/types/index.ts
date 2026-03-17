/**
 * src/types/index.ts
 * Central TypeScript Interfaces for مصروفي (Masroufy).
 * All interfaces mirror the Prisma schema for type-safe usage across client and server.
 */

// ============================================================
// ENUMS (mirrors Prisma enums for client-side use)
// ============================================================

export type AccountType =
  | "CASH"
  | "DEBIT"
  | "CREDIT"
  | "VODAFONE_CASH"
  | "OTHER";

export type TransactionType = "INCOME" | "EXPENSE" | "TRANSFER";

// ============================================================
// USER
// ============================================================

export interface IUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// ACCOUNT / WALLET
// ============================================================

export interface IAccount {
  id: string;
  userId: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  color: string | null;
  icon: string | null;
  creditLimit: number | null;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// CATEGORY
// ============================================================

export interface ICategory {
  id: string;
  userId: string;
  name: string;
  i18nKey: string | null;
  icon: string | null;
  color: string | null;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// TRANSACTION
// ============================================================

export interface ITransaction {
  id: string;
  userId: string;
  accountId: string;
  toAccountId: string | null;
  categoryId: string | null;
  type: TransactionType;
  amount: number;
  note: string | null;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  // Populated relations (optional, used for list views)
  account?: Pick<IAccount, "id" | "name" | "type" | "color">;
  toAccount?: Pick<IAccount, "id" | "name" | "type" | "color"> | null;
  category?: Pick<ICategory, "id" | "name" | "icon" | "color"> | null;
}

// ============================================================
// SERVER ACTION RESPONSE (standard shape for all actions)
// ============================================================

export interface ActionResponse<T = null> {
  success: boolean;
  data?: T;
  error?: string;
}

// ============================================================
// DASHBOARD / SUMMARY
// ============================================================

export interface INetWorth {
  total: number;
  currency: string;
  accounts: Pick<IAccount, "id" | "name" | "type" | "balance" | "color">[];
}

export interface IMonthlyStats {
  month: string; // e.g. "2025-03"
  income: number;
  expense: number;
  net: number;
}

export interface ICategoryBreakdown {
  categoryId: string;
  categoryName: string;
  categoryIcon: string | null;
  categoryColor: string | null;
  total: number;
  percentage: number;
}
