import { createStore } from "vuex";

let housePageCount = 10;
export default createStore({
  state: {
    allFamilies: [],
  },
  mutations: {
    setAllFamilies(state, payload) {
      state.allFamilies.push(payload);
    },
  },
  actions: {
    async setAllFamilies(state) {
      for (let i = 0; i < housePageCount; i++) {
        let url =
          "https://www.anapioficeandfire.com/api/houses?page=" +
          i +
          "&pageSize=50";
        const apiResponse = await fetch(url, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        state.commit({
          type: "setAllFamilies",
          families: await apiResponse.json(),
        });
      }
    },
  },
  modules: {},
  getters: {
    getAllFamilies(state) {
      return state.allFamilies;
    },
  },
});
