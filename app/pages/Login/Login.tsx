import { useEffect, useState } from "react";
import type { Route } from "../../routes/+types/login";
import { Title, Wrapper, Input, Button, Text } from "dados-saude";
import logoWithName from "../../assets/logo.png";

import styles from "./Login.module.css";
import { Link } from "react-router";

export default function Login({ loaderData }: Route.ComponentProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    console.log("Email mudou:", email);
  }, [email]);

  useEffect(() => {
    console.log("Password mudou:", password);
  }, [password]);

  return (
    <div className={styles.loginPage}>
      <Wrapper>
        <div className={styles.headerLogo}>
          <img src={logoWithName} alt="Logo" />
        </div>
        <div className={styles.loginContent + " " + styles.flexColumn}>
          <Title
            tag="h1"
            variant="primary"
            content="Entre na sua conta"
            align="left"
          />
          <Input
            id="email"
            ariaLabel="E-mail"
            labelId="email"
            description=""
            label="E-mail"
            type="text"
            placeholder="Digite seu e-mail"
            value={email}
            handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
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
              value={password}
              handleOnChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
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
          <div className={styles.buttonContainer + " " + styles.flexColumn}>
            <Button
              type="button"
              label="Continuar"
              ariaLabel="Continuar"
              variant="primary"
            />
          </div>
        </div>
        <div className={styles.register}>
          <Text
            content="Você não tem uma conta?"
            size="medium"
            variant="primary"
          />
          <Link
            to={"/register"}
            className={styles.signUp + " " + "textMedium fontSecondary"}
          >
            Cadastre-se
          </Link>
        </div>
      </Wrapper>
    </div>
  );
}
