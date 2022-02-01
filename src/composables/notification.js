import store from "@/store/index.js";

export const sendNotification = ({
  type = "success",
  message = "",
  timeout = 0,
}) => {
  const notification = { type, message, timeout: timeout * 1000 };
  store.dispatch("notification/add", notification);
};
