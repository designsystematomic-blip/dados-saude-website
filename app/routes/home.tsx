import { redirect, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/home";
import { destroySession, getSession, requireUser } from "~/service/auth/auth.session";
import { UserService } from "~/service/api";
import authValidate from "~/handlers/auth.handler";

export { default } from "../pages/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dados Saúde - Tela inicial" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}


export async function loader({ request }: LoaderFunctionArgs) {

  const { hasSession, sessionDestroied, userData } = await authValidate({ request });

  if (!hasSession) {
    return redirect("/login");
  }

  await sessionDestroied();

  return {
    meta: {
      title: "Início",
    },
    user: userData
  };

  // const session = await getSession(request.headers.get("Cookie"));

  // const isLogged = session.has("token");

  // if (!isLogged) {
  //   return redirect("/login");
  // }

  // try {
  //   const api = process.env.API_ENDPOINT;
  //   const token = session.get("token");
  //   const service = new UserService(api!);
  //   const userData = await service.getData(token);

  //   // Verifica se o token expirou
  //   if (userData?.error?.name === 'TokenExpiredError') {
  //     // Destrói a sessão
  //     const headers = new Headers();
  //     headers.append("Set-Cookie", await destroySession(session));
  //     throw redirect("/login", { headers });
  //   }

  //   return {
  //     meta: {
  //       title: "Início",
  //     },
  //     user: userData
  //   };
  // } catch (error: any) {
  //   // Se houver qualquer erro, destrói a sessão e redireciona
  //   const headers = new Headers();
  //   headers.append("Set-Cookie", await destroySession(session));
  //   throw redirect("/login", { headers });
  // }
}
