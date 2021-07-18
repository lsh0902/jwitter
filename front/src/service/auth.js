import axios from "axios";
export default class AuthService {

  constructor(base, storage) {
    this.instance = axios.create({
      baseURL : base,
    })
    this.storage = storage;
  }

  async login(username, password) {
    const result = await this.instance.post(`/auth/login`, { username, password }).then(res => res.data).catch(console.log);
    this.storage.save(result.token);
    return result;
  }

  async me() {
    return await this.instance.get('/auth/me').then(res => res.data);
  }

  async logout() {
    this.storage.clear();
  }

  async signup(username, password, name, email, url) {
    return await this.instance.post('/auth/signup', {
      username,
      password,
      name,
      email,
      url
    }).then(res => res.data);
  }
}
