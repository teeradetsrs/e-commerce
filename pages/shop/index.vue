<template>
  <h1 class="tw-text-3xl tw-font-bold tw-text-white tw-text-center tw-my-5">
    My Shop
  </h1>
  <div>
    <div class="tw-grid tw-grid-cols-6">
      <div class="tw-col-start-5  tw-justify-self-end ">
        <NuxtLink to="/shop/create" no-rel>
          <v-btn
            prepend-icon="mdi-plus-thick"
            class="tw-w-full"
            :loading="loading"
            type="submit"
          >
            <template v-slot:prepend>
              <v-icon color="success"></v-icon>
            </template>
            Add
          </v-btn>
        </NuxtLink>
      </div>
    </div>

    <div class="tw-justify-items-center tw-grid">
      <ShopCard :shop-list="shop.shopData.data.content" />
      <v-pagination
        @update:model-value="changePage"
        v-model="pageNumber"
        :length="shop.shopData.data.pageable.totalPages"
        :total-visible="7"
        circle
      ></v-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShops } from "~/stores/shop";
import { useAuthentication } from "~/stores/authentication";
import { onBeforeMount } from "vue";

interface page {
  currentPage: number;
  sizePages: number;
  totalPages: number;
}

const shop = useShops();
const auth = useAuthentication();

const userName = ref("");
const password = ref("");
const loading = ref(false);

// const pageable = ref<page>({
//   currentPage: 0,
//   sizePages: 10,
//   totalPages: 0
// });

const token = auth.token

const pageNumber = ref(0);

const ruleUsername = ref([
  (v: string) => !!v || "Username is required",
  (v: string) =>
    (v && v.length >= 8) || "Username must be more than 8 characters",
]);

function submit(username: string, password: string) {
  loading.value = true;

  const results = {
    username,
    password,
  };

  loading.value = false;

  navigateTo("/");
}

onBeforeMount(async () => {
  await shop.getShop(1, 10);
  pageNumber.value = shop.shopData.data.pageable.currentPage;
});

async function changePage(pageNumber: number) {
  await shop.getShop(pageNumber, shop.shopData.data.pageable.sizePages);
}
</script>
