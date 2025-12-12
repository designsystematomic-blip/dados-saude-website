import { redirect } from "react-router";
import { destroySession, getSession } from "~/service/auth/auth.session";
import type { Route } from "./+types/logout";

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const session = await getSession(request.headers.get("cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
