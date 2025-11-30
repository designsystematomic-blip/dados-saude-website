import { Button, Card, EmptyState, IconDocumentEmptyFolder, IconFilter, IconPlus, Input, Title, Wrapper } from "dados-saude";
import { useCallback, useEffect, useState } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router";
import { useStore } from "~/contexts/StoreContext";
import { ExamService } from "~/service/api";
import styles from "./Exam.module.css";

// Função para traduzir os tipos de exame
const translateExamType = (type: string | null) => {
	const types: Record<string, string> = {
		BLOOD_TEST: "Exame de sangue",
		URINE_TEST: "Exame de urina",
		STOOL_TEST: "Exame de fezes",
		XRAY: "Raio-X",
		ULTRASOUND: "Ultrassom",
		CT_SCAN: "Tomografia",
		MRI: "Ressonância magnética",
		ECG: "Eletrocardiograma (ECG)",
		ECHOCARDIOGRAM: "Ecocardiograma",
		MAMMOGRAM: "Mamografia",
		COLONOSCOPY: "Colonoscopia",
		ENDOSCOPY: "Endoscopia",
		PAP_SMEAR: "Papanicolau",
		OTHER: "Outro"
	};
	return type ? types[type] || type : "Não informado";
};

// Função para traduzir especialidades
const translateSpecialty = (specialty: string | null) => {
	const specialties: Record<string, string> = {
		CARDIOLOGY: "Cardiologia",
		ENDOCRINOLOGY: "Endocrinologia",
		GYNECOLOGY_OBSTETRICS: "Ginecologia e Obstetrícia",
		UROLOGY: "Urologia",
		DERMATOLOGY: "Dermatologia",
		GASTROENTEROLOGY: "Gastroenterologia",
		ORTHOPEDICS_RHEUMATOLOGY: "Ortopedia/Reumatologia",
		NEUROLOGY: "Neurologia",
		OPHTHALMOLOGY: "Oftalmologia",
		OTORHINOLARYNGOLOGY: "Otorrinolaringologia",
		PULMONOLOGY: "Pneumologia",
		NEPHROLOGY: "Nefrologia",
		HEMATOLOGY: "Hematologia",
		ONCOLOGY: "Oncologia",
		PEDIATRICS: "Pediatria",
		PSYCHIATRY_PSYCHOLOGY: "Psiquiatria / Psicologia",
		GENERAL_CLINIC: "Clínico geral",
		OTHER: "Outro"
	};
	return specialty ? specialties[specialty] || specialty : "Não informado";
};

