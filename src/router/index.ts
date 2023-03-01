import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Index from '../layouts/Index.vue'


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Index,
    redirect: '/home',
    children: [
      {
        name: "Home",
        component: () => import('../views/Home/Index.vue'),
        path: "/home",
        meta: {
          title: '主控台'
        }
      },
      {
        name: "Home",
        component: () => import('../views/Home/Index.vue'),
        path: "/home",
        meta: {
          title: '主控台'
        }
      },
      {
        name: "Task",
        component: () => import('../views/Task/Index.vue'),
        path: "/task",
        meta: {
          title: '任务管理'
        }
      },
      {
        name: "Customer",
        component: () => import('../views/Customer/Index.vue'),
        path: "/customer",
        meta: {
          title: '作品管理'
        }
      },
      {
        name: "Consumption",
        component: () => import('../views/Consumption/Index.vue'),
        path: "/consumption",
        meta: {
          title: '消费记录'
        }
      },
      {
        name: "Work",
        component: () => import('../views/Work/Index.vue'),
        path: "/work",
        meta: {
          title: '客户管理'
        }
      },
      {
        name: "Tag",
        component: () => import('../views/Tag/Index.vue'),
        path: "/tag",
        meta: {
          title: '标签列表'
        }
      },
      {
        name: "Message",
        component: () => import('../views/Message/Index.vue'),
        path: "/message",
        meta: {
          title: '留言管理'
        }
      },
      {
        name: "OrderWork",
        component: () => import('../views/WorkOrder/Index.vue'),
        path: "/work-order",
        meta: {
          title: '工单管理'
        }
      },
      {
        name: 'LoginHistory',
        component: () => import('../views/LoginHistory/Index.vue'),
        path: '/login-history',
        meta: {
          title: '登录历史'
        }
      },
      {
        name: 'Chat',
        component: () => import('../views/Chat/Index.vue'),
        path: '/chat',
        meta: {
          title: '登录历史'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('../views/404/Index.vue'),
        meta: {
          title: '404'
        }
      },
      {
          path: '/:pathMatch(.*)*',
          component: () => import('../views/404/Index.vue'),
          meta: {
              title: '404'
          }
      }
    ],
  },
  {
    name: "SignIn",
    component: () => import('../views/SignIn/Index.vue'),
    path: "/sign-in",
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})