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

	if(!user) {
		return;
	}

	const menuItems: any[] = [
		{
			iconLeft: <IconAccount fillColor="#0476D9"/>,
			iconRight: <IconChevronRight />,
			variant: 'secondary',
			textAlign: 'left',
			children: (
				<a href="/profile" className={styles.menuLink}>
					<Title tag="span" textAlign="left" content="Dados pessoais" fontFamily="primary" />
				</a>
			)
		},
		{
			iconLeft: <IconMedicalInformation/>,
			iconRight: <IconChevronRight />,
			variant: 'secondary',
			children: (
				<a href="/medical-data" className={styles.menuLink}>
					<Title tag="span" textAlign="left" content="Dados médicos" fontFamily="primary" />
				</a>
			)
		},
		{
			iconLeft: <IconContactPeople/>,
			iconRight: <IconChevronRight />,
			variant: 'secondary',
			children: (
				<a href="/emergency-contacts" className={styles.menuLink}>
					<Title tag="span" textAlign="left" content="Contatos de emergência" fontFamily="primary" />
				</a>
			)
		},
		{
			iconLeft: <IconFeed/>,
			iconRight: <IconChevronRight />,
			variant: 'secondary',
			children: (
				<a href="/exam" className={styles.menuLink}>
					<Title tag="span" textAlign="left" content="Exames" fontFamily="primary" />
				</a>
			)
		},
		{
			iconLeft: <IconPeopleAlt/>,
			iconRight: <IconChevronRight />,
			variant: 'secondary',
			children: (
				<a href="/doctors" className={styles.menuLink}>
					<Title tag="span" textAlign="left" content="Médicos" fontFamily="primary" />
				</a>
			)
		},
		{
			iconLeft: <IconMedication/>,
			iconRight: <IconChevronRight />,
			variant: 'secondary',
			children: (
				<a href="/medications" className={styles.menuLink}>
					<Title tag="span" textAlign="left" content="Medicamentos" fontFamily="primary" />
				</a>
			)
		},
		{
			iconLeft: <IconVaccines/>,
			iconRight: <IconChevronRight />,
			variant: 'secondary',
			children: (
				<a href="/vaccines" className={styles.menuLink}>
					<Title tag="span" textAlign="left" content="Vacinas" fontFamily="primary" />
				</a>
			)
		},
		{
			iconLeft: <IconHelpOutline/>,
			iconRight: <IconChevronRight />,
			variant: 'secondary',
			children: (
				<a href="/help" className={styles.menuLink}>
					<Title tag="span" textAlign="left" content="Ajuda" fontFamily="primary" />
				</a>
			)
		}
	];

	return (
		<div>
			<Header.Wrapper>
				<Link to="/" aria-label="Ir para página inicial">
					<Header.Logo
						type="svg"
						svg={<IconTulip />}
						size="regular"
						alt="Tulip Ion"
					/>
				</Link>
				<a href={page.link} title={page.title} className={styles.headerTitle}>
					<Title tag="h2" content={page.title} fontFamily="primary"/>
				</a>
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
									fontFamily="primary"
									textSize="large"
									textColor="var(--button-text-primary)"
								/>
								<Text 
									content={`${user.name}`}
									fontFamily="primary"
									textSize="large"
									textColor="var(--button-text-primary)"
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
								<Menu.Item fontFamily="primary" key={index} {...item} />
							))}
						</Menu.List>
					</div>
				</div>
			</Drawer>
		</div>
	)
}
