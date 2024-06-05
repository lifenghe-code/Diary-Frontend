export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  {
    path: '/user',
    layout: false,
    routes: [{ name: '注册', path: '/user/register', component: './User/Register' }],
  },
  {
    path: '/user',
    layout: true,
    routes: [{ name: '个人中心', path: '/user/center', component: './User/Center' }],
  },
  {
    path: '/user',
    layout: true,
    routes: [{ name: '个人设置', path: '/user/setting', component: './User/Setting' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '/list', name: '推荐', icon: 'ThunderboltOutlined', component: './List' },
  { path: '/edit', name: '编辑', icon: 'EditOutlined', component: './Editor' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],
  },
  { name: '查询表格', access: 'canAdmin',icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
