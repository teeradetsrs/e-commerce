<template>
  <button
    class="tw-absolute tw-text-white tw-m-5 tw-font-bold"
    @click="$router.back()"
  >
    Back
  </button>
  <div class="tw-h-screen tw-bg-indigo-400 tw-grid tw-items-center">
    <div class="tw-flex tw-flex-col tw-items-center tw-space-y-5">
      <h1 class="tw-text-3xl tw-font-bold tw-text-white">Edit Shop</h1>
      <v-form
        validate-on="submit lazy"
        @submit.prevent="submit()"
        class="tw-w-4/12 tw-space-y-5"
      >
        <v-text-field
          v-model="name"
          :rules="ruleUsername"
          label="Name"
          variant="solo"
          hide-details
          rounded
        ></v-text-field>

        <v-text-field
          v-model="desc"
          :rules="ruleUsername"
          label="Description"
          variant="solo"
          hide-details
          rounded
        ></v-text-field>

        <v-file-input
        v-model="image"
          prepend-icon=""
          accept="image/*"
          label="Shop Image"
          variant="solo"
          hide-details
          rounded
        ></v-file-input>

        <div class="tw-grid tw-place-content-center">
          <v-btn
            :loading="loading"
            text="Edit Shop"
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
import { useShops } from "~/stores/shop"

//    definePageMeta({
//      layout: false,
//    });

const shop = useShops();
const route = useRoute()

const name = ref("");
const desc = ref("");
const image = ref();
const userId = ref(4);

const loading = ref(false);
// const timeout: null;
const ruleUsername = ref([
  (v: string) => !!v || "Username is required",
  (v: string) =>
    (v && v.length >= 8) || "Username must be more than 8 characters",
]);

onBeforeMount( async () => {
  await shop.getShopById(route.params.id)
  name.value = shop.shop.name
  desc.value = shop.shop.description
  image.value = shop.shop.image
})

async function submit() {
  loading.value = true;

  const shopBody = ref({
    Name: name.value,
    Description: desc.value,
    image: image.value,
    UserId: userId.value,
  });

    await shop.editShop(route.params.id, shopBody);
  loading.value = false;

  //  alert(JSON.stringify(results, null, 2));

  //  navigateTo("/");
}
</script>
