import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "login" },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: { guest: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/pending",
    name: "FormalityPending",
    component: () => import("../views/FormalityPending.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/alert",
    name: "FormalityAlert",
    component: () => import("../views/FormalityAlert.vue"),
    meta: { requiresAuth: true}
  },
  {
    path: "/dev",
    name: "dev",
    component: () => import('../views/Test.vue'),
    meta: { requiresAuth : true}
  },
  {
    path: "/test",
    name: "test",
    component: () => import('../views/Create.vue'),
    meta: { requiresAuth : true}
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/Dashboard");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
