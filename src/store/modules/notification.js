export const namespaced = true;
export const state = {
  notifications: [{ type: "success", message: "test", id: 0 }],
};

let nextId = 1;

export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({ ...notification, id: nextId++ });
  },
  DELETE(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== notificationToRemove.id
    );
  },
};

export const getters = {
  getLastNotification: (state) => {
    return state.notifications[state.notifications.length - 1];
  },
};

export const actions = {
  add({ commit, getters }, notification) {
    commit("PUSH", notification);
    const notificationWithID = getters.getLastNotification;
    notificationWithID?.timeout &&
      setTimeout(() => {
        commit("DELETE", notificationWithID);
      }, 5000);
  },
  remove({ commit }, notificationToRemove) {
    commit("DELETE", notificationToRemove);
  },
};
