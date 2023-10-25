import { defineStore } from "pinia";
import {reactive, ref} from "vue";
import axios from "@/utils/axios";
export const useUserStore = defineStore("user", () => {
    const user = reactive({
        id: "",
        isAuthenticated: false,
        name: "",
        email: "",
        access: "",
        refresh: "",
        avatar: ""
    });
    function initStore() {
        console.log('initStore', localStorage.getItem('user.access'))

        if (localStorage.getItem('user.access')) {
            console.log('User has access!')

            user.access = localStorage.getItem('user.access')
            user.refresh = localStorage.getItem('user.refresh')
            user.id = localStorage.getItem('user.id')
            user.name = localStorage.getItem('user.name')
            user.email = localStorage.getItem('user.email')
            user.avatar = localStorage.getItem('user.avatar')
            user.isAuthenticated = true

            refreshToken()

            console.log('Initialized user:', this.user)
        }
    }
    function setToken(data) {
        console.log('setToken', data)

        user.access = data.access
        user.refresh = data.refresh
        user.isAuthenticated = true

        localStorage.setItem('user.access', data.access)
        localStorage.setItem('user.refresh', data.refresh)

        console.log('user.access: ', localStorage.getItem('user.access'))
    }

    function removeToken() {
        user.refresh = ""
        user.access = ""
        user.isAuthenticated = false
        user.id = ""
        user.name = ""
        user.email = ""
        user.avatar = ""
        localStorage.setItem('user.access', '')
        localStorage.setItem('user.refresh', '')
        localStorage.setItem('user.id', '')
        localStorage.setItem('user.name', '')
        localStorage.setItem('user.email', '')
        localStorage.setItem('user.avatar', '')
    }

    function refreshToken() {
        axios.post('api/refresh/', {
            refresh: this.user.refresh
        })
        .then((response) => {
            this.user.access = response.data.access
            localStorage.setItem('user.access', response.data.access)
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access
        })
        .catch((error)=>{
            console.log(error)
            this.removeToken()
        })
    }

    function setUserInfo(CurrentUser) {

        user.id = CurrentUser.id
        user.name = CurrentUser.name
        user.email = CurrentUser.email
        user.avatar = CurrentUser.avatar

        localStorage.setItem('user.id', user.id)
        localStorage.setItem('user.name', user.name)
        localStorage.setItem('user.email', user.email)
        localStorage.setItem('user.avatar', user.avatar)
    }

    return {
        user,
        initStore,
        setToken,
        removeToken,
        setUserInfo
    }
})