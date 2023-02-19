<script setup lang="ts">
import logoSvg from '../assets/logo.svg'
import {computed, onMounted, ref} from "vue";
import { useDisplay, DisplayBreakpoint } from 'vuetify'
import {store} from "@/store";

const list = [
    { text: '主控台', to: '/home', icon: 'iconfont icon-dashboard'},
    { text: '任务列表', to: '/task', icon: 'iconfont icon-task' },
    { text: '作品列表', to: '/work', icon: 'iconfont icon-work' },
    { text: '客户列表', to: '/customer', icon: 'iconfont icon-customer' },
    { text: '标签列表', to: '/tag', icon: 'iconfont icon-biaoqian' },
    { text: '留言管理', to: '/message', icon: 'iconfont icon-liuyan' },
    { text: '工单管理', to: '/work-order', icon: 'iconfont icon-workorder' },
    { text: '登录历史', to: '/login-history', icon: 'iconfont icon-lishi' },
]


// 利用是不是移动端
let breakpoint = ref<DisplayBreakpoint | number>()
let mobile = ref<boolean>(false);
onMounted(() => {
    breakpoint = useDisplay().name
    if(breakpoint.value == 'xs' || breakpoint.value == 'sm') {
        mobile.value = false
    }else{
        mobile.value = true
        store.commit('setMenuExpand', false)
    }
    store.commit('setShowDrawer', mobile.value)
})

let showDrawer = computed(() => {
    return store.state.showDrawer
})

// 获取 pinia 的值
let rail = computed(() => {
    return store.state.menuExpand
})



// 如果是移动端，点击导航栏完成关闭
const changeRail = () => {
    if(!mobile.value){
        store.commit('setShowDrawer', false)
    }
}



</script>


<template>
  <v-navigation-drawer @update:modelValue="changeRail" v-model="showDrawer" :rail="rail" rail-width="66" @click="changeRail">
    <v-list nav>
        <v-list-item class="my-2 rounded-lg d-flex align-center">
            <template v-slot:prepend>
                <v-img :src="logoSvg" contain height="26" width="26" class="ml-1 mr-7"></v-img>
            </template>
            <template v-slot:title>
                <div class="text-body-1 font-weight-bold">后台管理系统</div>
            </template>
        </v-list-item>
        <v-list-item
            v-for="(item, i) in list"
            :key="i"
            :value="item"
            :to="item.to"
            active-color="primary"
        >
            <div :class="item.icon" class="text-h5 mr-5 ml-1"></div>

            <v-list-item-title v-text="item.text" class="text-body-2 px-1"  ></v-list-item-title>
        </v-list-item>
    </v-list>
    <template #append>
      <div class="py-4 pt-0 text-center mt-2 text-grey">
        v 1.0.1
      </div>
    </template>
  </v-navigation-drawer>

</template>

<style>

  .v-list-item__content{
    display: flex;
    align-items: center;
  }

  .max-width-26 {
      max-width: 26px;
  }

  .height-transition {
      overflow: hidden;
      transition: width .2s;
  }

  .height-0 {
      width: 0px !important;
  }

  .height-p-100 {
      width: 50px;
  }

</style>
