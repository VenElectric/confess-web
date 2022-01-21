<template>
  <div class="about">
    <Confess />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Confess from "../components/Confess.vue";

export default defineComponent({
  name: "Random",
  components: {
    Confess,
  },
  data() {
    return {
      feed_list: [],
    };
  },
  methods: {
    confess_prev: function () {
      console.log("test");
    },
    confess_next: function () {
      console.log("test");
    },
  },
});
</script>
