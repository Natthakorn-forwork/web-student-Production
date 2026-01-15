<template>
  <v-container>
    <v-btn color="success" @click="check">เช็คชื่อ</v-btn>
  </v-container>
</template>

<script setup>
const check = async () => {
  await fetch("/.netlify/functions/attendance", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    },
    body: JSON.stringify({ subject_id: "SUBJECT_UUID" })
  });
};
</script>
