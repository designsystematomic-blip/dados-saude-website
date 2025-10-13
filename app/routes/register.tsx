import { redirect, type ActionFunctionArgs } from "react-router";
import type { Route } from "./+types/forgot-password";

import Register from "../pages/Register";
import { commitSession, getSession } from "~/service/auth/auth.session";
import { UserService } from "~/service/api";

export default Register;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dados Saúde - Cadastro no sistema" },
    { name: "description", content: "Cadastro no sistema" },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  
  // Extrai os dados do formulário
  const registrationData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    cpf: formData.get("cpf") as string,
    sex: formData.get("sex") as string,
    birthDate: formData.get("birthDate") as string,
    password: formData.get("password") as string,
  };

  try {
    // Aqui você faria a chamada para sua API de backend
    const api = process.env.API_ENDPOINT;

    const service = new UserService(api!)
    const response = await service.register({ user: registrationData });

    // const response = await fetch(`${api}/users/register`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(registrationData),
    // });

    console.log('response', response)

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
  } catch (error) {
    console.error("Erro na requisição:", error);
    return { success: false, error: "Erro interno do servidor" };
  }
}

export async function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_EXPRESS };
}
