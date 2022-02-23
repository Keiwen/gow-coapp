import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Search
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/arcanes',
    name: 'arcanes',
    component: () => import('../views/Arcanes.vue')
  },
  {
    path: '/kingdoms',
    name: 'kingdoms',
    component: () => import('../views/Kingdoms.vue')
  },
  {
    path: '/delves',
    name: 'delves',
    component: () => import('../views/Delves.vue')
  },
  {
    path: '/classes',
    name: 'classes',
    component: () => import('../views/Classes.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
