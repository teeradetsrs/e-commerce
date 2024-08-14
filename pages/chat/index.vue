<template>
  <h1 class="tw-text-3xl tw-font-bold tw-text-white tw-text-center tw-my-5">
    Chat
  </h1>

  <div
    class="tw-grid tw-grid-cols-2 tw-gap-5"
    v-for="(data, index) in messages"
    v-if="signalr.messages.length > 0"
  >
    <div class="tw-w-fit tw-mx-5 tw-col-span-2">
      <div class="tw-text-xs" v-if="data.author == author">
        {{ data.author }}
      </div>
      <v-chip
        class="tw-grid tw-justify-start tw-my-2 tw-text-white"
        v-if="data.author == author"
      >
        {{ data.message }}
      </v-chip>
    </div>

    <div class="tw-w-fit tw-mx-5 tw-col-span-2 tw-grid tw-justify-self-end">
      <div class="tw-text-xs" v-if="data.author != author">
        {{ data.author }}
      </div>
      <v-chip class="tw-my-2 tw-text-white" v-if="data.author != author">
        {{ data.message }}
      </v-chip>
    </div>
  </div>

  <div class="tw-flex tw-justify-center tw-w-full tw-mt-5">
    <v-form @submit.prevent="click()" class="tw-w-7/12 tw-space-y-5">
      <v-text-field
        v-model="chat"
        label="Message"
        variant="solo"
        rounded
      ></v-text-field>

      <div class="tw-grid tw-place-content-center">
        <v-btn
          class="tw-bg-white tw-text-black tw-px-10 tw-mb-5"
          color="surface-variant"
          text="Send"
          variant="flat"
          block
          rounded="xl"
          type="submit"
        ></v-btn>
      </div>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { useSignalr } from "~/stores/signalr";

interface Message {
  message: string;
  author: string;
}
const chat = ref("");
const author = ref();

const loading = ref(false);

const signalr = useSignalr();

const messages = ref<Array<Message>>([]);

onBeforeMount(async () => {
  await signalr.startConnection();
  await signalr.getChat();

  author.value = localStorage.getItem("username");

  messages.value = signalr.messages;
});

async function click() {
  await signalr.sendMessage(chat.value, author.value);
  chat.value = "";
}
</script>
