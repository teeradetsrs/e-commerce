<template>
  <button class="tw-absolute tw-text-white tw-m-5 tw-font-bold" @click="$router.back()">
    Back
  </button>
  <div class="tw-h-screen tw-bg-indigo-400 tw-grid tw-items-center">
    <div class="tw-flex tw-flex-col tw-items-center tw-space-y-5">
      <h1 class="tw-text-3xl tw-font-bold tw-text-white">Register</h1>
      <v-form @submit.prevent="submit()" class="tw-w-4/12 tw-space-y-2">
        <v-text-field v-model="userName" :rules="ruleUsername" label="Username" variant="solo" 
          rounded></v-text-field>

        <v-text-field v-model="password" :rules="rulePassword" label="Password" variant="solo" rounded
          type="password"></v-text-field>

        <v-text-field v-model="chatId" :rules="ruleChatId" label="ChatID" variant="solo" 
          rounded></v-text-field>

        <div class="tw-flex tw-flex-row tw-justify-center tw-space-x-5 tw-text-white">
          <v-checkbox v-model="roles" label="User" value="User" hide-details></v-checkbox>
          <v-checkbox v-model="roles" label="Admin" value="Admin" hide-details></v-checkbox>
        </div>

        <div class="tw-grid tw-place-content-center">
          <v-btn :loading="loading" text="Register" type="submit" block rounded="xl"
            :disabled="isSubmitDisabled"></v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthentication } from "~/stores/authentication";

definePageMeta({
  layout: false,
});

const auth = useAuthentication();

const userName = ref("");
const password = ref("");
const chatId = ref("");
const roles = ref([])

const loading = ref(false);

const router = useRouter();

const ruleUsername = ref([
  (v: string) => !!v || "Username is required",
  (v: string) =>
    (v && v.length >= 8) || "Username must be more than 8 characters",
]);

const rulePassword= ref([
  (v: string) => !!v || "Password is required",
  (v: string) =>
    (v && v.length >= 8) || "Password must be more than 8 characters",
]);

const ruleChatId= ref([
  (v: string) => !!v || "ChatId is required",
  (v: string) =>
    (v && v.length >= 8) || "ChatId must be more than 8 characters",
]);

const isSubmitDisabled = computed(() => {
  const usernameValid = ruleUsername.value.every(rule => rule(userName.value) === true);
  const passwordValid = rulePassword.value.every(rule => rule(password.value) === true);
  const chatIdValid = ruleChatId.value.every(rule => rule(chatId.value) === true);

  return !usernameValid || !passwordValid || !chatIdValid || roles.value.length == 0;
});

async function submit() {
  loading.value = true;

  auth.registerBody.ChatId = chatId.value;
  auth.registerBody.Username = userName.value;
  auth.registerBody.Password = password.value;
  auth.registerBody.Roles = roles.value;

  try{
    await auth.register();
    loading.value = false;
    navigateTo("/login");
  }catch{
    loading.value = false;
    console.log("🚀 ~ submit ~ loading.value :", loading.value )
  }
}
</script>

<style scoped>
.v-btn--disabled {
  background-color: grey !important;
  color: white !important;
  border: 1px solid darkgrey !important;
}
</style>
