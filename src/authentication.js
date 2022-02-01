import Keycloak from "keycloak-js";
import getEnv from "@/utils/env";
import store from "./store";

const authServerURL = `${getEnv("VUE_APP_AUTH_SERVER_URL")}`;

const realm = getEnv("VUE_APP_AUTH_REALM");

const clientId = getEnv("VUE_APP_AUTH_CLIENT_ID");

export const keycloak = Keycloak({
  url: authServerURL,
  realm,
  clientId,
});

keycloak.onAuthSuccess = function () {
  keycloak
    .loadUserProfile()
    .then((profile) => {
      store.commit("user/SET_USER", profile);
    })
    .catch(() => {
      store.commit("user/SET_USER", {});
    });
};

export async function authorize(redirectUri, errorUri) {
  const expirationTime = 70;
  if (!keycloak.authenticated) {
    // The page is protected and the user is not authenticated. Force a login.
    keycloak.login({
      redirectUri,
    });
    return false;
  } else {
    return keycloak
      .updateToken(expirationTime)
      .then(() => {
        return true;
      })
      .catch(() => {
        // Force a logout. If redirectUri is set to the same address as the successful request, it basically retriggers this function, forcing a login
        keycloak.logout({ redirectUri: errorUri });
        return false;
      });
  }
}
