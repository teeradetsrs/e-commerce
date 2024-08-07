<template>
  <v-card>
    <v-layout>
      <v-app-bar class="tw-bg-white" prominent>
        <v-btn>
          <NuxtLink to="/" no-rel> All Product </NuxtLink>
        </v-btn>

        <v-btn>
          <NuxtLink to="/shop" no-rel> My Shop </NuxtLink>
        </v-btn>

        <!-- <v-btn>
          <NuxtLink to="/shop/create" no-rel> Create Shop </NuxtLink>
        </v-btn> -->

        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn>
            <NuxtLink to="/login" no-rel> Login </NuxtLink>
          </v-btn>

          <v-btn variant="text">
            <NuxtLink to="/register" no-rel> Register </NuxtLink>
          </v-btn>
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
const drawer = ref(false);
</script>
