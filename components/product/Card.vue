<template> 
  <v-card
    class="tw-grid tw-grid-cols-3 tw-space-x-5 tw-items-center tw-w-8/12 tw-p-2 tw-my-5"
    v-for="(data, index) in productList"
  >
    <div class="tw-flex tw-justify-center tw-items-center">
      <v-img
        width="150"
        height="120"
        :src="`data:image/jpeg;base64,${data.image}`"
      ></v-img>
    </div>

    <div class="tw-grid tw-grid-cols-2">
      <div class="tw-overflow-auto tw-max-h-20 tw-min-h-20">
        <span class="tw-font-bold"> Name: </span>
        <div>
          {{ data.name }}
        </div>
      </div>

      <div class="tw-overflow-auto tw-max-h-20 tw-min-h-20">
        <span class="tw-font-bold"> Description: </span>
        <div>
          {{ data.description }}
        </div>
      </div>

      <div class="tw-mt-5">
        <span class="tw-font-bold"> Price: </span>
        <div>
          {{ data.price }}
        </div>
      </div>

      <div class="tw-mt-5">
        <span class="tw-font-bold"> Stock: </span>
        <div>
          {{ data.stock }}
        </div>
      </div>
    </div>
    
    <v-card
      class="tw-space-x-5 tw-grid tw-grid-cols-2 tw-min-w-1/2 tw-max-w-1/2"
      variant="text"
    >
      <NuxtLink :to="`/product/update_${data.productId}`" no-rel>
        <v-btn type="submit" variant="outlined" class="tw-w-full">
          Edits
        </v-btn>
      </NuxtLink>
      <v-btn type="submit" variant="outlined"> delete </v-btn>
    </v-card>
  </v-card>
</template>

<script setup lang="ts">

interface product {
  productId: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

defineProps({
  productList: {
    type: Array<product>,
    require: true,
  },
});
</script>
