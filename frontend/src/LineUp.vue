<template>
  <v-container>
    <v-btn color="primary" @click="lineup">เข้าแถว</v-btn>
  </v-container>
</template>

<script setup>
const lineup = async () => {
  await fetch("/.netlify/functions/lineup", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    }
  });
};
</script>
