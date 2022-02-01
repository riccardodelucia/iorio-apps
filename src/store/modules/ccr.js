import CcrAPI from "@/api/ccr.js";
import imageList from "@/images.json";

export const namespaced = true;
export const state = {
  results: [],
  result: {},
  imageList: [],
};

export const mutations = {
  SET_VALUE(state, { keyPath, value }) {
    const keys = keyPath
      .trim()
      .split("/")
      .filter((item) => item !== "");
    keys.reduce((acc, item, i) => {
      if (i < keys.length - 1) return acc[item];
      acc[item] = value;
    }, state);
  },
};

export const actions = {
  fetchResults({ commit }) {
    return CcrAPI.getResultsList()
      .then((response) => {
        commit("SET_VALUE", { keyPath: "results", value: response.data });
        return response.data;
      })
      .catch((error) => {
        commit("SET_VALUE", { keyPath: "results", value: [] });
        throw error;
      });
  },
  fetchResultByID({ commit }, id) {
    return CcrAPI.getResultByID(id)
      .then((response) => {
        commit("SET_VALUE", { keyPath: "result", value: response.data });
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
  fetchImages({ commit }, id) {
    // NOTE: no need to throw errors here. For any error we simply set the image as not found
    const imageListWithURL = imageList.map(async (image) => {
      try {
        const response = await CcrAPI.getFile({ id, fileUri: image.imgUri });
        return { ...image, src: URL.createObjectURL(response.data) };
      } catch (error) {
        return {
          ...image,
          src: require("@/assets/img/placeholder-image.png"),
        };
      }
    });
    return Promise.all(imageListWithURL).then((imageList) => {
      commit("SET_VALUE", { keyPath: "imageList", value: imageList });
      return imageList;
    });
  },
};
