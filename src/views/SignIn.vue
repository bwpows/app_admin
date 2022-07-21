<script lang="ts" setup>
import { useDisplay } from 'vuetify/lib/framework.mjs';
import BgImage from '../assets/image/bg.jpeg'
import { onMounted, ref, watch } from 'vue';
import { signIn } from '../api/sign';
import { useRouter } from 'vue-router';

const { mobile } = useDisplay()

const router = useRouter()

const isMobile = ref(mobile.value)

let loginInfo = ref({
    phone: '',
    password: ''
})


watch(mobile, (val) => {
  isMobile.value = val
})


let submit = async () => {
    let res = await signIn(loginInfo.value)
    if(res.data.code == 200){
        localStorage.setItem('token', res.data.data.token)
        router.replace('/')
    }
}

</script>

<template>

    <v-row class="d-flex justify-center pa-0 ma-0" style="max-height: 100vh; overflow: hidden;">
        <v-col md="8" sm="0" xs="0" class="pa-0" v-if="!isMobile">
            <v-img :src="BgImage"></v-img>
        </v-col>
        <v-col md="4" sm="12" xs="12" class="pa-0 d-flex" :class="isMobile?'mobile':'not_mobile'">
            <div style="width: 100%; margin: 0 60px;">
                <div style="color: #333; font-size: 32px; font-weight: bold;">登录您的账号</div>
                <div class="mt-4 text-grey-darken-1">更好的管理 app bwpow 后台</div>
                <v-text-field label="请输入手机号" variant="underlined" class="mt-8" v-model="loginInfo.phone"></v-text-field>
                <v-text-field label="请输入密码" variant="underlined" v-model="loginInfo.password"></v-text-field>
                <v-btn color="#121726" flat block class="rounded mt-6 text-white" size="large" @click="submit()">登录</v-btn>
            </div>
        </v-col>
    </v-row>

</template>

<style scoped>
input:focus {
    outline: none;
}
.not_mobile {
    margin-top: 20%;
}
.mobile {
    margin-top: 35%;
}
</style>