<template>
  <div v-if="showLayer">
    <div class="mask"></div>
    <div class="pop">
      <div class="top">
        <div class="tag">添加用户</div>
        <div @click="close" class="close touch">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="main">
        <div style="margin-left:100px;margin-top:20px">
          <el-form
          :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
          >
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" style="width: 240px"></el-input>
            </el-form-item>
            <el-form-item label="学号" prop="num">
              <el-input v-model.number="ruleForm.num" style="width: 240px"></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="major">
              <el-input
                v-model="ruleForm.major"
                style="width: 240px"
              ></el-input>
            </el-form-item>
            <el-form-item label="年级" prop="grade">
              <el-input
                v-model.number="ruleForm.grade"
                style="width: 240px"
              ></el-input>
            </el-form-item>
            <el-form-item label="学校" prop="school">
              <el-input
                v-model="ruleForm.school"
                style="width: 240px"
              ></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model.number="ruleForm.age" style="width: 240px"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="bottom" style="margin-top: 30px">
          <el-button size="small" @click="close">取消</el-button>
          <el-button type="primary" size="small" @click="submitForm('ruleForm')"
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
      ruleForm: {
        name:'',
        num:'',
        major:'',
        grade:'',
        school:'',
        age:''
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        num: [{ required: true, message: "请输入学号", trigger: "blur" },
        {type:'number',message:'学号必须是数字',}],
        major: [{ required: true, message: "请输入专业", trigger: "blur" }],
        grade: [{ required: true, message: "请输入年级", trigger: "blur" },
        {type:'number',message:'年级必须是数字',}],
        school: [{ required: true, message: "请输入学校", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" },
        {type:'number',message:'年龄必须是数字',}],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid=>{
        if(valid){
          _axios('/user',{
            name:this.ruleForm.name,
            num:this.ruleForm.num,
            major:this.ruleForm.major,
            grade:this.ruleForm.grade,
            school:this.ruleForm.school,
            age:this.ruleForm.age
          },'post').then(res=>{
            console.log(res,'111');
            if(res.code == 0){
              this.$message.success(res.msg)
              this.showLayer = false;
              this.$emit('parentUpdate')
            }else{
              this.$message.error(res.msg)
            }
          })
        }else{
          return false
        }
      })
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
  width: 600px;
  height: 500px;
  left: 50%;
  top: 50%;
  margin-left: -300px;
  margin-top: -250px;
  z-index: 999;
  overflow: auto;
  border-radius: 5px;
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
}
.bottom {
  width: 130px;
  margin: auto;
}
</style>