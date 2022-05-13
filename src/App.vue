<script setup>
import { ref } from "vue";
import { computed } from "@vue/reactivity";

import RenderWindow from "./components/RenderWindow.vue";
import LSGenerator from "./components/LSGenerator.vue";

import Turtle from "@/utils/Turtle";

import "@/styles/global.scss";

const lightMode = ref(
  !(
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )
);
const drawer = ref(true);
const panels = ref([1]);
const theme = computed(() => {
  return lightMode.value ? "light" : "dark";
});

const commands = ref([]);
const defaultsForm = ref(Object.assign({}, Turtle.defaults));
const defaultsCurrent = ref(Object.assign({}, Turtle.defaults));

function updateTurtleDefaults() {
  defaultsCurrent.value = Object.assign({}, defaultsForm.value);
}

const nonNegRule = [
  (v) => (Number.isFinite(v) && v >= 0) || "Must be a non-negative number.",
];
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
        <v-expansion-panels v-model="panels" multiple>
          <v-expansion-panel>
            <v-expansion-panel-title>Defaults</v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-form>
                <v-text-field
                  v-for="prop of Object.keys(defaultsForm)"
                  v-model="defaultsForm[prop]"
                  :label="prop"
                  type="number"
                  step="0.1"
                  :rules="nonNegRule"
                  variant="outlined"
                  color="accent"
                  bg-color="grey"
                ></v-text-field>
                <v-btn
                  @click="updateTurtleDefaults"
                  color="accent"
                  type="submit"
                  block
                  >Update</v-btn
                >
              </v-form>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>L-system</v-expansion-panel-title>
            <v-expansion-panel-text eager>
              <LSGenerator @generate="(x) => (commands = x)"></LSGenerator>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>Theme</v-expansion-panel-title>
            <v-expansion-panel-text>3D themes</v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>Help</v-expansion-panel-title>
            <v-expansion-panel-text>Help here</v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </v-navigation-drawer>

    <v-main>
      <RenderWindow :commands="commands" :defaults="defaultsCurrent" />
    </v-main>
  </v-app>
</template>

<style>
#app {
  margin: 0;
  height: 100%;
}
</style>
