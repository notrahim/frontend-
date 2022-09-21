<template>
  <v-hover v-slot="{ hover }">
    <v-card
      height="65"
      width="250"
      class="rounded-xl"
      color="#2C2C2C"
      :elevation="hover ? 0 : 12"
      :class="{ 'on-hover': hover }"
    >
      <div class="d-flex align-center justify-center pa-2">
        <v-card-title
          v-text="value"
          class="white--text text-center"
        ></v-card-title>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: ['value'],
};
</script>

<style lang="scss">
  .v-card .on-hover {
    background: linear-gradient(136.7deg, #f0a443 0.28%, #3136cb 101.37%);
    color: white;
  }
</style>