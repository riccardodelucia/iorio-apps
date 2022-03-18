import { createStore } from "vuex";
import * as user from "@/store/modules/user.js";
import * as notification from "@/store/modules/notification.js";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    notification,
    user,
  },
});
