<template>
  <div v-if="isMobile()">
    <div id="nav">
      <router-link to="/">Confessions</router-link> |
      <router-link to="/createnew">Create New</router-link>
    </div>
    <router-view />
  </div>
  <div v-else>
    <Desktop />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Desktop from "./views/Desktop.vue";

export default defineComponent({
  components: {
    Desktop,
  },
  setup() {
    function isMobile() {
      if (screen.width <= 760) {
        return true;
      }
    }
    return { isMobile };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  padding: 20px 0;
  overflow: hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #94b8da;
    }
  }
}

body {
  background: rgb(111, 142, 201);
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
