<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索和添加用户 -->
      <el-row :gutter="25">
        <!-- 搜索框 -->
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryinfo.query"
            :clearable="true"
            @clear="getUserlist"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserlist"
            ></el-button>
          </el-input>
        </el-col>
        <!-- 添加用户 -->
        <el-col :span="5">
          <el-button type="primary" @click="adddialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table
        :data="usersinfo"
        :border="true"
        style="width: 100%"
        :stripe="true"
      >
        <el-table-column
          type="index"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
          align="center"
        ></el-table-column>
        <el-table-column prop="mg_state" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#67C23A"
              inactive-color="#909399"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="125px" align="center">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              content="编辑"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                circle
                @click="showeditdialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                circle
                @click="showsetroledialog(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              content="删除"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                @click="removeuserbyid(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="adddialogVisible"
      width="45%"
      @close="resetadd"
    >
      <el-form
        :model="adduserForm"
        :rules="addRules"
        ref="adduserFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="adduserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="adduserForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="adduserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="adduserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="adduser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editdialogVisible" width="45%">
      <el-form
        :model="edituserForm"
        :rules="addRules"
        label-width="100px"
        ref="edituserFormRef"
      >
        <el-form-item label="用户名">
          <el-input v-model="edituserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="edituserForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="edituserForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edituserinfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setroledialogVisible"
      width="45%"
      @close="resetsetrole"
    >
      <div>
        <p>当前用户:{{ this.userinfo.username }}</p>
        <p>当前角色:{{ this.userinfo.role_name }}</p>
        <p>
          分配新角色:
          <el-select v-model="selectedrole" placeholder="请选择">
            <el-option
              v-for="item in roleslist"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="setroledialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setrole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getuserlist_api,
  setrole_api,
  deleteuser_api,
  getuser_api,
  edituser_api,
  adduser_api,
} from "../../api/users_api";
import { getroles_api } from "../../api/rights_api";
export default {
  data() {
    //验证邮箱
    var checkemail = (rule, value, callback) => {
      const regemail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+\.([a-zA-Z0-9_-])+$/;
      if (regemail.test(value)) {
        return callback();
      }
      callback(new Error("请输入正确邮箱"));
    };
    //验证手机号码
    var checkmobile = (rule, value, callback) => {
      const regmobile = /^1([3-9])\d{9}$/;
      if (regmobile.test(value)) {
        return callback();
      }
      callback(new Error("请输入正确手机号"));
    };
    return {
      //获取用户列表的参数对象
      queryinfo: {
        query: "",
        //当前页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 2,
      },
      usersinfo: [],
      total: 0,
      //控制添加用户对话框显示和关闭
      adddialogVisible: false,
      //控制编辑用户对话框显示和关闭
      editdialogVisible: false,
      // 控制分配角色对话框的显示与隐藏
      setroledialogVisible: false,
      //添加用户表单数据
      adduserForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      //添加用户表单验证规则对象
      addRules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", tigger: "blur" },
          { validator: checkemail, tigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机", tigger: "blur" },
          { validator: checkmobile, tigger: "blur" },
        ],
      },
      //编辑对话框查询到的用户信息
      edituserForm: {},
      // 需要被分配角色的用户信息
      userinfo: {},
      // 所有角色的数据列表
      roleslist: [],
      // 已选择分配的角色
      selectedrole: "",
    };
  },
  created() {
    this.getUserlist();
  },
  methods: {
    // async getUserlist() {
    //   const { data: res } = await this.$http.get("users", {
    //     params: this.queryinfo,
    //   });
    //   if (res.meta.status !== 200) {
    //     return this.$message({ message: "获取用户列表失败", type: "error" });
    //   }
    //   this.usersinfo = res.data.users;
    //   this.total = res.data.total;
    // },
    getUserlist() {
      getuserlist_api(this.queryinfo).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message({ message: "获取用户列表失败", type: "error" });
        }
        this.usersinfo = res.data.data.users;
        this.total = res.data.data.total;
      });
    },
    handleCurrentChange(newpagenum) {
      //监听页码值的变化
      this.queryinfo.pagenum = newpagenum;
      this.getUserlist();
    },
    handleSizeChange(newpagesize) {
      //监听每页数据条数变化
      this.queryinfo.pagesize = newpagesize;
      this.getUserlist();
    },
    //重置添加用户对话框
    resetadd() {
      this.$refs.adduserFormRef.resetFields();
    },
    //添加用户
    adduser() {
      this.$refs.adduserFormRef.validate((valid) => {
        //若添加对话框验证不成功则返回
        if (!valid) {
          return;
        }
        //若添加对话框验证成功则发起添加用户的请求
        adduser_api(this.adduserForm).then((res) => {
          if (res.data.meta.status !== 201) {
            return this.$message({
              message: "添加用户失败!",
              type: "error",
            });
          }
          this.getUserlist();
          this.adddialogVisible = false;
          this.$message({ message: "添加用户成功!", type: "success" });
        });
      });
    },
    //获取编辑用户对话框信息
    showeditdialog(id) {
      getuser_api(id).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取用户信息失败");
        }
        this.edituserForm = res.data.data;
        this.editdialogVisible = true;
      });
    },
    // 发送编辑用户请求
    async edituserinfo() {
      this.$refs.edituserFormRef.validate(async (res) => {
        if (!res) {
          return;
        }
        //若编辑对话框验证成功则发起修改用户信息的请求
        edituser_api(this.edituserForm.id, {
          email: this.edituserForm.email,
          mobile: this.edituserForm.mobile,
        }).then((res) => {
          if (res.data.meta.status !== 200) {
            return this.$message.error("修改失败!");
          }
          //修改成功关闭对话框
          this.editdialogVisible = false;
          //更新用户列表
          this.getUserlist();
          //提示修改成功
          this.$message.success("修改成功!");
        });
      });
    },
    // 删除用户
    async removeuserbyid(id) {
      const confirmresult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmresult !== "confirm") {
        return this.$message.info("取消删除");
      }
      deleteuser_api(id).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("删除失败!");
        }
        this.$message.success("删除成功!");
        this.getUserlist();
      });
    },
    showsetroledialog(userinfo) {
      this.userinfo = userinfo;
      getroles_api().then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取角色列表失败!");
        }
        this.roleslist = res.data.data;
        this.setroledialogVisible = true;
      });
    },
    setrole(role) {
      if (!this.selectedrole) {
        return this.$message.error("请选择一个角色!");
      }
      setrole_api(this.userinfo.id, { rid: this.selectedrole }).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("更新用户角色失败!");
        }
        this.getUserlist();
        this.setroledialogVisible = false;
        return this.$message.success("更新用户角色成功!");
      });
    },
    //重置分配角色对话框
    resetsetrole() {
      this.selectedrole = "";
    },
  },
};
</script>

<style lang="less" scoped>
</style>