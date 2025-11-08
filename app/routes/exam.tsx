import { redirect, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/home";
import authValidate from "~/handlers/auth.handler";
import { ExamService } from "~/service/api";

export { default } from "../pages/ExamList";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dados Saúde - Exames" },
    { name: "description", content: "Tela para listagem de exames" },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {
	const { searchParams } = new URL(request.url);
	const searchParamName = searchParams.get('name');
  const { hasSession, isValidToken, sessionDestroied, userData } = await authValidate({ request });

  if (!hasSession) {
    return redirect("/login");
  }

  if(!isValidToken && hasSession) {
    return await sessionDestroied();
  }

  const examService = new ExamService(process.env.API_ENDPOINT!);
  const examsResponse = await examService.getExams({ token: userData.token, userId: userData.id, filter: { name: searchParamName ?? undefined } });
  const userExames = await examsResponse.json();

  return {
    meta: {
      title: "Exame",
      link: "/exam"
    },
    user: userData,
    exams: userExames.exams
  };
}
