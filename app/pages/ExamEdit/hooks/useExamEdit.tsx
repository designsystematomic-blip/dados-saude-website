import { useState, useCallback } from "react";
import { ExamService } from "~/service/api/exam.service";

interface ExamFile {
    id: string;
    filename: string;
    mimeType: string;
    size: number;
    path: string;
    url: string;
}

interface UseExamEditProps {
    exam: any;
    token: string;
    apiEndpoint: string;
}

export default function useExamEdit({ exam, token, apiEndpoint }: UseExamEditProps) {
    // Arquivos existentes do exame
    const [existingFiles, setExistingFiles] = useState<ExamFile[]>(exam?.file || []);
    
    // Novos arquivos para upload
    const [newFiles, setNewFiles] = useState<File[]>([]);
    
    // Estados de controle
    const [errorsFiles, setErrorsFiles] = useState<string[]>([]);
    const [process, setProcess] = useState<number>(0);

    // IDs dos modais
    const modalPreviewId = "modal-preview-edit";
    const modalCameraId = "modal-camera-edit";
    const snackBarSuccessId = "snackbar-success-edit";
    const snackBarErrorId = "snackbar-error-edit";
    const snackbarExamSavedSuccessId = "snackbar-exam-saved-success";
    const snackbarExamSavedErrorId = "snackbar-exam-saved-error";
    const snackbarDuration = 3000;

    // Controle de diálogos
    const [multiDialog, setMultiDialog] = useState<{ id: string; isOpen: boolean }[]>([
        { id: modalPreviewId, isOpen: false },
        { id: modalCameraId, isOpen: false },
        { id: snackBarSuccessId, isOpen: false },
        { id: snackBarErrorId, isOpen: false },
        { id: snackbarExamSavedSuccessId, isOpen: false },
        { id: snackbarExamSavedErrorId, isOpen: false },
    ]);

    // Listas de tipos e especialidades
    const examList = [
        { name: "Laboratorial", value: "PIPED" },
        { name: "Imagem", value: "IMAGE" },
        { name: "Clínico", value: "CLINICAL" },
        { name: "Outros", value: "OTHERS" },
    ];

    const specialtiesList = [
        { name: "Cardiologia", value: "CARDIOLOGY" },
        { name: "Dermatologia", value: "DERMATOLOGY" },
        { name: "Endocrinologia", value: "ENDOCRINOLOGY" },
        { name: "Gastroenterologia", value: "GASTROENTEROLOGY" },
        { name: "Ginecologia", value: "GYNECOLOGY" },
        { name: "Neurologia", value: "NEUROLOGY" },
        { name: "Oftalmologia", value: "OPHTHALMOLOGY" },
        { name: "Ortopedia", value: "ORTHOPEDICS" },
        { name: "Otorrinolaringologia", value: "OTORHINOLARYNGOLOGY" },
        { name: "Pediatria", value: "PEDIATRICS" },
        { name: "Psiquiatria", value: "PSYCHIATRY" },
        { name: "Urologia", value: "UROLOGY" },
        { name: "Outros", value: "OTHERS" },
    ];

    // Estado de seleção com valores iniciais do exame
    const [selectedType, setSelectedType] = useState(() => {
        const found = examList.find(item => item.value === exam?.type);
        return found || null;
    });

    const [selectedSpecialty, setSelectedSpecialty] = useState(() => {
        const found = specialtiesList.find(item => item.value === exam?.specialty);
        return found || null;
    });

    // Funções de controle de diálogos
    const openDialog = useCallback((id: string) => {
        setMultiDialog(prev => prev.map(dialog =>
            dialog.id === id ? { ...dialog, isOpen: true } : dialog
        ));
    }, []);

    const closeDialog = useCallback((id: string) => {
        setMultiDialog(prev => prev.map(dialog =>
            dialog.id === id ? { ...dialog, isOpen: false } : dialog
        ));
    }, []);

    // Handlers de seleção
    const handleSelectType = useCallback((item: any) => {
        setSelectedType(item);
    }, []);

    const handleSelectSpecialty = useCallback((item: any) => {
        setSelectedSpecialty(item);
    }, []);

    // Handlers de arquivos
    const handleFiles = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles) return;

        const validFiles: File[] = [];
        const errors: string[] = [];
        const maxSize = 10 * 1024 * 1024; // 10MB

        Array.from(selectedFiles).forEach(file => {
            if (file.size > maxSize) {
                errors.push(`Arquivo ${file.name} excede o limite de 10MB`);
            } else if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
                errors.push(`Arquivo ${file.name} não é uma imagem ou PDF válido`);
            } else {
                validFiles.push(file);
            }
        });

        if (errors.length > 0) {
            setErrorsFiles(errors);
        }

        if (validFiles.length > 0) {
            setNewFiles(prev => [...prev, ...validFiles]);
            setProcess(0);
            // Simular progresso
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setProcess(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                }
            }, 100);
        }
    }, []);

    const handleTakePhotos = useCallback(() => {
        openDialog(modalCameraId);
    }, [openDialog]);

    const handleChangeFiles = useCallback(() => {
        setNewFiles([]);
        setProcess(0);
    }, []);

    const handleRemoveExistingFile = useCallback((fileId: string) => {
        setExistingFiles(prev => prev.filter(file => file.id !== fileId));
    }, []);

    // Handlers de snackbars
    const handleSnackBarSuccess = useCallback(() => {
        openDialog(snackBarSuccessId);
        setTimeout(() => closeDialog(snackBarSuccessId), snackbarDuration);
    }, [openDialog, closeDialog]);

    const handleSnackBarError = useCallback(() => {
        openDialog(snackBarErrorId);
        setTimeout(() => closeDialog(snackBarErrorId), snackbarDuration);
    }, [openDialog, closeDialog]);

    const handleSnackBarExamSavedSuccess = useCallback(() => {
        openDialog(snackbarExamSavedSuccessId);
    }, [openDialog]);

    const handleSnackBarExamSavedError = useCallback(() => {
        openDialog(snackbarExamSavedErrorId);
        setTimeout(() => closeDialog(snackbarExamSavedErrorId), snackbarDuration);
    }, [openDialog, closeDialog]);

    // Funções de URL de arquivo
    const examService = new ExamService(apiEndpoint);

    const getFileUrl = useCallback((fileId: string): string => {
        return examService.getFileStreamUrl({ fileId, token });
    }, [token, apiEndpoint]);

    const isImageFile = useCallback((mimeType: string): boolean => {
        return mimeType.startsWith('image/');
    }, []);

    const isPdfFile = useCallback((mimeType: string): boolean => {
        return mimeType === 'application/pdf';
    }, []);

    return {
        // Estados de arquivos
        newFiles,
        setNewFiles,
        existingFiles,
        setExistingFiles,
        errorsFiles,
        process,
        setProcess,

        // Handlers de arquivos
        handleTakePhotos,
        handleChangeFiles,
        handleFiles,
        handleRemoveExistingFile,

        // IDs de modais
        modalPreviewId,
        modalCameraId,

        // Controle de diálogos
        multiDialog,
        openDialog,
        closeDialog,

        // Seleções
        selectedType,
        selectedSpecialty,
        handleSelectType,
        handleSelectSpecialty,

        // Snackbars
        snackBarSuccessId,
        snackBarErrorId,
        handleSnackBarSuccess,
        handleSnackBarError,
        snackbarDuration,
        snackbarExamSavedSuccessId,
        snackbarExamSavedErrorId,
        handleSnackBarExamSavedSuccess,
        handleSnackBarExamSavedError,

        // Listas
        examList,
        specialtiesList,

        // Utilitários de arquivos
        getFileUrl,
        isImageFile,
        isPdfFile,
    };
}