import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUser } from '@/store/user'
import type { RouteRecordRaw } from 'vue-router'

import {
  ROUTE_BASKET,
  ROUTE_HOME,
  ROUTE_PRODUCT_ADD,
  ROUTE_PRODUCT_DETAIL,
  ROUTE_CHECKOUT,
  ROUTE_LOGIN,
  routeHome,
} from '@/constants'

const AppHome = () => import(/* webpackChunkName: "" */ '@/components/AppHome.vue')
const AppBasket = () => import(/* webpackChunkName: "" */ '@/components/AppBasket.vue')
const ProductAdd = () => import(/* webpackChunkName: "" */ '@/components/ProductAdd.vue')
const ProductDetail = () => import(/* webpackChunkName: "" */ '@/components/ProductDetail.vue')
const AppCheckout = () => import(/* webpackChunkName: "" */ '@/components/AppCheckout.vue')
const AppLogin = () => import(/* webpackChunkName: "" */ '@/components/AppLogin.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: ROUTE_HOME,
    component: AppHome,
  },
  {
    path: '/basket',
    name: ROUTE_BASKET,
    component: AppBasket,
  },
  {
    path: '/product-add',
    name: ROUTE_PRODUCT_ADD,
    component: ProductAdd,
    beforeEnter: () => {
      const { isLoggedIn } = storeToRefs(useUser())
      if (isLoggedIn.value) return true
      return routeHome
    },
  },
  {
    path: '/product/:id',
    name: ROUTE_PRODUCT_DETAIL,
    component: ProductDetail,
    props: (route) => ({ id: Number(route.params.id) }),
  },
  {
    path: '/checkout',
    name: ROUTE_CHECKOUT,
    component: AppCheckout,
  },
  {
    path: '/login',
    name: ROUTE_LOGIN,
    component: AppLogin,
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes,
})
