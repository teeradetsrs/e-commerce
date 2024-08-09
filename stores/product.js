import { defineStore } from "pinia";
import { useAuthentication } from "./authentication"

export const useProducts = defineStore("Products", () => {
  const config = useRuntimeConfig();
  const auth = useAuthentication();

  const createProductBody = ref({
    shopId: 0,
    name: "",
    description: "",
    image: "",
    price: 0,
    stock: 0,
    imageName: ''
  });

  const editProductBody = ref({
    productId: 0,
    name: "",
    description: "",
    image: "",
    price: 0,
    stock: 0,
    shopId: 0,
    imageName: ''
  });

  const productData = ref({
    data: {
      content: [],
      pageable: {
        currentPage: 1,
        sizePages: 10,
        totalPages: 0,
      },
    },
  });

  const allProductData = ref({
    data: {
      content: [],
      pageable: {
        currentPage: 1,
        sizePages: 10,
        totalPages: 0,
      },
    },
  });

  const productDataDetail = ref({
    productId: 0,
    name: "",
    description: "",
    image: "",
    price: 0,
    stock: 0,
    createAt: "",
    shopId: 0,
    imageName: ''
  });

  async function getProduct(pageNumber, pageSize) {
    const { data } = await useFetch(`${config.public.apiBase}/Product`, {
      method: "GET",
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
      headers:  {
        Authorization: `Bearer ${auth.token.access_token}`
      },
      onResponse({ request, response, options }) {
        console.log("GET", response);
        allProductData.value.data.content = response._data.content;
        allProductData.value.data.pageable = response._data.pageable;
      },
    });
  }

  async function getProductById(id) {
    const { data } = await useFetch(
      `${config.public.apiBase}/Product/detail/${id}`,
      {
        method: "GET",
        headers:  {
          Authorization: `Bearer ${auth.token.access_token}`
        },
        onResponse({ request, response, options }) {
          productDataDetail.value = response._data;
          console.log("VALUEEE", productData.value);
        },
      }
    );
  }

  async function getProductsByShopId(shopId, pageNumber, pageSize) {
    const { data } = await useFetch(
      `${config.public.apiBase}/Product/${shopId}`,
      {
        method: "GET",
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
        },
        headers:  {
          Authorization: `Bearer ${auth.token.access_token}`
        },
        onResponse({ request, response, options }) {
          console.log("GET Product by Shop Id", response);
          productData.value.data.content = response._data.content;
          productData.value.data.pageable = response._data.pageable;
        },
      }
    );
  }

  async function createProduct() {
    const { data } = await useFetch(`${config.public.apiBase}/Product`, {
      method: "POST",
      body: createProductBody.value,
      headers:  {
        Authorization: `Bearer ${auth.token.access_token}`
      },
      onResponse({ request, response, options }) {
        console.log("Create", response);
      },
    });
  }

  async function editProduct(id) {
    const { data } = await useFetch(`${config.public.apiBase}/Product/${id}`, {
      method: "PUT",
      body: editProductBody.value,
      headers:  {
        Authorization: `Bearer ${auth.token.access_token}`
      },
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
    editProductBody,
    productDataDetail,
    getProductById,
  };
});
