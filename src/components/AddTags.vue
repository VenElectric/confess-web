<template>
  <div class="tag-input">
    <div v-for="(tag, index) in tagItems" :key="index" class="tags">
      <span @click.prevent="remove_tag(index)" class="remove">x</span>
      <span>{{ tag }}</span>
    </div>
    <input
      type="text"
      placeholder="Type a tag and press enter"
      class="tag-text"
      @keydown.enter="add_tag"
      @keydown.delete="remove_last"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from "vue";

export default defineComponent({
  name: "AddTags",
  emits: ["tags", "remove"],
  props: { tagItems: { type: Array as PropType<string[]>, required: true } },
  setup(props, context) {
    function add_tag(event: any) {
      event.preventDefault();
      context.emit("tags", event.target.value);
      event.target.value = "";
    }

    function remove_tag(index: number) {
      context.emit("remove", index);
    }

    function remove_last() {
      let index = props.tagItems.length - 1;
      remove_tag(index);
    }

    return { add_tag, remove_tag, remove_last };
  },
});
</script>

<style scoped>
.tag-input {
  border: 1px solid rgba(143, 138, 138, 0.979);
  width: 80%;
  font-size: 0.9em;
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  flex-flow: wrap;
  align-items: center;
  padding: 0.5em;
}
.tag-text {
  border: none;
  outline: none;
  width: 70%;
  font-size: 0.9em;
  background: none;
  float: left;
}
.remove {
  cursor: pointer;
}
.tags {
  display: flex;
  align-items: center;
  justify-content: space-around;
  float: left;
  border: 1px solid black;
  border-radius: 5px;
  padding: 2px;
  height: 1em;
  width: 3em;
  font-size: 0.9em;
}
</style>
