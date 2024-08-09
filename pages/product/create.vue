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
          v-model="description"
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
          label="Product Image"
          variant="solo"
          hide-details
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
          :rules="ruleUsername"
          label="Price"
          variant="solo"
          hide-details
          rounded
        ></v-text-field>

        <v-text-field
          v-model="stock"
          :rules="ruleUsername"
          label="Stock"
          variant="solo"
          hide-details
          rounded
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

// definePageMeta({
//   layout: false,
// });

const userName = ref("");
const password = ref("");
const loading = ref(false);

const shopId = ref(1);
const name = ref('');
const description = ref('');
const image = ref();
const price = ref(0);
const stock = ref(0);
const imagesBase64 = ref("");

const product = useProducts();

const ruleUsername = ref([
  (v: string) => !!v || "Username is required",
  (v: string) =>
    (v && v.length >= 8) || "Username must be more than 8 characters",
]);

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

  // alert(JSON.stringify(results, null, 2));

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
