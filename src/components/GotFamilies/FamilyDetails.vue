<template>
  <section class="details-section">
    <div class="house-heading">
      <h2>{{ this.$store.getters.getCurrentFamily.name }}</h2>
      <p class="words">{{ this.$store.getters.getCurrentFamily.words }}</p>
    </div>
    <blockquote
      class="coat-of-arms"
      v-if="this.$store.getters.getCurrentFamily.coatOfArms"
    >
      &#187; {{ this.$store.getters.getCurrentFamily.coatOfArms }} &#171;
    </blockquote>
    <div class="house-info-wrapper">
      <div class="inner-info-wrapper" v-if="hasRegion">
        <p class="region-name">Region:</p>
        <p>{{ this.$store.getters.getCurrentFamily.region }}</p>
      </div>
      <div class="inner-info-wrapper" v-if="hasALord">
        <p class="current-lord">Current Lord:</p>
        <p v-if="lordHasTitle">
          {{ this.$store.getters.getCurrentLord.titles[0] }}
          {{ this.$store.getters.getCurrentLord.name }}
        </p>
        <p v-else>{{ this.$store.getters.getCurrentLord.name }}</p>
      </div>
      <div
        class="inner-info-wrapper"
        v-if="this.$store.getters.getCurrentFamily.founder"
      >
        <p class="house-founder">Founder:</p>
        <p>{{ this.$store.getters.getCurrentFounder.name }}</p>
      </div>
      <div class="inner-info-wrapper" v-if="hasAnOverlord">
        <p class="house-overlord">Overlord:</p>
        <p>{{ this.$store.getters.getCurrentOverlord.name }}</p>
      </div>
      <div class="inner-info-wrapper" v-if="hasAHeir">
        <p class="house-heir">Heir:</p>
        <p>{{ this.$store.getters.getCurrentHeir.name }}</p>
      </div>
      <div class="inner-info-wrapper" v-if="hasSwornMembers">
        <p>Sworn Member:</p>
        <ul class="house-sworn-members">
          <li
            v-for="member in this.$store.getters.getCurrentSwornMembers"
            :key="member.name"
            v-bind="member"
          >
            {{ member.name }}
          </li>
        </ul>
      </div>
      <div class="inner-info-wrapper" v-if="hasFamilyTitle">
        <p class="house-titles">Titles:</p>
        <ul>
          <li
            v-for="title in this.$store.getters.getCurrentFamily.titles"
            :key="title.name"
            v-bind="title"
          >
            {{ title }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FamilyDetails",
  computed: {
    hasRegion() {
      return this.$store.getters.getCurrentFamily.region ? true : false;
    },
    hasALord() {
      return this.$store.getters.getCurrentFamily.currentLord ? true : false;
    },
    lordHasTitle() {
      return this.$store.getters.getCurrentLord.titles ? true : false;
    },
    hasAnOverlord() {
      return this.$store.getters.getCurrentFamily.overlord ? true : false;
    },
    hasAHeir() {
      return this.$store.getters.getCurrentFamily.heir ? true : false;
    },
    hasSeats() {
      if (this.$store.getters.getCurrentFamily.seats[0]) {
        return true;
      } else {
        return false;
      }
    },
    hasSwornMembers() {
      return this.$store.getters.getCurrentFamily &&
        this.$store.getters.getCurrentFamily.swornMembers !== " " &&
        this.$store.getters.getCurrentFamily.swornMembers[0]
        ? true
        : false;
    },
    hasFamilyTitle() {
      return this.$store.getters.getCurrentFamily &&
        this.$store.getters.getCurrentFamily.titles !== "" &&
        this.$store.getters.getCurrentFamily.titles[0]
        ? true
        : false;
    },
  },
  methods: {
    async setCurrentFamilyURL() {
      await this.$store.commit("setCurrentFamilyURL", {
        url:
          "https://www.anapioficeandfire.com/api/houses/" +
          this.$route.params.familyID,
      });
    },
    async setCurrentFamily() {
      await this.$store.dispatch("setCurrentFamily");
    },
    async setCurrentLordURL() {
      await this.$store.commit("setCurrentLordURL", {
        url: this.$store.getters.getCurrentFamily.currentLord,
      });
    },
    async setCurrentLord() {
      await this.$store.dispatch("setCurrentLord");
    },
    async setCurrentOverlordURL() {
      await this.$store.commit("setCurrentOverlordURL", {
        url: this.$store.getters.getCurrentFamily.overlord,
      });
    },
    async setCurrentOverlord() {
      await this.$store.dispatch("setCurrentOverlord");
    },
    async setCurrentHeirURL() {
      await this.$store.commit("setCurrentHeirURL", {
        url: this.$store.getters.getCurrentFamily.heir,
      });
    },
    async setCurrentHeir() {
      await this.$store.dispatch("setCurrentHeir");
    },
    async setCurrentFounderURL() {
      await this.$store.commit("setCurrentFounderURL", {
        url: this.$store.getters.getCurrentFamily.founder,
      });
    },
    async setCurrentFounder() {
      await this.$store.dispatch("setCurrentFounder");
    },
    async setCurrentSwornMembersURL() {
      await this.$store.getters.getCurrentFamily.swornMembers.forEach(
        (member) => {
          this.$store.commit("setCurrentSwornMembersURL", {
            url: member,
          });
        }
      );
    },
    async setCurrentSwornMembers() {
      await this.$store.getters.getCurrentSwornMembersURL.forEach((member) => {
        this.$store.dispatch({
          type: "setCurrentSwornMembers",
          url: member.url,
        });
      });
    },
  },
  async created() {
    await this.setCurrentFamilyURL();
    await this.setCurrentFamily();
    if (this.hasALord) {
      await this.setCurrentLordURL();
      await this.setCurrentLord();
    } else {
      console.error("No Lord");
    }
    if (this.hasAnOverlord) {
      await this.setCurrentOverlordURL();
      await this.setCurrentOverlord();
    } else {
      console.error("No Overlord");
    }
    if (this.hasAHeir) {
      await this.setCurrentHeirURL();
      await this.setCurrentHeir();
    } else {
      console.error("No Heir");
    }
    if (this.$store.getters.getCurrentFamily.founder ?? null) {
      await this.setCurrentFounderURL();
      await this.setCurrentFounder();
    } else {
      console.error("No Founder");
    }
    if (this.hasSwornMembers) {
      await this.setCurrentSwornMembersURL();
      await this.setCurrentSwornMembers();
    } else {
      console.error("No Sworn Members");
    }
  },
  beforeRouteUpdate() {
    this.familyID = this.$route.params.familyID;
  },
};
</script>

<style lang="scss" scoped>
.details-section {
  margin: 0 auto;
  max-width: 80vw;
}
.house-heading {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: baseline;
  background: var(--accent-color);
  color: var(--background-color);
  padding: 0.5rem;
}
h2 {
  margin: 0;
}
.words {
  margin: 0;
}
.coat-of-arms {
  margin: 0;
  padding: 2rem;
  background: #cccccc6e;
  font-style: italic;
  border-left: 1px solid var(--accent-color);
  border-right: 1px solid var(--accent-color);
}
.house-info-wrapper {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border: 1px solid var(--accent-color);
  border-top: none;
}
.inner-info-wrapper {
  width: 90%;
  display: flex;
  flex-flow: row;
  p:first-child {
    width: 25%;
    text-align: left;
    margin-left: 1rem;
  }
  p:last-child {
    width: 75%;
    text-align: left;
  }
}
.house-sworn-members {
  text-align: left;
}
</style>
