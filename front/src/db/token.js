const TOKEN = 'token';

export default class TokenStorage {
  save(token) {
    localStorage.setItem(TOKEN, 'Bearer ' + token);
  }

  get() {
    return localStorage.getItem(TOKEN);
  }

  clear() {
    localStorage.clear(TOKEN)
  }
}