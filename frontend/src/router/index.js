import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import StudentDashboard from "../views/dashboards/StudentDashboard.vue";
import TeacherDashboard from "../views/dashboards/TeacherDashboard.vue";

const routes = [
  { path: "/login", component: Login },
  { path: "/student", component: StudentDashboard },
  { path: "/teacher", component: TeacherDashboard }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
