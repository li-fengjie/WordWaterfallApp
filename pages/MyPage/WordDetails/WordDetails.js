// pages/MyPage/WordDetails/WordDetails.js
// 1、引入依赖脚本
import * as echarts from '../../../ec-canvas/echarts';
const app=getApp()
let chart = null;

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
    "nodes": app.globalData.nodes2,
    "links": app.globalData.link2,
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
      data: webkitDep.nodes.map(function (node, idx) {
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
    word: 'abandon',
    details1: '英 [əˈbɒlɪʃ]   美 [əˈbɑːlɪʃ]',
    details2: 'vt. 废除，废止；取消，革除',
    phrases: [
      'to abolish 废止取消制度等破除',
      'abolish effectually 有效地废',
      '.abolish completely 完全废除'
    ],
    columns: [
      '近义词', '同义词', '形近词', '音近词', '反义词', '自定义关系'
    ],
    sentence_C: 'The following year Parliament voted to abolish the death penalty for murder. ',
    sentence_E: '议会于翌年表决对谋杀罪废除死刑。',
    show: false,
    switch1: false,
    relations: ['近义词', '反义词', '相似词', '自定义关系'],
    value: '',
    current: '近义词',
    select: false,
    tihuoWay: '单词关系',
    show2:'none',
    show3:false,
    value2:'',
    color:'red',
    ec: {
      onInit: initChart // 3、将数据放入到里面
    }
  },
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(JSON.parse(options.detail));
    var data = JSON.parse(options.detail);
    var arr = data.lx.split('/r/n');
    var that = this;
    that.setData({
      word: data.wId,
      details2: data.meaning,
      sentence_C:arr[0],
      sentence_E:arr[1]
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

  onChange(event) {
    const detail = event.detail;
    this.setData({
      'switch1': detail.value
    })

  },
  onClose1: function() {
    this.setData({
      show: false
    })
  },
  addWord: function() {
    this.setData({
      show: true
    })
  },
  bindShowMsg() {
    this.setData({
      select: !this.data.select,
      show2:''
    })
  },
  mySelect1(e) {
    var name = e.currentTarget.dataset.name 
    this.setData({
      tihuoWay: name,
      select: false,
      show2:'none',
      color:'rgba(252, 84, 84, 0.678)'
    })
  },
  mySelect2(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      tihuoWay: name,
      select: false,
      show2: 'none',
      color:'rgb(252, 207, 84)'
    })
  },
  mySelect3(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      tihuoWay: name,
      select: false,
      show2: 'none',
      color:'rgb(250, 253, 67)',
    })
  },
  mySelect4(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      tihuoWay: name,
      select: false,
      show2: 'none',
      color: 'rgb(44, 250, 216)',
    })
  },
  mySelect5(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      tihuoWay: name,
      select: false,
      show2: 'none',
      color: 'rgb(67, 200, 253)',
    })
  },
  mySelect6(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      tihuoWay: name,
      select: false,
      show2: 'none',
      color: 'rgb(219, 128, 255)',
    })
  },
  deleteWord:function()
  {
    this.setData({
      show3:true
    })
  },
  onClose2:function(){
    this.setData({
      show3: false
    })
  }
})