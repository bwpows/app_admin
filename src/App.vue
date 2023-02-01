<script setup lang="ts">
import SnackBar from './layouts/Snackbar.vue'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

onMounted(() => {
  console.log(333);
  
  if(!localStorage.getItem('token')){
    router.replace('/sign-in')
  }
})

</script>

<template>
    <SnackBar />
    <router-view></router-view>
</template>
