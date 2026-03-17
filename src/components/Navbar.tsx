"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useTheme();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 mx-auto">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-primary">{t("appName")}</span>
          </Link>
          
          <div className="hidden md:flex gap-4">
            <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {t("dashboard")}
            </Link>
            <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {t("wallets")}
            </Link>
            <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {t("transactions")}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon" className="h-9 w-9 px-0">
                <Globe className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => switchLocale("en")} disabled={locale === "en"}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchLocale("ar")} disabled={locale === "ar"}>
                العربية
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon" className="h-9 w-9 px-0">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
