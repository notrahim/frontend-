<template>
  <v-navigation-drawer
    v-model="show"
    app
    hide-overlay
    dark
    width="260"
    :mini-variant.sync="mini"
    permanent
    color="#2C2C2C">
    <v-btn v-if="mini==false"
          icon
          @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
    <div v-if="mini==false">
      <v-img
        src="@/assets/rect361.png"
        to="/dashboard"
        class="mx-auto mt-6"
        width="110"
        height="110"
      ></v-img>
      <p class="ml-1 mt-1 white--text logo-text text-center">FORMALIS</p>
    </div>
    <div v-else>
      <v-img
        src="@/assets/rect361.png"
        to="/dashboard"
        class="mx-auto mt-6"
        width="30"
        height="30"
      ></v-img>
      <p v-if="mini==false" class="ml-1 mt-1 white--text logo-text text-center">FORMALIS</p>
    </div>
    <div class="pa-1">
      <div class="ml-4" v-show="mini==false">
        <p class="font-weight-medium mb-0 white--text headline">Bonjour</p>
        <p class="font-weight-bold display-1 accent--text">
          M. {{ data[0].lastname }}
        </p>
      </div>
      <v-list flat>
        <v-list-item-group v-model="linkModel" color="accent">
          <v-list-item v-for="(link, i) in links" :key="i" :to="link.to">
            <v-list-item-icon>
              <v-icon v-text="link.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content style="text-align: left">
              <v-list-item-title v-text="link.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <div class="text-center mt-16">
        <v-btn rounded color="accent" class="no-uppercase black--text" large
        v-show="mini==false">
          Demande de régularisation
        </v-btn>
      </div>
    </div>
    <template v-slot:append>
      <div class="pa-2 d-flex align-center">
        <v-btn text block class="no-uppercase" @click="logout">
          <v-icon left small> mdi-logout </v-icon>
          <div v-show="mini==false">Déconnexion</div>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    value: Boolean,
    data: Array,
  },
  data: () => ({
    mini: false,
    linkModel: 0,
    paramModel: 0,
    links: [
      {
        title: "Accueil",
        icon: "mdi-notebook-multiple",
        to: "/dashboard",
      },
      {
        title: "Créer une formalité",
        icon: "mdi-newspaper-variant-outline",
        to: "/dev",
      },
      { 
        title: "Suivi de formalités", 
        icon: "mdi-send", 
        to: "/pending" 
      },
      { 
        title: "Alerte de formalités", 
        icon: "mdi-bell", 
        to: "/alert" },
    ],
  }),
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap");

.logo-text {
  font-family: "Cinzel" !important;
  font-size: 14px;
}
.no-uppercase {
  text-transform: unset !important;
}
</style>
