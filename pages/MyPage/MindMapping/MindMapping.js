// pages/MyPage/MindMapping/MindMapping.js
import {
  handleTabbarChange,
  getTabbarHeight
} from '../../../utils/tabbar/tabbar.js';
import * as echarts from '../../../ec-canvas/echarts';
const {
  $Toast
} = require('../../../dist/base/index');
let chart = null;
const app = getApp();
// var node = new Array;
// var link = new Array;
// 2、进行初始化数据
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,

  });
  canvas.setChart(chart);
  var webkitDep = {
    "type": "force",
    "categories": [ //关系网类别，可以写多组  
      {
        "name": "本词", //关系网名称  
        "keyword": {},
        "base": "本词",
        "textStyle": {
          fontWeight: 'normal',
          fontSize: 20
        }
      },
      {
        "name": "近义", //关系网名称  
        "keyword": {},
        "base": "近义",
        "textStyle": {
          fontWeight: 'normal',
          fontSize: 20
        }
      },
      {
        "name": "反义", //关系网名称  
        "keyword": {},
        "base": "反义"
      },
      {
        "name": "形近", //关系网名称  
        "keyword": {},
        "base": "形近"
      },
      {
        "name": "音近", //关系网名称  
        "keyword": {},
        "base": "音近"
      },
      {
        "name": "搭配", //关系网名称  
        "keyword": {},
        "base": "搭配"
      }
    ],
    "nodes": app.globalData.nodes,
    "links": app.globalData.link,
  };
  // console.log(webkitDep.nodes);
  // console.log(typeof webkitDep.nodes);
  // webkitDep.nodes = node;
  // webkitDep.links = link;
  var option = {
    title: {
      text: '单词关系图',
      subtext: 'Light layout',
      top: 'bottom',
      left: 'right'
    },
    legend: {
      data: ['本词', '近义', '同义', '反义', '形近', '音近', '搭配'], //此处的数据必须和关系网类别中name相对应  
      textStyle: {
        fontWeight: 'normal',
        fontSize: 15
      }
    },
    series: [{

      type: 'graph',
      layout: 'force',
      animation: false,
      label: {
        normal: {
          show: true,
          position: 'right',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 15
          }
        }
      },
      color: [
        '#000', 'rgba(250, 62, 62, 0.678)', 'rgb(252, 207, 84)', 'rgb(250, 253, 67)', 'rgb(44, 250, 216)', 'rgb(67, 200, 253)', 'rgb(219, 128, 255)'
      ],
      draggable: true,
      data: webkitDep.nodes.map(function(node, idx) {
        node.id = idx;
        return node;
      }),
      categories: webkitDep.categories,
      force: {
        edgeLength: 105, //连线的长度  
        repulsion: 100, //子节点之间的间距 
      },
      edges: webkitDep.links
    }]
  };

  chart.setOption(option);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: "MindMapping",
    tabbarHeight: null,
    value: '',
    ec: {

    },
    numm:0,
    this_nodes:[],
    this_links:[]
  },
  onShareAppMessage: function(res) {
    return {
      title: 'ECharts',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  onReady() {
    setTimeout(function() {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  },
  handleChange: function({
    detail
  }) {
    handleTabbarChange(detail.key);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      ec: {
        onInit: initChart
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },
  isExit: function(data, dataSet) {
    for (var i = 0; i < dataSet.length; i++) {
      if (data == dataSet[i].name) {
        return 1
      }
    }
    return 0
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getData: function(e) {
    this.setData({
      value: e.detail.value
    })
  },
  onSearch: function() {
    var value = this.data.value;
    var data = new Array;
    var nodes = new Array;
    var link = new Array;
    var that = this;
    // console.log(that.globalData.URL);
    // console.log(that.globalData.nodes);
    var num = 1;
    wx.request({
      url: app.globalData.URL + '/relaWords2.do',
      method: 'GET',
      data: {
        openId: 'qqq',
        wId1: value
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data.data)
        if (res.data.data[1].length != 0 || res.data.data[2].length != 0 || res.data.data[3].length != 0 || res.data.data[4].length != 0 || res.data.data[5].length != 0) {
          for (var i = 1; i <= 5; i++) {
            data[i] = res.data.data[i];
          }
          nodes[0] = {
            "name": value,
            "value": 0,
            "category": 0,
            "symbolSize": 24
          }
          for (var i = 1; i <= 5; i++)
            for (var j = 0; j < data[i].length; j++) {
              nodes[num] = {
                  "name": data[i][j],
                  "value": num,
                  "category": i,
                  "symbolSize": 24
                },
                link[num - 1] = {
                  "source": 0,
                  "target": num,
                }
              num++;
            }
          console.log(nodes, link)
          app.globalData.nodes = nodes;
          app.globalData.link = link;
          that.setData({
            this_nodes:nodes,
            numm:num
          })
          wx.redirectTo({
            url: '../MindMapping/MindMapping',
          })
          console.log(num)
        } else {
          $Toast({
            content: '没有对应单词或未生成思维导图',
            type: 'error'
          })
        }
      },
      fail: function(err) {
        console.log("sssssssssssss" + err.data);
      }
    })
    console.log(this.data.numm)
   /*
    for (var t = 1; t < nodes.length; t++) {
      var word = nodes[t].name
      console.log('word')
      var id = nodes[t].value
      wx.request({
        url: app.globalData.URL + '/relaWords2.do',
        method: 'GET',
        data: {
          openId: 'qqq',
          wId1: word
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          if (res.data.data) {
            for (var a = 1; a <= 5; a++) {
              data[a] = res.data.data[a];
            }
            for (var b = 1; b <= 5; b++)
              for (var c = 0; c < data[b].length; c++) {
                var flag = 0
                for (var d = 0; d < nodes.length; i++) {
                  if (word == nodes[d].name) {
                    flag = 1
                    break
                  }
                }
                if (flag == 0) {
                  nodes[num] = {
                      "name": data[b][c],
                      "value": num,
                      "category": b,
                      "symbolSize": 24
                    },
                    link[num] = {
                      "source": id,
                      "target": num,
                    }
                  num++;
                }
              }
            console.log(nodes, link)
            app.globalData.nodes = nodes;
            app.globalData.link = link;
           
          } else {
            
          }
        }
      })
    }*/
  },

})