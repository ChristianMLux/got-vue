<template>
  <section class="family-list-section">
    <button class="filter-btn" @click="changeFilter">
      {{ filterBtnText }}
    </button>
    <ul v-if="!isFiltered" class="family-group-list">
      <li
        v-for="(familySet, id) in this.$store.getters.getAllFamilies"
        :key="id"
        v-bind="familySet"
      >
        <ul class="families-list">
          <FamilyListElement
            v-for="family in familySet.families"
            :key="family.name"
            :familyName="family.name"
            v-bind="familySet"
          >
          </FamilyListElement>
        </ul>
      </li>
    </ul>
    <ul v-if="isFiltered" class="family-group-list">
      <li
        v-for="(familySet, id) in this.$store.getters.getAllFamilies.slice(
          limitMin,
          limitMax
        )"
        :key="id"
        v-bind="familySet"
      >
        <ul class="families-list">
          <FamilyListElement
            v-for="family in familySet.families"
            :key="family.name"
            :familyName="family.name"
            v-bind="familySet"
          >
          </FamilyListElement>
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
    <button
      class="switch-page-btn"
      @click="switchPageForward"
      v-show="isFiltered"
    >
      Next families
    </button>
  </section>
</template>

<script>
import FamilyListElement from "./FamilyListElement.vue";
export default {
  name: "AllFamilies",
  components: { FamilyListElement },
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

<style lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
.family-group-list {
  max-width: 80vw;
  margin: 0 auto;
}
.families-list {
  margin: 1rem 0;
  border: 1px solid darkgrey;
}
.families-list > li {
  text-align: left;
  padding: 0.5rem 2rem;
}
.families-list > li:nth-child(1n + 1) {
  color: var(--background-color);
  background-color: var(--accent-color);
  border-bottom: 1px solid var(--primary-color);
}
.families-list > li:nth-child(2n + 2) {
  color: var(--font-color);
  background-color: snow;
}
</style>
