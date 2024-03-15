<script>
import Button from "./shared/Button.vue";

export default {
  name: 'IconGen',
  data() {
    return {
      // Your component data goes here
      canvasColor: 'red'
    };
  },
  setup() {
    // Your component setup goes here
  },
  methods: {
    // Your component methods go here
    changeCanvasColor() {
      this.canvasColor = 'blue';
    }
  },
  mounted() {
    const canvas = this.$refs.canvas;
    const context = canvas.getContext('2d');

    // Draw a rectangle
    context.fillStyle = this.canvasColor;
    context.fillRect(10, 10, 100, 100);
  },
  components: {
    Button
  } 
};
</script>

<template>
  <div>
    <canvas ref="canvas" width="500" height="500"></canvas>
    <Button
          btnType="primary"
          btnText="blue"
          :onClick="changeCanvasColor" 
        />
  </div>
</template>

<style scoped>
/* Your component styles go here */
</style>