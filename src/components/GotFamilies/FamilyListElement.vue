<template>
  <router-link
    :to="{
      name: 'FamilyDetails',
      params: {
        url,
        familyName,
        coatOfArms,
        region,
        currentLord,
        founder,
        heir,
        overlord,
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
    url: {
      type: String,
    },
    overlord: {
      type: String,
    },
    heir: {
      type: String,
    },
    founder: {
      type: String,
    },
    ancestralWeapons: {
      type: Array,
    },
    currentLord: {
      type: String,
    },
    region: {
      type: String,
    },
    coatOfArms: {
      type: String,
    },
    familyName: {
      type: String,
      required: true,
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
