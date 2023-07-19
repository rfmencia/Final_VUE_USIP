import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/patient',
    name: 'patient',
    component: () => import(/* webpackChunkName: "patient" */ '../views/PatientView.vue')
  },
  {
    path: '/patient/:id',
    name: 'patientedit',
    component: () => import(/* webpackChunkName: "patientedit" */ '../views/PatientEditView.vue')
  },
  {
    path: '/consultation',
    name: 'consultation',
    component: () => import(/* webpackChunkName: "consultation" */ '../views/ConsultationView.vue')
  },
  {
    path: '/consultation/:id',
    name: 'consultationedit',
    component: () => import(/* webpackChunkName: "consultationedit" */ '../views/ConsultationEditView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
