<template>
  <v-app>
    <v-app-bar
      app
      color="green"
      dark
    >
      <v-btn
        icon
        to="/"
      >
        <v-icon
          color="white"
        >
          mdi-circle
        </v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        to="/registerClient"
        text
      >
        <span class="mr-2">Registrar cliente</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    // HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
