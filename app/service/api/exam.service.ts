interface Exam {
	name: string;
	date: string;
	type?: string;
	specialty?: string;
	files: File[];
	observations?: string;
}

export class ExamService {
  private endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

	async createExam({ data, token }: { data: FormData; token: string; }): Promise<Response> {

		const response = await fetch(`${this.endpoint}/exams/create`, {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${token}`
			},
			body: data
    });
    
		return response;
	}

	async getExams({ token, userId, filter }: { token: string; userId: string; filter: { name?: string } }): Promise<Response> {

		const queryString = new URLSearchParams(
			filter.name ? { name: filter.name } : {}
		).toString();

		const url = queryString ? `${this.endpoint}/exams/user/${userId}?${queryString}` : `${this.endpoint}/exams/user/${userId}`;
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		});

		return response;
	}

	async getExamById({ token, userId, examId }: { token: string; userId: string; examId: string; }): Promise<Response> {

		const response = await fetch(`${this.endpoint}/exams/${examId}`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`,
				"x-user-id": userId
			}
		});

		return response;
	}

	async getFileDownloadUrl({ token, fileId }: { token: string; fileId: string; }): Promise<Response> {

		const response = await fetch(`${this.endpoint}/exams/file/${fileId}/download`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		});

		return response;
	}

	getFileStreamUrl({ fileId, token }: { fileId: string; token: string; }): string {
		return `${this.endpoint}/exams/file/${fileId}/stream?token=${encodeURIComponent(token)}`;
	}
}