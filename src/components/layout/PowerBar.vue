<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
  },
  setup(props) {
    return {
      props
    };
  }
}

</script>

<template>
  <section id="powerbar" class="flex flex-1 flex-col pb-6 px-6 w-full justify-between">
    <section id="title" class="flex flex-col justify-center gap-1">
      <h1 class="text-slate-500 font-semibold text-2xl">{{ props.title }}</h1>
      <p class="text-xs text-slate-400">{{ props.description }}</p>
    </section>
  </section>
</template>