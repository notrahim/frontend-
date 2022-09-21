<template>
  <div>
    <core-app-bar :data="response" @showDialog="show = !show" />
    <core-drawer :data="response" v-model="show" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CoreLayout",
  components: {
    CoreAppBar: () => import("./AppBar.vue"),
    CoreDrawer: () => import("./Drawer.vue"),
  },
  data() {
    return {
      show: true,
      response: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const headers = {
          authorization: "Bearer " + this.$store.state.auth.user.token,
        };
        let _response = await axios.get("fiche", {
          headers,
        });
        this.response =[ ..._response.data];
        console.log(this.response);
        console.log('header', headers)
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
