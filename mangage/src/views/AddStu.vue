<template>
  <div v-if="showLayer">
    <div class="mask"></div>
    <div class="pop">
      <div class="top">
        <div class="tag">添加学生</div>
        <div @click="close" class="close touch">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="main">
        <div>
          <el-form :v-model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" style="width:240px"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="bottom" style="margin-top: 30px">
          <el-button size="small" @click="close">取消</el-button>
          <el-button type="primary" size="small" @click="submitForm"
            >保存</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { _axios } from "@/api/index";
export default {
  data() {
    return {
      showLayer: false,
      ruleForm:{

      },
      rules:{
        name:[
          {required: true, message:'请输入姓名', trigger:'change'}
        ]
      }
    };
  },
  methods: {
    submitForm() {
      
    },
    close() {
      this.showLayer = false;
    },
  },
};
</script>



<style scoped lang="scss">
@import "@/css/common.scss";
.label {
  width: 100px;
  line-height: 40px;
  text-align: right;
}
.mask {
  background: rgba(#000, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.pop {
  position: fixed;
  background-color: #fff;
  width: 50rem;
  height: 36rem;
  left: 50%;
  top: 50%;
  margin-left: -25rem;
  margin-top: -18rem;
  z-index: 999;
  overflow: auto;
  border-radius: 5px;
  .top {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: 4rem;
    line-height: 4rem;
    border-bottom: 1px solid #eee;
    .tag {
      margin-right: 36%;
    }
    .close {
      padding: 0 1rem;
      cursor: pointer;
    }
  }
}
.bottom {
  width: 130px;
  margin: auto;
}
</style>