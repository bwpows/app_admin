<script setup lang="ts">
import { useRoute } from 'vue-router';
import {computed, onMounted, Ref, ref} from "vue";
import {store} from "@/store";
import {DisplayBreakpoint, useDisplay} from "vuetify";

const currentRouter = useRoute();
let breakpoint: Ref =(useDisplay().name)
let mobile = ref<boolean>(false);
onMounted(() => {
    if(breakpoint.value == 'xs' || breakpoint.value == 'sm') {
        mobile.value = false
    }else{
        mobile.value = true
    }
})

let rail = computed(() => store.state.menuExpand)
let showDrawer = computed(() => store.state.showDrawer)

const changeRail = () => {
    if(!mobile.value){
        store.commit('setShowDrawer', !showDrawer.value)
    }else{
        store.commit('setMenuExpand', !rail.value)
    }
}
</script>

<template>
    <v-app-bar flat fluid color="mainBG">
        <i class="iconfont icon-ego-menu ml-6 text-h6" @click="changeRail"></i>
        <div class="font-weight-bold ml-4">
            {{ currentRouter.meta.title }}
        </div>
    </v-app-bar>
</template>