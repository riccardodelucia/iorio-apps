import store from "@/store/index.js";

export const sendNotification = ({ type = "success", message = "" }) => {
  const notification = { type, message };
  store.dispatch("notification/add", notification);
};
