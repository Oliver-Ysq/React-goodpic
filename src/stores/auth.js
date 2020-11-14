import {observable, action} from 'mobx'

class AuthStore {
    @observable isLogin = false
    @observable isLoading = false
    @observable values = {
        username: 'Oliver',
        password: '',
    }

    @action setIsLogin(isLogin) {
        this.isLogin = isLogin
    }

    @action setUsername(name) {
        this.values.username = name
    }

    @action setPassword(password) {
        this.values.username = password
    }

    @action login() {
        console.log('登录中...')
        this.isLoading = true
        setTimeout(() => {
            console.log('登陆成功')
            this.setIsLogin(true)
            this.isLoading = false
        }, 1000)
    }

    @action register() {
        console.log('注册中...')
        this.isLoading = true
        setTimeout(() => {
            console.log('注册成功')
            this.setIsLogin(true)
            this.isLoading = false
        }, 1000)
    }

    @action logout() {
        console.log('已注销')
    }
}

export {AuthStore}