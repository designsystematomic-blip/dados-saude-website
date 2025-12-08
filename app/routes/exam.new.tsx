import { redirect, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/home";
import authValidate from "~/handlers/auth.handler";
import { ExamService } from "~/service/api";

export { default } from "../pages/ExamNew";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dados Saúde - Exames" },
    { name: "description", content: "Tela para listagem de exames" },
  ];
}

export async function action({ request }: LoaderFunctionArgs) {
  const { token } = await authValidate({ request });
  const formData = await request.formData();
  const service = new ExamService(process.env.API_ENDPOINT!);
  const response = await service.createExam({
    data: formData,
    token: token,
  });

  const result = await response.json();
  if (response.ok) {
    return { success: true, data: result };
  }

  console.log("result xxx", result);

  return { success: false, data: result };
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { hasSession, isValidToken, sessionDestroied, userData } =
    await authValidate({ request });

  if (!hasSession) {
    return redirect("/login");
  }

  if (!isValidToken && hasSession) {
    await sessionDestroied();
    return;
  }

  return {
    meta: {
      title: "Exames",
      link: "/exam",
    },
    user: userData,
  };
}
