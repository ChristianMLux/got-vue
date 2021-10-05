<template>
  <button :class="buttonClass"><slot /></button>
</template>

<script>
export default {
  name: "MainButton",
  props: {
    buttonClass: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  font-family: "Cinzel Decorative", cursive;
  font-weight: bold;
}
</style>
