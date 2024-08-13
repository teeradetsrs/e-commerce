<template>
  <div
    class="tw-grid tw-grid-cols-2 tw-items-center tw-content-center tw-h-screen tw-bg-indigo-400"
  >
    <div class="tw-flex tw-flex-col tw-items-center tw-space-y-5">
      <h1 class="tw-text-3xl tw-font-bold tw-text-white">Login</h1>
      <v-form
        @submit.prevent="submit()"
        class="tw-w-7/12 tw-space-y-5"
      >
        <v-text-field
          v-model="userName"
          :rules="ruleUsername"
          label="Username"
          variant="solo"
          rounded
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="rulePassword"
          label="Password"
          variant="solo"
          rounded
          type="password"
        ></v-text-field>

        <div>
          <NuxtLink
          to="/register"
          no-rel
          class="tw-text-white tw-underline tw-flex tw-justify-end"
          >
          Register
        </NuxtLink>
      </div>

      <div class="tw-grid tw-place-content-center ">
          <v-btn
            class="tw-bg-white tw-text-black tw-px-10"
            color="surface-variant"
            text="Login"
            variant="flat"
            block
            rounded="xl"
            type="submit"
            :disabled="isSubmitDisabled"
            :loading="validating"
          ></v-btn>
        </div>

        <div class="tw-grid tw-place-content-center">
          <v-dialog max-width="500" v-model="dialog">
            <!-- <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                class="tw-bg-white tw-text-black"
                color="surface-variant"
                text="Login"
                variant="flat"
                block
                rounded="xl"
                type="submit"
                :disabled="isSubmitDisabled"
              ></v-btn>
            </template> -->

            <template v-slot:default="{ isActive }">
              <v-card
                class="py-12 px-8 text-center mx-auto ma-4"
                max-width="420"
                width="100%"
              >
                <h3 class="text-h6 mb-2">
                  Please enter the one time password to verify your account
                </h3>

                <div>A code has been sent to Telegram</div>

                <v-otp-input
                  v-model="otp"
                  :disabled="validating"
                  color="primary"
                  variant="plain"
                ></v-otp-input>

                <div class="tw-flex tw-justify-center">
                  <v-btn
                    :loading="validating"
                    class="mt-6 bg-surface-variant tw-items-center"
                    height="40"
                    text="Validate"
                    variant="plain"
                    width="135"
                    rounded
                    :disabled="otp.length < 6"
                    @click="onClick"
                  ></v-btn>
                </div>
              </v-card>
            </template>
          </v-dialog>
        </div>
      </v-form>
    </div>
    <div class="tw-flex tw-justify-center tw-items-center">
      <img src="/images/common/login_page.png" alt="" class="tw-w-5/6" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthentication } from "~/stores/authentication";

// definePageMeta({
//   layout: false,
// });

const userName = ref("");
const password = ref("");
const chatId = ref("");

const otp = ref("");
const validating = ref(false);

const loading = ref(false);

const dialog = ref(false)

const auth = useAuthentication();

const ruleUsername = ref([
  (v: string) => !!v || "Username is required",
  (v: string) =>
    (v && v.length >= 8) || "Username must be more than 8 characters",
]);

const rulePassword = ref([
  (v: string) => !!v || "Password is required",
  (v: string) =>
    (v && v.length >= 8) || "Password must be more than 8 characters",
]);

const isSubmitDisabled = computed(() => {
  const usernameValid = ruleUsername.value.every(
    (rule) => rule(userName.value) === true
  );
  const passwordValid = rulePassword.value.every(
    (rule) => rule(password.value) === true
  );

  return !usernameValid || !passwordValid;
});

async function submit() {
  validating.value = true;

  auth.loginBody.username = userName.value;
  auth.loginBody.password = password.value;

  try{
    await auth.generateOTP();
    if(auth.statusLogin === false){
      dialog.value = false;
      console.log("🚀 ~ submit ~ dialog.value:", dialog.value)
      validating.value = false;
      return
    }
    dialog.value = true;
    validating.value = false;
    return
  }catch {
    dialog.value = false;
    console.log("🚀 ~ submit ~ dialog.value 123:", dialog.value)
  }

  // alert(JSON.stringify(results, null, 2));

  // navigateTo("/");
}

async function onClick() {
  validating.value = true;

  auth.generateTokenBody.otp = otp.value;
  auth.generateTokenBody.username = userName.value;

  localStorage.setItem("username", userName.value);
  
  try {
    await auth.generateToken();
  } catch {
    alert("invalid OTP");
  }

  validating.value = false;

  navigateTo("/");

  // setTimeout(() => {
  //   validating.value = false;
  // }, 2000);
}
</script>

<style scoped>
/* Custom styles for disabled button */
.v-btn--disabled {
  background-color: grey !important;
  color: white !important;
  border: 1px solid darkgrey !important;
}
</style>
