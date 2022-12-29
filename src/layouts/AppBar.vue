<script setup lang="ts">
import { useRoute } from 'vue-router';
import {computed, onMounted, Ref, ref} from "vue";
import {store} from "@/store";
import { useDisplay} from "vuetify";
import router from "@/router";
import SignOut from './components/SignOut/Index.vue'

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

const exit = () => {
    localStorage.clear()
    router.replace('/')
}
</script>

<template>
    <v-app-bar flat fluid color="mainBG">
        <i class="iconfont icon-ego-menu ml-6 text-h6" @click="changeRail"></i>
        <div class="d-flex justify-space-between mr-6 align-center" style="width: 100%;">
            <div class="font-weight-bold ml-4">
                {{ currentRouter.meta.title }}
            </div>
        </div>
        <SignOut />
    </v-app-bar>
</template>