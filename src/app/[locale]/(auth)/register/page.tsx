import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  const t = useTranslations("Auth");

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md border-border bg-card shadow-lg">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-foreground">
            {t("registerTitle")}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t("registerSubtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
