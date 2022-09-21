<template>
  <v-app>
    <v-main>
      <v-container class="background" fluid>
        <core-layout v-if="$store.getters.isAuthenticated" />
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    CoreLayout: () => import("@/components/core/LayoutCore.vue"),
  },
  data: () => ({}),
  mounted() {
    console.log(this.$store.getters.isAuthenticated);
  },
};
</script>
