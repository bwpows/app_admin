
<template>
    <div class="primary--text mainBG ma-6" v-if="!loading">
        <v-row>
            <v-col xs="12" sm="6" md="6" lg="3" xl="3" cols="12">
                <v-card flat class="pa-4 rounded-lg" :loading="loading">
                    <div class="text-body-1">今日作品访问量</div>
                    <div class="mt-4 text-h5 text-primary">{{ dashboardData.todayViewNums }}</div>
                </v-card>
            </v-col>
            <v-col xs="12" sm="6" md="6" lg="3" xl="3" cols="12">
                <v-card flat class="pa-4 rounded-lg" :loading="loading">
                    <div class="text-body-1">今日新增作品</div>
                    <div class="mt-4 text-h5 text-primary">{{ dashboardData.todayAddWorkNums }}</div>
                </v-card>
            </v-col>
            <v-col xs="12" sm="6" md="6" lg="3" xl="3" cols="12">
                <v-card flat class="pa-4 rounded-lg" :loading="loading">
                    <div class="text-body-1">今日新增任务</div>
                    <div class="mt-4 text-h5 text-primary">{{ dashboardData.todayAddTaskNums }}</div>
                </v-card>
            </v-col>
            <v-col xs="12" sm="6" md="6" lg="3" xl="3" cols="12">
                <v-card flat class="px-4 py-3 rounded-lg align-center" :loading="loading">
                    <div class="text-body-1">小程序审核</div>
                    <div>
                        <v-switch
                            hide-details
                            inset
                            @change="updateStatus"
                            :label="dashboardData.reviewStatus?'审核中':'未审核'"
                            color="primary"
                            v-model="dashboardData.reviewStatus"
                            :loading="loading"
                        ></v-switch>
                    </div>
                </v-card>
            </v-col>
            <v-col xs="12" sm="12" md="12" lg="6" xl="6" cols="12">
                <v-card flat class="px-4 py-3 rounded-lg align-center">
                    <div id="task-chart" style="height: 350px;"></div>
                </v-card>
            </v-col>

            <v-col xs="12" sm="12" md="12" lg="6" xl="6" cols="12">
                <v-card flat class="px-4 py-3 rounded-lg align-center">
                    <div id="user-chart" style="height: 350px;"></div>
                </v-card>
            </v-col>

            <v-col xs="12" sm="12" md="12" lg="6" xl="6" cols="12">
                <v-card flat class="px-4 py-3 rounded-lg align-center">
                    <div id="income-chart" style="height: 350px;"></div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">

import { Ref, ref, onMounted, nextTick } from 'vue';
import { putReviewStatus } from '@/api/review';
import {getDashboard} from "@/api/dashboard";
import FormatTime from "@/utils/formatTime";
import * as echarts from 'echarts';

let reviewStatusLoading:Ref<boolean> = ref(false)
let dashboardData = ref()
let loading = ref<Boolean>(true)
onMounted(() => {
    getData()
})

/**
 * 修改审核状态
 */
const updateStatus = async ()=>{
    reviewStatusLoading.value = true
    await putReviewStatus({status: dashboardData.value.reviewStatus})
    await getData()
    reviewStatusLoading.value = false
}

/**
 * 获取数据
 */
const getData = async () => {
    loading.value = true
    let res = await getDashboard()
    loading.value = false
    dashboardData.value = res.data
    await nextTick(() => {
        initTaskChart()
    })
}

// 初始化图标
const initTaskChart = () => {
    let dateList = getCurrentYearData()

    for (let i = 0; i < dateList.length; i++){
        for (let j = 0; j < dashboardData.value?.monthAddTaskList.length; j++){
            if(dateList[i].name == dashboardData.value?.monthAddTaskList[j]._id){
                dateList[i].taskValue = dashboardData.value?.monthAddTaskList[j].totalSum
            }
        }
        for (let j = 0; j < dashboardData.value?.monthAddWorkList.length; j++){
            if(dateList[i].name == dashboardData.value?.monthAddWorkList[j]._id){
                dateList[i].workValue = dashboardData.value?.monthAddWorkList[j].totalSum
            }
        }
        for (let j = 0; j < dashboardData.value?.monthAddViewList.length; j++){
            if(dateList[i].name == dashboardData.value?.monthAddViewList[j]._id){
                dateList[i].viewValue = dashboardData.value?.monthAddViewList[j].totalSum
            }
        }
    }
    dateList = dateList.reverse()
    // console.log(dateList)
    let myChart = echarts.init(document.getElementById('task-chart') as HTMLDivElement)
    myChart.setOption({
        title: {
            text: '月度作品/浏览量'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            "axisLine":{
                "show":false  //隐藏x轴线
            },
            "axisTick":{
                "show":false //隐藏x轴刻度
            },
            data: dateList.map(item => item.name.slice(5, 8) + '月')
        },
        yAxis: {
            show: false
        },
        grid: {
            top: 30,
            left: 10,
            right: 10,
            bottom: 30,
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: 'none'
            }
        },
        series: [
            {
                name: '作品量',
                type: 'bar',
                data: dateList.map(item => item.workValue),
                itemStyle: {
                    borderRadius: [10, 10, 10, 10],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 1,
                            color: '#fe4d00'
                        },
                        {
                            offset: 0,
                            color: '#F18A4D'
                        }
                    ])
                }
            },
            {
                symbol: 'none',
                name: '浏览量',
                type: 'line',
                data: dateList.map(item => item.viewValue),
                smooth: true,
                itemStyle: {
                    borderRadius: [10, 10, 10, 10],
                    color: '#a78e7a'
                }
            }
        ]
    })

    let myUserChart = echarts.init(document.getElementById('user-chart') as HTMLDivElement)
    myUserChart.setOption({
        title: {
            text: '月度任务量'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            "axisLine":{
                "show":false  //隐藏x轴线
            },
            "axisTick":{
                "show":false //隐藏x轴刻度
            },
            data: dateList.map(item => item.name.slice(5, 8) + '月')
        },
        yAxis: {
            show: false
        },
        grid: {
            top: 30,
            left: 10,
            right: 10,
            bottom: 30,
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: 'none'
            }
        },
        series: [
            {
                name: '任务量',
                type: 'bar',
                data: dateList.map(item => item.taskValue),
                itemStyle: {
                    borderRadius: [10, 10, 10, 10],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 1,
                            color: '#0740dc'
                        },
                        {
                            offset: 0,
                            color: '#188bce'
                        }
                    ])
                }
            },
        ]
    })
    let myIncomeChart = echarts.init(document.getElementById('income-chart') as HTMLDivElement)
    myIncomeChart.setOption({
        title: {
            text: '消费比例图'
        },
        tooltip: {
            trigger: 'item'
        },
        grid: {
            top: 30,
            left: 10,
            right: 10,
            bottom: 30,
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: '消费比例图',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: dashboardData.value.incomeTopList.map((item: any) => {
                    return { value: item.amount, name: item._id === '1'?'收入': '支出' }
                })
            }
        ]
    })

}


// 计算当年的月份
const getCurrentYearData = () => {
    let currentMonth = new Date().getMonth()
    let dateList = []
    for (let i = 0; i < 12; i++){
        dateList.push({
            name: FormatTime.formatTime(new Date(new Date().setMonth(currentMonth - i)), 'yyyy-MM'),
            taskValue: 0,
            workValue: 0,
            viewValue: 0
        })
    }
    return dateList
}
</script>
