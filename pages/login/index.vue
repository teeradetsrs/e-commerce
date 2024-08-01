<template>
  <div
    class="tw-grid tw-grid-cols-2 tw-items-center tw-content-center tw-h-screen tw-bg-indigo-400"
  >
    <div class="tw-flex tw-flex-col tw-items-center tw-space-y-5">
      <h1 class="tw-text-3xl tw-font-bold tw-text-white">Login</h1>
      <v-form
        validate-on="submit lazy"
        @submit.prevent="submit(userName, password)"
        class="tw-w-7/12 tw-space-y-5"
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
        ></v-text-field>

        <NuxtLink
          to="/register"
          no-rel
          class="tw-text-white tw-underline tw-flex tw-justify-end"
        >
          Register
        </NuxtLink>

        <div class="tw-grid tw-place-content-center">
           <v-btn
             :loading="loading"
             text="Login"
             type="submit"
             block
             rounded="xl"
           ></v-btn>
         </div>
      </v-form>
    </div>
    <div class="tw-flex tw-justify-center tw-items-center">
      <img src="/images/common/login_page.png" alt="" class="tw-w-5/6" />
    </div>
  </div>
</template>

<script setup lang="ts">
// definePageMeta({
//   layout: false,
// });

const userName = ref("");
const password = ref("");
const loading = ref(false);
// const timeout: null;
const ruleUsername = ref([
  (v: string) => !!v || "Username is required",
  (v: string) =>
    (v && v.length >= 8) || "Username must be more than 8 characters",
]);

function submit(username: string, password: string) {
  loading.value = true;

  const results = {
    username,
    password,
  };

  loading.value = false;

  alert(JSON.stringify(results, null, 2));

  navigateTo("/");
}
</script>
