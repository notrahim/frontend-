<template>
  <v-card width="100%" height="78" class="rounded-xl pt-2 pa-4">
    <v-card-title class="py-1 pl-4 font-weight-black title"
      >{{mode}} {{valid}}/ {{pending}} </v-card-title
    >
    <v-row align="center" no-gutters>
      <v-col cols="2" class="pl-4 d-flex justify-center">
        <span class="font-weight-black title">{{progressValue}}%</span>
      </v-col>
      <v-col cols="10" class="pr-6">
        <v-progress-linear
          height="12"
          rounded
          :value="progressValue"
          color="accent"
        ></v-progress-linear>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ['mode' , 'valid' , 'pending' , 'progressValue' , 'fetchData'],  

  
};
  </script>