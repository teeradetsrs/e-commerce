import { defineStore } from "pinia";

export const useShops = defineStore("Shops", () => {
  const config = useRuntimeConfig();
  const shopData = ref({
    data: {
      content: [],
      pageable: {
        totalPages: 1,
      },
    },
  });
  const shop = ref({
    name: "",
    description: "",
    image: null
  });

  // const shopBody = ref({
  //   Name: "string",
  //   Description: "string",
  //   image: null,
  //   UserId: 3,
  // });

  async function getShop() {
    const { data } = await useFetch(`${config.public.apiBase}/shop`, {
      onRequest({ request, options }) {},
      onResponse({ request, response, options }) {
        shopData.value.data.content = response._data;
      },
    });
  }

  async function getShopById(id) {
    const { data } = await useFetch(`${config.public.apiBase}/shop/${id}`, {
      onRequest({ request, options }) {},
      onResponse({ request, response, options }) {
        shop.value = response._data;
      },
    });
  }

  async function createShop(shopBody) {
    const { data } = await useFetch(`${config.public.apiBase}/shop`, {
      method: 'POST',
      body: shopBody,
      onResponse({ request, response, options }) {
        console.log("Create", response);
      },
    });
  }

  async function deleteShop(id){
    const { data } = await useFetch(`${config.public.apiBase}/shop/${id}`, {
      method: 'DELETE',
      onResponse({ request, response, options }) {
        console.log("Delete", response);
      },
    });
  }

  async function editShop(id, shopBody){
    const { data } = await useFetch(`${config.public.apiBase}/shop/${id}`, {
      method: 'PUT',
      body: shopBody,
      onResponse({ request, response, options }) {
        console.log("Edit", response);
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
    editShop
  };
});
