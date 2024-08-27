import { defineStore } from "pinia";

export const useAuthentication = defineStore("Users", () => {
  const config = useRuntimeConfig();

  const registerBody = ref({
    Username: "",
    Password: "",
    ChatId: "",
    Roles: [],
  });

  const access_token = useCookie("access_token", {
    httpOnly: true,
    secure: true,
  });

  const refresh_token = useCookie("refresh_token", {
    httpOnly: true,
    secure: true,
  });

  const loginBody = ref({
    username: "",
    password: "",
  });

  const generateTokenBody = ref({
    username: "",
    otp: "",
  });

  const statusLogin = ref(false);

  const token = ref({
    access_token: localStorage.getItem("access_token"),
    refresh_token: localStorage.getItem("refresh_token"),
  });

  async function register() {
    const { data } = await $fetch(`${config.public.apiBase}/User`, {
      method: "POST",
      body: registerBody.value,
      onResponse({ request, response, options }) {
        console.log("Register", response);
        if(response.status === 400){
          console.log("🚀 ~ onResponse ~ response.:", response)
          alert(response._data.errorMessage)
          statusLogin.value = false
        }
      },
    });
  }

  async function generateOTP() {
    try{
      const { data } = await useFetch(`${config.public.apiBaseAUTH}/GenerateOtp`, {
        method: "POST",
        params: {
          username: loginBody.value.username,
          password: loginBody.value.password,
        },
        onResponse({ request, response, options }) {
          console.log("Login", response.status);
          if(response.status === 400){
            alert("Username or passsword is invalid")
            statusLogin.value = false
          }else if (response.status === 500){
            alert("Login fail");
            statusLogin.value = false
          }else{
            statusLogin.value = true
          }
        },
      });
    }catch (error) {
      console.error("Error generating token:", error);
    }
    
  }

  async function generateToken() {
    const { data } =  useFetch(`${config.public.apiBaseAUTH}/GenerateToken`, {
      method: "POST",
      body: generateTokenBody.value,
      onResponse({ request, response, options }) {
        console.log("Generate Token", response);

        localStorage.setItem("access_token", response._data.jwtToken);
        localStorage.setItem("refresh_token", response._data.refreshToken);

        access_token.value = response._data.jwtToken;
        refresh_token.value = response._data.refreshToken;

        statusLogin.value = true;
      },
    });
  }

//   async function generateToken() {
//     try {
//         const { data } = await useFetch(`${config.public.apiBaseAUTH}/GenerateToken`, {
//             method: "POST",
//             body: generateTokenBody.value,
//             onResponse({ request, response, options }) {
//               console.log("Generate Token", response);
     
//                 // Save tokens in local storage
//                 localStorage.setItem("access_token", data._data.jwtToken);
//                 localStorage.setItem("refresh_token", data._data.refreshToken);
     
//                 // Set token values
//                 access_token.value = data._data.jwtToken;
//                 refresh_token.value = data._data.refreshToken;
     
//                 // Update login status
//                 statusLogin.value = true;
     
//                 // Proceed with redirect or any other actions after tokens are set
//                 // handleRedirect();
//             } 
//         });
//     } catch (error) {
//         console.error("Error generating token:", error);
//     }
// }
 
// function handleRedirect() {
//     // Redirect or any other action that depends on the token
//     window.location.href = "/some-path";
// }

  async function logout() {
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
    token,
    statusLogin
  };
});
