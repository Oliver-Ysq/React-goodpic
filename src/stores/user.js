import {makeAutoObservable} from "mobx";
import {Auth} from "../models";

class UserStore {
    constructor() {
        makeAutoObservable(this);
    }

    currentUser = null;

    pullUser() {
        this.currentUser = Auth.getCurrentUser();
    }

    resetUser() {
        this.currentUser = null;
    }
}

export default new UserStore();