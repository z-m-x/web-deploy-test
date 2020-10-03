import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/elform",
    name: "elform",
    component: () => import("../views/elform.vue"),
  },
  {
    path: "/d3",
    name: "d3",
    component: () => import("../views/d3/d3.vue"),
    children: [
      {
        path: "d3test",
        name: "d3test",
        component: () => import("../views/d3/d3test.vue"),
      },
      {
        path: "d3init",
        name: "d3init",
        component: () => import("../views/d3/d3init.vue"),
      },
      {
        path: "d3init2",
        name: "d3init2",
        component: () => import("../views/d3/d3init2.vue"),
      },
    ],
  },
  {
    path: "/eltree",
    name: "eltree",
    component: () => import("../views/eltree/index.vue"),
  },
  {
    path: "/function",
    name: "function",
    component: () => import("../views/functionfunction/index.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
