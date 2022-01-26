<template>
  <div class="flex flex-column">
    <h1>Confess! Confess! Confess!</h1>
    <div class="text-block">
      <p>Visit the site on your mobile phone to confess your heart out!</p>
      <p>Add your confession to the massess and relieve yourself of guilt!</p>
      <p>
        The site does not track who you are and it doesn't require a log in. No
        confessions of yours are tracked.
      </p>
      <p>
        You can create a confession with a Title, Description, and list of tags.
      </p>
      <p>
        If you're looking for a specific subset of confessions, use the search
        functionality at the bottom of the page.
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Desktop",
  setup() {
    console.log("test");
  },
});
</script>

<style>
.text-block {
  font-size: 2em;
}
</style>
