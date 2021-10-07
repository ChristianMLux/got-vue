<template>
  <section class="details-section">
    <div class="house-heading">
      <h2>{{ this.$route.params.familyName }}</h2>
      <p class="words">{{ this.$store.getters.getCurrentFamily.words }}</p>
    </div>
    <blockquote class="coat-of-arms">
      &#187; {{ this.$store.getters.getCurrentFamily.coatOfArms }} &#171;
    </blockquote>
    <div class="house-info-wrapper">
      <div class="inner-info-wrapper">
        <p class="region-name">Region:</p>
        <p>{{ this.$store.getters.getCurrentFamily.region }}</p>
      </div>
      <div class="inner-info-wrapper" v-show="this.$route.params.currentLord">
        <p class="current-lord">Current Lord:</p>
        <p v-if="this.$store.getters.getCurrentLord.titles[0]">
          {{ this.$store.getters.getCurrentLord.titles[0] }}
          {{ this.$store.getters.getCurrentLord.name }}
        </p>
        <p v-else>{{ this.$store.getters.getCurrentLord.name }}</p>
      </div>
      <div
        class="inner-info-wrapper"
        v-if="this.$store.getters.getCurrentFounder"
      >
        <p class="house-founder">Founder:</p>

        <p v-if="this.$store.getters.getCurrentFounder.aliases[0]">
          {{ this.$store.getters.getCurrentFounder.name }}
          {{ this.$store.getters.getCurrentFounder.aliases[0] }}
        </p>
        <p v-else>{{ this.$store.getters.getCurrentFounder.name }}</p>
      </div>
      <div
        class="inner-info-wrapper"
        v-if="this.$store.getters.getCurrentFamily.heir"
      >
        <p class="house-heir">Heir:</p>
        <p>{{ this.$store.getters.getCurrentHeir.name }}</p>
      </div>
      <div class="inner-info-wrapper" v-show="this.$route.params.overlord">
        <p class="house-overlord">Overlord:</p>
        <p>{{ this.$store.getters.getCurrentOverlord.name }}</p>
      </div>
      <div
        class="inner-info-wrapper"
        v-if="this.$store.getters.getCurrentFamily.seats[0]"
      >
        <p class="house-seats">Seats:</p>
        <ul>
          <li
            v-for="seat in this.$store.getters.getCurrentFamily.seats"
            :key="seat"
          >
            {{ seat }}
          </li>
        </ul>
      </div>
      <div
        class="inner-info-wrapper"
        v-show="this.$store.getters.getCurrentFamily.swornMembers[0]"
      >
        <p>Sworn Member:</p>
        <ul class="house-sworn-members">
          <li
            v-for="member in this.$store.getters.getCurrentSwornMembers"
            :key="member"
          >
            {{ member.name }}
          </li>
        </ul>
      </div>
      <div
        class="inner-info-wrapper"
        v-show="this.$store.getters.getCurrentFamily.titles[0]"
      >
        <p class="house-titles">Titles:</p>
        <ul>
          <li
            v-for="title in this.$store.getters.getCurrentFamily.titles"
            :key="title"
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
  methods: {
    async setCurrentFamilyURL() {
      await this.$store.commit("setCurrentFamilyURL", {
        url: this.$route.params.url,
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
  async beforeCreate() {},
  async created() {
    await this.setCurrentFamilyURL();
    await this.setCurrentFamily();
    await this.setCurrentLordURL();
    if (this.$store.getters.getCurrentLordURL ?? null) {
      await this.setCurrentLord();
    }
    await this.setCurrentOverlordURL();
    if (this.$store.getters.getCurrentOverlordURL ?? null) {
      await this.setCurrentOverlord();
    }
    await this.setCurrentHeirURL();
    if (this.$store.getters.getCurrentHeirURL ?? null) {
      await this.setCurrentHeir();
    }
    await this.setCurrentFounderURL();
    if (this.$store.getters.getCurrentFounderURL ?? null) {
      await this.setCurrentFounder();
    }
    await this.setCurrentSwornMembersURL();
    if (this.$store.getters.getCurrentSwornMembersURL ?? null) {
      await this.setCurrentSwornMembers();
    }
  },
  beforeRouteUpdate() {
    this.familyName = this.$route.params.familyName;
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
