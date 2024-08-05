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
      <ShopCard :shop-list="shop.shopData.data.content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShops } from "~/stores/shop"
import { onBeforeMount } from 'vue';
const userName = ref("");
const password = ref("");
const loading = ref(false);
const config = useRuntimeConfig()
const shop = useShops();
const dataShop:any = ref({})

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


onBeforeMount( async () => {
  await shop.getShop()
  // dataShop.value = await shop.shopData
})
</script>
