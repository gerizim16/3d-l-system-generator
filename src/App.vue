<script setup>
import { ref } from "vue";
import { computed } from "@vue/reactivity";

import RenderWindow from "./components/RenderWindow.vue";
import "@/styles/global.scss";
import Form from "./components/Form.vue";

const lightMode = ref(
  !(
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )
);
const drawer = ref(true);
const theme = computed(() => {
  return lightMode.value ? "light" : "dark";
});

const commands = ref("");
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar color="primary">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />

      <v-app-bar-title>3D L-system generator</v-app-bar-title>

      <template v-slot:append>
        <v-switch
          v-model="lightMode"
          append-icon="mdi-theme-light-dark"
          inset
          dense
          hide-details
        ></v-switch>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" color="secondary" width="500">
      <v-container>
        <Form @generate="(x) => (commands = x)"></Form>
      </v-container>
    </v-navigation-drawer>

    <v-main>
      <RenderWindow :commands="commands" />
    </v-main>
  </v-app>
</template>

<style>
#app {
  margin: 0;
  height: 100%;
}
</style>
