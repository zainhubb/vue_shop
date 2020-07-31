<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
        <el-breadcrumb-item>数据报表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 2.为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 800px;height:500px;"></div>
    </el-card>
  </div>
</template>

<script>
import _ from 'lodash'
// 1.导入echart
import echarts from 'echarts'
export default {
  data(){
    return{
      option :{
        title: {
            text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  created(){

  },
  // dom元素初始化完毕后执行mounted
  async mounted(){
        // 3.基于准备好的dom，初始化echarts实例
        let Chart = echarts.init(document.getElementById('main'));

        
        // 4.准备数据和配置项
        // 获取折线图数据
        const{data:result} = await this.$http.get('reports/type/1')
        if(result.meta.status !== 200){
          return this.$message.error("获取折线图数据失败!")
        }
        const res = _.merge(result.data,this.option)
          // 5.使用刚指定的配置项和数据显示图表。
        Chart.setOption(res);
  },
  methods:{
    
  }
};
</script>

<style lang="less" scoped>
</style>