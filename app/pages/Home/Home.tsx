import { CardAction, IconMedication, IconVaccines, IconPeopleAlt, Wrapper } from "dados-saude";
import styles from "./Home.module.css";
import {  useLoaderData, useNavigate } from "react-router";
import { useEffect } from "react";
import { useStore } from "~/contexts/StoreContext/StoreContext";

export default function Home() {

	const loader = useLoaderData();
	const { setPage, handleSetUser } = useStore();

	const navigate = useNavigate();

	const { meta, user } = loader;

	useEffect(() => {
		const title = meta.title;
		setPage(prev => ({
			...prev,
			title: title
		}));
	}, [meta]);

	useEffect(() => {
		handleSetUser(user);
	}, [user])

	return (
		<div>
			<Wrapper>
				<div className={styles.links}>
					<CardAction  
						label="Medicamentos"
						icon={<IconMedication />}
						variant="primary"
						onClick={() => {
							navigate('/medication')
						}}
					/>
					<CardAction 
						label="Exames"
						icon={<IconMedication />}
						variant="primary"
						onClick={() => {
							navigate('/exam')
						}}
					/>
					<CardAction 
						label="Vacinas"
						icon={<IconVaccines />}
						variant="primary"
						onClick={() => {
							navigate('/medication')
						}}
					/>
					<CardAction 
						label="Médicos"
						icon={<IconPeopleAlt />}
						variant="primary"
						onClick={() => {
							navigate('/medication')
						}}
					/>
				</div>
			</Wrapper>
		</div>
	)
}