export default function Exam() {

	const loader = useLoaderData();
	const navigate = useNavigate();
	const [selectedFile, setSelectedFile] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [downloading, setDownloading] = useState<string | null>(null);

	const { setPage, handleSetUser } = useStore();

	const { meta, user, exam } = loader;

	// Criar instância do service
	const examService = new ExamService('http://localhost:8000');

	// Função para gerar URL segura do arquivo via backend
	const getFileUrl = (fileId: string) => {
		return examService.getFileStreamUrl({ fileId, token: user.token });
	};

	console.log('examData', exam)

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

	// Função para verificar se o arquivo é uma imagem
	const isImageFile = (mimeType: string) => {
		return mimeType.startsWith('image/');
	};

	// Função para verificar se o arquivo é um PDF
	const isPdfFile = (mimeType: string) => {
		return mimeType === 'application/pdf';
	};

	// Função para visualizar arquivo
	const handleViewFile = (file: any) => {
		setSelectedFile(file);
		setIsModalOpen(true);
	};

	// Função para fechar modal
	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedFile(null);
	};

	// Função para fazer download do arquivo
	const handleDownloadFile = async (fileId: string, filename: string) => {
		try {
			setDownloading(fileId);
			const response = await examService.getFileDownloadUrl({ 
				token: user.token, 
				fileId: fileId 
			});
			
			if (response.ok) {
				const data = await response.json();
				
				// Criar um link temporário para download
				const link = document.createElement('a');
				link.href = data.downloadUrl;
				link.download = filename;
				link.target = '_blank';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			} else {
				console.error('Erro ao gerar URL de download');
				alert('Erro ao baixar arquivo. Tente novamente.');
			}
		} catch (error) {
			console.error('Erro ao fazer download:', error);
			alert('Erro ao baixar arquivo. Tente novamente.');
		} finally {
			setDownloading(null);
		}
	};

	if (!exam) {
		return (
			<Wrapper>
				<EmptyState.Root>
					<IconDocumentEmptyFolder />
					<Title
						content="Exame não encontrado"
						fontFamily="secondary"
						tag="h1"
						textAlign="center"
						fontWeight="regular"
					/>
					<EmptyState.Action>
						<Button
							type="button"
							variant="secondary"
							label="Voltar para lista de exames"
							onClick={() => navigate('/exam')}
						/>
					</EmptyState.Action>
				</EmptyState.Root>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<div className={styles.examContainer}>
				{/* Header com ações */}
				<div className={styles.examHeader}>
					<div className={styles.examHeaderInfo}>
						<Title
							content={exam.name}
							fontFamily="secondary"
							tag="h1"
							textAlign="left"
							fontWeight="bold"
							textColor="var(--color-text-primary)"
							style={{ color: 'var(--color-text-primary)', marginBottom: '8px' }}
						/>
						<Title
							content={`Data do exame: ${new Date(exam.date).toLocaleDateString('pt-BR')}`}
							fontFamily="primary"
							tag="h3"
							textAlign="left"
							fontWeight="regular"
							style={{ color: 'var(--color-text-secondary)' }}
						/>
					</div>
					<div className={styles.examHeaderActions}>
						<Button
							type="button"
							variant="secondary"
							label="Voltar"
							onClick={() => navigate('/exam')}
						/>
						<Button
							type="button"
							variant="primary"
							label="Editar Exame"
							onClick={() => navigate(`/exam/${exam.id}/edit`)}
						/>
					</div>
				</div>

				{/* Informações do Exame */}
				<div className={styles.examDetails}>
					<Card
						title="Informações Gerais"
						style={{
							padding: '24px',
							borderRadius: '12px',
							boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.1)',
							marginBottom: '24px'
						}}
					>
						<div className={styles.examInfo}>
							<div className={styles.examInfoRow}>
								<div className={styles.examInfoItem}>
									<Title
										content="Nome do Exame:"
										fontFamily="primary"
										tag="h4"
										fontWeight="bold"
										style={{ color: 'var(--color-text-primary)', marginBottom: '4px' }}
									/>
									<Title
										content={exam.name}
										fontFamily="primary"
										tag="p"
										fontWeight="regular"
										style={{ color: 'var(--color-text-secondary)' }}
									/>
								</div>
								<div className={styles.examInfoItem}>
									<Title
										content="Data:"
										fontFamily="primary"
										tag="h4"
										fontWeight="bold"
										style={{ color: 'var(--color-text-primary)', marginBottom: '4px' }}
									/>
									<Title
										content={new Date(exam.date).toLocaleDateString('pt-BR')}
										fontFamily="primary"
										tag="p"
										fontWeight="regular"
										style={{ color: 'var(--color-text-secondary)' }}
									/>
								</div>
							</div>
							<div className={styles.examInfoRow}>
								<div className={styles.examInfoItem}>
									<Title
										content="Tipo do Exame:"
										fontFamily="primary"
										tag="h4"
										fontWeight="bold"
										style={{ color: 'var(--color-text-primary)', marginBottom: '4px' }}
									/>
									<Title
										content={translateExamType(exam.type)}
										fontFamily="primary"
										tag="p"
										fontWeight="regular"
										style={{ color: 'var(--color-text-secondary)' }}
									/>
								</div>
								<div className={styles.examInfoItem}>
									<Title
										content="Especialidade:"
										fontFamily="primary"
										tag="h4"
										fontWeight="bold"
										style={{ color: 'var(--color-text-primary)', marginBottom: '4px' }}
									/>
									<Title
										content={translateSpecialty(exam.specialty)}
										fontFamily="primary"
										tag="p"
										fontWeight="regular"
										style={{ color: 'var(--color-text-secondary)' }}
									/>
								</div>
							</div>
							{exam.observations && (
								<div className={styles.examInfoRow}>
									<div className={styles.examInfoItem} style={{ width: '100%' }}>
										<Title
											content="Observações:"
											fontFamily="primary"
											tag="h4"
											fontWeight="bold"
											style={{ color: 'var(--color-text-primary)', marginBottom: '4px' }}
										/>
										<Title
											content={exam.observations}
											fontFamily="primary"
											tag="p"
											fontWeight="regular"
											style={{ color: 'var(--color-text-secondary)' }}
										/>
									</div>
								</div>
							)}
						</div>
					</Card>

					{/* Informações do Paciente */}
					{exam.user && (
						<Card
							title="Informações do Paciente"
							style={{
								padding: '24px',
								borderRadius: '12px',
								boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.1)',
								marginBottom: '24px'
							}}
						>
							<div className={styles.examInfo}>
								<div className={styles.examInfoRow}>
									<div className={styles.examInfoItem}>
										<Title
											content="Nome:"
											fontFamily="primary"
											tag="h4"
											fontWeight="bold"
											style={{ color: 'var(--color-text-primary)', marginBottom: '4px' }}
										/>
										<Title
											content={exam.user.name || "Não informado"}
											fontFamily="primary"
											tag="p"
											fontWeight="regular"
											style={{ color: 'var(--color-text-secondary)' }}
										/>
									</div>
									<div className={styles.examInfoItem}>
										<Title
											content="Email:"
											fontFamily="primary"
											tag="h4"
											fontWeight="bold"
											style={{ color: 'var(--color-text-primary)', marginBottom: '4px' }}
										/>
										<Title
											content={exam.user.email}
											fontFamily="primary"
											tag="p"
											fontWeight="regular"
											style={{ color: 'var(--color-text-secondary)' }}
										/>
									</div>
								</div>
							</div>
						</Card>
					)}

					{/* Arquivos do Exame */}
					{exam.file && exam.file.length > 0 && (
						<Card
							title="Arquivos do Exame"
							style={{
								padding: '24px',
								borderRadius: '12px',
								boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.1)',
								marginBottom: '24px'
							}}
						>
							<div className={styles.filesList}>
								{exam.file.map((file: any) => (
									<div key={file.id} className={styles.fileItem}>
										<div className={styles.fileInfo}>
											<Title
												content={file.filename}
												fontFamily="primary"
												tag="h5"
												fontWeight="bold"
												style={{ color: 'var(--color-text-primary)', marginBottom: '4px' }}
											/>
											<Title
												content={`${file.mimeType} • ${(file.size / 1024).toFixed(2)} KB`}
												fontFamily="primary"
												textSize="small"
												fontWeight="regular"
												style={{ color: 'var(--color-text-tertiary)' }}
											/>
											{(isImageFile(file.mimeType) || isPdfFile(file.mimeType)) && (
												<div className={styles.filePreview}>
													{isImageFile(file.mimeType) && (
														<img 
															src={getFileUrl(file.id)} 
															alt={file.filename}
															className={styles.thumbnailImage}
															onClick={() => handleViewFile(file)}
														/>
													)}
													{isPdfFile(file.mimeType) && (
														<div className={styles.pdfThumbnail} onClick={() => handleViewFile(file)}>
															<Title
																content="📄 Clique para visualizar PDF"
																fontFamily="primary"
																textSize="small"
																style={{ color: 'var(--color-text-secondary)' }}
															/>
														</div>
													)}
												</div>
											)}
										</div>
										<div className={styles.fileActions}>
											{(isImageFile(file.mimeType) || isPdfFile(file.mimeType)) && (
												<Button
													type="button"
													variant="secondary"
													label="Visualizar"
													onClick={() => handleViewFile(file)}
												/>
											)}
											<Button
												type="button"
												variant="tertiary"
												label={downloading === file.id ? "Baixando..." : "Download"}
												isDisabled={downloading === file.id}
												onClick={() => handleDownloadFile(file.id, file.filename)}
											/>
										</div>
									</div>
								))}
							</div>
						</Card>
					)}

					{/* Card vazio para arquivos se não houver nenhum */}
					{(!exam.file || exam.file.length === 0) && (
						<Card
							title="Arquivos do Exame"
							style={{
								padding: '24px',
								borderRadius: '12px',
								boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.1)',
								marginBottom: '24px'
							}}
						>
							<EmptyState.Root>
								<IconDocumentEmptyFolder />
								<Title
									content="Nenhum arquivo anexado a este exame"
									fontFamily="primary"
									tag="p"
									textAlign="center"
									fontWeight="regular"
									style={{ color: 'var(--color-text-secondary)' }}
								/>
							</EmptyState.Root>
						</Card>
					)}
				</div>
			</div>

			{/* Modal de visualização de arquivos */}
			{isModalOpen && selectedFile && (
				<div className={styles.modal} onClick={handleCloseModal}>
					<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
						<div className={styles.modalHeader}>
							<Title
								content={selectedFile.filename}
								fontFamily="primary"
								tag="h3"
								fontWeight="bold"
								style={{ color: 'var(--color-text-primary)' }}
							/>
							<Button
								type="button"
								variant="tertiary"
								label="✕"
								onClick={handleCloseModal}
								customStyles={{ padding: '8px 12px' }}
							/>
						</div>
						<div className={styles.modalBody}>
							{isImageFile(selectedFile.mimeType) && (
								<img 
									src={getFileUrl(selectedFile.id)} 
									alt={selectedFile.filename}
									className={styles.modalImage}
								/>
							)}
							{isPdfFile(selectedFile.mimeType) && (
								<iframe 
									src={getFileUrl(selectedFile.id)}
									className={styles.modalPdf}
									title={selectedFile.filename}
								/>
							)}
						</div>
						<div className={styles.modalFooter}>
							<Button
								type="button"
								variant="secondary"
								label="Fechar"
								onClick={handleCloseModal}
							/>
							<Button
								type="button"
								variant="primary"
								label={downloading === selectedFile.id ? "Baixando..." : "Download"}
								isDisabled={downloading === selectedFile.id}
								onClick={() => handleDownloadFile(selectedFile.id, selectedFile.filename)}
							/>
						</div>
					</div>
				</div>
			)}
		</Wrapper>
	)
}
