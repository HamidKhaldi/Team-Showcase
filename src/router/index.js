import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import("../components/Home/Home.vue"),
  },
  {
    path:"/services",
    name: "Services",
    component: () =>
      import("../components/Services/Services.vue"),
  },
  {
    path:"/services/:title",
    name: "ServicesInd",
    component: () =>
      import("../components/Services-Individual/ServicesInd.vue"),
  },
  {
    path: "/showcase",
    name: "Showcase",
    component: () =>
      import("../components/Showcase/Showcase.vue"),
  },
  {
    path: "/project/:title",
    name: "Project",
    component: () =>
      import("../components/Project/Project.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import("../components/Contact/Contact.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
