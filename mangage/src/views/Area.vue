<template>
  <div class="home">
    <div>
      <el-input
        placeholder="请输入地区"
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
        @click="addArea"
        >添加</el-button
      >
      <el-button icon="el-icon-delete" type="danger" size="medium" @click="deletePart">批量删除</el-button>
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
          label="地区"
          min-width="120"
          align="center"
          prop="name"
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
    <AddArea ref="addArea" @parentUpdate="getArea" />
    <EditArea ref="editArea" @parentUpdate="getArea" />
  </div>
</template>

<script>
import { _axios } from "@/api/index";
import AddArea from "./AddArea";
import EditArea from "./EditArea";
export default {
  components: {
    AddArea,
    EditArea
  },
  data() {
    return {
      name: "",
      tableData: [],
      ids:[]
    };
  },
  created() {
    this.getArea();
  },
  methods: {
    deletePart(){
      _axios(
        "/area",
        {
          ids: JSON.stringify(this.ids),
        },
        "delete"
      ).then((res) => {
        console.log(res, "数据");
        if (res.code == 0) {
          this.$message.success('ok')
          this.getArea();
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
    getArea() {
      console.log(this.name);
      _axios(
        "/area",
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
    addArea() {
      this.$refs.addArea.showLayer = true;
    },
    search() {
      this.getArea();
    },
    handleEdit(row) {
      console.log(row);
      this.$refs.editArea.id = row.id;
      this.$refs.editArea.showLayer = true;
      this.$refs.editArea.getMsg();
    },
    handleDelete(row) {
      console.log(row);
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          _axios("/area/" + row.id, {}, "delete").then((res) => {
            console.log(res, "数据");
            if (res.code == 0) {
              this.$message.success(res.msg);
              this.getArea();
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    },
    clear() {
      this.name = "";
      this.getArea();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/common.scss";
.muban{
  cursor: pointer;
  margin-left: 10px;
  &:hover{
    color: #409eff;
  }
}
</style>
