<template>
  <div class="inner" :class="active ? `open` : ``">
    <h2 class="title">
      <span class="titlespan">{{ feedItem.title }}</span>
    </h2>
    <div class="content">
      <div>{{ feedItem.text }}</div>
    </div>
    <div class="tag-cage">
      <div v-for="(tag, index) in feedItem.tags" :key="index" class="tag">
        {{ tag }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IConfess } from "../interfaces/IConfess";

export default defineComponent({
  name: "ConfessItem",
  props: {
    feedItem: { type: Object as PropType<IConfess>, required: true },
    active: { type: Boolean, required: true },
  },
});
</script>

<style scoped>
.inner {
  position: relative;
  width: 80vw;
  box-shadow: 0 0 0 5px rgba(0, 191, 255, 0.637),
    0 0 0 10px rgba(0, 190, 255, 0.2);
  border-radius: 10px;
  background-image: linear-gradient(
    to bottom,
    rgba(60, 183, 214, 0.466),
    rgba(40, 214, 199, 0)
  );
}
/* .open {
  transform: translateY(-50px);
} */
/* display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  padding: 2em; */
.content {
  font-size: 0.8em;
  flex-shrink: 1;
  margin: 1.5em;
}
.title {
  font-size: 2em;
  margin-top: 1em;
  border-bottom: 0.3em double black;
}
.titlespan {
  width: auto;
  padding: 5px;
}
.tag-cage {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  margin-bottom: 0;
  margin-top: auto;
}
.tag {
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
  padding: 2px;
  height: 1em;
  width: auto;
  font-size: 0.8em;
  justify-content: space-evenly;
}
</style>
