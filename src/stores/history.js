import { makeAutoObservable } from "mobx";
import { message } from "antd";
import { Uploader } from "../models/index";

// import {User} from "leancloud-storage";

class HistoryStore {
  constructor() {
    makeAutoObservable(this);
  }

  list = [];
  isLoading = false;
  hasMore = true;
  page = 0;
  limit = 5;

  append(newList) {
    this.list = this.list.concat(newList);
  }

  find() {
    this.isLoading = true;
    Uploader.find({ page: this.page, limit: this.limit })
      .then((newList) => {
        this.append(newList);
        if (newList.length < this.limit) {
          this.hasMore = false;
        }
      })
      .catch((err) => {
        message.warning("加载失败");
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  deleteItem(objItem) {
    Uploader.deleteItem(objItem);
    this.list = this.list.filter((item) => item.id !== objItem);
  }

  reset() {
    this.list = [];
    this.isLoading = false;
    this.hasMore = true;
    this.page = 0;
    this.limit = 10;
  }
}

export default new HistoryStore();
