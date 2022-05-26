export default [
  {
    path: '/',
    component: () => import('@/views/demo'),
    children: [
      {
        path: 'demo',
        component: () => import('@/views/demo')
      }
    ]
  }
]
