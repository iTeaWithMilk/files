<template>
  <div>
    <h1>hello {{ name }}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: ["name"],
};
</script>

<style scoped>
h1 {
  color: tomato;
}
</style>
