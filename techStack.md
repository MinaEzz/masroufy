# Technology Stack & Rules - مصروفي (Masroufy)

## Core Stack (Full-stack Next.js)
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Database**: MongoDB (Atlas)
- **ORM**: Prisma (Type-safe database access)
- **Auth**: NextAuth.js (Secure Authentication)
- **Internationalization**: `next-intl` (For Arabic/English support & RTL logic)

## Frontend & UI
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (Radix UI based)
- **Icons**: Lucide React
- **Themes**: next-themes (Default: Pure Dark Mode)
- **Charts**: Recharts (Financial data visualization)
- **Animations**: Framer Motion (Smooth transitions)

## Implementation Rules
1. **Clean Code**: Follow SOLID principles.
2. **Type Safety**: No 'any' type allowed. Define Interfaces for all API responses.
3. **Component Structure**: Atomic design (separate UI components from Logic).
4. **Error Handling**: Use Try/Catch blocks and display user-friendly Toast notifications.
5. **Data Integrity**: Use **Prisma Transactions** for wallet-to-wallet transfers to ensure atomic updates.
6. **State Sync**: Use `revalidatePath` to ensure instant UI updates for balances after any transaction.