import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("token", JSON.stringify(response.data.token));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "register", user);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();