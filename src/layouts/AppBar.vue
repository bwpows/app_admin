<script setup lang="ts">
import { useRoute } from 'vue-router';

const currentRouter = useRoute();

</script>

<template>
    <!-- <v-app-bar flat fluid style="background-color: transparent;"> -->
    <v-app-bar flat fluid color="mainBG">
        <div class="font-weight-bold ml-4">
            {{ currentRouter.meta.title }}
        </div>
    </v-app-bar>
</template>