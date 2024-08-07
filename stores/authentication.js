import { defineStore } from "pinia";

export const useAuthentication = defineStore("Users", () => {
  const config = useRuntimeConfig();

  const shopBody = ref({
    Username: "",
    Password: "",
    ChatId: "",
  });

  const loginBody = ref({
    username: "",
    password: "",
  });

  const generateTokenBody = ref({
    username: "",
    otp: "",
  });

  async function register() {
    const { data } = await useFetch(`${config.public.apiBase}/User`, {
      method: "POST",
      body: shopBody.value,
      onResponse({ request, response, options }) {
        console.log("Register", response);
      },
    });
  }

  async function generateOTP() {
    const { data } = await useFetch(`http://localhost:5041/GenerateOtp`, {
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
    const { data } = await useFetch(`http://localhost:5041/GenerateToken`, {
      method: "POST",
      body: generateTokenBody.value,
      onResponse({ request, response, options }) {
        console.log("Generate Token", response);
        localStorage.setItem("access_token", response._data.jwtToken)
        localStorage.setItem("refresh_token", response._data.refreshToken)
      },
    });
  }

  return {
    register,
    shopBody,
    generateOTP,
    loginBody,
    generateToken,
    generateTokenBody
  };
});
