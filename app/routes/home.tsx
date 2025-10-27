import { redirect, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/home";
import authValidate from "~/handlers/auth.handler";

export { default } from "../pages/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dados Saúde - Tela inicial" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}


export async function loader({ request }: LoaderFunctionArgs) {

  const { hasSession, isValidToken, sessionDestroied, userData } = await authValidate({ request });

  if (!hasSession) {
    return redirect("/login");
  }

  if(!isValidToken && hasSession) {
    return await sessionDestroied();
  }

  return {
    meta: {
      title: "Início",
      link: "/"
    },
    user: userData
  };
}
