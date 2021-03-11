<template>
  <div class="layer">
    <div class="mask" v-if="showImportFile"></div>
    <div class="pop" style="border-radius: 5px" v-if="showImportFile">
      <div class="top">
        <div class="tag">文件导入</div>
        <div @click="showImportFile = false" class="close">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="main">
        <div class="update">
          <label class="mark">文件导入</label>
          <el-upload
            ref="upload"
            accept=".xls,.xlsx"
            :on-exceed="handleExceed"
            :file-list="fileList"
            action=""
            :on-change="fileChange"
            :before-upload="beforeAvatarUpload"
            :multiple="false"
            :auto-upload="false"
            :limit="1"
            :before-remove="beforeRemove"
          >
            <el-button size="small" type="primary">选择文件</el-button>
          </el-upload>
        </div>
        <div class="sub">
          <el-button type="primary" size="small" @click="addType"
            >导入</el-button
          >
          <el-button size="small" @click="showImportFile = false"
            >取消</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  props: {
    title: String,
    icon: String,
    tag: String,
  },
  data() {
    return {
      showImportFile: false,
      path: "",
      fileList: [],
    };
  },
  methods: {
    addType() {
      if (this.fileList.length == 0) {
        this.$message.info("请上传文件");
        return;
      }
      this.$refs.upload.submit();
    },
    handleExceed() {
      this.$message.warning(`当前限制选择1个文件`);
    },
    fileChange(fileList) {
      console.log(fileList);
      this.fileList.push(fileList);
    },
    beforeRemove(file) {
      console.log(file, this.fileList);
      this.fileList = [];
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isLt100M = file.size / 1024 / 1024 < 100;
      if (!isLt100M) {
        this.$message({
          showClose: true,
          message: "大小不得超过100M",
          type: "error",
        });
        return false;
      }
      let params = new FormData();
      params.append("file", file);
      axios.defaults.baseURL = "http://localhost:3000";
      axios.post("/upload", params).then((res) => {
        console.log(res, "111");
        if (res.data.code == 0) {
          this.$message.success(res.data.msg);
          this.showImportFile = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.layer {
  margin-top: 20px;
}
.mask {
  background-color: #000;
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.pop {
  background-color: #fff;
  position: fixed;
  width: 440px;
  height: 220px;
  left: 50%;
  top: 50%;
  margin-left: -220px;
  margin-top: -110px;
  z-index: 2;
  .top {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    .tag {
      margin-right: 36%;
    }
    .close {
      padding: 0 10px;
      cursor: pointer;
    }
  }
  .main {
    .update {
      margin-top: 50px;
      display: flex;
      flex-direction: row;
      margin-left: 20px;
      .mark {
        width: 70px;
        height: 30px;
        line-height: 30px;
        margin-right: 10px;
      }
    }
    .sub {
      position: absolute;
      bottom: 10px;
      left: 50%;
      margin-left: -60px;
    }
  }
}
</style>