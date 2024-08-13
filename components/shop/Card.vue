<template>
  <v-card
    class="tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-1  tw-gap-5 tw-items-center tw-w-8/12 tw-p-3 tw-my-5"
    v-for="(data, index) in shopList"
    :key="index"
  >
    <div
      @click="$router.push(`/shop/${data.shopId}`)"
      class="tw-flex tw-justify-center tw-items-center"
    >
      <v-img
        width="150"
        height="120"
        :src="`data:image/jpeg;base64,${data.image}`"
      ></v-img>
    </div>

    <div
      :class="['tw-grid tw-grid-cols-2 tw-space-x-5 tw-min-w-1/2 tw-max-w-1/2 tw-items-center tw-mx-5', disableAdd ? 'tw-col-span-2' : '']"
      @click="$router.push(`/shop/${data.shopId}`)"
    >
      <div>
        <span class="tw-font-bold"> Name: </span>
        <div>
          {{ data.name }}
        </div>
      </div>

      <div>
        <span class="tw-font-bold"> Description: </span>
        <div>
          {{ data.description }}
        </div>
      </div>
    </div>

    <v-card class="tw-gap-x-5 tw-grid tw-grid-cols-2" variant="text"  v-if="!disableAdd">
      <NuxtLink :to="`/shop/update_${data.shopId}`" no-rel>
        <v-btn type="submit" variant="outlined" class="tw-w-full"> Edit </v-btn>
      </NuxtLink>
      <v-btn
        type="submit"
        variant="outlined"
        @click.stop="deleteShop(Number(data.shopId))"
      >
        delete
      </v-btn>
    </v-card>
  </v-card>
</template>

<script setup lang="ts">
interface shop {
  shopId: number;
  name: string;
  description: string;
  image: string;
}

defineProps({
  shopList: {
    type: Array<any>,
    require: true,
  },
});

import { useShops } from "~/stores/shop";

const router = useRouter();
const shop = useShops();
const route = useRoute();

const token = ref();

const disableAdd = ref(true);

async function deleteShop(id: number) {
  await shop.deleteShop(id);
  await shop.getShop();
}

onBeforeMount(async () => {
 
 token.value = localStorage.getItem("access_token");
 console.log(token.value);
 
 if(token.value != null){
   disableAdd.value = false;
 }
});
</script>
