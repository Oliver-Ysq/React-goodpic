import {makeAutoObservable} from 'mobx'

class AuthStore {
    constructor() {
        makeAutoObservable(this)
    }

    isLogin = false
    isLoading = false
    values = {
        username: 'Oliver',
        password: '',
    }

    setIsLogin(isLogin) {
        this.isLogin = isLogin
    }

    setUsername(name) {
        this.values.username = name
    }

    setPassword(password) {
        this.values.username = password
    }

    login() {
        console.log('登录中...')
        this.isLoading = true
        setTimeout(() => {
            console.log('登陆成功')
            this.setIsLogin(true)
            this.isLoading = false
        }, 1000)
    }

    register() {
        console.log('注册中...')
        this.isLoading = true
        setTimeout(() => {
            console.log('注册成功')
            this.setIsLogin(true)
            this.isLoading = false
        }, 1000)
    }

    logout() {
        console.log('已注销')
    }
}

export {AuthStore}