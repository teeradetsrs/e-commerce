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
        @submit.prevent="submit()"
        class="tw-w-4/12 tw-space-y-5"
      >
        <v-text-field
          v-model="name"
          :rules="ruleName"
          label="Name"
          variant="solo"
          rounded
        ></v-text-field>

        <v-text-field
          v-model="desc"
          label="Description"
          variant="solo"
          rounded
        ></v-text-field>

        <v-file-input
          v-model="image"
          prepend-icon=""
          accept="image/*"
          label="Shop Image"
          variant="solo"
          rounded
          @update:model-value="updateImage()"
        ></v-file-input>

        <div class="tw-flex tw-justify-center" v-if="imagesBase64 != null">
          <v-img
            width="150"
            height="120"
            :src="`data:image/jpeg;base64,${imagesBase64}`"
          ></v-img>
        </div>

        <div class="tw-grid tw-place-content-center">
          <v-btn
            :loading="loading"
            text="Edit Shop"
            type="submit"
            block
            rounded="xl"
            :disabled="isSubmitDisabled"
          ></v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShops } from "~/stores/shop";

const shop = useShops();
const route = useRoute();

const name = ref("");
const desc = ref("");
const image = ref();
const imagesBase64 = ref();
const username = ref("alice_w");

const loading = ref(false);

const ruleName = ref([
  (v: string) => !!v || "Name is required",
  (v: string) =>
    (v && v.length >= 8) || "Name must be more than 8 characters",
]);

const isSubmitDisabled = computed(() => {
  const nameValid = ruleName.value.every(rule => rule(name.value) === true);
  return !nameValid;
});

onBeforeMount(async () => {
  await shop.getShopById(route.params.id);
  name.value = shop.shop.name;
  desc.value = shop.shop.description;

  if (shop.shop.image != null) {
    imagesBase64.value = shop.shop.image;
    console.log("shop.shop.imageName", shop.shop.imageName);
    
    // image.value = shop.shop
    // image.value = null
    // imageName.value = shop.shop.imageName
    // console.log("Image name", image.value.imageName);
  }
});

async function submit() {
  loading.value = true;

  try {
    const shopBody = ref({
      Name: name.value,
      Description: desc.value,
      Image: imagesBase64.value,
      Username: username.value,
      ShopId: Number(route.params.id),
      ImageName: image.value.name
    });
    console.log("shopBody", shopBody);

    await shop.editShop(route.params.id, shopBody.value);
    loading.value = false;
    navigateTo("/shop");
  } catch (error) {
    console.error("Error creating shop:", error);
  } finally {
    loading.value = false;
  }
}

async function updateImage() {
  console.log("GGGGGG", image.value);
  
  if (image.value != null) {
    const base64Image = await toBase64(image.value);
    imagesBase64.value = base64Image;
    console.log("BASE64", imagesBase64.value);
    
  } else {
    imagesBase64.value = "";
  }
}
function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        resolve(result.split(",")[1]); // Remove the data URL prefix
      } else {
        reject(new Error("FileReader result is not a string"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
}
</script>
