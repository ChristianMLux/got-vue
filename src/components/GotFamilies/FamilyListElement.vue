<template>
  <router-link
    :to="{
      name: 'FamilyDetails',
      params: {
        familyName,
      },
    }"
  >
    <li>
      <p>{{ familyName }}</p>
    </li></router-link
  >
</template>

<script>
export default {
  name: "FamilyListElement",
  props: {
    familyName: {
      type: String,
      required: true,
    },
    key: {
      type: [String, Number],
    },
  },
};
</script>

<style lang="scss" scoped>
li:nth-child(1n + 1) {
  color: var(--background-color);
  background-color: var(--accent-color);
  border-bottom: 1px solid var(--primary-color);
}
li:nth-child(2n + 2) {
  color: var(--font-color);
  background-color: snow;
}
a {
  font-family: "Cinzel Decorative", cursive;
  font-weight: bold;
  color: #2c3e50;
  p {
    margin: 0;
  }
  &.router-link-exact-active {
    color: var(--accent-color);
  }
}
</style>
