import React from "react";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import type { Route } from "./+types/login";
import { redirect } from "react-router";

export default function LogIn(p: Route.ComponentProps) {
  const errors = p.actionData?.errors;
  const values = p.actionData?.values;
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen md:m-16 m-1">
      <div className="bg-white border-solid rounded-md border-2 border-gray-200 shadow p-4 w-full max-w-[400px]">
        <h1 className="header-1 flex items-center justify-center">Login</h1>
        <form id="form" method="POST">
          <Input
            className="mb-4"
            label="Email"
            type="email"
            name="email"
            required={true}
            placeholder="sample@noroff.no"
            error={errors?.email}
            helpText="You should use @noroff.no email address"
            value={values?.email}
          />
          <Input
            className="mb-6"
            label="Password"
            type="password"
            name="password"
            required={true}
            placeholder="********"
            error={errors?.password}
            helpText=""
          />
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <p className="m-1.5 flex items-center justify-center">
          Don't have an account?
          <a className="font-medium" href="register.html">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

interface FormFields {
  email?: string;
  password?: string;
}

export async function action(p: Route.ActionArgs) {
  const formData = await p.request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  const errors = {} as FormFields;
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  if (emailError) {
    errors.email = emailError;
  }
  if (passwordError) {
    errors.password = passwordError;
  }
  // If we encountered any errors
  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: {
        email: String(email),
        password: String(password),
      },
    };
  }

  // Login logic

  return redirect("/");
}

function validateEmail(email: FormDataEntryValue | null): string {
  if (!email) {
    return "Email is not provided";
  }

  const emailValue = String(email);
  const noroffEmailPattern = /^[a-zA-Z0-9._%+-]+@(stud\.)?noroff\.no$/;

  if (!noroffEmailPattern.test(emailValue)) {
    return "Invalid email provided";
  }

  return "";
}

function validatePassword(password: FormDataEntryValue | null): string {
  const passwordValue = String(password);

  if (passwordValue.length < 8) {
    return "Invalid password provided";
  }
  return "";
}
