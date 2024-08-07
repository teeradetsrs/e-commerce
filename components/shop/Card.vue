<template>
  <v-card
    class="tw-grid tw-grid-cols-3 tw-space-x-5 tw-items-center tw-w-8/12 tw-p-2 tw-my-5"
    v-for="(data, index) in shopList"
    :key="index"
  >
    <div @click="$router.push(`/shop/${data.shopId}`)">
      <v-img
        width="200"
        src="https://www.indiafilings.com/learn/wp-content/uploads/2023/03/How-can-I-register-my-shop-and-establishment-online.jpg"
      ></v-img>
    </div>

    <div
      class="tw-grid tw-grid-cols-2 tw-space-x-5 tw-min-w-1/2 tw-max-w-1/2"
      @click="$router.push(`/shop/${data.shopId}`)"
    >
      <div>
        <span class="tw-font-bold">
          Name:
        </span>
        <div>
          {{ data.name }}
        </div>
      </div>

      <div>
        <span class="tw-font-bold">
          Description:
        </span>
        <div>
          {{ data.description }}
        </div>
      </div>
    </div>

    <v-card
      class="tw-space-x-5 tw-grid tw-grid-cols-2 tw-min-w-1/2 tw-max-w-1/2"
      variant="text"
    >
      <v-btn type="submit" variant="outlined">
        <NuxtLink :to="`/shop/update_${data.shopId}`" no-rel> Edit </NuxtLink>
      </v-btn>
      <v-btn type="submit" variant="outlined" @click.stop="deleteShop(Number(data.shopId))"> delete </v-btn>
    </v-card>
  </v-card>
</template>

<script setup lang="ts">
defineProps({
  shopList: {
    type: Array<any>,
    require: true,
  },
});

import { useShops } from "~/stores/shop"

const router = useRouter();
const shop = useShops();
const route = useRoute()

async function  deleteShop(id:number) {
  await shop.deleteShop(id)
  await shop.getShop()
}
</script>
