<template>
  <router-link
    :to="{
      name: 'FamilyDetails',
      params: {
        familyID,
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
    familyID: {
      type: [String, Number],
      required: true,
    },
    familyName: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  text-align: left;
  padding: 0.5rem 0 0.5rem 3rem;
  border-bottom: 1px solid grey;
  color: #2c3e50;
  transition: 0.25s ease-in-out;
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
  &:hover {
    li {
      background: var(--accent-color);
      color: var(--background-color);
    }
  }
}
</style>
