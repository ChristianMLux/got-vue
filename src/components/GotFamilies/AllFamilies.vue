<template>
  <button class="filter-btn" @click="changeFilter">{{ filterBtnText }}</button>
  <ul v-if="!isFiltered">
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
  <ul v-if="isFiltered">
    <li
      v-for="(familySet, id) in this.$store.getters.getAllFamilies.slice(
        limitMin,
        limitMax
      )"
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
  <button
    class="switch-page-btn"
    @click="switchPageBackward"
    v-show="pageSwitched"
  >
    Previous Families
  </button>
  <button class="switch-page-btn" @click="switchPageForward">
    Next families
  </button>
</template>

<script>
export default {
  name: "AllFamilies",
  data() {
    return {
      isFiltered: false,
      pageSwitched: false,
      limitMin: 0,
      limitMax: 1,
      showMore: "Show All",
      showLess: "Show 50 per Page",
    };
  },
  computed: {
    filterBtnText() {
      return this.isFiltered ? this.showMore : this.showLess;
    },
  },
  methods: {
    changeFilter() {
      this.isFiltered = !this.isFiltered;
    },
    switchPageForward() {
      if (this.limitMax <= 10) {
        this.pageSwitched = true;
        this.limitMin++;
        this.limitMax++;
      } else {
        this.pageSwitched = false;
        this.limitMin = 0;
        this.limitMax = 1;
      }
    },
    switchPageBackward() {
      if (this.limitMin >= 0) {
        this.limitMin--;
        this.limitMax--;
      }
    },
  },
};
</script>
