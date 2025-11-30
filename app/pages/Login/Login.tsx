import type { Route } from "../../routes/+types/login";
import { Title, Wrapper, Input, Button, Text } from "design-system-atomic";
import logoWithName from "../../assets/logoMedium.png";

import styles from "./Login.module.css";
import { Link, useFetcher } from "react-router";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "~/zod/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterText } from "~/components";

export default function Login({ loaderData }: Route.ComponentProps) {
  const fetcherLogin = useFetcher({ key: "login" });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const handleFetcher = (data: any) => {
    if (Object.keys(errors).length > 0) {
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
            onSubmit={handleSubmit(handleFetcher)}
          >
            <Title
              tag="h1"
              fontFamily="primary"
              content="Entre na sua conta"
              textAlign="left"
            />
            <Input
              id="email"
              ariaLabel="E-mail"
              labelId="email"
              description=""
              label="E-mail"
              type="text"
              placeholder="Digite seu e-mail"
              handleClear={() => setValue("email", "")}
              hasError={errors.email ? true : false}
              {...register("email")}
            />
            <div className={styles.passwordContainer + " " + styles.flexColumn}>
              <Input
                id="password"
                ariaLabel="Senha"
                labelId="password"
                description=""
                label="Senha"
                type="password"
                placeholder="Digite a sua senha"
                handleClear={() => setValue("password", "")}
                {...register("password")}
              />
              <Link
                to={"/forgot-password"}
                className={
                  styles.forgotPassword + " " + "textMedium fontSecondary"
                }
              >
                Esqueci a minha senha{" "}
              </Link>
            </div>
            {fetcherLogin?.data?.error && (
              <Text
                content={fetcherLogin?.data?.error}
                fontFamily="primary"
                textSize="small"
                textAlign="left"
                textColor="var(--color-text-error)"
              />
            )}
            <div className={styles.buttonContainer + " " + styles.flexColumn}>
              <Button
                type="submit"
                label="Continuar"
                ariaLabel="Continuar"
                variant="primary"
              />
            </div>
            <RegisterText />
          </form>
        </div>
      </Wrapper>
    </div>
  );
}
