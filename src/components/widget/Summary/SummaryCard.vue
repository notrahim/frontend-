<template>
  <v-hover v-slot="{ hover }">
    <v-card
      width="200"
      height="100"
      class="rounded-xl px-1"
      :elevation="hover ? 0 : 12"
      :class="{ 'on-hover': hover }"
    >
      <v-row no-gutters>
        <v-col cols="3">
          <div class="d-flex justify-center align-center" style="height: 60px">
            <v-btn
              fab
              small
              :color="color"
              class="ml-4"
              :class="{ disableEvent: value }"
            >
              <v-icon> {{ icon }} </v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="9">
          <v-card-title class="font-weight-black py-2 mb-0" v-html="htmlRender()">
          </v-card-title>
        </v-col>
      </v-row>
      <div v-if="value" class="text-center mt-0 pt-0">
        <span class="caption text-decoration-underline">Analyser</span>
        <v-icon small class="mt-1">mdi-arrow-right-thin</v-icon>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "SummaryCard",
  props: ['value', 'type', 'icon', 'color'],
  data: () => ({
    col: true,
  }),
  methods: {
    htmlRender() {
      if (this.value) {
        return this.value + " " + this.type;
      }
      return this.type;
    },
  },
};
</script>

<style lang="scss">
.disableEvent {
  pointer-events: none;
}
.v-card__title {
  word-break: normal !important;
  line-height: 1.3rem !important;
}
.v-card .on-hover {
  background: linear-gradient(136.7deg, #f0a443 0.28%, #3136cb 101.37%);
  cursor:grabbing;
  color: white;
}
</style>
