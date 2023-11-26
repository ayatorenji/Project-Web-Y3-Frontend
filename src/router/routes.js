
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/register', component: () => import('pages/RegisterPage.vue') },

      { path: '/user/login', component: () => import('pages/LoginPage.vue') },
      { path: '/user/order', component: () => import('pages/OrderPage.vue') },
      { path: '/user/dashboard', component: () => import('pages/DashboardPage.vue') },

      { path: '/admin/login', component: () => import('pages/AdminLoginPage.vue') },
      { path: '/admin/dashboard', component: () => import('pages/AdminDashboard.vue') },
      { path: '/admin/list', component: () => import('pages/AdminListUser.vue') },
      { path: '/admin/add', component: () => import('pages/AdminAddGames.vue') },
      { path: '/admin/confirm', component: () => import('pages/AdminConfirm.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
