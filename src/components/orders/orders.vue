<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table :data="orderlist" border stripe>
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column prop="order_number" label="订单号" align="center"></el-table-column>
        <el-table-column prop="order_price" label="订单价格" align="center"></el-table-column>
        <el-table-column prop="pay_status" label="付款状态" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.pay_status === '1'">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="下单时间" align="center">
          <template slot-scope="scope">{{scope.row.update_time*1000 |dateformat}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <el-tooltip class="item" content="修改地址" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                circle
                style="margin:0 15px"
                @click="editdialogVisible =true"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" content="查看物流" placement="top" :enterable="false">
              <el-button
                type="success"
                icon="el-icon-location"
                size="mini"
                circle
                style="margin:0 15px"
                @click="showprogress"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-sizes="[5,10,20]"
        :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 修改地址对话框 -->
    <el-dialog title="修改地址" :visible.sync="editdialogVisible" @close="close">
      <el-form :model="editorderForm" :rules="editRules" ref="editorderFormRef" label-width="100px">
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            :options="cityData"
            v-model="editorderForm.address1"
            style="width:100%"
            :props="cascaderProps"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="editorderForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editdialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="物流信息" :visible.sync="progressdialogVisible">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in progressinfo"
          :key="index"
          :timestamp="activity.time"
        >{{activity.context}}</el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import cityData from "./citydata";
export default {
  data() {
    return {
      // 订单查询参数对象
      queryinfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      // 订单数据列表
      orderlist: [],
      // 订单总数
      total: 0,
      // 默认编辑订单对话框关闭
      editdialogVisible: false,
      // 默认物流信息对话框关闭
      progressdialogVisible: false,
      // 编辑订单地址表单对象
      editorderForm: {
        address1: [],
        address2: "",
      },
      // 物流信息
      progressinfo:[],
      editRules: {
        address2: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
      },
      cityData,
      cascaderProps: {
        expandTrigger: "hover",
        children: "children",
      },
    };
  },
  created() {
    this.getorderlist();
  },
  methods: {
    async getorderlist() {
      const { data: result } = await this.$http.get("orders", {
        params: this.queryinfo,
      });
      if (result.meta.status !== 200) {
        return this.$message.error("订单列表获取失败!");
      }
      this.orderlist = result.data.goods;
      this.total = result.data.total;

      console.log(this.orderlist);
    },
    handleSizeChange(newpagesize) {
      this.queryinfo.pagesize = newpagesize;
      this.getorderlist();
    },
    handleCurrentChange(newpagenum) {
      this.queryinfo.pagenum = newpagenum;
      this.getorderlist();
    },
    close() {
      this.$refs.editorderFormRef.resetFields();
    },
    async showprogress() {
      const { data: result } = await this.$http.get("kuaidi/1106975712662");
      if (result.meta.status !== 200) {
        return this.$message.error("物流信息获取失败!");
      }
      this.progressinfo = result.data
      console.log(this.progressinfo);
      this.progressdialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
</style>