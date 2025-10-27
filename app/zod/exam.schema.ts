import z from "zod/v4";

export enum ExamType {
  BLOOD_TEST = 'BLOOD_TEST',
  URINE_TEST = 'URINE_TEST',
  STOOL_TEST = 'STOOL_TEST',
  XRAY = 'XRAY',
  ULTRASOUND = 'ULTRASOUND',
  CT_SCAN = 'CT_SCAN',
  MRI = 'MRI',
  ECG = 'ECG',
  ECHOCARDIOGRAM = 'ECHOCARDIOGRAM',
  MAMMOGRAM = 'MAMMOGRAM',
  COLONOSCOPY = 'COLONOSCOPY',
  ENDOSCOPY = 'ENDOSCOPY',
  PAP_SMEAR = 'PAP_SMEAR',
  OTHER = 'OTHER',
}

export enum Specialty {
  CARDIOLOGY = 'CARDIOLOGY',
  ENDOCRINOLOGY = 'ENDOCRINOLOGY',
  GYNECOLOGY_OBSTETRICS = 'GYNECOLOGY_OBSTETRICS',
  UROLOGY = 'UROLOGY',
  DERMATOLOGY = 'DERMATOLOGY',
  GASTROENTEROLOGY = 'GASTROENTEROLOGY',
  ORTHOPEDICS_RHEUMATOLOGY = 'ORTHOPEDICS_RHEUMATOLOGY',
  NEUROLOGY = 'NEUROLOGY',
  OPHTHALMOLOGY = 'OPHTHALMOLOGY',
  OTORHINOLARYNGOLOGY = 'OTORHINOLARYNGOLOGY',
  PULMONOLOGY = 'PULMONOLOGY',
  NEPHROLOGY = 'NEPHROLOGY',
  HEMATOLOGY = 'HEMATOLOGY',
  ONCOLOGY = 'ONCOLOGY',
  PEDIATRICS = 'PEDIATRICS',
  PSYCHIATRY_PSYCHOLOGY = 'PSYCHIATRY_PSYCHOLOGY',
  GENERAL_CLINIC = 'GENERAL_CLINIC',
  OTHER = 'OTHER',
}


export const examNewFormSchema = z.object({
	name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres").max(100),
	date: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: "Data inválida",
	}),
	type: z.enum(ExamType),
	specialty: z.enum(Specialty).optional(),
	files: z.array(z.file()),
	observations: z.string().min(0).max(500).optional().or(z.literal("")),
});

export type UserLoginData = z.infer<typeof examNewFormSchema>;

