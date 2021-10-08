import { createStore } from "vuex";

let housePageCount = 24;
export default createStore({
  state: {
    allFamilies: [],
    currentFamily: "",
    currentFamilyURL: "",
    currentLord: "",
    currentLordURL: "",
    currentOverlord: "",
    currentOverlordURL: "",
    currentHeir: "",
    currentHeirURL: "",
    currentFounder: "",
    currentFounderURL: "",
    currentSwornMembersURL: [],
    currentSwornMembers: [],
  },
  mutations: {
    resetCurrentFamily(state) {
      state.currentFamily = {};
      state.currentFamilyURL = "";
      state.currentLord = "";
      state.currentLordURL = "";
      state.currentOverlord = "";
      state.currentOverlordURL = "";
      state.currentHeir = "";
      state.currentHeirURL = "";
      state.currentFounder = "";
      state.currentFounderURL = "";
      state.currentSwornMembersURL = [];
      state.currentSwornMembers = [];
    },
    setCurrentSwornMembersURL(state, payload) {
      state.currentSwornMembersURL.push(payload);
    },
    setCurrentSwornMembers(state, payload) {
      state.currentSwornMembers.push(payload.member);
    },
    setCurrentFounderURL(state, payload) {
      state.currentFounderURL = payload.url;
    },
    setCurrentFounder(state, payload) {
      state.currentFounder = payload.founder;
    },
    setCurrentHeirURL(state, payload) {
      state.currentHeirURL = payload.url;
    },
    setCurrentHeir(state, payload) {
      state.currentHeir = payload.heir;
    },
    setCurrentOverlordURL(state, payload) {
      state.currentOverlordURL = payload.url;
    },
    setCurrentOverlord(state, payload) {
      state.currentOverlord = payload.overlord;
    },
    setCurrentLordURL(state, payload) {
      state.currentLordURL = payload.url;
    },
    setCurrentLord(state, payload) {
      state.currentLord = payload.lord;
    },
    setCurrentFamilyURL(state, payload) {
      state.currentFamilyURL = payload.url;
    },
    setAllFamilies(state, payload) {
      state.allFamilies.push(payload);
    },
    setCurrentFamily(state, payload) {
      state.currentFamily = payload.family;
    },
  },
  actions: {
    async setCurrentSwornMembers(state, url) {
      const apiResponse = await fetch(url.url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      const sleep = (m) => new Promise((r) => setTimeout(r, m));
      await sleep(500);
      state.commit({
        type: "setCurrentSwornMembers",
        member: await apiResponse.json(),
      });
    },
    async setCurrentFounder(state) {
      let url = state.getters.getCurrentFounderURL;
      const apiResponse = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      state.commit({
        type: "setCurrentFounder",
        founder: await apiResponse.json(),
      });
    },
    async setCurrentHeir(state) {
      let url = state.getters.getCurrentHeirURL;
      const apiResponse = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      state.commit({
        type: "setCurrentHeir",
        heir: await apiResponse.json(),
      });
    },
    async setCurrentOverlord(state) {
      let url = state.getters.getCurrentOverlordURL;
      const apiResponse = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      state.commit({
        type: "setCurrentOverlord",
        overlord: await apiResponse.json(),
      });
    },
    async setCurrentLord(state) {
      let url = state.getters.getCurrentLordURL;
      const apiResponse = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      state.commit({
        type: "setCurrentLord",
        lord: await apiResponse.json(),
      });
    },
    async setCurrentFamily(state) {
      let url = state.getters.getCurrentFamilyURL;
      const apiResponse = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      let _family = await apiResponse.json();
      state.commit({
        type: "setCurrentFamily",
        family: _family,
      });
    },
    async setAllFamilies(state) {
      for (let i = 0; i < housePageCount; i++) {
        let url =
          "https://www.anapioficeandfire.com/api/houses?page=" +
          i +
          "&pageSize=20";
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
    getCurrentSwornMembersURL(state) {
      return state.currentSwornMembersURL;
    },
    getCurrentSwornMembers(state) {
      return state.currentSwornMembers;
    },
    getCurrentFounderURL(state) {
      return state.currentFounderURL;
    },
    getCurrentFounder(state) {
      return state.currentFounder;
    },
    getCurrentHeirURL(state) {
      return state.currentHeirURL;
    },
    getCurrentHeir(state) {
      return state.currentHeir;
    },
    getCurrentOverlordURL(state) {
      return state.currentOverlordURL;
    },
    getCurrentOverlord(state) {
      return state.currentOverlord;
    },
    getCurrentLordURL(state) {
      return state.currentLordURL;
    },
    getCurrentLord(state) {
      return state.currentLord;
    },
    getCurrentFamilyURL(state) {
      return state.currentFamilyURL;
    },
    getCurrentFamily(state) {
      return state.currentFamily;
    },
    getAllFamilies(state) {
      return state.allFamilies;
    },
  },
});
