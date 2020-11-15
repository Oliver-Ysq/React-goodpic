import AV, {User} from 'leancloud-storage';

AV.init({
    appId: 'r8HD9RIzlGPlMbICACP43g2h-gzGzoHsz',
    appKey: '1xP5D2JMXisB84jIKzSlX30c',
    serverURL: 'https://r8hd9riz.lc-cn-n1-shared.com'
});

export const Auth = {
    register(username, password) {
        let user = new User();
        user.setUsername(username);
        user.setPassword(password);
        return new Promise((resolve, reject) => {
            user.signUp().then(loginedUser => {
                resolve(loginedUser);
            }, error => {
                reject(error);
            });
        });
    }, Login(username, password) {
        return new Promise((resolve, reject) => {
            User.logIn(username, password).then(loginedUser => {
                resolve(loginedUser);
            }, error => {
                reject(error);
            });
        });
    }, Logout() {
        User.logOut();
    }, getCurrentUser() {
        return User.current();
    }
};