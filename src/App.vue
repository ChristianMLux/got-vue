<template>
  <header class="main-header">
    <img
      class="got-logo"
      alt="Game Of Thrones Logo"
      src="@/assets/Game_of_Thrones_logo.svg"
    />
    <nav class="main-nav">
      <router-link to="/" @click="resetCurrentFamily">All Families</router-link>
    </nav>
  </header>
  <router-view />
</template>

<script>
export default {
  name: "App",
  methods: {
    resetCurrentFamily() {
      this.$store.commit("unsetArrays");
      this.$store.dispatch("setCurrentFamily", {
        url: this.$store.getters.getCurrentFamilyURL,
      });
    },
  },
  async beforeCreate() {
    await this.$store.dispatch("setAllFamilies");
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Cinzel+Decorative&display=swap");
:root {
  --background-color: #fafafa;
  --success-color: #a3db33;
  --fail-color: #ed3221;
  --font-color: #121212;
  --accent-color: #383f55;
}
html {
  background: var(--background-color);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--font-color);
}
.got-logo {
  max-width: 80vw;
}
.main-nav {
  padding: 30px;

  a {
    font-family: "Cinzel Decorative", cursive;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: var(--accent-color);
    }
  }
}
</style>
