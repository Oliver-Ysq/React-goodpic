import AV, { User } from "leancloud-storage";

AV.init({
  appId: "r8HD9RIzlGPlMbICACP43g2h-gzGzoHsz",
  appKey: "1xP5D2JMXisB84jIKzSlX30c",
  serverURL: "https://r8hd9riz.lc-cn-n1-shared.com",
});

export const Auth = {
  register(username, password) {
    let user = new User();
    user.setUsername(username);
    user.setPassword(password);
    return new Promise((resolve, reject) => {
      user.signUp().then(
        (loginedUser) => {
          resolve(loginedUser);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  Login(username, password) {
    return new Promise((resolve, reject) => {
      User.logIn(username, password).then(
        (loginedUser) => {
          resolve(loginedUser);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  Logout() {
    User.logOut();
  },
  getCurrentUser() {
    return User.current();
  },
};

export const Uploader = {
  add(file, filename) {
    const item = new AV.Object("Image");
    const avFile = new AV.File(filename, file);
    item.set("filename", filename);
    item.set("owner", AV.User.current());
    item.set("url", avFile);
    return new Promise((resolve, reject) => {
      item
        .save()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteItem(objId) {
    console.log(objId);
    const image = AV.Object.createWithoutData("Image", objId);
    return new Promise((resolve, reject) => {
      image
        .destroy()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  find({ page = 0, limit = 5 }) {
    const query = new AV.Query("Image");
    query.include("owner");
    query.limit(limit);
    query.skip(page * limit);
    query.descending("createAt");
    query.equalTo("owner", AV.User.current());
    return new Promise((resolve, reject) => {
      query
        .find()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
};
