import { defineStore } from "pinia";

export const useAuthentication = defineStore("Users", () => {
  const config = useRuntimeConfig();

  const registerBody = ref({
    Username: "",
    Password: "",
    ChatId: "",
    Roles:[]
  });

  const loginBody = ref({
    username: "",
    password: "",
  });

  const generateTokenBody = ref({
    username: "",
    otp: "",
  });

  const statusLogin = ref(false)

  const token = ref({
    access_token: localStorage.getItem("access_token"),
    refresh_token: localStorage.getItem("refresh_token")
  })

  async function register() {
    const { data } = await $fetch(`${config.public.apiBase}/User`, {
      method: "POST",
      body: registerBody.value,
      onResponse({ request, response, options }) {
        console.log("Register", response);
        return
      },
    });
  }

  async function generateOTP() {
    const { data } = await useFetch(`http://192.168.0.80:7098/GenerateOtp`, {
      method: "POST",
      params: {
        username: loginBody.value.username,
        password: loginBody.value.password,
      },
      onResponse({ request, response, options }) {
        console.log("Login", response);
      },
    });
  }

  async function generateToken() {
    const { data } = await useFetch(`http://192.168.0.80:7098/GenerateToken`, {
      method: "POST",
      body: generateTokenBody.value,
      onResponse({ request, response, options }) {
        console.log("Generate Token", response);
        localStorage.setItem("access_token", response._data.jwtToken)
        localStorage.setItem("refresh_token", response._data.refreshToken)
        statusLogin.value = true
        console.log("status login", statusLogin.value);
      },
    });
  }

  async function logout(){
    localStorage.clear();
    console.log("Logout");
  }

  return {
    register,
    registerBody,
    generateOTP,
    loginBody,
    generateToken,
    generateTokenBody,
    statusLogin,
    logout,
    token
  };
});
