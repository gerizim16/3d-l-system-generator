<script setup>
import { ENVIRONMENTS } from "@/utils/Environment";

const props = defineProps({
  autoRotate: {
    type: Boolean,
    default: true,
  },
  modelAngle: {
    type: Number,
    default: 0,
  },
  envName: {
    type: String,
    default: ENVIRONMENTS[0].name,
  },
});

const emit = defineEmits(
  ["autoRotate", "modelAngle", "envName"].map((key) => `update:${key}`)
);
</script>

<template>
  <v-form>
    <v-switch
      :model-value="props.autoRotate"
      @update:modelValue="(x) => $emit('update:autoRotate', x)"
      label="Autorotate"
      inset
    ></v-switch>
    <v-label>Angle</v-label>
    <v-slider
      :model-value="props.modelAngle"
      @update:model-value="(x) => $emit('update:modelAngle', x)"
      label="Angle"
      :step="1"
      :min="0"
      :max="360"
      color="accent"
      thumb-label
      ticks
    ></v-slider>
    <v-select
      label="Environment"
      :items="ENVIRONMENTS.map((item) => item.name)"
      :modelValue="props.envName"
      @update:model-value="(x) => $emit('update:envName', x)"
      outlined
    ></v-select>
  </v-form>
</template>
