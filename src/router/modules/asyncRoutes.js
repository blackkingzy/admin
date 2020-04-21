import Layout from '@/layout'
export const asyncRoutes = [
  {
    path: '/about',
    component: Layout,
    redirect: '/about/index',
    children: [
      {
        path: '/about/index',
        name: 'About',
        component: () => import('@/views/about/index'),
        meta: {
          roles: ['admin'],
          title: 'About',
          icon: 'dashboard'
        }
      }
    ]
  }
]
