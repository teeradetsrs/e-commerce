<template>
  <button
    class="tw-absolute tw-text-white tw-m-5 tw-font-bold"
    @click="$router.back()"
  >
    Back
  </button>
  <div class="tw-h-screen tw-bg-indigo-400 tw-grid tw-items-center">
    <div class="tw-flex tw-flex-col tw-items-center tw-space-y-2">
      <h1 class="tw-text-3xl tw-font-bold tw-text-white">Create Shop</h1>
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
          :rules="ruleDesc"
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

        <div class="tw-flex tw-justify-center" v-if="imagesBase64 != ''">
          <v-img
            width="150"
            height="120"
            :src="`data:image/jpeg;base64,${imagesBase64}`"
          ></v-img>
        </div>

        <div class="tw-grid tw-place-content-center">
          <v-btn
            :loading="loading"
            text="Create Shop"
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

const loading = ref(false);

const shop = useShops();

const name = ref("");
const desc = ref("");
const image = ref();
const imagesBase64 = ref('');
const username = localStorage.getItem("username");

const ruleName = ref([
  (v: string) => !!v || "Name is required",
  // (v: string) =>
  //   (v && v.length >= 8) || "Name must be more than 8 characters",
]);

const ruleDesc = ref([
  (v: string) => !!v || "Description is required",
]);

const isSubmitDisabled = computed(() => {
  const nameValid = ruleName.value.every(rule => rule(name.value) === true);
  const descValid = ruleDesc.value.every(rule => rule(desc.value) === true);
  return !nameValid || !descValid;
});

async function submit() {
  loading.value = true;

  if (!image.value) {
    alert("Please select an image");
    loading.value = false;
    return;
  } else {
    try {

      const shopBody = ref({
        Name: name.value,
        Description: desc.value,
        Image: imagesBase64,
        Username: username,
        ImageName: image.value.name
      });

      console.log("Shop created successfully:");

      console.log("Shop Body", shopBody.value);

      await shop.createShop(shopBody.value);
    } catch (error) {
      console.error("Error creating shop:", error);
    } finally {
      loading.value = false;
    }
  }
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
