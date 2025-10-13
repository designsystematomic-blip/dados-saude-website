import {
  createCookieSessionStorage,
  redirect,
  type MiddlewareFunction,
} from "react-router";

import { createSessionMiddleware } from "remix-utils/middleware/session";

const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "session",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
});

export const { getSession, commitSession, destroySession } = authSessionStorage;

const sessionMiddleware = createSessionMiddleware(authSessionStorage);
const [authSessionMiddleware, getAuthSessionFromContext] = sessionMiddleware;
export { authSessionMiddleware, getAuthSessionFromContext };

export const isTokenExpired = (session: any) => {
  if (session?.error?.name === 'TokenExpiredError' || session?.error?.message === 'jwt expired') return true;
  return false;
}

export const requireUser: MiddlewareFunction = async ({ context }, next) => {
  const authSession = getAuthSessionFromContext(context);
  const session = authSession.get("user");
  if (!session) {
    throw redirect("/login");
  }

    try {
    // Aqui você pode validar o token, por exemplo, decodificando o JWT
    const { token } = session;
    // Simulação de validação do token
    if (!token || isTokenExpired(session)) {
      throw new Error("TokenExpiredError");
    }
  } catch (error: any) {
    if (error.message === "TokenExpiredError") {
      // Destroi a sessão e redireciona para o login
      const headers = new Headers();
      headers.append("Set-Cookie", await destroySession(authSession));
      throw redirect("/login", { headers });
    }
    throw error; // Repassa outros erros
  }

  return next();
};
