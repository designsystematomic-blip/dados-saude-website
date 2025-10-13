import { Drawer, Header, IconAccount, IconChevronRight, IconClose, IconContactPeople, IconFeed, IconHamburguer, IconHelpOutline, IconHumanFace, IconMedicalInformation, IconMedication, IconPeopleAlt, IconTulip, IconVaccines, Menu, Text, Title } from "dados-saude";
import { useCallback, useState } from "react";
import { Link } from "react-router";
import { useStore } from "~/contexts/StoreContext";
import styles from "./HeaderMount.module.css";

export default function HeaderMount() {
	const { page, user } = useStore();
	const [openMenuDrawer, setOpenMenuDrawer] = useState<boolean>(false);
	const handleOpenMenuDrawer = useCallback(() => {
		setOpenMenuDrawer(!openMenuDrawer);
	}, [openMenuDrawer]);

	console.log('user headermount', user);

	if(!user) {
		return;
	}

	const menuItems: any[] = [
		{
			iconLeft: <IconAccount fillColor="#0476D9"/>,
			name: 'Dados pessoais',
			iconRight: <IconChevronRight />,
			variant: 'secondary'
		},
		{
			iconLeft: <IconMedicalInformation/>,
			name: 'Dados médicos',
			iconRight: <IconChevronRight />,
			variant: 'secondary'
		},
		{
			iconLeft: <IconContactPeople/>,
			name: 'Contatos de emergência',
			iconRight: <IconChevronRight />,
			variant: 'secondary'
		},
		{
			iconLeft: <IconFeed/>,
			name: 'Exames',
			iconRight: <IconChevronRight />,
			variant: 'secondary'
		},
		{
			iconLeft: <IconPeopleAlt/>,
			name: 'Médicos',
			iconRight: <IconChevronRight />,
			variant: 'secondary'
		},
		{
			iconLeft: <IconMedication/>,
			name: 'Medicamentos',
			iconRight: <IconChevronRight />,
			variant: 'secondary'
		},
		{
			iconLeft: <IconVaccines/>,
			name: 'Vacinas',
			iconRight: <IconChevronRight />,
			variant: 'secondary'
		},
		{
			iconLeft: <IconHelpOutline/>,
			name: 'Ajuda',
			iconRight: <IconChevronRight />,
			variant: 'secondary'
		}
	];

	return (
		<div>
			<Header.Wrapper>
				<Link to="/">
					<Header.Logo
						type="svg"
						svg={<IconTulip />}
						size="regular"
						alt="Tulip Ion"
					/>
				</Link>
				<Title tag="h2" content={page.title} variant="primary"/>
				<Header.Action
					onClick={handleOpenMenuDrawer}
					icon={<IconHamburguer />}
					ariaLabel="Action"
					name="actio"
				/>
			</Header.Wrapper>
			<Drawer
				isOpen={openMenuDrawer}
				onClose={handleOpenMenuDrawer}
				position={'left'}
				width="full"
				customClassName={styles.drawerMenu}
			>
				<div className={styles.drawerContent}>
					<div className={styles.drawerHeader}>
						<div className={styles.drawerUser}>
							<div className={styles.drawerUserImage}>
								{user.image ? (
									<img src={user.image} alt={`Imagem do usuário ${user.name}`}/>
								): <>
									<IconHumanFace fillColor="var(--button-text-primary)"/>
								</>}
							</div>
							<div>
								<Text 
									content={`Oi,`}
									variant="primary"
									size="large"
									color="var(--button-text-primary)"
								/>
								<Text 
									content={`${user.name}`}
									variant="primary"
									size="large"
									color="var(--button-text-primary)"
								/>
							</div>
						</div>
						<button
							className={styles.drawerButtonClose}
							onClick={handleOpenMenuDrawer}
							name="open"
							aria-label="open"
						>
							<IconClose fillColor="#fff" />
						</button>
					</div>
					<div className={styles.drawerMenuItems}>
						<Menu.List direction='column'>
							{menuItems.map((item, index) => (
								<Menu.Item key={index} {...item} />
							))}
						</Menu.List>
					</div>
				</div>
			</Drawer>
		</div>
	)
}
