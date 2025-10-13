import { Button, Text, Input, Select, Wrapper, Droplist, Textarea } from "dados-saude";
import { useCallback, useEffect, useState } from "react";
import { Link, useFetcher, useLoaderData, useNavigate } from "react-router";
import { useStore } from "~/contexts/StoreContext";
import styles from './ExamNew.module.css';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { examNewFormSchema } from "~/zod/exam.schema";

export default function ExamNew() {

	const [selectedSpecialty, setSelectedSpecialty] = useState<{value: string | number; name: string}>();
	const [selectedType, setSelectedType] = useState<{value: string | number; name: string}>();

  const handleSelectSpecialty = useCallback((item: {value: string | number; name: string}) => {
    setSelectedSpecialty(item)
  }, [setSelectedSpecialty]);

	const handleSelectType = useCallback((item: {value: string | number; name: string}) => {
    setSelectedType(item)
  }, [setSelectedType]);

	const loader = useLoaderData();
	const fetcherExam = useFetcher({ key: 'nex-exam' });
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
	}, [user]);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(examNewFormSchema),
		mode: "onChange"
	});

	const handleFetcher = (data: any) => {
		if (Object.keys(errors).length > 0) {
			return;
		}
		fetcherExam.submit(data, { method: "post", action: "/exam/new" });
	};

	return (
		<div className={styles.page}>
			<Wrapper style={{ marginTop: '24px' }}>
				<div>
					<form
						method="post"
						className={styles.examNewContent + " " + styles.flexColumn}
						onSubmit={handleSubmit(handleFetcher)}
					>
						<Input
							id="name"
							ariaLabel="Nome"
							labelId="name"
							description=""
							label="Nome"
							type="text"
							placeholder="Ex. “Hemograma completo”, “Ressonância”"
							handleClear={() => setValue("name", "")}
							hasError={errors.name ? true : false}
							{...register("name")}
						/>

						<div className={styles.flexRow}>
							<Input
								id="date"
								type="date"
								ariaLabel="Birth Date"
								labelId="date"
								label="Data do exame"
								placeholder="xx/xx/xxxx"
								height="42px"
								{...register("date")}
							/>

							<Droplist
								placeholder="Selecione"
								handleSelectItem={handleSelectType}
								label="Tipo do exame"
								name="Selecione"
								listTitle="Tipo de exame"
								list={[
									{value: 1, name: 'Opção 1'},
									{value: 2, name: 'Opção 2'},
									{value: 3, name: 'Opção 3'},
								]}
								variant="secondary"
								size="medium"
							/>
						</div>

						<Droplist
							placeholder="Selecione a especialidade"
							handleSelectItem={handleSelectSpecialty}
							label="Especialidade (Opcional)"
							name="Selectione o tipo"
							listTitle="Especialidade"
							list={[
								{value: 1, name: 'Opção 1'},
								{value: 2, name: 'Opção 2'},
								{value: 3, name: 'Opção 3'},
							]}
							variant="secondary"
							size="medium"
						/>

						<Wrapper style={{
							border: '1px dashed var(--color-border-quartenary)',
							width: '100%',
							borderRadius: '20px',
							padding: '24.5px'
						}}>

							<p>Teste</p>

						</Wrapper>

						<Textarea
							id="observations"
							ariaLabel="Observações (Opcional)"
							labelId="observations"
							label="Observações (Opcional)"
							placeholder="Dosagem, posologia etc"
							height="96px"
							resize={false}
							variant="secondary"
							size="medium"
							{...register("observations")}
						/>

						{fetcherExam?.data?.error && (
							<Text
								content={fetcherExam?.data?.error}
								variant="primary"
								size="small"
								align="left"
								color="var(--color-text-error)"
							/>
						)}
						<div className={styles.buttonContainer + " " + styles.flexColumn}>
							<Button
								type="submit"
								label="Salvar exame"
								ariaLabel="Salvar exame"
								variant="primary"
							/>
						</div>
					</form>

				</div>
			</Wrapper>
		</div>
	)
}
