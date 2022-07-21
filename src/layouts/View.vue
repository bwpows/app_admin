<script lang="ts" setup>
import { ref, computed } from 'vue';
import { createVuetify } from 'vuetify';

// const themeIsDark = this.$vuetify.theme.current

</script>

<template>

  <v-main fluid class="mainBG" :style="{backgroundColor: '#'+ $vuetify.theme.themes[ $vuetify.theme.current ].colors.mainBG }">
    <router-view :key="$route.path" />
  </v-main>
</template>