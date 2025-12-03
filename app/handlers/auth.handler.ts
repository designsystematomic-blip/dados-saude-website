import { redirect } from "react-router";
import { UserService } from "~/service/api";
import { destroySession, getSession } from "~/service/auth/auth.session";

interface AuthValidateCallback {
  token: string;
  hasSession: boolean;
  isValidToken: boolean;
  sessionDestroied: () => void;
  userData: any;
}

async function authValidate({
  request,
}: {
  request: any;
}): Promise<AuthValidateCallback> {
  const session = await getSession(request.headers.get("Cookie"));
  const hasSession = session.has("token");

  const api = process.env.API_ENDPOINT;
  const token = session.get("token");
  const service = new UserService(api!);
  const userData = await service.getData(token);

  const sessionDestroied = async () => {
    if (userData?.error?.name === "TokenExpiredError") {
      const headers = new Headers();
      headers.append("Set-Cookie", await destroySession(session));
      throw redirect("/login", { headers });
    }
  };

  return {
    token,
    hasSession,
    isValidToken: userData?.error?.name === "TokenExpiredError" ? false : true,
    sessionDestroied,
    userData,
  };
}

export default authValidate;
