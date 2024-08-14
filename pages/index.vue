<template>
  <h1 class="tw-text-3xl tw-font-bold tw-text-white tw-text-center tw-my-5">
    All Product
  </h1>
  <div class="tw-justify-items-center tw-grid">
    <ProductCard :product-list="product.allProductData.data.content" />
  </div>

  <v-pagination
    @update:model-value="changePage"
    v-model="pageNumber"
    :length="product.allProductData.data.pageable.totalPages"
    :total-visible="7"
    circle
  ></v-pagination>
</template>

<script setup lang="ts">
import { useProducts } from "~/stores/product";
const loading = ref(false);

const product = useProducts();
const signalr = useSignalr();

const ruleUsername = ref([
  (v: string) => !!v || "Username is required",
  (v: string) =>
    (v && v.length >= 8) || "Username must be more than 8 characters",
]);

const pageNumber = ref(0);

onBeforeMount(async () => {
  await product.getProduct(
    product.productData.data.pageable.currentPage,
    product.productData.data.pageable.sizePages
  );

  pageNumber.value = product.productData.data.pageable.currentPage;
});

function submit(username: string, password: string) {
  loading.value = true;

  const results = {
    username,
    password,
  };

  loading.value = false;

  // alert(JSON.stringify(results, null, 2));

  navigateTo("/login");
}

async function changePage(pageNumber: number) {
  await product.getProduct(
    pageNumber,
    product.productData.data.pageable.sizePages
  );
}

// function checkApi(userName: string) {
//   return new Promise((resolve) => {
//     clearTimeout(timeout);

//     timeout = setTimeout(() => {
//       if (!userName) return resolve("Please enter a user name.");
//       if (userName === "johnleider")
//         return resolve("User name already taken. Please try another one.");

//       return resolve(true);
//     }, 1000);
//   });
// }
</script>
