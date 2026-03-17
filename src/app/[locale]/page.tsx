import { redirect } from "@/i18n/routing";

export default async function RootPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // MOCK AUTH CHECK (TODO: Replace with actual NextAuth session check)
  const isLoggedIn = true;

  if (isLoggedIn) {
    redirect({ href: "/dashboard", locale });
  } else {
    redirect({ href: "/login", locale });
  }
}
