<template>
  <v-container>
    <v-card class="pa-4">
      <h2>Teacher Dashboard</h2>

      <v-divider class="my-3" />

      <v-btn block color="primary" class="mb-2">
        รายชื่อนักศึกษา
      </v-btn>

      <v-btn block color="primary" class="mb-2">
        เช็คชื่อรายวิชา
      </v-btn>

      <v-btn block color="primary" class="mb-2">
        รายงานการเข้าเรียน
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/");
    return;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.role !== "teacher") {
    router.push("/student");
  }
});
</script>
