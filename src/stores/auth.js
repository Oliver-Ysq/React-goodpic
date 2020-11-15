import {makeAutoObservable} from 'mobx';
import {Auth} from '../models/index';
import UserStore from './user';

// import {User} from "leancloud-storage";

class AuthStore {
    constructor() {
        makeAutoObservable(this);
    }

    values = {
        username: '', password: '',
    };

    setUsername(name) {
        this.values.username = name;
    }

    setPassword(password) {
        this.values.password = password;
    }

    login() {
        return new Promise((resolve, reject) => {
            Auth.Login(this.values.username, this.values.password).then(user => {
                console.log('登录成功');
                UserStore.pullUser();
                resolve(user);
            }).catch(err => {
                console.log('登录失败');
                UserStore.resetUser();
                reject(err);
            });
        });
    }

    register() {
        return new Promise((resolve, reject) => {
            Auth.register(this.values.username, this.values.password).then(user => {
                console.log('注册成功');
                UserStore.pullUser();
                resolve(user);
            }).catch(err => {
                console.log('注册失败');
                UserStore.resetUser();
                reject(err);
            });
        });
    }

    logout() {
        Auth.Logout();
        UserStore.resetUser();
    }
}

export default new AuthStore();