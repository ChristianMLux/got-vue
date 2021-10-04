<template>
  <ul>
    <li
      v-for="(familySet, id) in this.$store.getters.getAllFamilies"
      :key="id"
      v-bind="familySet"
    >
      <ul>
        <li
          v-for="family in familySet.families"
          :key="family.name"
          v-bind="familySet"
        >
          {{ family.name }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: "AllFamilies",
};
</script>
