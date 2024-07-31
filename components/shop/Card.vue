<template>
  <v-card
    class="tw-flex tw-flex-row tw-space-x-5 tw-items-center tw-w-8/12 tw-p-2 tw-justify-between"
  >
    <div>
      <v-img
        width="200"
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
      ></v-img>
    </div>

    <div class="tw-grid tw-grid-cols-3 tw-space-x-5">
      <div>name</div>

      <div>price</div>

      <div>stock</div>
    </div>

    <v-card class="tw-space-x-5" variant="text">
      <v-btn type="submit" variant="outlined"> Edit </v-btn>
      <v-btn type="submit" variant="outlined"> delete </v-btn>
    </v-card>
  </v-card>
</template>

<script setup lang="ts">
const prop = defineProps<{
  img: string;
  name: string;
  price: number;
  stock: number;
}>();
</script>
