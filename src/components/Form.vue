<script setup>
import parseLsystem from "@/utils/lsystem";

import { ref } from "vue";

const emit = defineEmits({
  generate(result) {
    return result == null;
  },
});

const iterations = ref(4);
const axiom = ref("");
const productions = ref("");

const positiveRule = [
  (v) => (Number.isInteger(v) && v > 0) || "Must be a positive number.",
];

function submit() {
  const result = parseLsystem(iterations.value, axiom.value, productions.value);
  if (result != null) {
    emit("generate", result);
  }
}
</script>

<template>
  <v-form ref="form">
    <v-text-field
      v-model="iterations"
      label="Iterations"
      type="number"
      variant="outlined"
      color="accent"
      bg-color="grey"
      :rules="positiveRule"
      required
    />
    <v-slider
      v-model="iterations"
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
          @click="iterations--"
          :disabled="iterations <= 1"
        ></v-btn>
      </template>

      <template v-slot:append>
        <v-btn
          size="small"
          variant="text"
          icon="mdi-plus"
          :color="color"
          @click="iterations++"
        ></v-btn>
      </template>
    </v-slider>

    <v-text-field
      v-model="axiom"
      label="Axiom"
      variant="outlined"
      color="accent"
      bg-color="grey"
      required
    />
    <v-textarea
      v-model="productions"
      variant="outlined"
      label="Productions"
      color="accent"
      bg-color="grey"
      required
    />

    <v-btn @click="submit" type="submit" block> Generate </v-btn>
  </v-form>
</template>
