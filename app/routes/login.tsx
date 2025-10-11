import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import type { Route } from "./+types/login";

import Login from "../pages/Login/Login";
import { BackendService } from "~/service/api/backend.service";
import { commitSession, getSession } from "~/service/auth/auth.session";

export default Login;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dados Saúde - Login" },
    { name: "description", content: "Login route" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("data", { email, password: password });

  const api = process.env.API_ENDPOINT;
  const login = await fetch(`${api}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const response = await login.json();

  if (response.error) {
    return {
      error: response.error,
    };
  }

  const token = response.token;
  const session = await getSession();
  session.set("token", token);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function loader({ context, request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const isLogged = session.has("token");

  if (isLogged) {
    return redirect("/");
  }

  console.log("login isLogged", isLogged);

  return { message: context.VALUE_FROM_EXPRESS };
}
