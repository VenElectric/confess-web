<template>
  <div>
    <form class="login">
      <input type="text" />
      <input type="password" />
      <button type="submit">Login</button>
    </form>
    <router-link to="/signup">Sign Up</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
});
</script>

<style scoped>
.login {
  display: flex;
}
</style>
