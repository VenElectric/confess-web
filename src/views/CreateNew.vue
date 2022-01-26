<template>
  <form @submit.prevent="add_confession">
    <div class="submit-outer">
      <div class="submit-inner">
        <input
          type="text"
          placeholder="Title"
          v-model="data.title"
          class="submit-title"
        />
        <textarea
          placeholder="Confess..."
          v-model="data.confession"
          maxlength="240"
          class="submit-area"
        ></textarea>
        <AddTags
          @tags="add_tag"
          :tagItems="data.tags"
          @remove="remove_tag"
        ></AddTags>
        <button type="submit" class="submit-button">Add Confession</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { v4 as uuidv4 } from "uuid";
import AddTags from "../components/AddTags.vue";
import axios from "axios";
import dayjs from "dayjs";

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
        likes: 0,
        dislikes: 0,
        timestamp: dayjs(),
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
.submit-button {
  font-size: 1.5em;
  padding: 0.3em;
  margin-top: 3em;
  margin-bottom: 0;
}
.submit-title {
  font-size: 2em;
  background: rgb(48, 61, 83) !important;
  color: rgb(173, 181, 187);
}
.submit-area {
  height: 15%;
  width: 100% !important;
  background-color: rgb(48, 61, 83);
  color: rgb(173, 181, 187);
}
.submit-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 95%;
  padding: 2em;
  box-shadow: 0 0 0 5px rgba(0, 191, 255, 0.637),
    0 0 0 10px rgba(0, 190, 255, 0.2);
  border-radius: 10px;
  background-image: linear-gradient(
    to bottom,
    rgba(60, 183, 214, 0.466),
    rgba(40, 214, 199, 0)
  );
}
.submit-outer {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex: 1 1 90%;
  height: 80vh;
  margin: 2em;
}
.submit-inner > input,
textarea {
  width: 80%;
  background: none;
  border: 1px solid black;
  outline: none;
}
</style>
