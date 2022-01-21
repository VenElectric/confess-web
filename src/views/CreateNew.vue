<template>
  <form @submit.prevent="add_confession" class="submit-outer">
    <div class="submit-inner">
      <input type="text" placeholder="Title" v-model="data.title" />
      <textarea placeholder="Confess..." v-model="data.confession"></textarea>
      <AddTags
        @tags="add_tag"
        :tagItems="data.tags"
        @remove="remove_tag"
      ></AddTags>
      <button type="submit">Add Confession</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { v4 as uuidv4 } from "uuid";
import AddTags from "../components/AddTags.vue";
import axios from "axios";

export default defineComponent({
  name: "CreateNew",
  components: { AddTags },
  setup() {
    const data = reactive({ tags: [] as string[], title: "", confession: "" });

    function add_tag(tag: string) {
      // event.preventDefault();

      if (tag.length > 0) {
        data.tags.push(tag);
      }
    }

    function remove_tag(index: number) {
      data.tags.splice(index, 1);
    }

    function add_confession(e: any) {
      let c_id = uuidv4();
      e.target.elements[0].value = "";
      let options = {
        id: c_id,
        title: data.title,
        text: data.confession,
        tags: data.tags,
      };

      axios
        .post("http://localhost:3000/confessions", options)
        .then((res: any) => {
          console.log(res);
          data.tags = [];
          data.title = "";
          data.confession = "";
        })
        .catch((error: any) => {
          console.warn(error);
        });
    }
    return { add_confession, data, add_tag, remove_tag };
  },
});
</script>

<style scoped>
.submit-inner {
  height: 18vw;
  width: 30vw;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 0 0 5px rgba(0, 191, 255, 0.637),
    0 0 0 10px rgba(0, 190, 255, 0.2);
  border-radius: 10px;
  padding: 5px;
  background-image: linear-gradient(
    to bottom,
    rgba(60, 183, 214, 0.466),
    rgba(40, 214, 199, 0)
  );
}
.submit-outer {
  display: flex;
  justify-content: center;
}
.submit-inner > input,
textarea {
  width: 80%;
  background: none;
  border: 1px solid black;
  outline: none;
}
</style>
