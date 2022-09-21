<template>
  <v-app-bar app elevation="0" height="50" align="center">
    <h2 class="font-weight-thin">Bienvenue sur Formalis!</h2>
    <v-spacer></v-spacer>
    <v-badge bordered dot overlap color="accent">
      <v-icon color="black">mdi-bell</v-icon>
    </v-badge>
    <div class="ml-4 d-flex align-center">
      <span class="user-name">{{ data[0].firstname }} {{data[0].lastname}}</span>
      <v-avatar size="40" class="ml-4 pa-6">
        <img
          src="https://image.shutterstock.com/image-photo/portrait-beautiful-young-woman-working-260nw-329231378.jpg"
          alt="UserAvatar"
        />
      </v-avatar>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    data: Array,
  },
  methods: {
    showDialog() {
      this.$emit("showDialog");
    },
  },
};
</script>

<style lang="scss">
.user-name {
  font-size: 18px;
}
</style>
