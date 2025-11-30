import { redirect, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/home";
import authValidate from "~/handlers/auth.handler";
import { ExamService } from "~/service/api";

export { default } from "../pages/Exam";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dados Saúde - Exame" },
    { name: "description", content: "Tela para listagem de detalhes do exame" },
  ];
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const examId = params.id;

  const { hasSession, isValidToken, sessionDestroied, userData } =
    await authValidate({ request });

  if (!hasSession) {
    return redirect("/login");
  }

  if (!isValidToken && hasSession) {
    return await sessionDestroied();
  }

  const examService = new ExamService(process.env.API_ENDPOINT!);
  const examResponse = await examService.getExamById({
    token: userData.token,
    userId: userData.id,
    examId: examId!,
  });
  const examData = await examResponse.json();

  if (!examResponse.ok) {
    return redirect("/exam");
  }

  return {
    meta: {
      title: "Exame",
      link: "/exam",
    },
    user: userData,
    exam: examData.exam,
  };
}
