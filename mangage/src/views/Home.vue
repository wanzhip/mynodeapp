<template>
  <div class="home">
    <div>
      <el-input
        placeholder="请输入姓名"
        v-model="name"
        style="width: 220px"
        class="mr_1"
        @keyup.enter.native="search"
      ></el-input>
      <el-button
        icon="el-icon-search"
        type="primary"
        size="medium"
        class="mr_1"
        @click="search"
        >搜索</el-button
      >
      <span class="pointer" @click="clear">清空搜索条件</span>
    </div>
    <div class="mt_2">
      <el-button
        icon="el-icon-plus"
        type="primary"
        size="medium"
        @click="addStu"
        >添加</el-button
      >
      <el-button icon="el-icon-delete" type="danger" size="medium" @click="deletePart">批量删除</el-button>
      <el-button icon="el-icon-download" type="primary" size="medium" >导入名单</el-button>
      <span class="muban">下载导入模板</span>
    </div>
    <div class="mt_2">
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#c8ddfc', color: '#606266' }"
        style="width: 100%"
        :row-style="{ height: '50px' }"
        :cell-style="{ padding: '0px' }"
        @selection-change="handleSelectChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
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
        <el-table-column label="学号" min-width="120" align="center" prop="num">
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
        <el-table-column label="操作" min-width="160" align="center">
          <template slot-scope="scope">
            <div>
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <AddStu ref="addStu" @parentUpdate="getStu" />
    <EditStu ref="editStu" @parentUpdate="getStu" />
  </div>
</template>

<script>
import { _axios } from "@/api/index";
import AddStu from "./AddStu";
import EditStu from "./EditStu";
export default {
  components: {
    AddStu,
    EditStu
  },
  data() {
    return {
      name: "",
      tableData: [],
      ids:[]
    };
  },
  created() {
    this.getStu();
  },
  methods: {
    deletePart(){
      _axios(
        "/user",
        {
          ids: JSON.stringify(this.ids),
        },
        "delete"
      ).then((res) => {
        console.log(res, "数据");
        if (res.code == 0) {
          this.$message.success('ok')
          this.getStu();
        }else{
          this.$message.error(res.msg)
        }
      });
    },
    handleSelectChange(val){
      console.log(val);
      this.ids = [];
      val.map(item=>{
        this.ids.push(item.id)
      })
    },
    getStu() {
      console.log(this.name);
      _axios(
        "/user",
        {
          name: this.name,
        },
        "get"
      ).then((res) => {
        console.log(res, "数据");
        if (res.code == 0) {
          this.tableData = res.data;
        }
      });
    },
    addStu() {
      this.$refs.addStu.showLayer = true;
    },
    search() {
      this.getStu();
    },
    handleEdit(row) {
      console.log(row);
      this.$refs.editStu.id = row.id;
      this.$refs.editStu.showLayer = true;
      this.$refs.editStu.getMsg();
    },
    handleDelete(row) {
      console.log(row);
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          _axios("/user/" + row.id, {}, "delete").then((res) => {
            console.log(res, "数据");
            if (res.code == 0) {
              this.$message.success(res.msg);
              this.getStu();
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    },
    clear() {
      this.name = "";
      this.getStu();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/common.scss";
.home {
  padding: 20px;
  box-sizing: border-box;
}
.muban{
  cursor: pointer;
  margin-left: 10px;
  &:hover{
    color: #409eff;
  }
}
</style>
