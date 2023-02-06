import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
// import tab from './tab'
Vue.use(Vuex)

export default new Vuex.Store({

    mutations: {
        changeMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        addMenuBread(state, val) {
            console.log(val, 'val');

            if (val.name !== "home") {
                const index = state.menuListData.findIndex(item => item.name === val.name)
                if (index === -1) {
                    state.menuListData.push(val);
                }
            }
        },
        delTag(state, item) {
            // console.log(item, 'item');
            const index = state.menuListData.findIndex(val => val.name === item.name)
            state.menuListData.splice(index, 1)
        },
        getMenu(state, data) {
            state.menuList = data;
            Cookie.set('menuData', JSON.stringify(data))
            // console.log(state.menuList);
        },
        addRouter(state, router) {
            if (!Cookie.get('menuData')) return
            const menu = JSON.parse(Cookie.get('menuData'))
            state.menuList = menu
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../pages/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../pages/${item.url}`)
                    console.log(item.url, "url");

                    menuArray.push(item)
                }
            })
            // console.log(menuArray, router, "menu");
            menuArray.forEach(item => {
                // console.log(item, "走到；了添加路由");

                router.addRoute('Main', item)
            })
        }
    },
    state: {
        isCollapse: false,
        menuListData: [{
            path: "/",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "Home/Home",
        }],
        menuList: [],
    },
})