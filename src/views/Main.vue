<template>
  <div class="bundle">
    <div v-if="!state.loading" class="loaded">
      <h2 class="title">
        <span class="titlespan">{{ state.feed_list[state.count].title }}</span>
      </h2>
      <div class="content">
        <div class="ctext">{{ state.feed_list[state.count].text }}</div>
      </div>
      <div class="button_cage">
        <button @click="confess_prev" class="btns">Previous</button>
        <button @click="confess_next" class="btns">Next</button>
      </div>
    </div>
    <div v-else class="loading">Loading...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { IConfess } from "../interfaces/IConfess";
import axios from "axios";

export default defineComponent({
  name: "Main",
  setup() {
    const state = reactive({
      count: 0,
      page: 1,
      feed_list: [] as IConfess[],
      loading: true,
    });

    const db_url = `http://localhost:3000/confessions`;
    const page_limit = "10";

    async function confess_prev() {
      if (state.count == 0) {
        alert("You can not go back.");
      }
      if (state.count > 0) {
        state.count -= 1;
      }
      if (state.count == 0 && state.page > 1) {
        try {
          state.loading = true;
          state.page -= 1;
          let confession = await confess_get(
            db_url,
            String(state.page),
            page_limit
          );

          state.feed_list.unshift(...confession.data);
          state.loading = false;
          state.count = 10;
        } catch (error) {
          console.warn(error);
        }
      }
    }
    async function confess_next() {
      if ((state.count + 1) % 10 == 0) {
        try {
          state.loading = true;
          state.page += 1;
          let confession = await confess_get(
            db_url,
            String(state.page),
            page_limit
          );
          state.feed_list.push(...confession.data);
          if ((state.count + 1) % 30 == 0) {
            state.feed_list = state.feed_list.slice(10, -1);
            state.count -= 10;
          } else {
            state.count += 1;
          }

          state.loading = false;
        } catch (error) {
          console.warn(error);
        }
      } else {
        state.count += 1;
      }
    }

    function confess_get(url: string, page: string, limit: string) {
      return axios.get(`${url}?_page=${page}&limit=${limit}`);
    }

    async function initialize() {
      let confess_one = await confess_get(
        db_url,
        String(state.page),
        page_limit
      );
      state.feed_list = [...confess_one.data];
      state.loading = false;
    }

    initialize();

    return { state, confess_next, confess_prev };
  },
});
</script>

<style scoped>
.bundle {
  display: grid;
  align-items: center;
  justify-content: center;
  justify-items: center;
  grid-template-columns: 20vw;
}
.loaded {
  height: 18vw;
  width: 30vw;
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
.title {
  align-content: center;
  justify-content: center;
}
.titlespan {
  width: 10vw;
  padding: 5px;
}
.ctext {
  vertical-align: middle;
  height: 10vw;
  width: 30vw;
  border-radius: 10%;
}
.button_cage {
  position: sticky;
  align-content: end;
  margin-top: 20px;
}
.btns {
  box-shadow: 0 0 0 1px rgba(0, 191, 255, 0.212);
  transition: box-shadow 0.2s ease;
  text-decoration: none;
  display: inline-block;
  margin: 5px;
}
.btns:hover {
  box-shadow: 0 0 0 3px rgba(0, 191, 255, 0.637);
}
</style>
