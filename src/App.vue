<script setup>
import "@/styles/global.scss";

import { onMounted, ref, watch } from "vue";
import { computed } from "@vue/reactivity";

import RenderWindow from "./components/RenderWindow.vue";
import LSForm from "./components/LSForm.vue";
import DefaultsForm from "./components/DefaultsForm.vue";
import EnvironmentForm from "./components/EnvironmentForm.vue";

import Turtle from "@/utils/Turtle";
import { ENVIRONMENTS } from "@/utils/Environment";
import PRESETS from "@/utils/presets";

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

const lsystem = ref({});
const defaults = ref(Object.assign({}, Turtle.defaults));
const environment = ref({});
const presetName = ref("");

const commands = ref([]);

watch(
  () => presetName.value,
  (new_val) => {
    const p = PRESETS.find((x) => x.name === new_val);
    lsystem.value = Object.assign({}, p.lsystem);
    defaults.value = Object.assign({}, p.defaults);
    environment.value = Object.assign({}, p.environment);
  }
);

onMounted(() => {
  presetName.value = PRESETS[0].name;
});
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

    <v-navigation-drawer
      v-model="drawer"
      color="secondary"
      width="500"
      touchless
    >
      <v-container>
        <v-select
          label="Preset"
          :items="PRESETS.map((x) => x.name)"
          v-model="presetName"
          outlined
        ></v-select>
        <v-expansion-panels v-model="panels" multiple>
          <v-expansion-panel>
            <v-expansion-panel-title>Defaults</v-expansion-panel-title>
            <v-expansion-panel-text>
              <DefaultsForm
                v-model:length="defaults.length"
                v-model:angle="defaults.angle"
                v-model:radius="defaults.radius"
                v-model:size="defaults.size"
              ></DefaultsForm>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>L-system</v-expansion-panel-title>
            <v-expansion-panel-text eager>
              <LSForm
                v-model:axiom="lsystem.axiom"
                v-model:productions="lsystem.productions"
                v-model:iterations="lsystem.iterations"
                @generate="(x) => (commands = x)"
              ></LSForm>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title
              >Environment Settings</v-expansion-panel-title
            >
            <v-expansion-panel-text>
              <EnvironmentForm
                v-model:autoRotate="environment.autoRotate"
                v-model:modelAngle="environment.modelAngle"
                v-model:envName="environment.envName"
              >
              </EnvironmentForm>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>Help</v-expansion-panel-title>
            <v-expansion-panel-text>Help here</v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </v-navigation-drawer>

    <v-main>
      <RenderWindow
        :commands="commands"
        :defaults="defaults"
        :autoRotate="environment.autoRotate"
        :modelAngle="environment.modelAngle"
        :env-name="environment.envName"
      />
    </v-main>
  </v-app>
</template>

<style>
#app {
  margin: 0;
  height: 100%;
}
</style>
