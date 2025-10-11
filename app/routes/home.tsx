import { redirect, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/home";
import { getSession } from "~/service/auth/auth.session";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dados Saúde - Tela inicial" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const isLogged = session.has("token");

  console.log("home isLogged", isLogged);

  if (!isLogged) {
    return redirect("/login");
  }

  return {};
}

export default function Home() {
  return <div>Hello, home page!</div>;
}
