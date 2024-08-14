import { defineStore } from "pinia";
import * as signalR from "@microsoft/signalr";
import { ref } from "vue";



export const useSignalr = defineStore("Signalr", () => {
  const config = useRuntimeConfig();

  const connection = ref();
  const messages = ref([]); // Use the Message type here
  const user = ref("");
//   const message = ref("");

  const token = ref({
    access_token: localStorage.getItem("access_token"),
    refresh_token: localStorage.getItem("refresh_token"),
  });

  async function startConnection() {
    try {
      connection.value = new signalR.HubConnectionBuilder()
        .withUrl("http://192.168.0.97:7098/api/chat")
        .configureLogging(signalR.LogLevel.Information)
        .build();

      //   connection.value.on("ReceiveMessage", (user, message) => {
      //     messages.value.push({ user, text: message });
      //   });

      await connection.value
        .start()
        .then(() => console.log("เชื่อมต่อท่อสำเร็จ"))
        .catch((err) => console.log("มีปัญหาในการเชื่อมต่อท่อ: " + err));

        const data = localStorage.getItem("username")
        if(data == null){
            localStorage.setItem("username", "abc");
        }
    } catch (err) {
      console.error("Connection error: " + err);
    }
  }

  async function getChat() {
    try {
      connection.value.on("chartStation1", (result) => {
        console.log("สถานี 1 รับข้อมูลจาก Server:", result);
        messages.value.push(result);
        messages.value.sort((a,b) => a.dateTime - b.dateTime);
      });

      //   connection.value.on("chartStation2", (result) => {
      //     console.log("สถานี 2 รับข้อมูลจาก Server:", result);
      //     message.value.push(result);
      //   });
    } catch (err) {
      console.error("Connection error: " + err);
    }
  }

  async function sendMessage(chat, author) {
    try {
      const { data } = await $fetch(
        `${config.public.apiBase}/Chat/send/graph1`,
        {
          method: "GET",
          params: {
            chat: chat,
            author: author,
          },
          headers: {
            Authorization: `Bearer ${token.value.access_token}`,
          },
          onResponse({ request, response, options }) {
            console.log("GET", response);
          },
        }
      );
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  return {
    startConnection,
    connection,
    getChat,
    sendMessage,
    messages,
  };
});
