<template>
  <div>
    <h2 class="title">{{ confess_title }}</h2>
    <div>{{ confess_text }}</div>
    <button :click="confess_prev">Previous</button>
    <button :click="confess_next">Next</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Confess",
  props: {
    confess_title: String,
    confess_text: String,
    confess_prev: Function,
    confess_next: Function,
  },
});
</script>
