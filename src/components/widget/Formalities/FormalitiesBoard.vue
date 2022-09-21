<template>
  <v-card elevation="0" color="transparent" width="100%">
    <v-card-title class="font-weight-black mt-5 mb-0" style="font-size: 20px">
      Formalités envoyées
    </v-card-title>
    <formality-card :fetchData="fetchData" />
  </v-card>
</template>

<script>
export default {
  props:['fetchData'],
  components: {
    FormalityCard: () =>
      import("@/components/widget/Formalities/FormalityChart.vue"),
  },
};
</script>
