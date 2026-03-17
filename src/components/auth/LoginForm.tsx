"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

import { loginSchema, type LoginFormValues } from "@/types/auth";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const t = useTranslations("Auth");
  const tValidation = useTranslations("Validation");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(
      loginSchema.transform((val) => val) // keep values typed
    ),
    defaultValues: { email: "", password: "" },
  });

  // Map Zod translation keys → actual translated strings at runtime
  const resolveMessage = (key: string) => {
    const map: Record<string, string> = {
      "validation.invalidEmail": tValidation("invalidEmail"),
      "validation.passwordTooShort": tValidation("passwordTooShort"),
    };
    return map[key] ?? key;
  };

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    try {
      // TODO: call server action when auth backend is ready
      console.log("Login values:", values);
      await new Promise((res) => setTimeout(res, 1500)); // simulate async
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {fieldState.error?.message
                  ? resolveMessage(fieldState.error.message)
                  : null}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t("password")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {fieldState.error?.message
                  ? resolveMessage(fieldState.error.message)
                  : null}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="me-2 h-4 w-4 animate-spin" />
              {t("loading")}
            </>
          ) : (
            t("loginButton")
          )}
        </Button>

        {/* Register link */}
        <p className="text-center text-sm text-muted-foreground">
          {t("noAccount")}{" "}
          <Link href="/register" className="text-primary hover:underline font-medium">
            {t("signUp")}
          </Link>
        </p>
      </form>
    </Form>
  );
}
