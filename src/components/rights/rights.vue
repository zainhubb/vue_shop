<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table :data="rightlist" :border="true" style="width: 100%" :stripe="true">
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column prop="authName" label="权限名称" align="center"></el-table-column>
        <el-table-column prop="path" label="路径" align="center"></el-table-column>
        <el-table-column prop="level" label="权限等级" align="center">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.level === '0'">等级一</el-tag>
            <el-tag type="warning" v-else-if="scope.row.level === '1'">等级二</el-tag>
            <el-tag type="danger" v-else-if="scope.row.level === '2'">等级三</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {getrights_api} from "../../api/rights_api";
export default {
  data() {
    return {
      //所有权限列表
      rightlist: [],
    };
  },
  created() {
    this.getrightlist();
  },
  methods: {
    getrightlist() {
      getrights_api().then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取权限列表失败!");
        }
        this.rightlist = res.data.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>