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
    <div class="flex justify-content-around">
      <em
        class="pi pi-thumbs-up p-text-info p-2"
        :class="data.isLike ? `like` : `none-display`"
        style="font-size: 2rem"
        v-badge.info="String(data.likes)"
        @click="likeAdd"
      ></em>
      <em
        class="pi pi-thumbs-down p-text-danger p-2"
        :class="data.isDislike ? `dislike` : `none-display`"
        style="font-size: 2rem"
        v-badge.danger="String(data.dislikes)"
        @click="dislikeAdd"
      ></em>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive } from "vue";
import { IConfess } from "../interfaces/IConfess";
import axios from "axios";

export default defineComponent({
  name: "ConfessItem",
  props: {
    feedItem: { type: Object as PropType<IConfess>, required: true },
    active: { type: Boolean, required: true },
  },
  setup(props) {
    const data = reactive({
      dislikes: props.feedItem.dislikes,
      likes: props.feedItem.likes,
      isDislike: false,
      isLike: false,
    });
    let dislike = ref("none-display");
    let like = ref("none-display");
    const dbUrl = `http://localhost:3000/confessions`;

    function dislikeAdd() {
      setTimeout(async () => {
        if (!data.isLike && !data.isDislike) {
          data.dislikes += 1;
          data.isDislike = true;
          try {
            await axios.patch(`${dbUrl}/${props.feedItem.id}`, {
              dislikes: data.dislikes,
            });
          } catch (error) {
            console.info(error);
          }
          return;
        }
        if (data.isDislike) {
          data.isDislike = !data.isDislike;
          data.dislikes -= 1;
          try {
            await axios.patch(`${dbUrl}/${props.feedItem.id}`, {
              dislikes: data.dislikes,
            });
          } catch (error) {
            console.info(error);
          }
          return;
        }
        if (data.isLike && !data.isDislike) {
          data.likes -= 1;
          data.dislikes += 1;
          try {
            await axios.patch(`${dbUrl}/${props.feedItem.id}`, {
              dislikes: data.dislikes,
              likes: data.likes,
            });
          } catch (error) {
            console.info(error);
          }
          data.isLike = false;
          data.isDislike = true;
        }
      }, 100);
    }
    function likeAdd() {
      setTimeout(async () => {
        if (!data.isLike && !data.isDislike) {
          console.log("true");
          data.likes += 1;
          data.isLike = true;
          try {
            await axios.patch(`${dbUrl}/${props.feedItem.id}`, {
              likes: data.likes,
            });
          } catch (error) {
            console.info(error);
          }
          return;
        }
        if (data.isLike) {
          data.isLike = !data.isLike;
          data.likes -= 1;
          try {
            await axios.patch(`${dbUrl}/${props.feedItem.id}`, {
              likes: data.likes,
            });
          } catch (error) {
            console.info(error);
          }
          return;
        }
        if (!data.isLike && data.isDislike) {
          data.dislikes -= 1;
          data.likes += 1;
          try {
            await axios.patch(`${dbUrl}/${props.feedItem.id}`, {
              dislikes: data.dislikes,
              likes: data.likes,
            });
          } catch (error) {
            console.info(error);
          }
          data.isLike = true;
          data.isDislike = false;
        }
      }, 100);
    }

    return { like, dislike, dislikeAdd, likeAdd, data };
  },
});
</script>

<style scoped>
.inner {
  position: relative;
  width: 80vw;
  height: 50vh;
  box-shadow: 0 0 0 5px rgba(0, 191, 255, 0.637),
    0 0 0 10px rgba(0, 190, 255, 0.2);
  border-radius: 10px;
  background-image: linear-gradient(
    to bottom,
    rgba(60, 183, 214, 0.466),
    rgba(40, 214, 199, 0)
  );
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1em;
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
}
.title {
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
.like {
  border: 2px solid rgb(82, 205, 236);
  border-radius: 40%;
}
.none-display {
  border: 2px solid transparent;
  border-radius: 40%;
}
.dislike {
  border: 2px solid rgb(250, 158, 158);
  border-radius: 40%;
}
</style>
