import { redirect, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/home";
import authValidate from "~/handlers/auth.handler";

export { default } from "../pages/Exam";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dados Saúde - Exames" },
    { name: "description", content: "Tela para listagem de exames" },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {

  const { hasSession, sessionDestroied, userData } = await authValidate({ request });

  if (!hasSession) {
    return redirect("/login");
  }

  await sessionDestroied();

  console.log('userData exam', userData)

  return {
    meta: {
      title: "Exame",
    },
    user: userData
  };
}
