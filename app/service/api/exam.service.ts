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

		console.log('queryString', queryString)

		const url = queryString ? `${this.endpoint}/exams/user/${userId}?${queryString}` : `${this.endpoint}/exams/user/${userId}`;

		console.log('url', url)

		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		});

		return response;
	}
}