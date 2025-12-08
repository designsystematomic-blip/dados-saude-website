import { Button, Title, Wrapper } from "design-system-atomic";
import { href, Link, useNavigate } from "react-router";
import "design-system-atomic/styles/style.css";
import { StoreProvider, useStore } from "./../contexts/StoreContext";
import { HeaderMount } from "./../components";

export default function Route404() {
  const navigate = useNavigate();
  const to = href("/");
  return (
    <div>
      <StoreProvider>
        <HeaderMount />
        <Wrapper
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
            gap: "20px",
            height: "100vh",
          }}
        >
          <Title
            tag="h1"
            content="Alguma coisa deu errado, tente mais tarde! "
            fontFamily="primary"
            textAlign="center"
          />
          <Button
            onClick={() => navigate(-1)}
            label="Voltar"
            type="button"
            customStyles={{ alignSelf: "center" }}
          />
          <Button
            onClick={() => navigate("/")}
            label="Ir para home"
            type="button"
            variant="tertiary"
            customStyles={{ alignSelf: "center" }}
          />
        </Wrapper>
      </StoreProvider>
    </div>
  );
}
