<template>
  <img alt="Vue logo" src="../assets/logo.png" />
  <AllFamilies />
</template>

<script>
// @ is an alias to /src
import AllFamilies from "@/components/GotFamilies/AllFamilies.vue";

export default {
  name: "Home",
  components: {
    AllFamilies,
  },
};
</script>
