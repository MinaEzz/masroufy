"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

import { registerSchema, type RegisterFormValues } from "@/types/auth";
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

export default function RegisterForm() {
  const t = useTranslations("Auth");
  const tValidation = useTranslations("Validation");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const resolveMessage = (key: string) => {
    const map: Record<string, string> = {
      "validation.invalidEmail": tValidation("invalidEmail"),
      "validation.passwordTooShort": tValidation("passwordTooShort"),
      "validation.nameTooShort": tValidation("nameTooShort"),
      "validation.passwordMismatch": tValidation("passwordMismatch"),
    };
    return map[key] ?? key;
  };

  async function onSubmit(values: RegisterFormValues) {
    setIsLoading(true);
    try {
      // TODO: call server action when auth backend is ready
      console.log("Register values:", values);
      await new Promise((res) => setTimeout(res, 1500));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t("name")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("namePlaceholder")}
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

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t("confirmPassword")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("confirmPasswordPlaceholder")}
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
            t("registerButton")
          )}
        </Button>

        {/* Login link */}
        <p className="text-center text-sm text-muted-foreground">
          {t("haveAccount")}{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            {t("signIn")}
          </Link>
        </p>
      </form>
    </Form>
  );
}
