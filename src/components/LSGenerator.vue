<script setup>
import { iterate } from "@/utils/lsystem";
import { onMounted, ref } from "vue";

const emit = defineEmits(["generate"]);

const iterations = ref(4);
const axiom = ref("cone{2,2} A");
const productions = ref(
  "A -> r{0.02} s f{0.2} e +x +y +z [ [ A ] -x A ] -x -y -z s f{0.2} e [ -x s f{0.2} e A sphere ] +x A\nf{a} -> f{a*2.5}\nf{a} -> f{a*2}\nsphere -> sphere\nsphere -> sphere{0.3}\nr{x} -> r{x*2}"
);
const error = ref(new Error());
const showError = ref(false);

const nonNegRule = [
  (v) => (Number.isInteger(v) && v >= 0) || "Must be a non-negative integer.",
];

function submit() {
  showError.value = false;
  try {
    const result = iterate(axiom.value, productions.value, iterations.value);
    emit("generate", result);
  } catch (parseError) {
    error.value = parseError;
    showError.value = true;
    throw parseError;
  }
}

onMounted(() => {
  submit();
});
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
      :rules="nonNegRule"
      required
    />
    <v-slider
      v-model="iterations"
      label="Iterations"
      :step="1"
      :min="0"
      :max="6"
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
          :disabled="iterations <= 0"
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

    <v-btn @click="submit" color="accent" type="submit" block> Generate </v-btn>
    <v-slide-y-transition>
      <v-alert
        v-model="showError"
        type="error"
        icon="mdi-alert-decagram"
        class="my-4"
        closable
      >
        <v-alert-title>{{ error }}</v-alert-title>
        <div class="text-block mono">
          {{ error?.cause }}
        </div>
      </v-alert>
    </v-slide-y-transition>
  </v-form>
</template>
