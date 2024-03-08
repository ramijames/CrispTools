<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/lipsum">Lipsum</RouterLink>
  </nav>
</template>

<style scoped></style>
