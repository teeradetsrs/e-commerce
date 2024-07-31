<template>
  <button
    class="tw-absolute tw-text-white tw-m-5 tw-font-bold"
    @click="$router.back()"
  >
    Back
  </button>
  <div class="tw-h-screen tw-bg-indigo-400 tw-grid tw-items-center">
    <div class="tw-flex tw-flex-col tw-items-center tw-space-y-5">
      <h1 class="tw-text-3xl tw-font-bold tw-text-white">Create Product</h1>
      <v-form
        validate-on="submit lazy"
        @submit.prevent="submit(userName, password)"
        class="tw-w-4/12 tw-space-y-5"
      >
        <v-text-field
          v-model="userName"
          :rules="ruleUsername"
          label="Name"
          variant="solo"
          hide-details
          rounded
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="ruleUsername"
          label="Description"
          variant="solo"
          hide-details
          rounded
        ></v-text-field>

        <v-file-input
          prepend-icon=""
          accept="image/*"
          label="Product Image"
          variant="solo"
          hide-details
          rounded
        ></v-file-input>

        <v-text-field
          v-model="password"
          :rules="ruleUsername"
          label="Price"
          variant="solo"
          hide-details
          rounded
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="ruleUsername"
          label="Stock"
          variant="solo"
          hide-details
          rounded
        ></v-text-field>

        <div class="tw-grid tw-grid-cols-3">
          <v-btn
            class="tw-col-start-2"
            :loading="loading"
            text="Create Product"
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
definePageMeta({
  layout: false,
});

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
