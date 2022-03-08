import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'

import IndexUser from '../components/User/Index.vue'
import TambahUser from '../components/User/Tambah.vue'
import EditUser from '../components/User/Edit.vue'
import DetailUser from '../components/User/Detail.vue'

import IndexBarang from '../components/Barang/Index.vue'
import TambahBarang from '../components/Barang/Tambah.vue'
import EditBarang from '../components/Barang/Edit.vue'
import DetailBarang from '../components/Barang/Detail.vue'

import IndexLelang from '../components/Lelang/Index.vue'
import TambahLelang from '../components/Lelang/Tambah.vue'
import EditLelang from '../components/Lelang/Edit.vue'
import DetailLelang from '../components/Lelang/Detail.vue'

import IndexHistory from '../components/History/Index.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user',
        name: 'indexuser',
        component: IndexUser,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/tambah',
        name: 'tambahuser',
        component: TambahUser,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/edit/:id',
        name: 'edituser',
        component: EditUser,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/detail/:id',
        name: 'detailuser',
        component: DetailUser,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/barang',
        name: 'indexbarang',
        component: IndexBarang,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/barang/tambah',
        name: 'tambahbarang',
        component: TambahBarang,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/barang/edit/:id',
        name: 'editbarang',
        component: EditBarang,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/barang/detail/:id',
        name: 'detailbarang',
        component: DetailBarang,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/lelang',
        name: 'indexlelang',
        component: IndexLelang,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/lelang/tambah',
        name: 'tambahlelang',
        component: TambahLelang,
        meta: {
            requiresAuth: true
        }
    },{
        path: '/lelang/edit/:id',
        name: 'editlelang',
        component: EditLelang,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/lelang/detail/:id',
        name: 'detaillelang',
        component: DetailLelang,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/history',
        name: 'indexhistory',
        component: IndexHistory,
        meta: {
            requiresAuth: true
        }
    },
]

const router = new VueRouter({
    mode : 'history',
    base : process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if(localStorage.getItem('auth')) {
            next()
        } else {
            next('/login')
        }
    }
    next()
})

export default router