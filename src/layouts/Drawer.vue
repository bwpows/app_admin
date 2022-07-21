<script setup lang="ts">
import logoSvg from '../assets/logo.svg'


const list = [
  { text: '主控台', to: '/', icon: 'iconfont icon-dashboard'},
  { text: '任务列表', to: '/task', icon: 'iconfont icon-task' },
  { text: '作品列表', to: '/work', icon: 'iconfont icon-work' },
  { text: '消费记录', to: '/consumption', icon: 'iconfont icon-consumption' },
  { text: '客户列表', to: '/customer', icon: 'iconfont icon-customer' },
]

</script>


<template>
  <v-navigation-drawer>
    <v-list nav>
      <div class="mx-2 mt-4 mb-6 d-flex justify-start align-center">
        <v-img :src="logoSvg" contain height="26" max-width="26"></v-img>
        <div class="text-primary body-1 font-weight-bold ml-6">后台管理系统</div>
      </div>
      <v-list-item
        v-for="(item, i) in list"
        :key="i"
        :value="item"
        :to="item.to"
        active-color="primary"
        height="54"
        class="my-2 rounded-lg align-center"
      >
        <div :class="item.icon" class="text-h5 mr-5 ml-1"></div>

        <v-list-item-title v-text="item.text" class="text-body-2 px-1"></v-list-item-title>
      </v-list-item>
    </v-list>
    <template #append>
      <div class="pa-4 pt-0 text-center mt-2">
        v 1.0.0
      </div>
    </template>
  </v-navigation-drawer>

</template>
