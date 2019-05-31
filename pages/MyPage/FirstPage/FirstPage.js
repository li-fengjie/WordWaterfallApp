// pages/MyPage/FirstPage/FirstPage.js
import {
  handleTabbarChange,
  getTabbarHeight
} from '../../../utils/tabbar/tabbar.js';
var util = require('../../../utils/util.js');
const app = getApp()
var haveSSet = '';
var startPoint;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: "FirstPage",
    tabbarHeight: null,
    time: '00:00:00',
    date: util.formatDate(new Date()),
    timerName: '',
    timerName2: '',
    countDownNum: 6,
    countDownNum2: 60000,
    index1: 4,
    value2:'',
    index2: 4,
    index3: 4,
    index4: 0,
    false:false,
    count:0,
    index5: 0,
    index6: 0,
    color1:"blue",
    color2:"red",
    color3:'yellow',
    wordList:[],
    wordList1: [{
      "name": "aaaaaa",
      "length": 6,
      "show": ""
    }, {
      "name": "aaaaa",
      "length": 5,
      "show": ""
    }, {
      "name": "aaaa",
      "length": 4,
      "show": ""
    }, {
        "name": "aaaa",
        "length": 4,
        "show": ""
    },{
      "name": "aaaa",
      "length": 4,
      "show": "none"
    }],
    wordList2: [{
      "name": "bbbbbbb",
      "length": 7,
      "show": ""
    }, {
      "name": "bb",
      "length": 2,
      "show": ""
    }, {
      "name": "bbbbb",
      "length": 5,
      "show": ""
    },{
        "name": "bbbbb",
        "length": 5,
        "show": ""
    } ,{
      "name": "aaaa",
      "length": 4,
      "show": "none"
    }],
    wordList3: [{
      "name": "cccc",
      "length": 4,
      "show": ""
    }, {
      "name": "ccccc",
      "length": 5,
      "show": ""
    }, {
      "name": "cccccc",
      "length": 6,
      "show": ""
    }, {
        "name": "cccccc",
        "length": 6,
        "show": ""
    },{
      "name": "aaaa",
      "length": 4,
      "show": "none"
    }],
    moveData: null,
    show: false,
    overlay:true,
    word:'aaaaaa',
    detail:{},
    details1:'英 [əˈbɒlɪʃ]  美 [əˈbɑːlɪʃ]',
    details2:'vt. 废除，废止；取消，革除',
    cindex1:0,
    cindex2:1,
    cindex3:3,
    color:['blue','red','orange','yellow','olive','green','cyan','purple','mauve','pink','brown','grey'],
    w1:[],
    w2:[],
    w3:[],
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
    this.getword();
    this.countDown();
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        // 屏幕宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 高度,宽度 单位为px
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
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
  updateTime: function(that) {
    var timer = setTimeout(function() {
      that.setData({
        time: util.formatTime(new Date()),
        date: util.formatDate(new Date()),
      });
      that.updateTime(that);
    }, 1000);
    that.setData({
      timerName: timer
    })
  },


  /**
   * 倒计时函数
   */
  countDown: function() {
    let that = this;
    let num = 0;
    var b;
    var c;
    var d;
    let countDownNum;
    countDownNum = that.data.countDownNum;
    that.setData({
      timer: setInterval(function() {
        num++;
        if (num == countDownNum/3) {
          var j=0
          b = [];
          for(var i=0;i<4;i++)
          {
            b[j] = that.data.wordList1[(i + that.data.index1) % that.data.wordList1.length];
            j++;
          }
          that.setData({
            index1: (that.data.index1 + 1) % that.data.wordList1.length,
            w1:b
          })
        } else if (num == countDownNum / 3*2) {
          var j = 0
          c = [];
          for (var i = 0; i < 4; i++) {
            c[j] = that.data.wordList2[(i + that.data.index2) % that.data.wordList2.length];
            j++;
          }
          that.setData({
            index2: (that.data.index2 + 1) % that.data.wordList2.length,
            w2: c
          })
        } else if (num == countDownNum) {
          var j = 0
          d = [];
          for (var i = 0; i < 4; i++) {
            d[j] = that.data.wordList3[(i + that.data.index3) % that.data.wordList3.length];
            j++;
          }
          that.setData({
            index3: (that.data.index3 + 1) % that.data.wordList3.length,
            w3: d
          })
          num=0;
        }
      }, 1000)
    })
  },
  buttonStart: function(e) {
    startPoint = e.touches[0]
  },
  buttonMove: function(e) {
    var endPoint = e.touches[e.touches.length - 1]
    var translateX = endPoint.clientX - startPoint.clientX
    var translateY = endPoint.clientY - startPoint.clientY
    startPoint = endPoint
    var buttonTop = this.data.buttonTop + translateY
    var buttonLeft = this.data.buttonLeft + translateX
    //判断是移动否超出屏幕
    if (buttonLeft + 50 >= this.data.windowWidth) {
      buttonLeft = this.data.windowWidth - 50;
    }
    if (buttonLeft <= 0) {
      buttonLeft = 0;
    }
    if (buttonTop <= 0) {
      buttonTop = 0
    }
    if (buttonTop + 50 >= this.data.windowHeight) {
      buttonTop = this.data.windowHeight - 50;
    }
    this.setData({
      buttonTop: buttonTop,
      buttonLeft: buttonLeft
    })
  },
  buttonEnd: function(e) {},
  moveClick: function() {
    var animation = wx.createAnimation({
      duration: 3000,
      delay: 0,
      timingFunction: "ease",
    });
    animation.translate((this.data.widthScreen - 60), 0).step({
      duration: 3000
    }); this.setData({
      moveData: animation.export()
    })
  },
  onClose() {
    this.setData({
      show: false,
      flag: 0
    });
  },
  wordAdd: function (e) {
    var that = this;
    var wordlist = that.data.wordList;
    wordlist.forEach(function(item,index){
      if(item.name == e.currentTarget.dataset.text){
          that.setData({
            word:item.name
          })
          return;
      }
    })
    wx.request({
      url: app.globalData.URL + '/wordDetail.do',
      method: 'GET',
      data: { wId: that.data.word },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          detail:res.data.data,
          details2:res.data.data.meaning
        })
      },
      fail: function (err) {
        console.log("sssssssssssss" + err.data);
      }
      
    })
    var value = this.data.word;
    var data = new Array;
    var nodes = new Array;
    var link = new Array;
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
      success: function (res) {
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
          app.globalData.nodes2 = nodes;
          app.globalData.link2 = link;
        } 
      },
      fail: function (err) {
        console.log("sssssssssssss" + err.data);
      }
    })
    this.setData({
      show: true,
      flag: 1
    });
    this.countDown2()
  },
  handleClick: function () {
    this.setData({
      show: false,
      flag: 0
    })
    var that = this;
    var detail = JSON.stringify(that.data.detail);
    wx.navigateTo({
      url: '../WordDetails/WordDetails?detail='+detail,
    })
  },
  countDown2: function () {
    let that = this;
    let countDownNum = that.data.countDownNum2;
    //获取倒计时初始值    
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面    
    that.setData({
      timer: setInterval(function () {
        //这里把setInterval赋值给变量名为timer的变量        
        //每隔一秒countDownNum就减一，实现同步       
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着             
        if (that.data.flag == 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能         
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭          
          clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
          console.log(60000 - countDownNum)
        }
      }, 1000)
    })
  },
  // 获取数据
  getword: function () {
    var that = this;
    var a=0;
    var b=0;
    var c=0;
    wx.request({
      url: app.globalData.URL + '/infall.do',
      method: 'GET',
      data: { openId: 'qqq' },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data.data);
        let wordlist1 = new Array;
        let wordlist2 = new Array;
        let wordlist3 = new Array;
        var len1 = Math.floor(res.data.data.length/3),
          len2 = Math.floor(res.data.data.length * 2 / 3);
            // console.log(len1,len2);
        res.data.data.forEach(function(item,index){
            if(index<len1){
              wordlist1[index] = {
                name: item.wId,
                length: item.wId.length,
                show: '',
                color:item.ntColor
              }
              a++;
            }else if(index>=len1&&index<len2){
              wordlist2[index-len1] = {
                name: item.wId,
                length: item.wId.length,
                show: '',
                color: item.ntColor
              }
              b++;
            }else{
              wordlist3[index-len2] = {
                name: item.wId,
                length: item.wId.length,
                show: '',
                color: item.ntColor
              }
            }
        });
        // console.log(wordlist1,wordlist2,wordlist3);
        that.setData({
          wordList1: wordlist1,
          wordList2: wordlist2,
          wordList3: wordlist3,
          wordList: wordlist1.concat(wordlist2,wordlist3)
        });
      },
      fail: function (err) {
        console.log("sssssssssssss" + err.data);
      }
    })
  },
  setSpeed:function()
  {
    var that=this
    that.setData({
      show4:true
    })
  },
  onChange1:function(e)
  {
    this.setData({
      count:e.detail
    })
    console.log(this.data.count)
  },
  confirm:function()
  {
    this.setData({
      countDownNum: this.data.count
    })
    this.onLoad()
  }
})