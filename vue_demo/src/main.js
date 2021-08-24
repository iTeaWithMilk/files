import Vue from "vue";
import App from "./App.vue";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
class Person {
  constructor(name) {
    this.name = name;
  }
}
let a = new Person("andy");
console.log(a.name);
