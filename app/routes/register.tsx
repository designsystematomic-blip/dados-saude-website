import type { ActionFunctionArgs } from "react-router";
import type { Route } from "./+types/forgot-password";

import Register from "../pages/Register";

export default Register;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dados Saúde - Cadastro no sistema" },
    { name: "description", content: "Cadastro no sistema" },
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
