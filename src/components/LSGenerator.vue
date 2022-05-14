<script setup>
import { iterate } from "@/utils/lsystem";
import { onMounted, ref } from "vue";

const emit = defineEmits(["generate"]);

const iterations = ref(4);
const axiom = ref("m{0x594d30, 0.9, 0} A{0.2}");
const productions = ref(
  "A{r} -> l{0.2, r, r} +x +y +z [ [ A{r/2} ] -x A{r/2} ] -x -y -z l{0.2, r, r} [ -x l{0.2, r, r/2} A{r/2} m{0xf695c3, 0.7, 0} sphere ] +x A{r/2}\nl{a, b, c} -> l{a*2.5, b, c}\nl{a, b, c} -> l{a*2, b, c}\nsphere -> sphere{random()/7+0.1}"
);
const error = ref(new Error());
const showError = ref(false);

const nonNegIntRule = [
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
      :rules="nonNegIntRule"
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
