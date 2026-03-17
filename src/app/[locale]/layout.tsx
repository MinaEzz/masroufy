import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter, Cairo } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import "../globals.css";

// English Font (Inter)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Arabic Font (Cairo)
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Determine text direction
  const dir = locale === "ar" ? "rtl" : "ltr";
  
  // Decide which font class to apply to body
  const fontClass = locale === "ar" ? cairo.className : inter.className;

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${fontClass} antialiased min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {/* The Navbar will appear on every page */}
            <Navbar />
            
            <main className="flex-1 p-4 md:p-8">
              {children}
            </main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
