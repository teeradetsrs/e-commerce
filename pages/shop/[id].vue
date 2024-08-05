<template>
     <button
    class="tw-absolute tw-text-white tw-m-5 tw-font-bold"
    @click="$router.back()"
  >
    Back
  </button>
  <h1 class="tw-text-3xl tw-font-bold tw-text-white tw-text-center tw-my-5">
    {{ shop.shop.name }} Shop
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
      <ProductCard :shop-list="shop.shopData.data.content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShops } from "~/stores/shop"
import { onBeforeMount } from 'vue';

const loading = ref(false);
const shop = useShops();
const dataShop:any = ref({})

// const router = useRouter();
const route = useRoute()

onBeforeMount( async () => {
  console.log("route.meta.id", route.params.id);
  
  await shop.getShopById(Number(route.params.id))
  
})
</script>
