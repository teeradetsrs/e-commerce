<template>
  <h1 class="tw-text-3xl tw-font-bold tw-text-white tw-text-center tw-my-5">
    My Shop
  </h1>
  <div>
    <v-btn
      prepend-icon="mdi-plus-thick"
      class="tw-w-1/12 tw-mx-5"
      :loading="loading"
      type="submit"
    >
      <template v-slot:prepend>
        <v-icon color="success"></v-icon>
      </template>

      <NuxtLink to="/product/create" no-rel> Add </NuxtLink>
    </v-btn>
    <div class="tw-justify-items-center tw-grid">
      <ShopCard :id="1" :img="'ff'" :name="'test'" :price="30" :stock="30" />
    </div>
  </div>
</template>

<script setup lang="ts">

const userName = ref("");
const password = ref("");
const loading = ref(false);

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

  navigateTo("/");
}
</script>
