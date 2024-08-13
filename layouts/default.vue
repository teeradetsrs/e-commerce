<template>
  <v-card>
    <v-layout>
      <v-app-bar class="tw-bg-white" prominent>
        <NuxtLink to="/" no-rel>
          <v-btn> All Product </v-btn>
        </NuxtLink>

        <NuxtLink to="/shop" no-rel>
          <v-btn> My Shop </v-btn>
        </NuxtLink>

        <!-- <v-btn>
          <NuxtLink to="/shop/create" no-rel> Create Shop </NuxtLink>
        </v-btn> -->

        <v-spacer></v-spacer>

        <template v-if="!auth.statusLogin">
          <NuxtLink to="/login" no-rel>
            <v-btn> Login </v-btn>
          </NuxtLink>

          <NuxtLink to="/register" no-rel>
            <v-btn variant="text"> Register </v-btn>
          </NuxtLink>
        </template>

        <template v-if="auth.statusLogin">
            <v-btn @click="logout()"> Logout </v-btn>
        </template>

      </v-app-bar>

      <v-main class="tw-bg-indigo-400">
        <v-container fluid class="pa-0 tw-min-h-screen">
          <slot />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import { useAuthentication } from "~/stores/authentication";

const drawer = ref(false);

const auth = useAuthentication();

onBeforeMount( async () => {
  const token = localStorage.getItem("access_token")
  
  if(token != null){
    auth.statusLogin = true
  }
})

async function logout() {
  localStorage.clear()
  auth.statusLogin = false
  navigateTo("/login");
}
</script>
