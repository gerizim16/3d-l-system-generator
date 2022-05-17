<script setup>
import Turtle from "@/utils/Turtle";
import { reactive, watch } from "vue";

const props = defineProps(Object.keys(Turtle.defaults));

const data = reactive(Object.assign({}, props));

watch(props, (new_props) => {
  Object.assign(data, new_props);
});

const emit = defineEmits(
  Object.keys(Turtle.defaults).map((key) => `update:${key}`)
);

function submit() {
  for (const [key, value] of Object.entries(data)) {
    emit(`update:${key}`, value);
  }
}

const nonNegRule = [
  (v) => (Number.isFinite(v) && v >= 0) || "Must be a non-negative number.",
];
</script>

<template>
  <v-form>
    <v-text-field
      v-for="name of Object.keys(data)"
      v-model="data[name]"
      :label="name"
      type="number"
      step="0.1"
      :rules="nonNegRule"
      variant="outlined"
      color="accent"
      bg-color="grey"
    ></v-text-field>
    <v-btn @click="submit" color="accent" type="submit" block>Update</v-btn>
  </v-form>
</template>
