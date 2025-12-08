import { useEffect } from "react";
import styles from "./Profile.module.css";
import type { ProfileProps } from "./Profile.types";
import { useLoaderData, useNavigate } from "react-router";
import { useStore } from "~/contexts/StoreContext";
import {
  Button,
  IconHumanFace,
  Input,
  Select,
  Wrapper,
} from "design-system-atomic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "~/zod/profile.schema";

function Profile({ props }: ProfileProps) {
  const loader = useLoaderData();
  const { setPage, handleSetUser } = useStore();

  const { meta, user } = loader;

  useEffect(() => {
    setPage((prev) => ({
      ...prev,
      title: meta.title,
      link: meta.link,
    }));
  }, [meta]);

  useEffect(() => {
    handleSetUser(user);
  }, [user]);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  console.log("user", user);

  return (
    <div className={styles.container}>
      <Wrapper
        style={{
          margin: "20px auto",
        }}
      >
        <Wrapper
          style={{
            margin: "20px auto",
            textAlign: "center",
          }}
        >
          {user.image ? (
            <img src={user.image} alt={`Imagem do usuário ${user.name}`} />
          ) : (
            <>
              <IconHumanFace fillColor="var(--color-text-primary)" />
            </>
          )}
        </Wrapper>
        <Wrapper
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            padding: "0",
          }}
        >
          <Input
            id="name"
            ariaLabel="Nome completo"
            labelId="name"
            description=""
            label="Nome completo"
            type="text"
            placeholder="Maria Silva"
            handleClear={() => setValue("name", "")}
            hasError={errors.name ? true : false}
            {...register("name")}
          />
          <Input
            id="name"
            ariaLabel="Nome social"
            labelId="name"
            description=""
            label="Nome social (Opcional)"
            type="text"
            placeholder="Digite seu nome social"
            handleClear={() => setValue("socialName", "")}
            hasError={errors.socialName ? true : false}
            {...register("socialName")}
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
          <Wrapper
            style={{
              display: "flex",
              gap: "24px",
              width: "100%",
              padding: "0",
            }}
          >
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
              fontFamily="primary"
              textSize="medium"
            />
            <Input
              id="date"
              type="date"
              ariaLabel="Data de nascimento"
              labelId="date"
              label="Data de nascimento"
              placeholder="xx/xx/xxxx"
              height="42px"
              hasError={errors.birthDate ? true : false}
              {...register("birthDate")}
            />
          </Wrapper>
          <Button
            type="button"
            label="Excluir conta"
            variant="tertiary"
            customStyles={{
              textDecoration: "underline",
            }}
          />
          <Button
            type="button"
            label="Salvar alterações"
            variant="primary"
            onClick={handleSubmit((data) => {
              console.log(data);
            })}
            customStyles={{
              alignSelf: "center",
            }}
          />
        </Wrapper>
      </Wrapper>
    </div>
  );
}

export default Profile;
