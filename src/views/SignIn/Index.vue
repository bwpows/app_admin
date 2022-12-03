<script lang="ts" setup>
import BgImage from '@/assets/image/bg.jpeg'
import { ref } from 'vue';
import { signIn } from '@/api/sign';
import { useRouter } from 'vue-router';
import {store} from "@/store";


const router = useRouter()


let loginInfo = ref({
    phone: '',
    password: ''
})

let submit = async () => {
    let res = await signIn(loginInfo.value)
    if(res.code == 200){
        localStorage.setItem('token', res.data.token)
        await router.replace('/')
    }else{
        store.commit('app/updateSnackbar', res.data)
    }
}

</script>

<template>

    <v-row class="pa-0 ma-0 align-center" style="max-height: 100vh; overflow: hidden;">
        <v-col md="8" sm="0" xs="0" lg="0" class="pa-0 login-auto" style="max-height: 100vh;">
            <v-img :src="BgImage"></v-img>
        </v-col>
        <v-col md="4" sm="12" xs="12" class="pa-0 d-flex align-center pb-16" style="height: 100vh;">
            <div style="width: 100%; margin: 0 60px;">
                <div style="color: #333; font-size: 32px; font-weight: bold;">登录您的账号</div>
                <div class="mt-4 text-grey-darken-1">更好的管理 app bwpow 后台</div>
                <v-text-field label="请输入手机号" variant="underlined" class="mt-8" v-model="loginInfo.phone"></v-text-field>
                <v-text-field type="password" label="请输入密码" variant="underlined" v-model="loginInfo.password"></v-text-field>
                <v-btn color="#121726" :flat="true" :block="true" class="rounded mt-6 text-white" size="large" @click="submit()">登录</v-btn>
            </div>
        </v-col>
    </v-row>

</template>

<style scoped>
input:focus {
    outline: none;
}

@media screen and (min-width: 320px) {
    .login-auto {
        display: none;
    }
}
@media screen and (min-width: 640px) {
    .login-auto {
        display: none;
    }
}
@media screen and (min-width: 1280px) {
    .login-auto {
        display: block;
    }
}
</style>