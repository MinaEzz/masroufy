import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("Navigation");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-4xl font-bold text-primary">{t("appName")}</h1>
      <p className="text-muted-foreground">Welcome to your dashboard!</p>
    </div>
  );
}
