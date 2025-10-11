import type { ActionFunctionArgs } from "react-router";
import type { Route } from "./+types/forgot-password";

import ForgotPassword from "../pages/ForgotPassword";

export default ForgotPassword;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dados Saúde - Redefinir Senha" },
    { name: "description", content: "Redefinir Senha" },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  //   const email = formData.get("email");
  //   const password = hash("sha256", formData.get("password"));

  return null;
}

export async function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_EXPRESS };
}
