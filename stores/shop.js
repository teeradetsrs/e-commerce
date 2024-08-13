import { defineStore } from "pinia";
import { useAuthentication } from "./authentication";

export const useShops = defineStore("Shops", () => {
  const config = useRuntimeConfig();
  const auth = useAuthentication();

  const token = ref({
    access_token: localStorage.getItem("access_token"),
    refresh_token: localStorage.getItem("refresh_token"),
  });

  const shopData = ref({
    data: {
      content: [],
      pageable: {
        currentPage: 1,
        sizePages: 10,
        totalPages: 0,
      },
    },
  });

  const shop = ref({
    name: "",
    description: "",
    image: null,
    shopId: 0,
    imageName: "",
  });

  // const shopBody = ref({
  //   Name: "string",
  //   Description: "string",
  //   image: null,
  //   UserId: 3,
  // });

  async function getShop(pageNumber, pageSize) {
    const { data } = await $fetch(`${config.public.apiBase}/Shop`, {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
      headers: {
        Authorization: `Bearer ${token.value.access_token}`,
      },
      onResponse({ request, response, options }) {
        shopData.value.data.content = response._data.content;
        shopData.value.data.pageable = response._data.pageable;
      },
    });
  }

  async function getShopById(id) {
    const { data } = await $fetch(`${config.public.apiBase}/Shop/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value.access_token}`,
      },
      onResponse({ request, response, options }) {
        shop.value = response._data;
      },
    });
  }

  async function createShop(shopBody) {
    const { data } = await $fetch(`${config.public.apiBase}/Shop`, {
      method: "POST",
      body: shopBody,
      headers: {
        Authorization: `Bearer ${token.value.access_token}`,
      },
      onResponse({ request, response, options }) {
        console.log("Create", response);
        navigateTo("/shop");
      },
    });
  }

  async function deleteShop(id) {
    const { data } = await $fetch(`${config.public.apiBase}/Shop/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value.access_token}`,
      },
      onResponse({ request, response, options }) {
        console.log("Delete", response);
      },
    });
  }

  async function editShop(id, shopBody) {
    const { data } = await $fetch(`${config.public.apiBase}/Shop/${id}`, {
      method: "PUT",
      body: shopBody,
      headers: {
        Authorization: `Bearer ${token.value.access_token}`,
      },
      onResponse({ request, response, options }) {
        console.log("shopBody", shopBody);
        console.log("Edit", response);
        getShop(1, 10);
      },
    });
  }

  return {
    getShop,
    shopData,
    getShopById,
    shop,
    createShop,
    deleteShop,
    editShop,
  };
});
