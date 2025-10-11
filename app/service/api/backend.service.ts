export class BackendService {
  private endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async checkHealth() {
    const response = await fetch(`${this.endpoint}/health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  async register(email: string, password: string, name: string) {
    const response = await fetch(`${this.endpoint}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });
    return response.json();
  }

  async login(email: string, password: string) {
    const response = await fetch(`${this.endpoint}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  }
}
