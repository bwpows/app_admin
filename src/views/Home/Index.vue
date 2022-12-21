<script setup lang="ts">

import { Ref, ref, onMounted } from 'vue';
import { getReviewStatus, putReviewStatus } from '@/api/review';
import {getTodayView} from "@/api/view";
import {useDisplay} from "vuetify";
let reviewStatus:Ref<number> = ref(1)
let reviewStatusLoading:Ref<boolean> = ref(false)

let todayNum:Ref<number> = ref(0)

// useDisplay()
console.log(useDisplay().update())


onMounted(() => {
    getStatus()
    getTodayNum()
})

/**
 * 获取审核状态
 */
const getStatus = async () => {
    let res = await getReviewStatus()
    if(res.code == 200){
        reviewStatus.value = res.data.status
    }
}

/**
 * 修改审核状态
 */
const updateStatus = async ()=>{
    reviewStatusLoading.value = true
    await putReviewStatus({status: reviewStatus.value})
    await getStatus()
    reviewStatusLoading.value = false
}

/**
 * 获取今日浏览量
 */
const getTodayNum = async () => {
    let res = await getTodayView()
    todayNum.value = res.data.num
}

</script>

<template>
  <div class="primary--text mainBG ma-6">
    <v-row>
      <v-col xs="12" sm="6" md="6" lg="3" xl="3" cols="12">
        <v-card flat class="pa-4 rounded-lg">
          <div class="text-body-1">今日作品访问量</div>
          <div class="mt-4 text-h5 text-primary ">{{ todayNum }}</div>
        </v-card>
      </v-col>
        <v-col xs="12" sm="6" md="6" lg="3" xl="3" cols="12">
            <v-card flat class="pa-4 rounded-lg">
                <div class="text-body-1">今日新增作品</div>
                <div class="mt-4 text-h5 text-primary">12</div>
            </v-card>
        </v-col>
        <v-col xs="12" sm="6" md="6" lg="3" xl="3" cols="12">
            <v-card flat class="pa-4 rounded-lg">
                <div class="text-body-1">今日新增任务</div>
                <div class="mt-4 text-h5 text-primary">32</div>
            </v-card>
        </v-col>
      <v-col xs="12" sm="6" md="6" lg="3" xl="3" cols="12">
        <v-card flat class="px-4 py-3 rounded-lg align-center">
          <div class="text-body-1">小程序审核</div>
          <div>
            <v-switch hide-details inset @change="updateStatus" :label="reviewStatus !== 1?'审核中':'未审核'" color="primary" v-model="reviewStatus" :loading="(reviewStatusLoading)"></v-switch>
          </div>
        </v-card>
      </v-col>
      <v-col xs="12" sm="6" md="6" lg="3" xl="3" cols="12">
        <v-card flat class="pa-6 rounded-lg">
          242342
        </v-card>
      </v-col>
      <v-col xs="12" sm="6" md="6" lg="3" xl="3" cols="12">
        <v-card flat class="pa-6 rounded-lg">
          242342
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-card flat class="pa-6 rounded-lg my-8">
      23423
    </v-card> -->
    <v-btn color="primary" class="mt-6" flat>text</v-btn>
  </div>
</template>