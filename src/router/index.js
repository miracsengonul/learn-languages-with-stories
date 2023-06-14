import Vue from "vue";
import VueRouter from "vue-router";
import DetailPage from "../components/DetailPage.vue";
import Homepage from "../components/Homepage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Homepage,
    meta: {
      title: "Homepage - MyApp",
    },
  },
  {
    path: "/detail",
    name: "detail",
    component: DetailPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const pageTitle = to.meta.title || "Learn Language with Stories";
  document.title = pageTitle;
  next();
});

export default router;
