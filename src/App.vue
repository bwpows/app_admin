<script setup lang="ts">
import SnackBar from './layouts/Snackbar.vue'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

const router = useRouter()

onMounted(() => {
  if(!localStorage.getItem('token')){
    router.replace('/sign-in')
  }
})
</script>

<template>
    <SnackBar />
    <router-view></router-view>
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
} */
</style>
