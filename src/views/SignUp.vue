<template>
  <div>
    <form class="signup">
      <input type="text" />
      <input type="password" />
      <button type="submit">Sign Up and Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      logged_in: true,
    };
  },
});
</script>

<style></style>
