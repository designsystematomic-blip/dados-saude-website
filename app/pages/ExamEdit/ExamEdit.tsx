import { Button, Text, Input, Wrapper, Droplist, Textarea, UploadFile, Camera, Modal, IconUploadFile, Snackbar, Divider } from "design-system-atomic";
import { useEffect } from "react";
import { useFetcher, useLoaderData, useNavigate } from "react-router";
import { useStore } from "~/contexts/StoreContext";
import styles from './ExamEdit.module.css';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { examEditFormSchema } from "~/zod/exam.schema";
import { useExamEdit } from "./hooks";
import type { ExamType, Specialty } from "~/global/user";

export default function ExamEdit() {
    const loader = useLoaderData();
    const navigate = useNavigate();
    const fetcherExam = useFetcher({ key: 'edit-exam' });
    const { setPage, handleSetUser } = useStore();
    const acceptedFileTypes = "image/*,application/pdf";

    const { meta, user, exam, token, apiEndpoint } = loader;

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

    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(examEditFormSchema),
        mode: "onChange",
        defaultValues: {
            name: exam?.name || "",
            date: exam?.date ? new Date(exam.date).toISOString().split('T')[0] : "",
            type: exam?.type || "",
            specialty: exam?.specialty || "",
            observations: exam?.observations || "",
        }
    });

    const handleFetcher = (data: any) => {
        const form = new FormData();
        form.append("name", data.name);
        form.append("date", data.date);
        form.append("type", data.type);
        form.append("specialty", data.specialty || "");
        form.append("observations", data.observations || "");
        form.append("userId", user.id);
        form.append("examId", exam.id);

        // Adicionar apenas novos arquivos
        newFiles.forEach((file) => {
            form.append(`files`, file);
        });

        // Arquivos existentes para manter
        existingFiles.forEach((file) => {
            form.append(`existingFiles`, file.id);
        });

        if (Object.keys(errors).length > 0) {
            console.log('Errors encontrados:', errors);
            return;
        }

        fetcherExam.submit(form, {
            method: "put",
            action: `/exam/${exam.id}/edit`,
            encType: "multipart/form-data"
        });
    };

    const {
        newFiles,
        setNewFiles,
        existingFiles,
        setExistingFiles,
        errorsFiles,
        process,
        setProcess,
        handleTakePhotos,
        handleChangeFiles,
        handleFiles,
        handleRemoveExistingFile,
        modalPreviewId,
        modalCameraId,
        multiDialog,
        closeDialog,
        selectedSpecialty,
        selectedType,
        handleSelectType,
        handleSelectSpecialty,
        snackBarSuccessId,
        snackBarErrorId,
        handleSnackBarSuccess,
        handleSnackBarError,
        snackbarDuration,
        snackbarExamSavedSuccessId,
        snackbarExamSavedErrorId,
        handleSnackBarExamSavedSuccess,
        handleSnackBarExamSavedError,
        examList,
        specialtiesList,
        getFileUrl,
        isImageFile,
        isPdfFile,
    } = useExamEdit({ exam, token, apiEndpoint });

    // Atualizar formulário quando os arquivos mudarem
    useEffect(() => {
        if (newFiles.length > 0 && process === 100) {
            handleSnackBarSuccess();
        }
        if (newFiles.length > 0) {
            setValue("files", newFiles);
        }
    }, [newFiles]);

    useEffect(() => {
        if (errorsFiles.length > 0) {
            handleSnackBarError();
        }
    }, [errorsFiles]);

    // Redirecionar após salvar com sucesso
    useEffect(() => {
        if (fetcherExam?.data?.success) {
            handleSnackBarExamSavedSuccess();
            setTimeout(() => {
                navigate(`/exam/${exam.id}`);
            }, 1500);
        }
        if (fetcherExam?.data?.error) {
            handleSnackBarExamSavedError();
        }
    }, [fetcherExam?.data]);

    // Accessibility - Close modal on ESC key press
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && multiDialog.some((dialog) => dialog.id === modalPreviewId && dialog.isOpen)) {
                closeDialog(modalPreviewId);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [multiDialog, closeDialog]);

    return (
        <div className={styles.page}>
            <Wrapper style={{ marginTop: '24px' }}>
                <div>
                    <form
                        method="put"
                        className={styles.examEditContent + " " + styles.flexColumn}
                        onSubmit={handleSubmit(handleFetcher)}
                        encType="multipart/form-data"
                    >
                        <Input
                            ariaLabel="Nome do exame"
                            label="Nome"
                            type="text"
                            autoComplete="off"
                            placeholder="Ex.Hemograma completo, Ressonância"
                            handleClear={() => setValue("name", "")}
                            hasError={errors.name ? true : false}
                            {...register("name")}
                        />

                        <div className={styles.flexRow}>
                            <Input
                                type="date"
                                ariaLabel="Data do exame"
                                label="Data do exame"
                                autoComplete="off"
                                placeholder="xx/xx/xxxx"
                                height="42px"
                                hasError={errors.date ? true : false}
                                {...register("date")}
                            />

                            <Droplist
                                placeholder={selectedType?.name || "Selecione"}
                                handleSelectItem={async (item) => {
                                    handleSelectType(item);
                                    setValue("type", item.value as ExamType);
                                    await trigger("type");
                                }}
                                label="Tipo do exame"
                                name="type"
                                listTitle="Tipo de exame"
                                list={examList}
                                fontFamily="secondary"
                                textSize="medium"
                                hasError={errors.type ? true : false}
                            />
                        </div>

                        <Droplist
                            placeholder={selectedSpecialty?.name || "Selecione a especialidade"}
                            handleSelectItem={async (item) => {
                                handleSelectSpecialty(item);
                                setValue("specialty", item.value as Specialty);
                                await trigger("specialty");
                            }}
                            label="Especialidade (Opcional)"
                            name="specialty"
                            listTitle="Especialidade"
                            list={specialtiesList}
                            fontFamily="secondary"
                            textSize="medium"
                            hasError={errors.specialty ? true : false}
                        />

                        {/* Arquivos Existentes */}
                        {existingFiles.length > 0 && (
                            <div className={styles.existingFilesSection}>
                                <Text
                                    content="Arquivos existentes"
                                    fontFamily="primary"
                                    textSize="medium"
                                    textColor="var(--color-text-primary)"
                                />
                                <div className={styles.existingFilesList}>
                                    {existingFiles.map((file: any) => (
                                        <div key={file.id} className={styles.existingFileItem}>
                                            <div className={styles.filePreviewThumb}>
                                                {isImageFile(file.mimeType) && (
                                                    <img
                                                        src={getFileUrl(file.id)}
                                                        alt={file.filename}
                                                        className={styles.thumbnailImage}
                                                    />
                                                )}
                                                {isPdfFile(file.mimeType) && (
                                                    <div className={styles.pdfThumbnail}>
                                                        <Text content="📄 PDF" fontFamily="primary" textSize="small" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className={styles.fileInfo}>
                                                <Text
                                                    content={file.filename}
                                                    fontFamily="primary"
                                                    textSize="small"
                                                    textColor="var(--color-text-primary)"
                                                />
                                                <Text
                                                    content={`${(file.size / 1024).toFixed(2)} KB`}
                                                    fontFamily="secondary"
                                                    textSize="small"
                                                    textColor="var(--color-text-tertiary)"
                                                />
                                            </div>
                                            <Button
                                                type="button"
                                                variant="tertiary"
                                                label="Remover"
                                                onClick={() => handleRemoveExistingFile(file.id)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Upload de Novos Arquivos */}
                        <>
                            {multiDialog.some((dialog) => dialog.id === snackBarErrorId && dialog.isOpen) && (
                                <Snackbar
                                    isOpen={errorsFiles.length > 0}
                                    onClose={() => closeDialog(snackBarErrorId)}
                                    type="error"
                                    content={
                                        <>
                                            {errorsFiles.map((error, index) => (
                                                <Text key={index} content={error} />
                                            ))}
                                        </>
                                    }
                                />
                            )}
                            {multiDialog.some((dialog) => dialog.id === snackBarSuccessId && dialog.isOpen) && (
                                <Snackbar
                                    type="success"
                                    isOpen={newFiles.length > 0 && process === 100}
                                    onClose={() => closeDialog(snackBarSuccessId)}
                                    content={`Upload de ${newFiles.length} arquivo(s) realizado com sucesso!`}
                                />
                            )}
                            {multiDialog.some((dialog) => dialog.id === snackbarExamSavedSuccessId && dialog.isOpen) && (
                                <Snackbar
                                    type="success"
                                    isOpen={true}
                                    onClose={() => closeDialog(snackbarExamSavedSuccessId)}
                                    content="Exame atualizado com sucesso!"
                                />
                            )}
                            {multiDialog.some((dialog) => dialog.id === snackbarExamSavedErrorId && dialog.isOpen) && (
                                <Snackbar
                                    type="error"
                                    isOpen={true}
                                    onClose={() => closeDialog(snackbarExamSavedErrorId)}
                                    content="Erro ao atualizar exame. Tente novamente."
                                />
                            )}

                            <Wrapper style={{
                                border: '1px dashed var(--color-border-primary)',
                                borderRadius: '20px',
                                width: '100%',
                            }}>
                                <UploadFile.Root>
                                    {newFiles.length === 0 ? (
                                        <Wrapper
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                                flexFlow: 'wrap',
                                                gap: '8px',
                                                padding: '16px',
                                            }}
                                        >
                                            <UploadFile.Input
                                                icon={<IconUploadFile fillColor="var(--button-bg-primary)" />}
                                                label="Adicionar mais arquivos"
                                                name="file"
                                                id="file"
                                                accept={acceptedFileTypes}
                                                acceptDescription="PNG, JPG ou PDF"
                                                multiple
                                                onChange={handleFiles}
                                                buttonColor="var(--button-bg-primary)"
                                                acceptDescriptionColor="var(--color-quintenary)"
                                                filesList={newFiles}
                                                fontFamily="primary"
                                            />
                                            <Divider
                                                color="var(--color-border-primary)"
                                                children={
                                                    <Text
                                                        content="ou"
                                                        fontFamily="secondary"
                                                        textColor="var(--color-border-primary)"
                                                        textSize="medium"
                                                    />
                                                }
                                                borderLeft={true}
                                                borderRight={true}
                                            />
                                            <Button
                                                variant="primary"
                                                label="Tirar fotos"
                                                type="button"
                                                onClick={handleTakePhotos}
                                            />
                                        </Wrapper>
                                    ) : (
                                        <UploadFile.Root>
                                            <UploadFile.State
                                                uploadState={process === 100 ? 'success' : 'loading'}
                                            />
                                            <UploadFile.LoadingBar
                                                onChange={(progress) => setProcess(progress)}
                                                showPercentage={true}
                                                files={newFiles}
                                                loadingMessage="Carregando..."
                                                loadedMessage="Carregamento completo"
                                            />
                                            <Wrapper
                                                style={{
                                                    display: 'flex',
                                                    gap: '4px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    margin: '16px 0',
                                                }}
                                            >
                                                <Button
                                                    variant="tertiary"
                                                    label="Trocar fotos"
                                                    type="button"
                                                    onClick={handleChangeFiles}
                                                />
                                                <Text
                                                    fontFamily="secondary"
                                                    textSize="medium"
                                                    textColor="var(--color-quintenary)"
                                                    content="ou"
                                                />
                                                <UploadFile.Input
                                                    label="Adicionar mais fotos"
                                                    name="Adicionar mais fotos"
                                                    id="add-more-files"
                                                    accept={acceptedFileTypes}
                                                    buttonColor="var(--bg-primary)"
                                                    textSize="medium"
                                                    onChange={handleFiles}
                                                    isDisabled={process !== 100}
                                                    fontFamily="primary"
                                                />
                                            </Wrapper>
                                        </UploadFile.Root>
                                    )}

                                    {multiDialog.some((dialog) => dialog.id === modalPreviewId && dialog.isOpen) && (
                                        <Modal
                                            id={modalPreviewId}
                                            isOpen={multiDialog.some((dialog) => dialog.id === modalPreviewId && dialog.isOpen)}
                                            onClose={() => closeDialog(modalPreviewId)}
                                            width="large"
                                            customClassName="round"
                                        >
                                            <UploadFile.Preview
                                                title={`Pré-visualização dos arquivos (${newFiles.length})`}
                                                files={newFiles}
                                                onRemove={(file) =>
                                                    setNewFiles((prev) => prev.filter((f) => f.name !== file.name))
                                                }
                                                fontFamily="primary"
                                                textSize="medium"
                                            />
                                        </Modal>
                                    )}

                                    {multiDialog.some((dialog) => dialog.id === modalCameraId && dialog.isOpen) && (
                                        <Modal
                                            id={modalCameraId}
                                            isOpen={multiDialog.some((dialog) => dialog.id === modalCameraId && dialog.isOpen)}
                                            onClose={() => closeDialog(modalCameraId)}
                                            width='large'
                                        >
                                            <Camera
                                                buttonRetakePhotoText='Capturar novamente'
                                                buttonTakePhotoText='Capturar foto'
                                                mirrorText='Espelhar'
                                                onCapture={(imageSrc) => {
                                                    const byteString = atob(imageSrc.split(',')[1]);
                                                    const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
                                                    const ab = new ArrayBuffer(byteString.length);
                                                    const ia = new Uint8Array(ab);
                                                    for (let i = 0; i < byteString.length; i++) {
                                                        ia[i] = byteString.charCodeAt(i);
                                                    }
                                                    const blob = new Blob([ab], { type: mimeString });
                                                    const file = new File([blob], `photo_${Date.now()}.jpg`, { type: mimeString });

                                                    setNewFiles((prev) => [...prev, file]);
                                                    closeDialog(modalCameraId);
                                                }}
                                            />
                                        </Modal>
                                    )}
                                </UploadFile.Root>
                            </Wrapper>
                        </>

                        <Textarea
                            id="observations"
                            labelId="observations-label"
                            ariaLabel="Observações sobre o exame"
                            label="Observações (Opcional)"
                            placeholder="Dosagem, posologia etc"
                            height="96px"
                            resize={false}
                            fontFamily="secondary"
                            textSize="medium"
                            {...register("observations")}
                        />

                        {fetcherExam?.data?.error && (
                            <Text
                                content={fetcherExam?.data?.error}
                                fontFamily="primary"
                                textSize="small"
                                textAlign="left"
                                textColor="var(--color-text-error)"
                            />
                        )}

                        <div className={styles.buttonContainer + " " + styles.flexColumn}>
                            <Button
                                type="submit"
                                label={fetcherExam.state === 'submitting' ? "Salvando..." : "Salvar alterações"}
                                ariaLabel="Salvar alterações do exame"
                                variant="primary"
                                isDisabled={fetcherExam.state === 'submitting'}
                            />
                            <Button
                                type="button"
                                label="Cancelar"
                                ariaLabel="Cancelar edição"
                                variant="secondary"
                                onClick={() => navigate(`/exam/${exam.id}`)}
                            />
                        </div>
                    </form>
                </div>
            </Wrapper>
        </div>
    );
}