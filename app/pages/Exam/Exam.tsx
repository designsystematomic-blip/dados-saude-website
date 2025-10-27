import { Button, Card, EmptyState, IconDocumentEmptyFolder, IconFilter, IconPlus, Input, Title, Wrapper } from "dados-saude";
import { useCallback, useEffect, useState } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router";
import { useStore } from "~/contexts/StoreContext";
import styles from "./Exam.module.css";

export default function Exam() {
	const [search, setSearch] = useState('');
	const loader = useLoaderData();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const { setPage, handleSetUser } = useStore();

	const { meta, user, exams } = loader;

	useEffect(() => {
		setPage(prev => ({
			...prev,
			title: meta.title,
			link: meta.link
		}));
	}, [meta]);

	useEffect(() => {
		handleSetUser(user);
	}, [user]);

	const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		setSearch(target.value);
		setSearchParams({ name: target.value });
		if (target.value == '' && searchParams.has('name')) {
			searchParams.delete('name');
			return;
		}
	}, [setSearch, setSearchParams, searchParams]);

	return (
		<Wrapper>
			{exams.length < 1 && searchParams.has('name') === false ? (
				<Wrapper style={{ marginTop: '80px' }}>
					<EmptyState.Root>
						<IconDocumentEmptyFolder />
						<Title
							content="Você ainda não possui exames cadastrados"
							fontFamily="secondary"
							tag="h1"
							textAlign="center"
							fontWeight="regular"
						/>
						<EmptyState.Action>
							<Button
								iconRight={<IconPlus fillColor={'var(--button-text-primary)'} />}
								type="button"
								variant="primary"
								label="Adicionar novo exame"
								onClick={() => navigate('/exam/new')}
							/>
						</EmptyState.Action>
					</EmptyState.Root>
				</Wrapper>
			) : (
				<Wrapper style={{
					height: '100vh',
					padding: 0
				}}>
					<div className={styles.examHeaderActions}>
						<Input
							id="searchExam"
							ariaLabel="Pesquise..."
							labelId="searchExam"
							label="Pesquise..."
							type="text"
							placeholder="Pesquise..."
							showLabel={false}
							handleClear={() => { setSearch('') }}
							onChange={handleSearchChange}
						/>
						<Button
							type="button"
							label=""
							ariaLabel="Buscar"
							variant="secondary"
							iconRight={<IconFilter fillColor="var(--bg-primary)" />}
						/>
					</div>
					{searchParams.has('name') && search !== "" && (
						<Wrapper
							style={{
								padding: 0,
								display: 'flex',
								gap: '16px',
								marginBottom: '8px',
								flexWrap: 'wrap'
							}}
						>
							<div>
								<Title
									tag="span"
									fontFamily="primary"
									content={`Filtrando por: "${searchParams.get('name')}"`}
									textAlign="left"
								/>
								<Button
									type="button"
									label="Limpar filtro"
									ariaLabel="Limpar filtro"
									variant="tertiary"
									textAlign="center"
									onClick={() => {
										setSearchParams({});
										setSearch('');
									}}
								/>
							</div>
							{exams.length < 1 && (
								<Title tag="h3" fontFamily="primary" textAlign="center" content="Nenhum exame encontrado" />
							)}
						</Wrapper>
					)}
					<div className={styles.examList}>
						{exams.map((exam: any) => (
							<Card
								key={exam.id}
								title={exam.name}
								titleColor="var(--color-link-secondary)"
								subtitle={`${new Date(exam.date).toLocaleDateString('pt-BR')}`}
								subtitleColor="var(--color-link-tertiary)"
								link={{
									text: 'Editar',
									textColor: 'var(--color-link-secondary)',
									href: `/exam/${exam.id}`
								}}
								fontFamily="primary"
								textSize="medium"
								style={{
									padding: '12px',
									borderRadius: '8px',
									boxShadow: '0px -1px 20px #0000001a'
								}}
							/>
						))}
					</div>
					<div className={styles.addExamButton}>
						<Button
							iconRight={<IconPlus fillColor={'var(--button-text-primary)'} />}
							type="button"
							variant="primary"
							label="Adicionar novo exame"
							onClick={() => navigate('/exam/new')}
						/>
					</div>
				</Wrapper>
			)}
		</Wrapper>
	)
}
