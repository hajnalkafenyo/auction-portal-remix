import React from "react";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import type { Route } from "./+types/register";
import { redirect } from "react-router";

export function meta() {
  return [
    {
      title: "Register",
    },
  ];
}

export default function Register(p: Route.ComponentProps) {
  const errors = p.actionData?.errors;
  const values = p.actionData?.values;
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen md:m-16 m-1">
      <div className="bg-white border-solid rounded-md border-2 border-gray-200 shadow p-4 w-full max-w-[400px]">
        <h1 className="header-1 flex items-center justify-center">Register</h1>
        <form id="form" method="POST">
          <Input
            className="mb-4"
            label="Name"
            type="name"
            name="name"
            required={true}
            placeholder="John Smith"
            error={errors?.name}
            helpText="Your name less than 20 characters"
            value={values?.name}
          />
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
          <Input
            className="mb-6"
            label="RepeatPassword"
            type="password"
            name="repeatPassword"
            required={true}
            placeholder="********"
            error={errors?.repeatPassword}
            helpText="The passwords must be matched"
          />
          <Button type="submit" className="w-full">
            Register
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
  name?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
}

export async function action(p: Route.ActionArgs) {
  const formData = await p.request.formData();

  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");
  const repeatPassword = formData.get("repeatPassword");

  const errors = {} as FormFields;
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const nameError = validateName(name);
  const repeatPasswordError = validateRepeatPassword(repeatPassword, password);
  if (emailError) {
    errors.email = emailError;
  }
  if (passwordError) {
    errors.password = passwordError;
  }
  if (nameError) {
    errors.name = nameError;
  }
  if (repeatPasswordError) {
    errors.repeatPassword = repeatPasswordError;
  }
  // If we encountered any errors
  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: {
        name: String(name),
        email: String(email),
        password: String(password),
        repeatPassword: String(repeatPassword),
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

function validateRepeatPassword(
  repeatPassword: FormDataEntryValue | null,
  password: FormDataEntryValue | null
): string {
  const passwordValue = String(password);
  const repeatPasswordValue = String(repeatPassword);

  if (passwordValue !== repeatPasswordValue) {
    return "Password is not matchin";
  }
  return "";
}

function validateName(name: FormDataEntryValue | null): string {
  const nameValue = String(name);

  if (nameValue.length > 20) {
    return "Invalid name provided";
  }
  return "";
}
