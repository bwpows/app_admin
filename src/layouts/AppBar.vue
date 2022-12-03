<script setup lang="ts">
import { useRoute } from 'vue-router';
import {computed} from "vue";
import {store} from "@/store";

const currentRouter = useRoute();


let rail = computed(() => store.state.menuExpand)

const changeRail = () => {
    store.commit('setMenuExpand', !rail.value)
}
</script>

<template>
    <!-- <v-app-bar flat fluid style="background-color: transparent;"> -->
    <v-app-bar flat fluid color="mainBG">
        <i class="iconfont icon-ego-menu ml-6 text-h6" @click="changeRail"></i>
        <div class="font-weight-bold ml-4">
            {{ currentRouter.meta.title }}
        </div>
    </v-app-bar>
</template>