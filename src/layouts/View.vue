<script lang="ts" setup>

    import SnackBar from './Snackbar.vue'
    import { useTheme } from 'vuetify';

    let theme = useTheme()

    let bgc = theme.themes.value[theme.global.name.value].colors.mainBG;

</script>

<template>
    <v-main fluid :style="{ 'background-color': bgc}">
<!--        <SnackBar />-->
        <router-view :key="$route.path" />
    </v-main>
</template>