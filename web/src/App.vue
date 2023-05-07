<template>
  <v-app>
    <v-app-bar app color="primary">
      <div class="d-flex align-center title">URL SHORTENER</div>
    </v-app-bar>

    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script>
import Home from "./components/index.vue";

export default {
  name: "URLShortenerApp",

  components: {
    Home,
  },
};
</script>
<style scoped>
.title {
  font-size: 24px !important;
  font-weight: 700 !important;
  color: aliceblue;
}
</style>
