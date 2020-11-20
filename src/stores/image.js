import { message } from "antd";
import { makeAutoObservable } from "mobx";
import { Uploader } from "../models";

class ImageStore {
  constructor() {
    makeAutoObservable(this);
  }

  //observable
  filename = "";
  file = null;
  serverFile = null;
  isUploading = false;

  //action
  setFilename(newFilename) {
    this.filename = newFilename;
  }

  setFile(newFile) {
    this.file = newFile;
  }

  upload() {
    this.isUploading = true;
    this.serverFile = null;
    return new Promise((resolve, reject) => {
      Uploader.add(this.file, this.filename)
        .then((serverFile) => {
          this.serverFile = serverFile;
          resolve(serverFile);
        })
        .catch((err) => {
          message.warning("上传失败");
          reject(err);
        })
        .finally(() => {
          this.isUploading = false;
        });
    });
  }

  reset() {
    this.serverFile = null;
    this.isUploading = false;
  }
}

export default new ImageStore();
