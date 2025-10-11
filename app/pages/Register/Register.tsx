import type { Route } from "../../routes/+types/register";
import { Title, Wrapper, Input, Button, Text } from "dados-saude";

import styles from "./Register.module.css";
import { Link, useFetcher } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "~/zod/register.schema";
import { Logo } from "~/components";
import { useCallback, useState } from "react";

export default function Register({ loaderData }: Route.ComponentProps) {
  const fetcherRegister = useFetcher({ key: "register" });

  const [step, setStep] = useState<number>(0);

  const handleStep = useCallback(() => setStep((prev) => prev + 1), [setStep]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
  });

  const handleFetcher = (data: any) => {
    if (errors.email || errors.password) {
      return;
    }
    fetcherRegister.submit(data, { method: "post", action: "/register" });
  };

  return (
    <div className={styles.page}>
      <Wrapper>
        <Logo />
        <div className={styles.content + " " + styles.flexColumn}>
          <form
            method="post"
            onSubmit={handleSubmit((data) => handleFetcher(data))}
          >
            <div
              className={`${styles.stepOne + " " + styles.flexColumn} ${step === 0 ? styles.isVisible : ""}`}
            >
              <Title
                tag="h1"
                variant="primary"
                content="Cadastre-se"
                align="left"
              />
              <Input
                id="name"
                ariaLabel="Nome completo"
                labelId="name"
                description=""
                label="Nome completo"
                type="text"
                placeholder="Digite o seu nome completo"
                {...register("name")}
                style={{ border: errors.name ? "1px solid red" : "" }}
              />
              <Input
                id="email"
                ariaLabel="E-mail"
                labelId="email"
                description=""
                label="E-mail"
                type="text"
                placeholder="Digite seu e-mail"
                {...register("email")}
                style={{ border: errors.email ? "1px solid red" : "" }}
              />
              <Input
                id="phone"
                ariaLabel="Celular"
                labelId="phone"
                description=""
                label="Celular"
                type="text"
                placeholder="(XX) 9XXXX-XXXX"
                {...register("phone")}
                style={{ border: errors.phone ? "1px solid red" : "" }}
              />
              <div className={styles.buttonContainer + " " + styles.flexColumn}>
                <Button
                  type="button"
                  label="Continuar"
                  ariaLabel="Continuar"
                  variant="primary"
                  onClick={handleStep}
                />
              </div>
            </div>
            <div
              className={`${styles.stepTwo + " " + styles.flexColumn} ${step === 1 ? styles.isVisible : ""}`}
            >
              <Title
                tag="h1"
                variant="primary"
                content="Complete seu cadastro"
                align="left"
              />
              <Input
                id="cpf"
                ariaLabel="Nome completo"
                labelId="cpf"
                description=""
                label="CPF"
                type="text"
                placeholder="Digite seu CPF"
                {...register("cpf")}
                style={{ border: errors.cpf ? "1px solid red" : "" }}
              />
              <p>Sexo</p>
              <p>Data de nascimento</p>
              <Input
                id="password"
                ariaLabel="Senha"
                labelId="password"
                description=""
                label="Senha"
                type="password"
                placeholder="Digite a sua senha"
                {...register("password")}
                style={{ border: errors.password ? "1px solid red" : "" }}
              />
              <Text
                align="left"
                content={"A sua senha deve ter:"}
                size="medium"
                variant="secondary"
              >
                <ul>
                  <li>No mínimo 8 caracteres </li>
                  <li>Pelo menos 1 número </li>
                  <li>Pelo menos 1 letra maiúscula </li>
                  <li>Pelo menos 1 caractere especial (! @ # $ * ...)</li>
                </ul>
              </Text>
              <div className={styles.buttonContainer + " " + styles.flexColumn}>
                <Button
                  type="submit"
                  label="Cadastrar"
                  ariaLabel="Cadastrar"
                  variant="primary"
                />
              </div>
            </div>
          </form>
          <div className={styles.flexColumn}>
            <div className={styles.bottomText}>
              <Text
                content="Você já tem uma conta?"
                size="medium"
                variant="primary"
              />
              <Link
                to={"/login"}
                className={styles.link + " " + "textMedium fontSecondary"}
              >
                Entrar
              </Link>
            </div>
          </div>
          <div className={styles.policyText}>
            <Text
              align="center"
              content={""}
              children={
                <>
                  Ao se cadastrar, você concorda com os nossos{" "}
                  <Link
                    to={"/terms-of-service"}
                    className={styles.link + " " + "textMedium fontSecondary"}
                  >
                    Termos de Uso
                  </Link>{" "}
                  e{" "}
                  <Link
                    to={"/privacy-policy"}
                    className={styles.link + " " + "textMedium fontSecondary"}
                  >
                    Política de Privacidade
                  </Link>
                </>
              }
              size="medium"
              variant="secondary"
            />
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
