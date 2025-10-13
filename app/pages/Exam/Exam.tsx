import { Button, EmptyState, IconDocumentEmptyFolder, IconPlus, Title, Wrapper } from "dados-saude";
import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useStore } from "~/contexts/StoreContext";

export default function Exam() {

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

	if (user.exams.length < 1) {
		return (
			<Wrapper style={{ marginTop: '80px' }}>
				<EmptyState.Root>
					<IconDocumentEmptyFolder />
					<Title 
						content="Você ainda não possui exames cadastrados" 
						variant="secondary"
						tag="h1"
						align="center"
						weight="regular"
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
		)
	}

	return (
		<Wrapper>

		</Wrapper>
	)
}
