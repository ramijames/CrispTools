<script setup>
import CrispLogo from "./CrispLogo.vue";

defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <nav>
    <CrispLogo />
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/lipsum">Lipsum</RouterLink>
  </nav>
</template>

<style scoped>
/* Nav */

nav {
  background: #000;
  display: flex;
  flex-direction: row;
  align-items: center;
}

nav a {
  color: #fff;
  padding: 0.1rem 1rem 0 1rem;
  text-decoration: none;
  font-weight: bold;
  border: 2px solid transparent;
  line-height: 24px;
  border-radius: 6px;
}

nav a.router-link-active {
  border: 2px solid white;
}
</style>
