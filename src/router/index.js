import { createRouter, createWebHistory } from "vue-router";

import store from "@/store/index.js";

import ViewDashboard from "@/views/ViewDashboard.vue";
import ViewCRISPRcleanRHome from "@/views/ccr/ViewCRISPRcleanRHome.vue";
import ViewCRISPRcleanRSubmitJob from "@/views/ccr/ViewCRISPRcleanRSubmitJob.vue";
import ViewCRISPRcleanRResultsList from "@/views/ccr/ViewCRISPRcleanRResultsList.vue";
import ViewCRISPRcleanRResultsByID from "@/views/ccr/ViewCRISPRcleanRResultsByID.vue";

import ViewNotFound from "@/views/ViewNotFound.vue";

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
          console.log(error);
          next({ name: "network-error" });
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
          console.error("error: ", error);
          if (error.response) {
            switch (error.response.status) {
              case 404:
                next({ name: "404", params: { resource: "event" } });
                break;
              case 403:
                next({ name: "forbidden" });
                break;
              default:
                next({ name: "error" });
            }
          } else next({ name: "error" });
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
      Promise.all([
        store.dispatch("ccr/fetchResultByID", to.params.id),
        store.dispatch("ccr/fetchImages", to.params.id),
      ])
        .then((values) => {
          // there is no easy way to distinguish results from Promise.all, here we rely on type
          values.forEach((value) => {
            if (Array.isArray(value)) to.params.imageList = value;
            else to.params.result = value;
          });
          next();
        })
        .catch((error) => {
          console.error("vue router: ", error.message);
          if (error.response && error.response.status === 404)
            next({ name: "404", params: { resource: "event" } });
          else next({ name: "error" });
        });
    },
  },
  /*   {
    path: "/network-error",
    name: "network-error",
    component: ViewNetworkError,
  }, */
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: ViewNotFound,
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
