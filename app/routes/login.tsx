import type { ActionFunctionArgs } from "react-router";
import type { Route } from "./+types/login";

import Login from "../pages/Login/Login";

export default Login;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Login route" },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  console.log({ email, password });

  return null;

  // const res = await fetch(`${process.env.API_URL}/login`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email, password }),
  // });

  // if (!res.ok) {
  //   return { error: "Credenciais inválidas" };
  // }

  // const { token, user } = await res.json();

  // // 🔹 cria a sessão e salva o JWT
  // const session = await getSession();
  // session.set("token", token);
  // session.set("user", user);

  // return redirect("/", {
  //   headers: {
  //     "Set-Cookie": await commitSession(session),
  //   },
  // });
}

export async function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_EXPRESS };
}

// export default function Login({ loaderData }: Route.ComponentProps) {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");

//   useEffect(() => {
//     console.log("Email mudou:", email);
//   }, [email]);

//   useEffect(() => {
//     console.log("Password mudou:", password);
//   }, [password]);

//   return (
//     <div>
//       <Wrapper>
//         <img src={logoWithName} alt="Logo" />
//       </Wrapper>
//     </div>
//   );
// }
