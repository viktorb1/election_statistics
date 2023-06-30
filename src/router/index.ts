import { createRouter, createWebHistory } from 'vue-router'

import ApprovalRating from '../views/ApprovalRating.vue'
import Demographics from '../views/Demographics.vue'

const routes = [
  { path: '/', component: ApprovalRating },
  { path: '/approval', component: ApprovalRating },
  { path: '/demographics', component: Demographics }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
