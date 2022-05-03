<script setup>
import { reactive, ref } from "vue";
import { computed } from "@vue/reactivity";

import RenderWindow from "./components/RenderWindow.vue";
import "@/styles/global.scss";

const positiveRule = [
  (v) => (Number.isInteger(v) && v > 0) || "Must be a positive number",
];

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

const formData = reactive({
  iterations: 4,
  axiom: "",
  productions: "",
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
        <v-form>
          <v-text-field
            v-model="formData.iterations"
            label="Iterations"
            type="number"
            variant="outlined"
            color="accent"
            bg-color="grey"
            :rules="positiveRule"
            required
          />
          <v-slider
            v-model="formData.iterations"
            label="Iterations"
            :step="1"
            :min="1"
            :max="10"
            color="accent"
            thumb-label
            ticks
          >
            <template v-slot:prepend>
              <v-btn
                size="small"
                variant="text"
                icon="mdi-minus"
                :color="color"
                @click="formData.iterations--"
                :disabled="formData.iterations <= 1"
              ></v-btn>
            </template>

            <template v-slot:append>
              <v-btn
                size="small"
                variant="text"
                icon="mdi-plus"
                :color="color"
                @click="formData.iterations++"
              ></v-btn>
            </template>
          </v-slider>

          <v-text-field
            v-model="formData.axiom"
            label="Axiom"
            variant="outlined"
            color="accent"
            bg-color="grey"
            required
          />
          <v-textarea
            v-model="formData.productions"
            variant="outlined"
            label="Productions"
            color="accent"
            bg-color="grey"
            required
          />
        </v-form>
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
