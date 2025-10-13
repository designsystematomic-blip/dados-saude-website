export class UserService {
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

  async getData(token: string | undefined) {
    const response = await fetch(`${this.endpoint}/users/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    return response.json();
  }

  async register({ user }: { user: {
      name: string,
      email: string,
      phone: string,
      cpf: string,
      sex: string,
      birthDate: string,
      password: string,
  }}) {
    const response = await fetch(`${this.endpoint}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
    return response.json();
  }

  async login({ email, password }: { email: string, password: string}) {
    const response = await fetch(`${this.endpoint}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  }
}
