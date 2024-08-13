<template>
  <button
    class="tw-absolute tw-text-white tw-m-5 tw-font-bold"
    @click="$router.back()"
  >
    Back
  </button>
  <h1 class="tw-text-3xl tw-font-bold tw-text-white tw-text-center tw-my-5">
    {{ shop.shop.name }} Shop
  </h1>
  <div>
    <!-- <v-btn
      prepend-icon="mdi-plus-thick"
      class="tw-w-1/12 tw-mx-5"
      :loading="loading"
      type="submit"
    >
      <template v-slot:prepend>
        <v-icon color="success"></v-icon>
      </template>

      <NuxtLink to="/product/create" no-rel> Add </NuxtLink>
    </v-btn> -->

    <NuxtLink to="/product/create" no-rel>
      <v-btn
        prepend-icon="mdi-plus-thick"
        class="tw-w-1/12 tw-mx-5"
        :loading="loading"
        type="submit"
      >
        <template v-slot:prepend>
          <v-icon color="success"></v-icon>
        </template>
        Add
      </v-btn>
    </NuxtLink>
    <div class="tw-justify-items-center tw-grid">
      <ProductCard :product-list="product.productData.data.content" />
    </div>
    <v-pagination
      @update:model-value="changePage"
      v-model="pageNumber"
      :length="product.productData.data.pageable.totalPages"
      :total-visible="7"
      circle
    ></v-pagination>
  </div>
</template>

<script setup lang="ts">
import { useShops } from "~/stores/shop";
import { useProducts } from "~/stores/product";
import { onBeforeMount } from "vue";

const loading = ref(false);

const shop = useShops();
const product = useProducts();

const pageNumber = ref(0);

// const router = useRouter();
const route = useRoute();

onBeforeMount(async () => {
  console.log("route.meta.id", route.params.id);

  const getShop = shop.getShopById(Number(route.params.id));

  const getProduct = product.getProductsByShopId(Number(route.params.id));

  await getShop;
  
  await getProduct;

  localStorage.setItem("shopId", String(route.params.id));
});

async function changePage(pageNumber: number) {
  await product.getProductsByShopId(
    Number(route.params.id),
    pageNumber,
    product.productData.data.pageable.sizePages
  );
}
</script>
