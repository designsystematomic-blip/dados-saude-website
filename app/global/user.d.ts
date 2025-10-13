// ----------------------------------------------------
// ENUMS (Nomes e Valores em Inglês)
// ----------------------------------------------------

/**
 * Tipos sanguíneos com fator Rh.
 */
export enum BloodType {
  A_POS = 'A_POS',
  A_NEG = 'A_NEG',
  B_POS = 'B_POS',
  B_NEG = 'B_NE',
  AB_POS = 'AB_POS',
  AB_NEG = 'AB_NEG',
  O_POS = 'O_POS',
  O_NEG = 'O_NEG',
}

/**
 * Especialidades médicas para exames ou consultas.
 */
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

/**
 * Tipos comuns de exames.
 */
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

// ----------------------------------------------------
// DETALHES DAS RELAÇÕES (ARRAYS)
// ----------------------------------------------------

export interface Alergy {
  id: string;
  name: string;
}

export interface ChronicDisease {
  id: string;
  name: string;
}

export interface Medication {
  id: string;
  name: string;
  continuousUse?: boolean;
}

export interface HealthPlan {
  id: string;
  name: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone?: string;
  degreeOfKinship?: string;
}

/**
 * Representa um arquivo anexado.
 */
export interface File {
  id: string;
  filename: string;
  mimeType: string; // Ex: "image/png", "application/pdf"
  size: number;
  path?: string; // Caminho no servidor local
  url?: string; // URL pública
  uploadedAt: Date | string;
}

/**
 * Representa um exame médico realizado.
 */
export interface Exam {
  id: string;
  name: string;
  type?: ExamType;
  specialty?: Specialty;
  file: File;
  observations?: string;
}

// ----------------------------------------------------
// INTERFACES PRINCIPAIS DO USUÁRIO
// ----------------------------------------------------

/**
 * Informações básicas e obrigatórias do usuário.
 */
export interface UserBasic {
  id: string;
	image?: string | null;
  name: string;
  socialName?: string;
  phone: string;
  cpf: string;
  sex: string;
  birthDate: string;
  bloodType: BloodType | null; // Usando o enum BloodType
}

/**
 * Informações de saúde complementares do usuário (histórico médico).
 * Tipagem aprimorada para usar as interfaces definidas.
 */
export interface UserExtra {
  alergies: Alergy[];
  chronicDiseases: ChronicDisease[];
  medication: Medication[];
  healthPlan: HealthPlan[];
  emergencyContacts: EmergencyContact[];
  exams: Exam[]; // Nome da propriedade alterado de 'Exam' para 'exams' (plural)
}