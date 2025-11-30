import {
  CardAction,
  IconMedication,
  IconVaccines,
  IconPeopleAlt,
  Wrapper,
} from "design-system-atomic";
import styles from "./Home.module.css";
import { useLoaderData, useNavigate } from "react-router";
import { useEffect } from "react";
import { useStore } from "~/contexts/StoreContext/StoreContext";

export default function Home() {
  const loader = useLoaderData();
  const { setPage, handleSetUser } = useStore();

  const navigate = useNavigate();

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

  return (
    <div>
      <Wrapper>
        <div className={styles.links}>
          <CardAction
            label="Medicamentos"
            icon={<IconMedication />}
            fontFamily="primary"
            onClick={() => {
              navigate("/medication");
            }}
          />
          <CardAction
            label="Exames"
            icon={<IconMedication />}
            fontFamily="primary"
            onClick={() => {
              navigate("/exam");
            }}
          />
          <CardAction
            label="Vacinas"
            icon={<IconVaccines />}
            fontFamily="primary"
            onClick={() => {
              navigate("/medication");
            }}
          />
          <CardAction
            label="Médicos"
            icon={<IconPeopleAlt />}
            fontFamily="primary"
            onClick={() => {
              navigate("/medication");
            }}
          />
        </div>
      </Wrapper>
    </div>
  );
}
