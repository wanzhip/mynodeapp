<template>
  <div class="home">
    <div >
      <el-input placeholder="请输入姓名" v-model="name" style="width:220px" class="mr_1" @click.native.enter="search"></el-input>
      <el-button icon="el-icon-search" type="primary" size="medium" class="mr_1" @click="search">搜索</el-button>
      <span class="pointer" @click="clear">清空搜索条件</span>
    </div>
    <div class="mt_2">
      <el-button icon="el-icon-plus" type="primary" size="medium">添加</el-button>
    </div>
    <div class="mt_2">
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#c8ddfc', color: '#606266' }"
        style="width: 100%"
        :row-style="{ height: '50px' }"
        :cell-style="{ padding: '0px' }"
      >
        <el-table-column label="序号" min-width="120" type="index">
        </el-table-column>
        <el-table-column
          label="姓名"
          min-width="120"
          align="center"
          prop="name"
        >
        </el-table-column>
        <el-table-column
          label="学校"
          min-width="120"
          align="center"
          prop="school"
        >
        </el-table-column>
        <el-table-column
          label="学号"
          min-width="120"
          align="center"
          prop="num"
        >
        </el-table-column>
        <el-table-column
          label="专业"
          min-width="120"
          align="center"
          prop="major"
        >
        </el-table-column>
        <el-table-column
          label="年级"
          min-width="120"
          align="center"
          prop="grade"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="120"
          align="center"
        >
        <template slot-scope="scope">
          <div>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </div>
        </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { _axios } from "@/api/index";
export default {
  data() {
    return {
      name:'',
      tableData: [],
    };
  },
  created() {
    this.getStu();
  },
  methods: {
    getStu() {
      _axios("/a", {
        name:this.name
      }, "get").then((res) => {
        console.log(res, "数据");
        if (res.code == 0) {
          this.tableData = res.data;
        }
      });
    },
    search(){
      this.getStu();
    },
    handleEdit(row){
      console.log(row);
    },
    handleDelete(row){
      console.log(row);
    },
    clear(){
      this.name = '';
      this.getStu();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/common.scss";
.home{
  padding: 20px;
  box-sizing: border-box;
}
</style>
