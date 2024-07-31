<template>
 <h1 class="tw-text-3xl tw-font-bold tw-text-white tw-text-center tw-my-5">
    All Product
  </h1>
</template>

<script setup lang="ts">

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

  // alert(JSON.stringify(results, null, 2));

  navigateTo('/login')
}

// function checkApi(userName: string) {
//   return new Promise((resolve) => {
//     clearTimeout(timeout);

//     timeout = setTimeout(() => {
//       if (!userName) return resolve("Please enter a user name.");
//       if (userName === "johnleider")
//         return resolve("User name already taken. Please try another one.");

//       return resolve(true);
//     }, 1000);
//   });
// }
</script>
