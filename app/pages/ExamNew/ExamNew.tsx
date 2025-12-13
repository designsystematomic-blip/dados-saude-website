import {
  Button,
  Text,
  Input,
  Wrapper,
  Droplist,
  Textarea,
  UploadFile,
  Camera,
  Modal,
  IconUploadFile,
  Snackbar,
  Divider,
} from "design-system-atomic";
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useNavigate } from "react-router";
import { useStore } from "~/contexts/StoreContext";
import styles from "./ExamNew.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { examNewFormSchema } from "~/zod/exam.schema";
import useExamNew from "./hooks";
import type { ExamType, Specialty } from "~/global/user";

export default function ExamNew() {
  const loader = useLoaderData();
  const [formSaved, setFormSaved] = useState(false);

  const fetcherExam = useFetcher({ key: "nex-exam" });
  const { setPage, handleSetUser } = useStore();
  const acceptedFileTypes = "image/*,application/pdf";

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

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(examNewFormSchema),
    mode: "onChange",
  });

  const handleFetcher = (data: any) => {
    const form = new FormData();
    form.append("name", data.name);
    form.append("date", data.date);
    form.append("type", data.type);
    form.append("specialty", data.specialty);
    form.append("observations", data.observations);
    form.append("userId", user.id);

    files.forEach((file) => {
      form.append(`files`, file);
    });

    if (Object.keys(errors).length > 0) {
      console.log("Errors encontrados:", errors);
      return;
    }

    fetcherExam.submit(form, {
      method: "post",
      action: "/exam/new",
      encType: "multipart/form-data",
    });
  };

  const {
    files,
    setFiles,
    errorsFiles,
    process,
    setProcess,
    handleTakePhotos,
    handleChangeFiles,
    handleFiles,
    modalPreviewId,
    modalCameraId,
    multiDialog,
    closeDialog,
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
  } = useExamNew();

  useEffect(() => {
    if (files.length > 0 && process === 100) {
      handleSnackBarSuccess();
    }
    if (files.length > 0) {
      setValue("files", files);
    }
  }, [files]);

  useEffect(() => {
    if (errorsFiles.length > 0) {
      handleSnackBarError();
    }
  }, [errorsFiles]);

  // Auto-close snackbars after duration
  useEffect(() => {
    if (
      multiDialog.some(
        (dialog: any) => dialog.id === snackBarSuccessId && dialog.isOpen
      )
    ) {
      const timer = setTimeout(() => {
        closeDialog(snackBarSuccessId);
      }, snackbarDuration);
      return () => clearTimeout(timer);
    }
  }, [multiDialog, snackBarSuccessId, closeDialog, snackbarDuration]);

  useEffect(() => {
    if (
      multiDialog.some(
        (dialog: any) => dialog.id === snackBarErrorId && dialog.isOpen
      )
    ) {
      const timer = setTimeout(() => {
        closeDialog(snackBarErrorId);
      }, snackbarDuration);
      return () => clearTimeout(timer);
    }
  }, [multiDialog, snackBarErrorId, closeDialog, snackbarDuration]);

  useEffect(() => {
    if (
      multiDialog.some(
        (dialog: any) =>
          dialog.id === snackbarExamSavedSuccessId && dialog.isOpen
      )
    ) {
      const timer = setTimeout(() => {
        closeDialog(snackbarExamSavedSuccessId);
      }, snackbarDuration);
      return () => clearTimeout(timer);
    }
  }, [multiDialog, snackbarExamSavedSuccessId, closeDialog, snackbarDuration]);

  useEffect(() => {
    if (
      multiDialog.some(
        (dialog: any) => dialog.id === snackbarExamSavedErrorId && dialog.isOpen
      )
    ) {
      const timer = setTimeout(() => {
        closeDialog(snackbarExamSavedErrorId);
      }, snackbarDuration);
      return () => clearTimeout(timer);
    }
  }, [multiDialog, snackbarExamSavedErrorId, closeDialog, snackbarDuration]);

  // Accessibility - Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        multiDialog.some(
          (dialog: any) => dialog.id === modalPreviewId && dialog.isOpen
        )
      ) {
        closeDialog(modalPreviewId);
      }
    };

    // Add event listener when component mounts or isOpen changes
    document.addEventListener("keydown", handleKeyDown);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [multiDialog, closeDialog]);

  useEffect(() => {
    if (fetcherExam?.data?.success) {
      handleSnackBarExamSavedSuccess();
      setFormSaved(true);
      return;
    }

    if (fetcherExam?.data?.error) {
      handleSnackBarExamSavedError();
      return;
    }
  }, [fetcherExam]);

  const handleResetForm = () => {
    //form reset
    reset();
    setFiles([]);
    setProcess(0);
  };

  return (
    <div className={styles.page}>
      <Wrapper style={{ margin: "24px 0" }}>
        <div>
          <form
            method="post"
            className={styles.examNewContent + " " + styles.flexColumn}
            onSubmit={handleSubmit(handleFetcher)}
            encType="multipart/form-data"
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
                ariaLabel="Data do exame"
                labelId="date"
                label="Data do exame"
                placeholder="xx/xx/xxxx"
                height="42px"
                hasError={errors.date ? true : false}
                {...register("date")}
              />

              <Droplist
                placeholder="Selecione"
                handleSelectItem={async (item) => {
                  handleSelectType(item);
                  setValue("type", item.value as ExamType);
                  await trigger("type");
                }}
                label="Tipo do exame"
                name="Selecione"
                listTitle="Tipo de exame"
                list={examList}
                fontFamily="secondary"
                textSize="medium"
                hasError={errors.type ? true : false}
              />
            </div>

            <Droplist
              placeholder="Selecione a especialidade"
              handleSelectItem={async (item) => {
                handleSelectSpecialty(item);
                setValue("specialty", item.value as Specialty);
                await trigger("specialty");
              }}
              label="Especialidade (Opcional)"
              name="Selectione o tipo"
              listTitle="Especialidade"
              list={specialtiesList}
              fontFamily="secondary"
              textSize="medium"
              hasError={errors.specialty ? true : false}
            />

            <>
              {multiDialog.some(
                (dialog: any) => dialog.id === snackBarErrorId && dialog.isOpen
              ) && (
                <Snackbar
                  isOpen={errorsFiles.length > 0}
                  onClose={() => closeDialog(snackBarErrorId)}
                  type="error"
                  content={
                    <>
                      {errorsFiles.map((error) => (
                        <Text content={error} />
                      ))}
                    </>
                  }
                />
              )}
              {multiDialog.some(
                (dialog: any) =>
                  dialog.id === snackBarSuccessId && dialog.isOpen
              ) && (
                <Snackbar
                  type="success"
                  isOpen={files.length > 0 && process === 100}
                  onClose={() => closeDialog(snackBarSuccessId)}
                  content={`Upload de ${files.length} arquivo(s) realizado com sucesso!`}
                />
              )}
              <Wrapper
                style={{
                  border: "1px dashed var(--color-border-primary)",
                  borderRadius: "20px",
                  width: "100%",
                }}
              >
                <UploadFile.Root>
                  {files.length === 0 ? (
                    <Wrapper
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignContent: "center",
                        flexFlow: "wrap",
                        gap: "8px",
                        padding: "16px",
                      }}
                    >
                      <UploadFile.Input
                        icon={
                          <IconUploadFile fillColor="var(--button-bg-primary)" />
                        }
                        label="Selecione as fotos da galeria"
                        name="file"
                        id="file"
                        accept={acceptedFileTypes}
                        acceptDescription="PNG, JPG ou PDF"
                        multiple
                        onChange={handleFiles}
                        buttonColor="var(--button-bg-primary)"
                        acceptDescriptionColor="var(--color-quintenary)"
                        filesList={files}
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
                        uploadState={process === 100 ? "success" : "loading"}
                      />
                      <UploadFile.LoadingBar
                        onChange={(progress) => setProcess(progress)}
                        showPercentage={true}
                        files={files}
                        loadingMessage="Carregando..."
                        loadedMessage="Carregamento completo"
                      />
                      <Wrapper
                        style={{
                          display: "flex",
                          gap: "4px",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "16px 0",
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

                  {multiDialog.some(
                    (dialog: any) =>
                      dialog.id === modalPreviewId && dialog.isOpen
                  ) && (
                    <Modal
                      id={modalPreviewId}
                      isOpen={multiDialog.some(
                        (dialog: any) =>
                          dialog.id === modalPreviewId && dialog.isOpen
                      )}
                      onClose={() => closeDialog(modalPreviewId)}
                      width="large"
                      customClassName="round"
                    >
                      <UploadFile.Preview
                        title={`Pré-visualização dos arquivos (${files.length})`}
                        files={files}
                        onRemove={(file) =>
                          setFiles((prev) =>
                            prev.filter((f) => f.name !== file.name)
                          )
                        }
                        fontFamily="primary"
                        textSize="medium"
                      />
                    </Modal>
                  )}

                  {multiDialog.some(
                    (dialog: any) =>
                      dialog.id === modalCameraId && dialog.isOpen
                  ) && (
                    <Modal
                      id={modalCameraId}
                      isOpen={multiDialog.some(
                        (dialog: any) =>
                          dialog.id === modalCameraId && dialog.isOpen
                      )}
                      onClose={() => closeDialog(modalCameraId)}
                      width="large"
                    >
                      <Camera
                        buttonRetakePhotoText="Capturar novamente"
                        buttonTakePhotoText="Capturar"
                        mirrorText="Espelhar"
                        buttonFacingModeEnvironmentText="Câmera traseira"
                        buttonFacingModeText="Câmera frontal"
                        onCapture={(imageSrc) => {
                          // Convert base64 to File object
                          const byteString = atob(imageSrc.split(",")[1]);
                          const mimeString = imageSrc
                            .split(",")[0]
                            .split(":")[1]
                            .split(";")[0];
                          const ab = new ArrayBuffer(byteString.length);
                          const ia = new Uint8Array(ab);
                          for (let i = 0; i < byteString.length; i++) {
                            ia[i] = byteString.charCodeAt(i);
                          }
                          const blob = new Blob([ab], { type: mimeString });
                          const file = new File(
                            [blob],
                            `photo_${Date.now()}.jpg`,
                            { type: mimeString }
                          );

                          setFiles((prev) => [...prev, file]);
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
              ariaLabel="Observações (Opcional)"
              labelId="observations"
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
                label="Salvar exame"
                ariaLabel="Salvar exame"
                variant="primary"
                isLoading={fetcherExam.state === "submitting"}
                isDisabled={fetcherExam.state === "submitting" || formSaved}
              />
            </div>

            {fetcherExam?.data?.success &&
              multiDialog.some(
                (dialog: any) =>
                  dialog.id === snackbarExamSavedSuccessId && dialog.isOpen
              ) && (
                <Snackbar
                  type="success"
                  isOpen={files.length > 0 && process === 100}
                  onClose={() => {
                    closeDialog(snackbarExamSavedSuccessId);
                    handleResetForm();
                  }}
                  content={`Exame criado com sucesso! O exame já está disponível na sua lista de exames.`}
                />
              )}

            {fetcherExam?.data?.error &&
              multiDialog.some(
                (dialog: any) =>
                  dialog.id === snackbarExamSavedErrorId && dialog.isOpen
              ) && (
                <Snackbar
                  type="error"
                  isOpen={true}
                  onClose={() => closeDialog(snackbarExamSavedErrorId)}
                  content={`Erro ao salvar o exame. Por favor, tente novamente.`}
                />
              )}
          </form>
        </div>
      </Wrapper>
    </div>
  );
}
