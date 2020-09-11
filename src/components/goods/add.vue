<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>
      <el-alert title="添加商品" type="info" show-icon :closable="false" center></el-alert>
      <el-steps
        :space="200"
        :active="activeindex-0"
        finish-status="success"
        style="margin-top:20px"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品描述"></el-step>
      </el-steps>
      <el-form
        :model="addForm"
        :rules="addrules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          tab-position="left"
          v-model="activeindex"
          :before-leave="beforetableave"
          @tab-click="tabclicked"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="catelist"
                :props="cascaderporps"
                @change="handlechange"
                clearable
                style="margin-left:10px"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item v-for="item in manytabledata" :key="item.attr_id" :label="item.attr_name">
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="cb" v-for="(cb,i) in item.attr_vals" :key="i" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item v-for="item in onlytabledata" :key="item.attr_id" :label="item.attr_name">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              :action="uploadurl"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headerObj"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品描述" name="4">
            <!-- 富文本编辑器组件 -->
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
            <el-button type="primary" style="margin-top:20px" @click="addgood">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getcatelist_api, getinfo_api, addgood_api } from "../../api/goods_api";
import _ from "lodash";
export default {
  data() {
    return {
      activeindex: "0",
      // 添加商品的表单对象
      addForm: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
        goods_cat: [],
        // 图片
        pics: [],
        // 商品详情描述
        goods_introduce: "",
      },
      // 商品分类数据列表
      catelist: [],
      // 级联选择器选中数据
      selectedkeys: [],
      cascaderporps: {
        value: "cat_id",
        expandTrigger: "hover",
        label: "cat_name",
        children: "children",
      },
      // 添加商品的表单验证规则
      addrules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
        ],
        goods_cat: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
        ],
      },
      // 动态参数数据列表
      manytabledata: [],
      // 静态属性数据列表
      onlytabledata: [],
      //  图片上传地址
      uploadurl: "http://127.0.0.1:8888/api/private/v1/upload",
      // 图片上传组件的header请求头对象
      headerObj: {
        Authorization: window.sessionStorage.getItem("token"),
      },
    };
  },
  created() {
    this.getcatelist();
  },
  methods: {
    // 获取所有商品分类数据
    getcatelist() {
      getcatelist_api().then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取商品分类失败!");
        }
        this.catelist = res.data.data;
      });
    },
    // 级联选择器选中项变化触发
    handlechange() {
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = [];
      }
    },
    beforetableave(active, oldactive) {
      if (oldactive === "0" && this.addForm.goods_cat.length !== 3) {
        this.$message.error("请先选择商品分类!");
        return false;
      }
    },
    tabclicked() {
      console.log(this.activeindex);
      if (this.activeindex === "1") {
        getinfo_api(this.cateid, {
          sel: "many",
        }).then((res) => {
          if (res.data.meta.status !== 200) {
            this.$message.error("获取动态参数列表失败!");
          }
          res.data.data.forEach((item) => {
            item.attr_vals =
              item.attr_vals.length === 0 ? [] : item.attr_vals.split(" ");
          });
          this.manytabledata = res.data.data;
        });
      } else if (this.activeindex === "2") {
        getinfo_api(this.cateid, {
          sel: "only",
        }).then((res) => {
          if (res.data.meta.status !== 200) {
            this.$message.error("获取静态列表失败!");
          }
          this.onlytabledata = res.data.data;
        });
      }
    },
    // 处理图片预览效果
    handlePreview() {},
    // 处理移除图片的操作
    handleRemove(file) {
      // 1.获取将要删除的图片的临时路径
      const filepath = file.response.data.tmp_path;
      // 2.从pics数组中,找到这个图片对应的索引值
      const i = this.addForm.pics.findIndex((x) => {
        x.pic === filepath;
      });
      // 3.调用数组的splice方法,把图片信息对象从pics数组中移除
      this.addForm.pics.splice(i, 1);
    },
    handleSuccess(response) {
      // 1.凭借得到一个图片信息对象
      const picInfo = { pic: response.data.tmp_path };
      // 2.将图片信息对象,push到pics数组中
      this.addForm.pics.push(picInfo);
    },
    addgood() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) {
          return this.$message.error("请完善商品基本信息!");
        }
        // 执行添加的业务逻辑
        const form = _.cloneDeep(this.addForm);
        form.goods_cat = form.goods_cat.join(",");
        // 处理动态参数
        this.manytabledata.forEach((item) => {
          const newinfo = {
            addr_id: item.addr_id,
            attr_value: item.attr_vals.join(" "),
          };
          this.addForm.attrs.push(newinfo);
        });
        // 处理静态属性
        this.onlytabledata.forEach((item) => {
          const newinfo = { addr_id: item.addr_id, attr_value: item.attr_vals };
          this.addForm.attrs.push(newinfo);
        });
        form.attrs = this.addForm.attrs;
        // 发起请求添加商品,商品名必须是唯一的
        addgood_api(form).then((res) => {
          if (res.data.meta.status !== 201) {
            return this.$message.error("添加商品失败!");
          }
          this.$message.success("添加商品成功!");
            this.$router.push("/goods");
        });
      });
    },
  },
  computed: {
    cateid() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2];
      }
      return null;
    },
  },
};
</script>

<style lang="less" scoped>
.el-checkbox {
  margin: 0 5px 0 0 !important;
}
</style>