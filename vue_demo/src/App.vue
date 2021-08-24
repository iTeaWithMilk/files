<template>
  <div>
    <HelloWorld :name="this.name" />
    <img src="./assets/logo.png" alt="" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  components: { HelloWorld },
  data() {
    return {
      name: "andy",
    };
  },
  create() {
    console.log(1);
    console.log(() => {
      return this.name;
    });
  },
};
</script>

<style></style>
