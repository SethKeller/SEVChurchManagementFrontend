import axios from "axios";

var API_URL = "";
if (process.env.NODE_ENV === "development") {
  API_URL = "http://localhost:8080/api/auth/";
} else {
  API_URL = "/api/auth/";
}

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "signin", {
        Email: user.email,
        Password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "signup", {
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
