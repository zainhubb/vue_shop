<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row :gutter="25">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            :clearable="true"
            v-model="queryinfo.query"
            @clear="getgoodslist"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getgoodslist"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="gotoadd">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="goodslist" border stripe>
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column
          label="商品名称"
          prop="goods_name"
          align="center"
          width="600px"
        ></el-table-column>
        <el-table-column
          label="商品价格"
          prop="goods_price"
          align="center"
          width="100px"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="add_time"
          align="center"
          width="150px"
        >
          <template slot-scope="scope">{{
            (scope.row.add_time * 1000) | dateformat
          }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
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
                @click="removegoodbyid(scope.row.goods_id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-sizes="[10, 20, 50]"
        :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getgoodslist_api, removegoodbyid_api } from "../../api/goods_api";
export default {
  data() {
    return {
      // 查询参数对象
      queryinfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      // 获取到的商品数据列表
      goodslist: [],
      total: 0,
    };
  },
  created() {
    this.getgoodslist();
  },
  methods: {
    getgoodslist() {
      getgoodslist_api(this.queryinfo).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取商品失败!");
        }
        this.goodslist = res.data.data.goods;
        this.total = res.data.data.total;
      });
    },
    handleCurrentChange(newpagenum) {
      this.queryinfo.pagenum = newpagenum;
      this.getgoodslist();
    },
    handleSizeChange(newpagesize) {
      this.queryinfo.pagesize = newpagesize;
      this.getgoodslist();
    },
    async removegoodbyid(id) {
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
      removegoodbyid_api(id).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("删除失败!");
        }
        this.$message.success("删除成功!");
        this.getgoodslist();
      });
    },
    gotoadd() {
      this.$router.push("/goods/add");
    },
  },
};
</script>

<style lang="less" scoped>
</style>