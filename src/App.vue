<template>
  <header class="main-header">
    <img
      class="got-logo"
      alt="Game Of Thrones Logo"
      src="@/assets/Game_of_Thrones_logo.svg"
    />
    <nav class="main-nav">
      <router-link to="/">All Families</router-link>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>
export default {
  name: "App",
  beforeCreate() {
    if (this.$store.getters.getAllFamilies ?? null) {
      this.$store.dispatch("setAllFamilies");
    }
  },
  mounted() {
    // if back button is pressed
    window.popStateDetected = false;
    window.addEventListener("popstate", () => {
      window.popStateDetected = true;
    });
    this.$router.beforeEach((to, from, next) => {
      const IsItABackButton = window.popStateDetected;
      window.popStateDetected = false;
      if (IsItABackButton && from.meta.someLogica) {
        next(false);
        this.$store.commit("resetCurrentFamily");
        return "";
      }
      next();
    });
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
