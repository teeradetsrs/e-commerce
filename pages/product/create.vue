<template>
  <button
    class="tw-absolute tw-text-white tw-m-5 tw-font-bold"
    @click="$router.back()"
  >
    Back
  </button>
  <div class="tw-h-screen tw-bg-indigo-400 tw-grid tw-items-center">
    <div class="tw-flex tw-flex-col tw-items-center tw-space-y-5">
      <h1 class="tw-text-3xl tw-font-bold tw-text-white">Create Product</h1>
      <v-form
        @submit.prevent="submit()"
        class="tw-w-4/12 tw-space-y-5"
      >
        <v-text-field
          v-model="name"
          label="Name"
          variant="solo"
          rounded
        ></v-text-field>

        <v-text-field
          v-model="description"
          label="Description"
          variant="solo"
          rounded
        ></v-text-field>

        <v-file-input
          v-model="image"
          prepend-icon=""
          accept="image/*"
          label="Product Image"
          variant="solo"
          rounded
           @update:model-value="updateImage()"
        ></v-file-input>

        <div class="tw-flex tw-justify-center" v-if="imagesBase64 != ''">
          <v-img
            width="150"
            height="120"
            :src="`data:image/jpeg;base64,${imagesBase64}`"
          ></v-img>
        </div>

        <v-text-field
          v-model="price"
          label="Price"
          :rules="rulePrice"
          variant="solo"
          rounded
          type="number"
        ></v-text-field>

        <v-text-field
          v-model="stock"
          label="Stock"
          :rules="ruleStock"
          variant="solo"
          rounded
           type="number"
        ></v-text-field>

        <div class="tw-grid tw-place-content-center">
          <v-btn
            :loading="loading"
            text="Create Product"
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
import { useProducts } from "~/stores/product";

const product = useProducts();

const loading = ref(false);

const shopId = ref(1);
const name = ref('');
const description = ref('');
const image = ref();
const price = ref();
const stock = ref();
const imagesBase64 = ref("");

const ruleUsername = ref([
  (v: string) => !!v || "Username is required",
  (v: string) =>
    (v && v.length >= 8) || "Username must be more than 8 characters",
]);

const rulePrice= ref([
  (v: number) => !!v || "Price is required",
  (v: number) => v != 0 || "Price can not be 0",
]);

const ruleStock= ref([
  (v: number) => !!v || "Stock is required",
]);

onBeforeMount( async () => {
  shopId.value = Number(localStorage.getItem("shopId"));
  console.log(shopId.value);
})

async function submit() {
  loading.value = true;

  product.createProductBody.description = description.value;
  product.createProductBody.name = name.value;
  product.createProductBody.shopId = shopId.value;
  product.createProductBody.price = price.value;
  product.createProductBody.stock = stock.value;
  product.createProductBody.image = imagesBase64.value;

  await product.createProduct();

  loading.value = false;
  
  navigateTo("/");
}

async function updateImage() {
  if (image.value != null) {
    const base64Image = await toBase64(image.value);
    imagesBase64.value = base64Image;
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