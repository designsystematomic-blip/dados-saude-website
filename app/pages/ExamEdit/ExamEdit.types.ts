export interface ExamEditProps {
    props?: any;
}

export interface ExamFile {
    id: string;
    filename: string;
    mimeType: string;
    size: number;
    path: string;
    url: string;
    uploadedAt: string;
    examId: string;
}

export interface ExamData {
    id: string;
    name: string;
    date: string;
    type: string;
    specialty?: string;
    observations?: string;
    file: ExamFile[];
    userId: string;
    user?: {
        id: string;
        name: string;
        email: string;
    };
}