
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  }
  // ,
  // {
  //   path: '/film',
  //   component: () => import('layouts/MyLayout.vue'),
  //   children: [
  //     { path: '/onefilm', component: () => import('pages/Film.vue') }
  //   ]
  // }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
