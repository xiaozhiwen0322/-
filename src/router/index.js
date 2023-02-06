import VueRouter from 'vue-router'
// import Home from '../pages/Home'
// import User from '../pages/User'
import Main from '../pages/Main'
// import Mall from '../pages/Mall'
// import PageOne from '../pages/Page1'
// import PageTwo from '../pages/Page2'
import Login from '../pages/Login'
import Cookie from 'js-cookie'
const router = new VueRouter({
    routes: [
        {
            name: 'Main',
            path: '/',
            redirect: 'home',
            component: Main,
            children: [
                // {
                //     name: 'home',
                //     path: 'home',
                //     component: Home,
                // },
                // {
                //     name: 'user',
                //     path: 'user',
                //     component: User,
                // },
                // {
                //     name: 'mall',
                //     path: 'mall',
                //     component: Mall
                // },
                // {
                //     name: 'page1',
                //     path: 'page1',
                //     component: PageOne
                // },
                // {
                //     name: 'page2',
                //     path: 'page2',
                //     component: PageTwo,
                // }
            ]
        },
        {
            name: "Login",
            path: '/login',
            component: Login
        }

    ]
})
router.beforeEach((to, from, next) => {
    const token = Cookie.get('token')
    if (!token && to.name !== 'Login') {
        next({ name: 'Login' })
    }
    else if (token && to.name === "Login") {
        next({ name: "Main" })
    }
    else {
        next()
    }
})
export default router;