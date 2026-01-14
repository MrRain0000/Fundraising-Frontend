import { createRouter, createWebHistory } from 'vue-router'

// Views
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/gioi-thieu',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    children: [
      {
        path: '',
        name: 'about-overview',
        component: () => import('@/views/about/VisionMissionView.vue')
      },
      {
        path: 'doi-ngu',
        name: 'team',
        component: () => import('@/views/about/TeamView.vue'),
        children: [
          {
            path: '',
            name: 'team-overview',
            component: () => import('@/views/about/team/ManagementBoardView.vue')
          },
          {
            path: 'ban-kiem-soat',
            name: 'supervisory-board',
            component: () => import('@/views/about/team/SupervisoryBoardView.vue')
          },
          {
            path: 'ban-co-van',
            name: 'advisory-board',
            component: () => import('@/views/about/team/AdvisoryBoardView.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/hoat-dong',
    name: 'activities',
    component: () => import('@/views/ActivitiesView.vue')
  },
  {
    path: '/du-an/:slug',
    name: 'project-detail',
    component: () => import('@/views/ProjectDetailView.vue')
  },
  {
    path: '/bao-cao-tai-chinh',
    name: 'reports',
    component: () => import('@/views/reports/ReportsView.vue')
  },
  {
    path: '/lien-he',
    name: 'contact',
    component: () => import('@/views/ContactView.vue')
  },
  {
    path: '/quyen-gop',
    name: 'donate',
    component: () => import('@/views/reports/DonateView.vue')
  },
  {
    path: '/tin-tuc',
    name: 'news',
    component: () => import('@/views/NewsView.vue')
  },
  {
    path: '/thong-ke-quyen-gop',
    name: 'donation-stats',
    component: () => import('@/views/reports/DonationStatsView.vue')
  },
  {
    path: '/bao-cao-thuong-nien',
    name: 'annual-report',
    component: () => import('@/views/reports/AnnualReportView.vue')
  },
  {
    path: '/tinh-nguyen-vien',
    name: 'volunteers',
    component: () => import('@/views/VolunteersView.vue')
  },
  {
    path: '/dang-ky-tinh-nguyen-vien',
    name: 'volunteer-registration',
    component: () => import('@/views/VolunteerRegistrationView.vue')
  },
  {
    path: '/hop-tac',
    name: 'partnership',
    component: () => import('@/views/PartnershipView.vue')
  },
  {
    path: '/dang-ky-chuyen-gia',
    name: 'expert-registration',
    component: () => import('@/views/ExpertRegistrationView.vue')
  },
  {
    path: '/tai-lieu',
    name: 'resources',
    component: () => import('@/views/ResourcesView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Keep position when navigating within same parent (e.g., team tabs)
    if (from.path.startsWith('/gioi-thieu/doi-ngu') && to.path.startsWith('/gioi-thieu/doi-ngu')) {
      return false;
    }
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
})

export default router
