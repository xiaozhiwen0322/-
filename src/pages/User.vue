<template>
  <div class="manage">
    <div class="addAndSearch">
      <el-button @click="handleAdd" type="primary">新增</el-button>
      <el-form :inline="true" class="demo-form-inline" :model="searchData">
        <el-form-item>
          <el-input placeholder="请输入查询内容" v-model="searchData.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <el-form
        :inline="true"
        ref="ruleForm"
        label-width="100px"
        class="demo_formList"
        :rules="rules"
        :model="form"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.birth"
            style="width: 100%;"
            value-format="yyyy-MM-DD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="住址" prop="addr">
          <el-input placeholder="请输入住址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm" class="resetBtn">重 置</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddForm">确 定</el-button>
      </span>
    </el-dialog>

    <div class="listAndPagination">
      <el-table height="90%" :data="tableData" style="width:100%" :stripe="true">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span style="margin-left:10px">{{scope.row.sex === 1? '男':'女'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="birth" label="出生日期"></el-table-column>
        <el-table-column prop="addr" label="地址"></el-table-column>
        <el-table-column prop="addr" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination layout="prev, pager, next" :total="listTotal" @current-change="changePage"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
//
import { getUser, addUser, editUser, delUser } from "../api";
import { Message } from "element-ui";
export default {
  name: "MyHome",
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请输入生日" }],
        addr: [{ required: true, message: "请输入住址" }]
      },
      tableData: [],
      formState: 0,
      listTotal: 0,
      pageData: {
        page: 1,
        limit: 10
      },
      searchData: {
        name: ""
      }
    };
  },
  methods: {
    handleAdd() {
      this.formState = 1;
      this.dialogVisible = true;
    },
    submitAddForm() {
      this.$refs.ruleForm.validate(valid => {
        if (this.formState === 1) {
          addUser(this.form).then(() => {
            this.getList();
          });
        } else {
          editUser(this.form).then(() => {
            this.getList();
          });
        }
        if (valid) {
          console.log(this.form);
          this.dialogVisible = false;
          this.resetForm();
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    handleEdit(data) {
      this.formState = 0;
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(data));
      console.log(data);
    },
    handleDel(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delUser({ id: data.id }).then(() => {
            Message({
              type: "success",
              message: "删除成功!"
            });
            this.getList();
          });
        })
        .catch(() => {
          Message({
            type: "info",
            message: "已取消删除"
          });
        });

      console.log(data);
    },
    getList() {
      getUser({ params: { ...this.searchData, ...this.pageData } }).then(
        ({ data }) => {
          console.log(data);
          this.listTotal = data.count;
          this.tableData = data.list;
        }
      );
    },
    changePage(val) {
      this.pageData.page = val;
      this.getList();
    },
    onSubmit() {
      this.getList();
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
.resetBtn {
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(230, 230, 230);
  color: rgb(120, 120, 120);
}
.resetBtn:hover {
  background-color: rgb(252, 175, 112);
  border: 1px solid rgb(160, 70, 70);
  color: rgb(136, 68, 56);
}
.manage {
  height: 90%;
  .addAndSearch {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .demo-form-inline {
      right: 20px;
    }
  }
}
.listAndPagination {
  position: relative;
  height: calc(100% - 62px);
  .block {
    position: absolute;
    padding: 0;
    right: 20px;
  }
}
</style>