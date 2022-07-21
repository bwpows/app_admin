import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../layouts/Index.vue'
const routes = [
  {
    path: '/',
    component: Index,
    children: [
      {
        name: "Home",
        component: () => import('../views/Home.vue'),
        path: "/",
        meta: {
          title: '主控台'
        }
      },
      {
        name: "Task",
        component: () => import('../views/Task.vue'),
        path: "/task",
        meta: {
          title: '任务管理'
        }
      },
      {
        name: "Customer",
        component: () => import('../views/Customer.vue'),
        path: "/customer",
        meta: {
          title: '作品管理'
        }
      },
      {
        name: "Consumption",
        component: () => import('../views/Consumption.vue'),
        path: "/consumption",
        meta: {
          title: '消费记录'
        }
      },
      {
        name: "Work",
        component: () => import('../views/Work.vue'),
        path: "/work",
        meta: {
          title: '客户管理'
        }
      },
    ],
  },
  {
    name: "SignIn",
    component: () => import('../views/SignIn.vue'),
    path: "/signin",
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})