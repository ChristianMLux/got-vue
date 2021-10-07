<template>
  <section class="family-list-section">
    <div class="button-wrapper">
      <main-btn
        buttonClass="primary"
        class="switch-page-btn"
        @click="switchPageBackward"
        v-show="pageSwitched"
        ><p>&#8606; prev</p></main-btn
      >
      <main-btn buttonClass="primary" class="filter-btn" @click="changeFilter"
        ><p>{{ filterBtnText }}</p></main-btn
      >
      <main-btn
        buttonClass="primary"
        @click="switchPageForward"
        v-show="isFiltered"
        ><p>next &#8608;</p></main-btn
      >
    </div>

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
            :region="family.region"
            v-bind="family"
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
            :region="family.region"
            v-bind="family"
          >
          </FamilyListElement>
        </ul>
      </li>
    </ul>
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
    async initCurrentFamily() {
      await this.$store.commit("setCurrentFamilyURL", {
        url: "https://www.anapioficeandfire.com/api/houses/1",
      });
      await this.$store.dispatch("setCurrentFamily");
    },
    changeFilter() {
      this.isFiltered = !this.isFiltered;
      this.pageSwitched = !this.pageSwitched;
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
  async created() {
    await this.initCurrentFamily();
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

.button-wrapper {
  margin: 0 auto;
  max-width: 80vw;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}
</style>
