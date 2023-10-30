import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/HomeView.vue')
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import('@/views/SignupView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue')
        },
        {
            path: '/feed',
            name: 'feed',
            component: () => import('@/views/FeedView.vue')
        },
        {
            path: '/messages',
            name: 'messages',
            component: () => import('@/views/MessagesView.vue')
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('@/views/SearchView.vue')
        },
        {
            path: '/profile/:id',
            name: 'profile',
            component: () => import('@/views/ProfileView.vue')
        },
        {
            path: '/profile/:id/friends',
            name: 'friends',
            component: () => import('@/views/FriendsView.vue')
        },
        {
            path: '/:id',
            name: 'post-view',
            component: () => import('@/views/PostView.vue')
        },
        {
            path: '/chat',
            name: 'chat',
            component: () => import('@/views/ChatView.vue')
        },
        {
            path: '/notifications',
            name: 'notifications',
            component: () => import('@/views/NotificationsView.vue')
        },
        {
          path: '/profile/edit',
          name: 'editprofile',
          component: () => import('@/views/EditProfileView.vue')
        },
        {
          path: '/profile/edit/password',
          name: 'editpassword',
          component: () => import('@/views/EditPasswordView.vue')
        },
        {
          path: '/trends/:id',
          name: 'trendview',
          component: () => import('@/views/TrendView.vue')
        },
    ]
})

export default router