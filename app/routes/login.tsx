import React from "react";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import type { Route } from "./+types/login";
import { Form, redirect } from "react-router";
import { NoroffClient } from "~/.server/noroff-api";
import { commitSession, getSession } from "~/.server/session";

export function meta() {
  return [
    {
      title: "Login - Noroff",
    },
  ]
}

export default function LogIn(p: Route.ComponentProps) {
  const errors = p.actionData?.errors;

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen md:m-16 m-1">
      <div className="bg-white border-solid rounded-md border-2 border-gray-200 shadow p-4 w-full max-w-[400px]">
        <h1 className="header-1 flex items-center justify-center">Login</h1>
        <Form id="form" method="POST">
          <Input
            className="mb-4"
            label="Email"
            type="email"
            name="email"
            required={true}
            placeholder="sample@noroff.no"
            error={errors?.email}
            helpText="You should use @noroff.no email address"
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
        </Form>
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
      errors
    };
  }

  const session = await getSession(p.request.headers.get("Cookie"));
  try {
    const noroffClient = new NoroffClient();
    const user = await noroffClient.login(email as string, password as string);
    session.set("userName", user.name);
    session.set("accessToken", user.accessToken);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    session.flash("error", "Login failed. Please check your credentials.");
    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }



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
