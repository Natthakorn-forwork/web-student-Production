<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400" class="pa-4">
      <v-card-title class="text-h6">Login</v-card-title>

      <v-text-field
        label="Email"
        v-model="email"
        type="email"
      />

      <v-text-field
        label="Password"
        v-model="password"
        type="password"
      />

      <v-btn
        color="primary"
        block
        class="mt-3"
        @click="login"
      >
        Login
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>

const isDev = import.meta.env.DEV;

const login = async () => {
  if (isDev) {
    // mock login
    localStorage.setItem("token", "mock.token.value");
    router.push("/student");
    return;
  }

  // production call
  await fetch("/.netlify/functions/login", { ... });
};


import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  const res = await fetch("/.netlify/functions/login", {
    method: "POST",
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });

  if (!res.ok) {
    alert("Login failed");
    return;
  }

  const { token } = await res.json();
  localStorage.setItem("token", token);

  const payload = JSON.parse(atob(token.split(".")[1]));
  router.push(payload.role === "teacher" ? "/teacher" : "/student");
};
</script>
