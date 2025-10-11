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

export const requireUser: MiddlewareFunction = ({ context }, next) => {
  const authSession = getAuthSessionFromContext(context);
  const session = authSession.get("user");
  if (!session) {
    throw redirect("/login");
  }
  return next();
};
