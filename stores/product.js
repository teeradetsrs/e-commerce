import { defineStore } from "pinia";

export const useProducts = defineStore("Products", () => {
  const config = useRuntimeConfig();

  const createProductBody = ref({
    shopId: 0,
    name: "",
    description: "",
    image: "",
    price: 0,
    stock: 0,
  });

  const editProductBody = ref({
    productId: 0,
    name: "",
    description: "",
    image: "",
    price: 0,
    stock: 0,
  });

  const productData = ref({
    data: {
      content: [],
      pageable: {
        totalPages: 1,
      },
    },
  });

  const allProductData = ref({
    data: {
      content: [],
      pageable: {
        totalPages: 1,
      },
    },
  });

  async function getProduct() {
    const { data } = await useFetch(`${config.public.apiBase}/Product`, {
      method: "GET",
      onResponse({ request, response, options }) {
        console.log("GET", response);
        allProductData.value.data.content = response._data;
      },
    });
  }

  async function getProductsByShopId(shopId) {
    const { data } = await useFetch(
      `${config.public.apiBase}/Product/${shopId}`,
      {
        method: "GET",
        onResponse({ request, response, options }) {
          console.log("GET Product by Shop Id", response);
          productData.value.data.content = response._data;
        },
      }
    );
  }

  async function createProduct() {
    const { data } = await useFetch(`${config.public.apiBase}/Product`, {
      method: "POST",
      body: createProductBody.value,
      onResponse({ request, response, options }) {
        console.log("Create", response);
      },
    });
  }

  async function editProduct(id) {
    const { data } = await useFetch(`${config.public.apiBase}/Product/${id}`, {
      method: "PUT",
      body: editProductBody.value,
      onResponse({ request, response, options }) {
        console.log("Edit", response);
      },
    });
  }

  return {
    getProduct,
    allProductData,
    createProductBody,
    createProduct,
    getProductsByShopId,
    productData,
    editProduct,
    editProductBody
  };
});
