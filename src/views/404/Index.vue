<template>
    <div class="d-flex justify-center align-center" style="height: 90vh;">
        <div>
            <div class="d-flex justify-center mb-10">
                <img src="@/assets/image/404.svg" style="width: 60%; margin: 40px auto;">
            </div>
            <div class="ma-10 font-size-18 font-blod-500 text-center">
                <div class="font-size-24">404  页面不存在啦</div>
                <v-btn flat class="mt-6" color="primary" @click="goHome">返回首页</v-btn>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import router from "@/router";

const goHome = ():void => {
    router.replace('/')
}

</script>