import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Timer from './views/Timer.vue'
import Task from './views/Task.vue'
import Login from './views/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/timer',
      name: 'timer',
      component: Timer
    },
    {
      path: '/task',
      name: 'task',
      component: Task
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})
