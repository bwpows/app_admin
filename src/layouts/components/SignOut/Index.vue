<script setup lang="ts">

import {ref} from "vue";
import router from "@/router";

const dialog = ref<boolean>(false)

const exit = async ():Promise<void> => {
    localStorage.clear()
    await router.replace('/sign-in')
}

</script>

<template>
    <v-dialog max-width="500" v-model="dialog">
        <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
                <i class="iconfont icon-tuichudenglu text-h6"></i>
            </v-btn>
        </template>

        <v-card class="pa-3">
            <v-card-title>确定要退出登录？</v-card-title>
            <v-card-actions class="d-flex justify-end mt-4">
                <v-btn color="primary" variant="flat" class="mr-8" @click="exit">确定</v-btn>
                <v-btn variant="outlined" color="grey-darken-3" @click="dialog = false">取消</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>