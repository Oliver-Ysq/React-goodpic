import { makeAutoObservable } from "mobx";
import { message } from "antd";
import { Uploader } from "../models/index";

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

  addPage() {
    this.page++;
  }

  find() {
    this.isLoading = true;
    Uploader.find({ page: this.page, limit: this.limit })
      .then((newList) => {
        console.log(newList);
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
    Uploader.deleteItem(objItem)
      .then(() => {
        message.success("删除成功");
      })
      .catch(() => {
        message.warning("删除失败");
      });
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
