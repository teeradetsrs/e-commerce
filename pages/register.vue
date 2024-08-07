<template>
  <button
    class="tw-absolute tw-text-white tw-m-5 tw-font-bold"
    @click="$router.back()"
  >
    Back
  </button>
  <div class="tw-h-screen tw-bg-indigo-400 tw-grid tw-items-center">
    <div class="tw-flex tw-flex-col tw-items-center tw-space-y-5">
      <h1 class="tw-text-3xl tw-font-bold tw-text-white">Register</h1>
      <v-form
        validate-on="submit lazy"
        @submit.prevent="submit()"
        class="tw-w-4/12 tw-space-y-5"
      >
        <v-text-field
          v-model="userName"
          :rules="ruleUsername"
          label="Username"
          variant="solo"
          hide-details
          rounded
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="ruleUsername"
          label="Password"
          variant="solo"
          hide-details
          rounded
          type="password"
        ></v-text-field>

        <v-text-field
          v-model="chatId"
          :rules="ruleUsername"
          label="ChatID"
          variant="solo"
          hide-details
          rounded
        ></v-text-field>

        <div class="tw-grid tw-place-content-center">
          <v-btn
            :loading="loading"
            text="Register"
            type="submit"
            block
            rounded="xl"
          ></v-btn>
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

const loading = ref(false);

const router = useRouter();

const ruleUsername = ref([
  (v: string) => !!v || "Username is required",
  (v: string) =>
    (v && v.length >= 8) || "Username must be more than 8 characters",
]);

async function submit() {
  loading.value = true;

  auth.shopBody.ChatId = chatId.value;
  auth.shopBody.Username = userName.value;
  auth.shopBody.Password = password.value;

  await auth.register();
  loading.value = false;

  // alert(JSON.stringify(results, null, 2));

  navigateTo("/login");
}
</script>
