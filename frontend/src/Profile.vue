<template>
  <v-container>
    <v-card class="pa-4">
      <pre>{{ profile }}</pre>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";

const profile = ref({});

onMounted(async () => {
  const res = await fetch("/.netlify/functions/profile", {
    headers: { Authorization: `Bearer ${localStorage.token}` }
  });
  profile.value = await res.json();
});
</script>
