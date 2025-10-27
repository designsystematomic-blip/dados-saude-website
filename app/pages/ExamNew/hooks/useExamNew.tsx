import { useCallback, useState } from "react";
import { useDialog, validateFile } from "dados-saude";

function handleFileUpload() {
	const [files, setFiles] = useState<File[]>([]);
	const [errorsFiles, setErrorsFiles] = useState<string[]>([]);
  const [process, setProcess] = useState<number>(0);
	
  const { multiDialog, openDialog, closeDialog } = useDialog();
	
	const modalPreviewId = 'modal-upload-file-preview';
	const modalCameraId = 'modal-camera';
	const snackBarSuccessId = 'snackbar-upload-success';
	const snackBarErrorId = 'snackbar-upload-error';

	const allowedFormats = [
		'image/jpeg',
		'image/png',
		'image/gif',
		'image/webp',
		'application/pdf',
	];

	const handleTakePhotos = useCallback((): void => {
    openDialog(modalCameraId);
  }, [openDialog]);

  const handleChangeFiles = useCallback((): void => {
    openDialog(modalPreviewId);
  }, [openDialog]);

	const handleSnackBarSuccess = useCallback((): void => {
		console.log('teste sucesso')
		openDialog(snackBarSuccessId);
	}, [openDialog]);

	const handleSnackBarError = useCallback((): void => {
		console.log('teste erro')
		openDialog(snackBarErrorId);
	}, [openDialog]);

	const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];

      try {
        const fileCheck = await validateFile(file, {
          maxWidth: 4000,
          maxHeight: 4000,
          minWidth: 50,
          minHeight: 50,
          maxSize: 5 * 1024 * 1024, // 5MB
          allowedFormats
        });

        if (!fileCheck.isValid) {
          setErrorsFiles((prev) => [...prev, `${file.name}: ${fileCheck.error}`]);
        } else {
          setFiles((prev) => [...prev, file]);
        }

				//Snackbar success
				if (fileCheck.isValid) {
					handleSnackBarSuccess();
				} else {
					handleSnackBarError();
				}

      } catch (error) {
        console.log('Error', error);
      }
    }
  };

	return {
		files,
		setFiles,
		errorsFiles,
		setErrorsFiles,
		process,
		setProcess,
		handleTakePhotos,
		handleChangeFiles,
		handleFiles,
		modalPreviewId,
		modalCameraId,
		multiDialog,
		closeDialog,
		snackBarSuccessId,
		snackBarErrorId,
		handleSnackBarSuccess,
		handleSnackBarError
	}

}

function handleForm () {

	const [selectedSpecialty, setSelectedSpecialty] = useState<{value: string | number; name: string}>();
	const [selectedType, setSelectedType] = useState<{value: string | number; name: string}>();

	const handleSelectSpecialty = useCallback((item: {value: string | number; name: string}) => {
		setSelectedSpecialty(item)
	}, [setSelectedSpecialty]);

	const handleSelectType = useCallback((item: {value: string | number; name: string}) => {
		setSelectedType(item)
	}, [setSelectedType]);

	return {
		selectedSpecialty,
		selectedType,
		handleSelectSpecialty,
		handleSelectType
	}

}

function handleEnums() {
	const examList = [
		{ value: 'BLOOD_TEST', name: 'Exame de Sangue' },
		{ value: 'URINE_TEST', name: 'Exame de Urina' },
		{ value: 'STOOL_TEST', name: 'Exame de Fezes' },
		{ value: 'XRAY', name: 'Raio-X' },
		{ value: 'ULTRASOUND', name: 'Ultrassom' },
		{ value: 'CT_SCAN', name: 'Tomografia Computadorizada' },
		{ value: 'MRI', name: 'Ressonância Magnética' },
		{ value: 'ECG', name: 'Eletrocardiograma' },
		{ value: 'ECHOCARDIOGRAM', name: 'Ecocardiograma' },
		{ value: 'MAMMOGRAM', name: 'Mamografia' },
		{ value: 'COLONOSCOPY', name: 'Colonoscopia' },
		{ value: 'ENDOSCOPY', name: 'Endoscopia' },
		{ value: 'PAP_SMEAR', name: 'Papanicolau' },
		{ value: 'OTHER', name: 'Outro' },
	]

	const specialtiesList = [
		{ value: 'CARDIOLOGY', name: 'Cardiologia' },
		{ value: 'ENDOCRINOLOGY', name: 'Endocrinologia' },
		{ value: 'GYNECOLOGY_OBSTETRICS', name: 'Ginecologia e Obstetrícia' },
		{ value: 'UROLOGY', name: 'Urologia' },
		{ value: 'DERMATOLOGY', name: 'Dermatologia' },
		{ value: 'GASTROENTEROLOGY', name: 'Gastroenterologia' },
		{ value: 'ORTHOPEDICS_RHEUMATOLOGY', name: 'Ortopedia e Reumatologia' },
		{ value: 'NEUROLOGY', name: 'Neurologia' },
		{ value: 'OPHTHALMOLOGY', name: 'Oftalmologia' },
		{ value: 'OTORHINOLARYNGOLOGY', name: 'Otorrinolaringologia' },
		{ value: 'PULMONOLOGY', name: 'Pneumologia' },
		{ value: 'NEPHROLOGY', name: 'Nefrologia' },
		{ value: 'HEMATOLOGY', name: 'Hematologia' },
		{ value: 'ONCOLOGY', name: 'Oncologia' },
		{ value: 'PEDIATRICS', name: 'Pediatria' },
		{ value: 'PSYCHIATRY_PSYCHOLOGY', name: 'Psiquiatria e Psicologia' },
		{ value: 'GENERAL_CLINIC', name: 'Clínica Geral' },
		{ value: 'OTHER', name: 'Outro' },
	]

	return {
		examList,
		specialtiesList
	}

}

// Main hook
function useExamNew() {
	const fileUpload = handleFileUpload();
	const form = handleForm();
	const enums = handleEnums();

	return {
		...fileUpload,
		...form,
		...enums
	}

}

export default useExamNew;