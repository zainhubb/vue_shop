<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" @click="adddialogVisible = true">添加角色</el-button>
      <el-table :data="rolelist" :border="true" style="width: 100%" :stripe="true">
        <!-- 权限展开展示 -->
        <el-table-column type="expand" label="展示" align="center">
          <template slot-scope="scope">
            <el-row
              v-for="(item1,i1) in scope.row.children"
              :key="item1.id"
              :class="['bdbottom',i1===0?'bdtop':'']"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removerightbyid(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <el-row
                  v-for="(item2,i2) in item1.children"
                  :key="item2.id"
                  :class="[i2===0?'':'bdtop']"
                >
                  <!-- 二级权限 -->
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removerightbyid(scope.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="18">
                    <el-tag
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      type="danger"
                      closable
                      @close="removerightbyid(scope.row,item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <pre>
              {{scope.row}}
              </pre>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="#" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" align="center"></el-table-column>
        <el-table-column label="操作" width="125px">
          <!-- 三个操作按钮 -->
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top" :enterable="false">
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
              effect="dark"
              content="分配权限"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                circle
                @click="showsetrightdialog(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                @click="removerolebyid(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="adddialogVisible" width="50%" @close="resetadd">
      <el-form
        :model="addroleForm"
        ref="addFormRef"
        label-width="100px"
        class="demo-ruleForm"
        :rules="addrules"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addroleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addroleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addrole">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑角色对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editdialogVisible" width="50%">
      <el-form :model="editroleForm" :rules="addrules" label-width="100px" ref="editroleFormRef">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editroleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editroleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editroleinfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限对话框 -->
    <el-dialog title="分配权限" :visible.sync="setrightdialogVisible" width="50%" @close="resetsetright">
      <!-- 树形控件 -->
      <el-tree
        :data="rightslist"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defkeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setrightdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotrights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolelist: [],
      addroleForm: {
        roleName: "",
        roleDesc: "",
      },
      // 控制添加角色对话框显示与否
      adddialogVisible: false,
      // 控制编辑角色对话框显示与否
      editdialogVisible: false,
      // 控制分配权限对话框显示与否
      setrightdialogVisible: false,
      // 角色权限数据
      rightslist: [],
      // 树形控件属性绑定对象
      treeProps: {
        children: "children",
        label: "authName",
      },
      // 默认选中的权限id数组
      defkeys: [],
      addrules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
      editroleForm: {},
      // 即将分配全选的角色id
      roleid: ''
    };
  },
  created() {
    this.getrolelist();
  },
  methods: {
    async getrolelist() {
      const { data: result } = await this.$http.get("roles");
      if (result.meta.status !== 200) {
        return this.$message.error("获取角色列表失败!");
      }
      this.rolelist = result.data;
    },
    resetadd() {
      this.$refs.addFormRef.resetFields();
    },
    addrole() {
      this.$refs.addFormRef.validate(async (value) => {
        //若添加对话框验证不成功则返回
        if (!value) {
          return;
        }
        //若添加对话框验证成功则发起添加角色的请求
        const { data: result } = await this.$http.post(
          "roles",
          this.addroleForm
        );
        console.log(result);
        if (result.meta.status !== 201) {
          return this.$message.error("添加角色失败!");
        }
        this.getrolelist();
        this.adddialogVisible = false;
        this.$message.success("添加角色成功!");
      });
    },
    async removerolebyid(id) {
      //删除前确认
      const confirmresult = await this.$confirm(
        "此操作将永久删除该角色, 是否继续?",
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
      const { data: result } = await this.$http.delete("roles/" + id);
      if (result.meta.status !== 200) {
        return this.$message.error("删除失败!");
      }
      this.$message.success("删除成功!");
      this.getrolelist();
    },
    async showeditdialog(id) {
      const { data: result } = await this.$http.get("roles/" + id);
      if (result.meta.status !== 200) {
        return this.$message.error("获取角色信息失败");
      }
      this.editroleForm = result.data;
      this.editdialogVisible = true;
    },
    async editroleinfo() {
      this.$refs.editroleFormRef.validate(async (res) => {
        if (!res) {
          return;
        }
        // 若编辑对话框验证成功则发起修改用户信息的请求
        const { data: result } = await this.$http.put(
          "roles/" + this.editroleForm.roleId,
          {
            roleName: this.editroleForm.roleName,
            roleDesc: this.editroleForm.roleDesc,
          }
        );
        if (result.meta.status !== 200) {
          return this.$message.error("修改失败!");
        }
        //修改成功关闭对话框
        this.editdialogVisible = false;
        //更新用户列表
        this.getrolelist();
        //提示修改成功
        this.$message.success("修改成功!");
      });
    },
    //删除权限
    async removerightbyid(role, rightid) {
      //删除前确认
      const confirmresult = await this.$confirm(
        "此操作将对改角色永久删除此权限, 是否继续?",
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
      const { data: result } = await this.$http.delete(
        `roles/${role.id}/rights/${rightid}`
      );
      if (result.meta.status !== 200) {
        return this.$message.error("删除失败!");
      }
      this.$message.success("删除成功!");
      role.children = result.data;
    },
    async showsetrightdialog(role) {
      this.roleid = role.id
      const { data: result } = await this.$http.get("rights/tree");
      if (result.meta.status !== 200) {
        return this.$message.error("获取角色权限失败!");
      }
      //把获取到的角色权限保存
      this.rightslist = result.data;
      this.getleafkeys(role, this.defkeys);
      this.setrightdialogVisible = true;
    },
    // 通过递归的方式获取角色下所有三级权限的id,并保存到defkeys数组中
    getleafkeys(node, arr) {
      if (!node.children) {
        // 如果当前节点不包含children属性则为三级节点.
        return arr.push(node.id);
      }
      node.children.forEach((item) => {
        this.getleafkeys(item, arr);
      });
    },
    // 监听分配权限对话框的关闭事件,每次关闭对话框清空defkeys
    resetsetright(){
      this.defkeys=[]
    },
    async allotrights(){
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ]
      const idStr = keys.join(',')
      const {data:result} = await this.$http.post(`roles/${this.roleid}/rights`,{rids:idStr})
      if(result.meta.status !== 200){
        return this.$message.error("分配权限失败!")
      }
      this.setrightdialogVisible = false
      this.$message.success("分配权限成功!")
      this.getrolelist()
    }
  },
};
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.el-row {
  display: flex;
  align-items: center;
}
</style>