<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary" @click="showadddialog">添加分类</el-button>
      <el-table
        :data="catelist"
        style="width: 100%;margin-bottom: 20px;"
        row-key="cat_id"
        border
        :tree-props="{children: 'children'}"
      >
        <el-table-column prop="cat_name" label="分类名称" sortable width="180"></el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效" sortable width="180" align="center">
          <template slot-scope="scope">
            <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color:green"></i>
            <i class="el-icon-error" v-else-if="scope.row.cat_deleted === true" style="color:red"></i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="分类等级" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level===0">等级一</el-tag>
            <el-tag type="success" v-else-if="scope.row.cat_level===1">等级二</el-tag>
            <el-tag type="warning" v-else-if="scope.row.cat_level===2">等级三</el-tag>
          </template>
        </el-table-column>
        <!-- 两个操作按钮 -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" content="编辑" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                circle
                @click="showeditdialog(scope.row)"
                style="margin:0 15px"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" content="删除" placement="top" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                @click="removecatebyid(scope.row.cat_id)"
                style="margin:0 15px"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-sizes="[1,2,5,10]"
        :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="adddialogVisible"
      width="45%"
      @close="resetaddcateform"
      ref="addcateFormRef"
    >
      <el-form :model="addcateForm" :rules="addRules" ref="addcateFormRef" label-width="100px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addcateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            v-model="selectedkeys"
            :options="parentcatelist"
            :props="cascaderporps"
            @change="parentcatechange"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑分类对话框 -->
    <el-dialog title="编辑分类" :visible.sync="editdialogVisible" width="45%">
      <el-form :model="editcateForm" :rules="addRules" label-width="100px" ref="editcateFormRef">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editcateForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editcate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getcatelist2_api,
  getParentcatelist_api,
  getcate_api,
  addCate_api,
  removecatebyid_api,
  editcate_api,
} from "../../api/goods_api";
export default {
  data() {
    return {
      queryinfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      // 商品分类的数据列表
      catelist: [],
      // 总数据条数
      total: 0,
      // 控制添加分类对话框显示与否
      adddialogVisible: false,
      // 控制编辑分类对话框显示与否
      editdialogVisible: false,
      // 添加分类的表单数据对象
      addcateForm: {
        cat_name: "",
        cat_pid: 0,
        cat_level: 0,
      },
      editcateForm: {},
      addRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      // 父级分类列表
      parentcatelist: [],
      cascaderporps: {
        value: "cat_id",
        expandTrigger: "hover",
        label: "cat_name",
        children: "children",
        checkStrictly: "true",
      },
      // 级联选择器中选择的分类
      selectedkeys: [],
    };
  },
  created() {
    this.getcatelist();
  },
  methods: {
    // 获取商品分类数据
    getcatelist() {
      getcatelist2_api(this.queryinfo).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("商品分类获取失败!");
        }
        // 把商品分类数据保存
        this.catelist = res.data.data.result;
        // 为总数据条数赋值
        this.total = res.data.data.total;
      });
    },
    handleCurrentChange(newpagenum) {
      //监听页码值的变化
      this.queryinfo.pagenum = newpagenum;
      this.getcatelist();
    },
    handleSizeChange(newpagesize) {
      //监听每页数据条数变化
      this.queryinfo.pagesize = newpagesize;
      this.getcatelist();
    },
    showadddialog() {
      //先获取父级分类数据再展示对话框
      this.getParentcatelist();
      this.adddialogVisible = true;
    },
    showeditdialog(cate) {
      getcate_api(cate.cat_id).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取分类信息失败");
        }
        this.editcateForm = res.data.data;
        this.editdialogVisible = true;
      });
    },
    // 获取父级分类的数据列表
    getParentcatelist() {
      getParentcatelist_api({ type: 2 }).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取父级分类失败!");
        }
        this.parentcatelist = res.data.data;
      });
    },
    parentcatechange() {
      // 如果selectedkeys数组length大于0,则表示已经选择某个分类
      if (this.selectedkeys.length > 0) {
        this.addcateForm.cat_pid = this.selectedkeys[
          this.selectedkeys.length - 1
        ];
        this.addcateForm.cat_level = this.selectedkeys.length;
      }
    },
    addCate() {
      console.log(this.addcateForm);
      this.$refs.addcateFormRef.validate( (valid) => {
        if (!valid) return;

        addCate_api(this.addcateForm).then((res) => {
          if (res.data.meta.status !== 201) {
            return this.$message.error("添加分类失败!");
          }
          this.$message.success("添加分类成功!");
          this.getcatelist();
          this.adddialogVisible = false;
        });
      });
    },
    resetaddcateform() {
      this.$refs.addcateFormRef.resetFields();
      this.selectedkeys = [];
      (this.addcateForm.cat_pid = 0), (this.addcateForm.cat_level = 0);
    },
    editcate() {
      this.$refs.editcateFormRef.validate( (valid) => {
        if (!valid) return;
        editcate_api(this.editcateForm.cat_id, {
          cat_name: this.editcateForm.cat_name,
        }).then((res) => {
          if (res.data.meta.status !== 200) {
            return this.$message.error("修改分类失败!");
          }
          this.$message.success("修改分类成功!");
          this.getcatelist();
          this.editdialogVisible = false;
        });
      });
    },
    async removecatebyid(id) {
      const confirmresult = await this.$confirm(
        "此操作将永久删除该商品分类, 是否继续?",
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
      removecatebyid_api(id).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("删除失败!");
        }
        this.$message.success("删除成功!");
        this.getcatelist();
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>