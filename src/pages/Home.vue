
<template>
  <div>
    <el-row>
      <!-- 左边三分之一内容 -->
      <el-col :span="8" style="padding-right:10px">
        <!-- 头像盒子部分 -->
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/tu1.jpg" />
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>
              上次登录时间：
              <span>2022.10.13</span>
            </p>
            <p>
              上次登录地点：
              <span>福建</span>
            </p>
          </div>
        </el-card>
        <!-- 列表部分 -->
        <el-card style="height:460px">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              v-for="item in tableLable"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
            ></el-table-column>
            <!-- <el-table-column prop="daybuy" label="本日购买"></el-table-column>
            <el-table-column prop="moonbuy" label="本月购买"></el-table-column>
            <el-table-column prop="totalbuy" label="总购买"></el-table-column>-->
          </el-table>
        </el-card>
      </el-col>
      <!-- 右边三分之二部分 -->
      <el-col :span="16" style="padding-left:10px">
        <!-- 顶部六个小框 -->
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{display:'flex', padding:0}"
          >
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
            <div class="detial">
              <p class="price">￥{{item.value}}</p>
              <p class="desc">{{item.name}}</p>
            </div>
          </el-card>
        </div>
        <!-- 中间折线图 -->
        <el-card style="height:280px;margin-bottom:20px">
          <div ref="echarts1" style="height:280px"></div>
        </el-card>
        <!-- 底部饼状图 -->
        <div class="grouph">
          <el-card>
            <div ref="echarts2" style="height:266px"></div>
          </el-card>
          <el-card>
            <div ref="echarts3" style="height:266px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from "../api";
import * as echarts from "echarts";
// import { color } from "echarts";
export default {
  name: "MyUser",
  data() {
    return {
      tableData: [],
      tableLable: [
        {
          prop: "brand",
          label: "品牌"
        },
        {
          prop: "daybuy",
          label: "本日购买"
        },
        {
          prop: "moonbuy",
          label: "本月购买"
        },
        {
          prop: "totalbuy",
          label: "总购买"
        }
      ],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#54acf2"
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#54acf2"
        }
      ]
    };
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      this.tableData = tableData;

      // 折线图
      const echarts1 = echarts.init(this.$refs.echarts1);
      var echarts1Option = {};
      const { orderData, userData, videoData } = data.data;
      const xAxis = Object.keys(orderData.data[0]);
      echarts1Option.xAxis = { data: xAxis };
      echarts1Option.yAxis = {};
      echarts1Option.legend = {
        data: xAxis
      };
      echarts1Option.series = [];
      xAxis.forEach(key => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map(item => item[key]),
          type: "line"
        });
      });
      // console.log(xAxis);
      echarts1.setOption(echarts1Option);

      // 柱状图
      const echarts2 = echarts.init(this.$refs.echarts2);
      const echarts2Option = {
        legend: {
          textStyle: {
            color: "#333"
          }
        },
        grid: {
          left: "20%"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3"
            }
          },
          axisLabel: {
            interval: 0,
            color: "#333"
          }
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3"
              }
            }
          }
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map(item => item.new),
            type: "bar"
          },
          {
            name: "活跃用户",
            data: userData.map(item => item.active),
            type: "bar"
          }
        ]
      };
      echarts2.setOption(echarts2Option);

      // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3);
      const echarts3Option = {
        tooltip: {
          trigger: "item"
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf"
        ],
        series: [
          {
            data: videoData,
            type: "pie"
          }
        ]
      };
      echarts3.setOption(echarts3Option);
    });
  }
};
</script>

<style lang='less' scoped>
// 左边三分之一的头像部分
.box-card {
  margin-bottom: 20px;
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: solid 1px #ccc;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 50px;
    }
    .userinfo {
      .name {
        font-size: 32px;
        border-bottom: 10px;
      }
      .access {
        color: #999;
      }
    }
  }

  .login-info {
    p {
      line-height: 28px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }
}

// 右边的上半部分
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detial {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      height: 30px;
      line-height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
}

// 折线图部分

// 饼状图部分
.grouph {
  display: flex;
  justify-content: space-between;

  margin-top: 10px;
  .el-card {
    height: 266px;
    width: 48%;
  }
}
</style>