<template>
  <div v-if="!state.loading">
    <div class="content-cage" @touchstart="touchStart">
      <ul style="padding-left: 28px">
        <li
          v-for="(item, index) in state.feed_list"
          :key="index"
          :style="listPosition()"
          class="list-item"
        >
          <ConfessItem
            :active="index == state.count"
            :feedItem="item"
          ></ConfessItem>
        </li>
      </ul>
    </div>
    <Toolbar class="menu-bottom p-flex">
      <template #start>
        <Button
          class="p-button-sm btn-add"
          icon="pi pi-fw pi-plus"
          @click="toggle"
        />
        <OverlayPanel ref="op"> <CreateNew></CreateNew> </OverlayPanel>
      </template>
      <template #end>
        <InputText
          label="Tag Search"
          @change="tagSearch"
          v-model="state.tag"
          placeholder="Tag Search"
          class="tag-input p-inputtext-sm"
        ></InputText>
      </template>
    </Toolbar>
  </div>
  <div v-else class="loading">Loading...</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { IConfess } from "../interfaces/IConfess";
import axios from "axios";
import ConfessItem from "../components/ConfessItem.vue";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import OverlayPanel from "primevue/overlaypanel";
import CreateNew from "./CreateNew.vue";

export default defineComponent({
  name: "Main",
  components: {
    ConfessItem,
    Toolbar,
    InputText,
    Button,
    OverlayPanel,
    CreateNew,
  },
  setup() {
    const state = reactive({
      count: 0,
      page: 1,
      feed_list: [] as IConfess[],
      loading: true,
      tag: "",
    });
    const op = ref();
    const db_url = `http://localhost:3000/confessions`;
    const page_limit = "10";

    const toggle = (event: any) => {
      op.value.toggle(event);
    };

    function touchStart(touchEvent: TouchEvent) {
      if (touchEvent.changedTouches.length !== 1) {
        // We only care if one finger is used
        return;
      }
      const posXStart = touchEvent.changedTouches[0].clientX;
      addEventListener(
        "touchend",
        (event: TouchEvent) => touchEnd(event, posXStart),
        { once: true }
      );
    }
    function touchEnd(touchEvent: TouchEvent, posXStart: any) {
      if (touchEvent.changedTouches.length !== 1) {
        // We only care if one finger is used
        return;
      }
      const posXEnd = touchEvent.changedTouches[0].clientX;
      if (posXStart < posXEnd) {
        confess_previous(); // swipe right
      } else if (posXStart > posXEnd) {
        confess_next(); // swipe left
      }
    }

    async function confess_previous() {
      if (state.count == 0) {
        return;
      }
      if (state.count > 0) {
        state.count -= 1;
      }
    }
    async function confess_next() {
      state.count += 1;
      if (state.feed_list.length == state.count) {
        return;
      }
      if ((state.count + 2) % 10 == 0) {
        try {
          state.page += 1;
          let confession = await confess_get(
            db_url,
            String(state.page),
            page_limit
          );
          state.feed_list.push(...confession.data);
        } catch (error) {
          return;
        }
      } else {
        return;
      }
    }

    async function tagSearch() {
      let confess_one = await confess_get(
        db_url,
        String(state.page),
        page_limit,
        state.tag
      );
      state.feed_list = [...confess_one.data];
      state.count = 0;
    }

    async function confess_get(
      url: string,
      page: string,
      limit: string,
      tag?: string
    ) {
      try {
        if (tag) {
          return await axios.get(
            `${url}?_sort=timestamp&_order=asc&tags_like=${tag}&_page=${page}&limit=${limit}`
          );
        } else {
          return await axios.get(
            `${url}?_sort=timestamp&_order=asc&_page=${page}&limit=${limit}`
          );
        }
      } catch (error) {
        throw Error("There was an error");
      }
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

    function listLength() {
      return { width: state.feed_list.length * 100 + "%" };
    }
    function listPosition() {
      if (state.feed_list.length == state.count) {
        state.count = 0;
        return { transform: "translateX(-" + state.count * 100 + "%)" };
      } else {
        return { transform: "translateX(-" + state.count * 100 + "%)" };
      }
    }

    initialize();

    return {
      state,
      touchStart,
      tagSearch,
      listLength,
      listPosition,
      op,
      toggle,
    };
  },
});
</script>

<style>
.tag-search-outer {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: auto;
  margin-bottom: 0;
}
.tag-search {
  width: 80vw;
  box-shadow: 0 0 0 5px rgba(0, 191, 255, 0.637),
    0 0 0 10px rgba(0, 190, 255, 0.2);
  border-radius: 10px;
  background-image: linear-gradient(
    to bottom,
    rgba(60, 183, 214, 0.466),
    rgba(40, 214, 199, 0)
  );
  padding: 5px;
}
.tag-search > input {
  background: rgb(48, 61, 83);
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 5px;
  color: rgb(173, 181, 187);
}
.content-cage {
  height: 87vh;
  display: flex;
  align-items: center;
}
.content-cage > ul {
  list-style: none;
  display: flex;
}
.list-item {
  display: flex;
  justify-content: center;
  padding: 15px;
  transition: all 0.5s ease;
}
.menu-bottom {
  position: absolute;
  width: 100%;
  bottom: 0px;
}
.btn-home {
  float: left;
  margin-left: 0;
  margin-right: auto;
}
.btn-add {
  float: right;
  margin-left: auto;
  margin-right: 0;
}
.tag-input {
  float: right;
  margin-right: 0;
}
.p-toolbar-group-right {
  float: right;
  margin-right: 0;
  margin-left: auto;
}
.p-toolbar-group-left {
  float: right;
  margin-right: 0;
  width: 50%;
}
.p-toolbar {
  justify-content: revert;
  padding: 0.5em;
}
.p-overlaypanel {
  background-color: #57dfe6 !important;
  border: 2px solid black !important;
}
</style>
