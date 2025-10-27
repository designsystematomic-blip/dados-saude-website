import type { Route } from "../../routes/+types/login";
import { Title, Wrapper, Input, Button, Text } from "dados-saude";
import logoWithName from "../../assets/logoMedium.png";

import styles from "./ForgotPassword.module.css";
import { Link, useFetcher } from "react-router";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "~/zod/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterText } from "~/components";

export default function ForgotPassword({ loaderData }: Route.ComponentProps) {
  const fetcherLogin = useFetcher({ key: "login" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const handleFetcher = (data: any) => {
    if (errors.email || errors.password) {
      return;
    }

    fetcherLogin.submit(data, { method: "post", action: "/login" });
  };

  return (
    <div className={styles.loginPage}>
      <Wrapper>
        <div className={styles.headerLogo}>
          <img src={logoWithName} alt="Logo" />
        </div>
        <div>
          <form
            method="post"
            className={styles.loginContent + " " + styles.flexColumn}
            onSubmit={handleSubmit((data) => handleFetcher(data))}
          >
            <Title
              tag="h1"
              fontFamily="primary"
              content="Esqueci a minha senha"
              textAlign="left"
            />
            <div>
              <Text
                content="Digite o seu e-mail cadastrado e em instantes vamos te enviar um link para que você possa criar uma nova senha."
                fontFamily="primary"
                textSize="medium"
              />
            </div>
            <Input
              id="email"
              ariaLabel="E-mail"
              labelId="email"
              description=""
              label="E-mail"
              type="text"
              placeholder="Digite seu e-mail"
              {...register("email")}
            />
            {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
            <div className={styles.buttonContainer + " " + styles.flexColumn}>
              <Button
                type="submit"
                label="Continuar"
                ariaLabel="Continuar"
                variant="primary"
              />
            </div>
          </form>

          <RegisterText />
        </div>
      </Wrapper>
    </div>
  );
}
