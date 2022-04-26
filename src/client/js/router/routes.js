import Top from '@/templates/Top';
import About from '@/templates/About';
import Unauthorized from '@/templates/Unauthorized';
import Forbidden from '@/templates/Forbidden';
import NotFound from '@/templates/NotFound';
import SignUp from '@/templates/SignUp'
import SignIn from '@/templates/SignIn'
import SentVerificationMail from '@/templates/SentVerificationMail'
import RequiredEmailVerification from '@/templates/RequiredEmailVerification'
import UserVerifyEmail from '@/templates/UserVerifyEmail'
import UserTop from '@/templates/UserTop'
import Settings from '@/templates/Settings'
import Post from '@/templates/Post'
import Posts from '@/templates/Posts'
import PostCategories from '@/templates/PostCategories'
import AdminTop from '@/templates/AdminTop'
import AdminServices from '@/templates/AdminServices'
import AdminUsers from '@/templates/AdminUsers'
import AdminUser from '@/templates/AdminUser'
//import AdminUsers from '@/templates/AdminUsers'
//import UserCreate from '@/templates/UserCreate'
//import UserEdit from '@/templates/UserEdit'
import AdminSignIn from '@/templates/AdminSignIn'
import AdminPost from '@/templates/AdminPost'
import AdminPostCreate from '@/templates/AdminPostCreate'
import AdminPostEdit from '@/templates/AdminPostEdit'
import AdminPosts from '@/templates/AdminPosts'

export default [
  {
    path: '/',
    component: Top,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/signup/sent',
    name: 'SentVerificationMail',
    component: SentVerificationMail
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/errors/required-email-verification',
    name: 'RequiredEmailVerification',
    component: RequiredEmailVerification
  },
  {
    path: '/user/verify-email',
    name: 'UserVerifyEmail',
    component: UserVerifyEmail,
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'UserTop',
    component: UserTop,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }
  },
  {
    path: '/posts/:serviceId/categories/:categorySlug?',
    name: 'PostCategories',
    component: PostCategories,
  },
  {
    path: '/posts/:serviceId/:slug',
    name: 'Post',
    component: Post,
  },
  {
    path: '/posts/:serviceId',
    name: 'Posts',
    component: Posts,
  },
  {
    path: '/admin/signin',
    name: 'AdminSignIn',
    component: AdminSignIn
  },
  {
    path: '/admin/services',
    name: 'AdminServices',
    component: AdminServices,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/users/:username',
    name: 'AdminUser',
    component: AdminUser,
    meta: { requiresAuth: true }
  },
  //{
  //  path: '/admin/users/create',
  //  name: 'AdminUserCreate',
  //  component: UserCreate,
  //  meta: { requiresAuth: true }
  //},
  //{
  //  path: '/admin/users/:uid/edit',
  //  name: 'AdminUserEdit',
  //  component: UserEdit,
  //  meta: { requiresAuth: true }
  //},
  {
    path: '/admin/posts/:serviceId',
    name: 'AdminPosts',
    component: AdminPosts,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/posts/:serviceId/create',
    name: 'AdminPostCreate',
    component: AdminPostCreate,
  },
  {
    path: '/admin/posts/:serviceId/:postId',
    name: 'AdminPost',
    component: AdminPost,
  },
  {
    path: '/admin/posts/:serviceId/:postId/edit',
    name: 'AdminPostEdit',
    component: AdminPostEdit,
  },
  {
    path: '/admin',
    name: 'AdminTop',
    component: AdminTop,
    meta: { requiresAuth: true }
  },
  { path: '/about', component: About },
  { path: '/error/forbidden', component: Forbidden, name: 'Forbidden' },
  { path: '/error/unauthorized', component: Unauthorized },
  { path: '/error/notfound', component: NotFound },
  { path: '*', redirect: '/error/notfound' }
]
