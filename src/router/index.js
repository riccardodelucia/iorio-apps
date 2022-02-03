import { createRouter, createWebHistory } from "vue-router";

import store from "@/store/index.js";

import ViewDashboard from "@/views/ViewDashboard.vue";
import ViewCRISPRcleanRHome from "@/views/ccr/ViewCRISPRcleanRHome.vue";
import ViewCRISPRcleanRSubmitJob from "@/views/ccr/ViewCRISPRcleanRSubmitJob.vue";
import ViewCRISPRcleanRResultsList from "@/views/ccr/ViewCRISPRcleanRResultsList.vue";
import ViewCRISPRcleanRResultsByID from "@/views/ccr/ViewCRISPRcleanRResultsByID.vue";

import ViewMessagePage from "@/views/ViewMessagePage.vue";

import CcrAPI from "@/api/ccr.js";
import { keycloak, authorize } from "@/authentication.js";

const routes = [
  {
    path: "/",
    redirect: { name: "dashboard" },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: ViewDashboard,
  },
  {
    path: "/ccr",
    redirect: { name: "ccr-home" },
  },
  {
    path: "/ccr/home",
    name: "ccr-home",
    component: ViewCRISPRcleanRHome,
  },
  {
    path: "/ccr/submit",
    name: "ccr-submit",
    meta: {
      requiresAuth: true,
    },
    component: ViewCRISPRcleanRSubmitJob,
    beforeEnter: (to, from, next) => {
      return CcrAPI.getStaticResource("job_config.json")
        .then((response) => {
          to.params.config = response.data;
          next();
        })
        .catch((error) => {
          next({ name: "error", params: { message: error } });
        });
    },
  },
  {
    path: "/ccr/results",
    name: "ccr-results-list",
    component: ViewCRISPRcleanRResultsList,
    meta: {
      requiresAuth: true,
      requiresNav: true,
    },
    props: true,
    beforeEnter(to, from, next) {
      store
        .dispatch("ccr/fetchResults")
        .then((results) => {
          to.params.results = results;
          next();
        })
        .catch((error) => {
          next({ name: "error", params: { message: error } });
        });
    },
  },
  {
    path: "/ccr/results/:id",
    name: "ccr-results-id",
    component: ViewCRISPRcleanRResultsByID,
    meta: {
      requiresAuth: true,
    },
    props: true,
    beforeEnter(to, from, next) {
      store
        .dispatch("ccr/fetchResultByID", to.params.id)
        .then((result) => {
          to.params.result = result;
          return store.dispatch("ccr/fetchImages", to.params.id);
        })
        .then((values) => {
          to.params.imageList = values;
          next();
        })
        .catch((error) => {
          if (error.response) {
            switch (error.response.status) {
              case 404:
                next("/404");
                break;
              default:
                next({ name: "error" });
                break;
            }
          } else next({ name: "error" });
        });
    },
  },
  {
    path: "/error",
    name: "error",
    component: ViewMessagePage,
    beforeEnter(to) {
      to.params.title = "Something went wrong... 💥";
      return;
    },
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: ViewMessagePage,
    beforeEnter(to) {
      to.params.title = "Not found 🔍";
      to.params.message = "The content you're looking for is not there.";
      return;
    },
    props: true,
  },
];

export default async () => {
  console.log("configuring keycloak");

  const router = await keycloak
    .init({ checkLoginIframe: false, enableLogging: true })
    .then(() => {
      console.log("configuring router");

      const router = createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes,
      });
      router.beforeEach((to) => {
        if (to.matched.some((record) => record.meta.requiresAuth)) {
          const redirectUri = `${window.location.protocol}//${window.location.host}${to.path}`;
          return authorize(redirectUri);
        }
        // This page did not require authentication
        return;
      });
      return router;
    });
  return router;
};
