import {
  redirect,
} from "react-router";
import type { Route } from "./+types/login";

import Login from "../pages/Login";
import { commitSession, getSession } from "~/service/auth/auth.session";
import { UserService } from "~/service/api";
import authValidate from "~/handlers/auth.handler";

export default Login;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dados Saúde - Login" },
    { name: "description", content: "Login route" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return;
  }

  const api = process.env.API_ENDPOINT;

  const service = new UserService(api!);
  const response = await service.login({ email, password });

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

  const { hasSession, isValidToken, sessionDestroied } = await authValidate({ request });

  if(!isValidToken && hasSession) {
    return await sessionDestroied();
  }

  if (isLogged) {
    return redirect("/");
  }

  return { message: context.VALUE_FROM_EXPRESS };
}
