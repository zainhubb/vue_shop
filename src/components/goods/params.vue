<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>分类参数</el-breadcrumb-item>
      </el-breadcrumb>
      <el-alert show-icon title="注意，只允许为第三级分类设置相关参数！" type="warning" :closable="false"></el-alert>
      <!-- 选择商品分类 -->
      <el-row style="margin:15px 0">
        <el-col>
          <span>请选择商品分类:</span>
          <el-cascader
            v-model="selectedkeys"
            :options="catelist"
            :props="cascaderporps"
            @change="getparams"
            clearable
            style="margin-left:10px"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab页签 -->
      <el-tabs v-model="activename" @tab-click="handletabClick" type="card">
        <!-- 动态参数面板 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button
            type="primary"
            size="mini"
            :disabled="isbtndisabled"
            @click="adddialogVisible = true"
          >添加参数</el-button>
          <el-table border stripe :data="manytable">
            <el-table-column type="expand" align="center">
              <template slot-scope="scope">
                <!-- 循环渲染tag -->
                <el-tag
                  v-for="(item,i) in scope.row.attr_vals"
                  :key="i"
                  style="margin:10px"
                  closable
                  @close="hadleclose(i,scope.row)"
                >{{item}}</el-tag>
                <!-- 新建tag输入框 -->
                <el-input
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                  style="width:89.3px"
                ></el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                >+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index" align="center" label="#"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-tooltip class="item" content="编辑" placement="top" :enterable="false">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    circle
                    @click="showeditdialog(scope.row.attr_id)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip class="item" content="删除" placement="top" :enterable="false">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    circle
                    @click="removeparamsbyid(scope.row.attr_id)"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 静态属性面板 -->
        <el-tab-pane label="静态属性" name="only">
          <el-button
            type="primary"
            size="mini"
            :disabled="isbtndisabled"
            @click="adddialogVisible = true"
          >添加属性</el-button>
          <el-table border stripe :data="onlytable">
            <el-table-column type="expand" align="center">
              <template slot-scope="scope">
                <!-- 循环渲染tag -->
                <el-tag
                  v-for="(item,i) in scope.row.attr_vals"
                  :key="i"
                  style="margin:10px"
                  closable
                  @close="hadleclose(i,scope.row)"
                >{{item}}</el-tag>
                <!-- 新建tag输入框 -->
                <el-input
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                  style="width:89.3px"
                ></el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                >+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index" align="center" label="#"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-tooltip class="item" content="编辑" placement="top" :enterable="false">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    circle
                    @click="showeditdialog(scope.row.attr_id)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip class="item" content="删除" placement="top" :enterable="false">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    circle
                    @click="removeparamsbyid(scope.row.attr_id)"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加参数对话框 -->
    <el-dialog :title="titleText" :visible.sync="adddialogVisible" @close="resetadddialog">
      <el-form :model="addForm" :rules="addrules" ref="addFormRef" label-width="100px">
        <el-form-item :label="labelText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addparams">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑参数对话框 -->
    <el-dialog :title="titleText" :visible.sync="editdialogVisible">
      <el-form :model="editForm" :rules="addrules" ref="editFormRef" label-width="100px">
        <el-form-item :label="labelText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editparams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getcatelist_api,
  getinfo_api,
  addparams_api,
  saveattrvals_api,
  showeditdialog_api,
  editparams_api,
  removeparamsbyid_api
} from "../../api/goods_api";
export default {
  created() {
    this.getcatelist();
  },
  data() {
    return {
      catelist: [],
      cascaderporps: {
        value: "cat_id",
        expandTrigger: "hover",
        label: "cat_name",
        children: "children",
      },
      inputValue: "",
      // 控制按钮tag与文本框的显示
      inputVisible: false,
      selectedkeys: [],
      // 被激活页签名称
      activename: "many",
      isbtndisabled: true,
      cateid: "",
      titleText: "",
      labelText: "",
      // 动态参数数据
      manytable: [],
      // 静态属性数据
      onlytable: [],
      adddialogVisible: false,
      editdialogVisible: false,
      addForm: {
        attr_name: "",
      },
      addrules: {
        attr_name: [
          { required: true, message: "请输入参数或属性", trigger: "blur" },
        ],
      },
      editForm: {
        attr_name: "",
      },
    };
  },
  methods: {
    getcatelist() {
      getcatelist_api().then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取商品分类失败!");
        }
        this.catelist = res.data.data;
      });
    },
    // 级联选择框选择后触发
    // 获取参数或属性数据
    getparams() {
      // 如果选择的不是第三级分类
      if (this.selectedkeys.length !== 3) {
        this.manytable = [];
        this.onlytable = [];
        this.isbtndisabled = true;
        this.selectedkeys = [];
        this.cateid = "";
        return;
      }
      //选择了三级分类后才可点击下方按钮
      this.isbtndisabled = false;
      this.cateid = this.selectedkeys[2];
      getinfo_api(this.cateid, { sel: this.activename }).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取参数列表失败!");
        }
        res.data.data.forEach((item) => {
          item.inputVisible = false;
          item.inputValue = "";
          item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];
        });
        if (this.activename === "many") {
          this.titleText = "添加动态参数";
          this.labelText = "动态参数";
          this.manytable = res.data.data;
        } else {
          this.titleText = "添加静态参数";
          this.labelText = "静态属性";
          this.onlytable = res.data.data;
        }
      });
    },
    // tab页签点击触发
    handletabClick() {
      this.getparams();
    },
    // 对话框关闭触发清空
    resetadddialog() {
      this.$refs.addFormRef.resetFields();
    },
    addparams() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) {
          return;
        }
        addparams_api(this.cateid, {
          attr_name: this.addForm.attr_name,
          attr_sel: this.activename,
        }).then((res) => {
          if (res.data.meta.status !== 201) {
            return this.$message.error("添加失败!");
          }
          this.$message.success("添加成功!");
          this.adddialogVisible = false;
          this.getparams();
        });
      });
    },
    showeditdialog(attr_id) {
      this.editdialogVisible = true;
      showeditdialog_api(this.cateid, attr_id, {
        attr_sel: this.activename,
      }).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取失败!");
        }
        this.editForm = res.data.data;
      });
    },
    editparams() {
      this.$refs.editFormRef.validate( (valid) => {
        if (!valid) {
          return;
        }
        editparams_api(this.cateid, this.editForm.attr_id, {
          attr_name: this.editForm.attr_name,
          attr_sel: this.activename,
        }).then(res=>{
          if (res.data.meta.status !== 200) {
          return this.$message.error("修改失败!");
        }
        this.$message.success("修改成功!");
        this.getparams();
        this.editdialogVisible = false;
        })
        
      });
    },
    async removeparamsbyid(id) {
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

      removeparamsbyid_api(this.cateid,id).then(res=>{
     if (res.data.meta.status !== 200) {
        return this.$message.error("删除失败!");
      }
      this.$message.success("删除成功!");
      this.getparams();
      })
 
    },
    // 文本框失去焦点,或者按下了`enter`都会触发
    handleInputConfirm(row) {
      if (row.inputValue.trim().length === 0) {
        row.inputValue = "";
        row.inputVisible = false;
        return;
      }
      // 如果没有return 则表示输入的内容不为空,需做后续处理
      row.attr_vals.push(row.inputValue);
      row.inputValue = "";
      row.inputVisible = false;
      // 发起请求保存此次操作
      this.saveattrvals(row);
    },
    saveattrvals(row) {
      saveattrvals_api(this.cateid, row.attr_id, {
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: row.attr_vals.join(" "),
      }).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("修改失败!");
        }
        return this.$message.success("修改成功!");
      });
    },
    // 点击按钮显示文本输入框
    showInput(row) {
      row.inputVisible = true;
      // 让文本框自动获得焦点
      // $nextTick :当页面上元素被重新渲染之后才会执行回调函数中的代码
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    hadleclose(i, row) {
      row.attr_vals.splice(i, 1);
      this.saveattrvals(row);
    },
  },
};
</script>

<style lang="less" scoped>
</style>