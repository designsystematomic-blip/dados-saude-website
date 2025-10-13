import type { Route } from "../../routes/+types/register";
import { Title, Wrapper, Input, Button, Text, Select } from "dados-saude";

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

  const isSubmitting = fetcherRegister.state === "submitting";

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting: formIsSubmitting },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange"
  });

  const handleStep = useCallback(async () => {
    const isValid = await trigger(['name', 'email', 'phone']);
    
    if (!isValid) {
      return;
    } 

    setStep((prev) => prev + 1);

  }, [trigger, errors, setStep]);

  const handleFetcher = (data: any) => {
    fetcherRegister.submit(data, { method: "post", action: "/register" });
  };

  return (
    <div className={styles.page}>
      <Wrapper>
        <Logo />
        <div className={styles.content + " " + styles.flexColumn}>
          <form
            method="post"
            onSubmit={handleSubmit(handleFetcher)}
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
                label="Nome completo"
                type="text"
                placeholder="Digite o seu nome completo"
                hasError={errors.name ? true : false}
                handleClear={() => setValue("name", "")}
                {...register("name")}
              />
              <Input
                id="email"
                ariaLabel="E-mail"
                labelId="email"
                label="E-mail"
                type="email"
                placeholder="Digite seu e-mail"
                hasError={errors.email ? true : false}
                handleClear={() => setValue("email", "")}
                {...register("email")}
              />
              <Input
                id="phone"
                ariaLabel="Celular"
                labelId="phone"
                label="Celular"
                type="text"
                placeholder="(XX) 9XXXX-XXXX"
                hasError={errors.phone ? true : false}
                handleClear={() => setValue("phone", "")}
                {...register("phone")}
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
                label="CPF"
                type="text"
                placeholder="Digite seu CPF"
                hasError={errors.cpf ? true : false}
                handleClear={() => setValue("cpf", "")}
                {...register("cpf")}
              />
              <div className={styles.flexRow}>
                <Select
                  id="sex"
                  label="Sexo"
                  ariaLabel="Sexo"
                  labelId="Sexo"
                  options={[
                    { value: "F", label: "Feminino" },
                    { value: "M", label: "Masculino" },
                  ]}
                  {...register("sex")}
                  variant="primary"
                  size="medium"
                />
                <Input
                  id="birthDate"
                  type="date"
                  ariaLabel="Birth Date"
                  labelId="birthDate"
                  label="Data de nascimento"
                  placeholder="dd/mm/aaaa"
                  height="42px"
                  {...register("birthDate")}
                />
              </div>
              <Input
                id="password"
                ariaLabel="Senha"
                labelId="password"
                label="Senha"
                type="password"
                placeholder="Digite a sua senha"
                hasError={errors.password ? true : false}
                handleClear={() => setValue("password", "")}
                {...register("password")}
              />
              <div>
                <Text
                  align="left"
                  content={"A sua senha deve ter:"}
                  size="medium"
                  variant="secondary"
                />
                <ul className="textMedium fontSecondary">
                  <li>No mínimo 8 caracteres </li>
                  <li>Pelo menos 1 número </li>
                  <li>Pelo menos 1 letra maiúscula </li>
                  <li>Pelo menos 1 caractere especial (! @ # $ * ...)</li>
                </ul>
              </div>
              {fetcherRegister?.data?.error && (
                <Text 
                  content={fetcherRegister?.data?.error}
                  variant="primary"
                  size="small"
                  align="left"
                  color="var(--color-text-error)"
                />
              )}
              <div className={styles.buttonContainer + " " + styles.flexColumn}>
                <Button
                  type="submit"
                  label={isSubmitting ? "Cadastrando..." : "Cadastrar"}
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
