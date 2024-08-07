<template>
  <v-card
    class="tw-grid tw-grid-cols-3 tw-space-x-5 tw-items-center tw-w-8/12 tw-p-2 tw-my-5"
     v-for="(data, index) in productList"
  >
    <div>
      <v-img
        width="200"
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
      ></v-img>
    </div>

    <div class="tw-grid tw-grid-cols-2">
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

      <div class="tw-mt-5">
        <span class="tw-font-bold">
          Price:
        </span>
        <div>
          {{ data.price }}
        </div>
      </div>

      <div class="tw-mt-5">
        <span class="tw-font-bold">
          Stock:
        </span>
        <div>
          {{ data.stock }}
        </div>
      </div>
    </div>

    <!-- <v-card class="tw-space-x-5" variant="text">
      <v-btn type="submit" variant="outlined">       <NuxtLink :to="`/shop/update/`" no-rel> Edit </NuxtLink> </v-btn>
      <v-btn type="submit" variant="outlined"> delete </v-btn>
    </v-card> -->

    <v-card
      class="tw-space-x-5 tw-grid tw-grid-cols-2 tw-min-w-1/2 tw-max-w-1/2"
      variant="text"
    >
      <v-btn type="submit" variant="outlined">
        <NuxtLink :to="`/product/update_${data.productId}`" no-rel> Edits </NuxtLink>
      </v-btn>
      <v-btn type="submit" variant="outlined"> delete </v-btn>
    </v-card>
  </v-card>
</template>

<script setup lang="ts">
// const prop = defineProps<{
//   id: number,
//   img: string;
//   name: string;
//   price: number;
//   stock: number;
// }>();

defineProps({
    productList: {
        type: Array<any>,
        require: true,
    }
})
</script>
