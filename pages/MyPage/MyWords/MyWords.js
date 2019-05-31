// pages/MyPage/MyWords/MyWords.js
import {
  handleTabbarChange,
  getTabbarHeight
} from '../../../utils/tabbar/tabbar.js';
const { $Toast } = require('../../../dist/base/index');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:"",
    show2:"none",
    current: "MyWords",
    tabbarHeight: null,
    visible2:false,
    current1: [],
    current_scroll: 0,
    detail_0:{},
    pagenow: 1,
    pagenum: 5,
    index:0,
    d:'',
    myBooks: [
      '所有单词', '四级词汇', '六级词汇', '雅思词汇'
    ],
    wordList: [
      {
        text: "A", disabled: false,
        // 该导航下所有的可选项
        children: [
          { text: 'abandon1',id: 1},
          { text: 'abandon2', id: 2 },
          { text: 'abandon3', id: 3 },
          { text: 'abandon4', id: 4 },
          { text: 'abandon5', id: 5 },
          { text: 'abandon6', id: 6 },
          { text: 'abandon7', id: 7 },
          { text: 'abandon8', id: 8 },
        ]
      },
      {
        text: "B", 
        disabled: false,
        // 该导航下所有的可选项
        children: [
          { text: 'boy1', id: 1 },
          { text: 'boy2', id: 2 },
          { text: 'boy3', id: 3 },
          { text: 'boy4', id: 4 },
          { text: 'boy5', id: 5 },
          { text: 'boy6', id: 6 },
          { text: 'boy7', id: 7 },
          { text: 'boy8', id: 8 },
        ]
      },
      {
        text: "C", disabled: false,children:[]
        // 该导航下所有的可选项
      },
      {
        text: "D", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "E", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "F", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "G", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "H", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "I", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "J", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "K", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "L", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "M", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "N", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "O", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "P", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "Q", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "R", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "S", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "T", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "U", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "V", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "W", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "X", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "Y", disabled: false, children: []
        // 该导航下所有的可选项
      },
      {
        text: "Z", disabled: false, children: []
        // 该导航下所有的可选项
      },
    ],
    mainActiveIndex: 0,
    activeId:Number
  },
  handleChange: function({
    detail
  }) {
    handleTabbarChange(detail.key);
  },
  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0
    });
  },

  onClickItem({ detail = {} }) {
    this.setData({
      activeId: detail.id
    });
    var that = this;
    var d = that.data.wordList[that.data.mainActiveIndex].children[that.data.activeId - 1].text
    console.log(d)
    var data = new Array;
    var nodes = new Array;
    var link = new Array;
    // console.log(that.globalData.URL);
    // console.log(that.globalData.nodes);
    var num = 1;
    console.log(d)
    wx.request({
      url: app.globalData.URL + '/relaWords2.do',
      method: 'GET',
      data: {
        openId: 'qqq',
        wId1: d
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
            "name": d,
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

    wx.request({
      url: app.globalData.URL + '/wordDetail.do',
      method: 'GET',
      data: { wId: that.data.wordList[that.data.mainActiveIndex].children[that.data.activeId - 1].text },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data.data);
        that.setData({
          detail_0: res.data.data,
        })
        // console.log(that.data.detail_0);
        var detail
        detail = JSON.stringify(that.data.detail_0);
        wx.navigateTo({
          url: '../WordDetails/WordDetails?detail=' + detail,
        })
      },
      fail: function (err) {
        console.log("sssssssssssss" + err.data);
      }
    })
  },
  onChange(event) {
    console.log(event.detail, 'click right menu callback data')
  },
  onReady() {
   
  },
  //词书对应单词填充
  chooseBook:function(e)
  {
    console.log(e)
    switch (e) {
      case '0':
        word=this.data.wordList;

        this.setData({
          wordList: [
            'abandon1', 'abandon2', 'abandon3', 'abandon4', 'abandon5', 'abandon6', 'abandon7', 'abandon8', 'abandon9', 'abandon10', 'abandon11', 'boy1', 'boy2', 'boy3', 'boy4', 'boy5', 'boy6', 'boy7', 'boy8', 'clean1', 'clean2', 'clean2', 'clean3', 'clean4', 'clean5', 'clean6', 'clean7', 'clean8', 'clean9', 'clean10', 'clean11'
          ]
        });
        console.log("你好")
        break;
      case '1':
        this.setData({
          wordList: [
            'abandon1', 'abandon2', 'abandon3', 'abandon4', 'abandon5', 'abandon6', 'abandon7', 'abandon8', 'abandon9', 'abandon10', 'abandon11'
          ]
        });
        break;
      case '2':
        this.setData({
          wordList: [
            'boy1', 'boy2', 'boy3', 'boy4', 'boy5', 'boy6', 'boy7', 'boy8'
          ]
        });
        break;
      case '3':
        this.setData({
          wordList: [
            'clean1', 'clean2', 'clean2', 'clean3', 'clean4', 'clean5', 'clean6', 'clean7', 'clean8', 'clean9', 'clean10', 'clean11'
          ]
        });
        break;
      default:
        console.log("错了")
    }
  },
  //词书选择
  handleChangeScroll:function({
    detail
  }) {
    this.setData({
      current_scroll: detail.key,
    });
    console.log(this.data.current_scroll)
    //获取词书，此处可以改为一个函数，通过词书名返回单词内容
    this.chooseBook(this.data.current_scroll);
    this.setData({
      pagenow: 1
    })
    this.setData({
      pagenum: parseInt(this.data.wordList.length / 5 + 1)
    })
  },
  //页面切换
  handleChangePage({
    detail
  }) {
    const type = detail.type;
    if (type === 'next') {
      this.setData({
        pagenow: this.data.pagenow + 1
      });
    } else if (type === 'prev') {
      this.setData({
        pagenow: this.data.pagenow - 1
      });
    }
  },
  setChildren:function(wordlisti,item){
    var len = wordlisti.children.length;
    wordlisti.children.push({
      text: item.wId,
      id: len + 1
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: app.globalData.URL + '/getMyNodes.do',
      method: 'GET',
      data: {openId:'qqq'},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res);
        var wordlist = new Array(26);
        for(var i=0;i<26;i++){
          var text = (i + 10).toString(36).toUpperCase();
          wordlist[i] = {
              text:text,
              disabled:false,
              children:[],
          }
        }
        var data = res.data.data;

        data.forEach(function(item,index){
            var first_letter = item.wId[0].toUpperCase();
            switch(first_letter){
              case 'A':
                that.setChildren(wordlist[0], item);
                break;
              case 'B':
                that.setChildren(wordlist[1], item);
                break;
              case 'C':
                that.setChildren(wordlist[2], item);
                break;
              case 'D':
                that.setChildren(wordlist[3], item);
                break;
              case 'E':
                that.setChildren(wordlist[4], item);
                break;
              case 'F':
                that.setChildren(wordlist[5], item);
                break;
              case 'G':
                that.setChildren(wordlist[6], item);
                break;
              case 'H':
                that.setChildren(wordlist[7], item);
                break;
              case 'I':
                that.setChildren(wordlist[8], item);
                break;
              case 'J':
                that.setChildren(wordlist[9], item);
                break;
              case 'K':
                that.setChildren(wordlist[10], item);
                break;
              case 'L':
                that.setChildren(wordlist[11], item);
                break;
              case 'M':
                that.setChildren(wordlist[12], item);
                break;
              case 'N':
                that.setChildren(wordlist[13], item);
                break;
              case 'O':
                that.setChildren(wordlist[14], item);
                break;
              case 'P':
                that.setChildren(wordlist[15], item);
                break;
              case 'Q':
                that.setChildren(wordlist[16], item);
                break;
              case 'R':
                that.setChildren(wordlist[17], item);
                break;
              case 'S':
                that.setChildren(wordlist[18], item);
                break;
              case 'T':
                that.setChildren(wordlist[19], item);
                break;
              case 'U':
                that.setChildren(wordlist[20], item);
                break;
              case 'V':
                that.setChildren(wordlist[21], item);
                break;
              case 'W':
                that.setChildren(wordlist[22], item);
                break;
              case 'X':
                that.setChildren(wordlist[23], item);
                break;
              case 'Y':
                that.setChildren(wordlist[24], item);
                break;
              case 'Z':
                that.setChildren(wordlist[25], item);
                break;
              default:
                break;
            }
        })
        console.log(wordlist);
        that.setData({
          wordList:wordlist
        })
      },
      fail: function (err) {
        console.log("sssssssssssss" + err.data);
      }
    })
    this.setData({
      pagenum: parseInt(this.data.wordList.length / 6 + 1),
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
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
  /**
   * 添加单词
   */
  addWords:function()
  {
    wx.navigateTo({
      url: '../WordBooks/WordBooks',
    })
  },
  /**
   * 管理单词
   */
  ManageWords:function()
  {
    this.setData({
      show:"none",
      show2:""
    })
  },
  /**
   * 取消管理
   */
  returnWords:function()
  {
    this.setData({
      show: "",
      show2: "none"
    })
  },
  /**
   * 选中目标
   */
  handleFruitChange({ detail = {} }) {
    const index = this.data.current1.indexOf(detail.value);
    index === -1 ? this.data.current1.push(detail.value) : this.data.current1.splice(index, 1);
    this.setData({
      current1: this.data.current1
    });
  },
  /**
   * 删除单词
   */
  deleteWords:function()
  {
    if(this.data.current1.length!=0)
    this.setData({
      visible2:true
    })
    else
    this.handleWarning();
  },
  getData: function(e)
  {
    this.setData({
      d: e.detail.value
    })
  },
  onSearch: function () {
      var that = this;
      var len = that.data.wordList.length;
      var dd=that.data.d.toUpperCase()
      var head=dd[0]
      var flag=0
      for(var i=0;i<len;i++)
      {
        if(head==that.data.wordList[i].text)
        {
          that.setData({
            mainActiveIndex:i
          })
          for(var j=0;j<that.data.wordList[i].children.length;j++)
          {
            if (that.data.d == that.data.wordList[i].children[j].text)
            {
              that.setData({
                activeId:j+1
              })
              flag=1
              break;
            }
          }
        }
      }
      if(flag==0)
        $Toast({
          content: '没找到对应单词',
          type: 'error'
        })
  },
  /**
   * 删除详细操作
   */
   handleCancel:function() {
    this.setData({
      visible2: false
    });
  },
  handleConfirm: function () {
    this.setData({
      visible2: false
    });
  },
  /**
   * 错误删除提示
   */
  handleWarning() {
    $Toast({
      content: '未选中删除内容！',
      type: 'warning'
    });
  },
  handleClick(){
    wx.navigateTo({
      url: '../WordDetails/WordDetails',
    })
  },



})
// const app = getApp();
// Page({
//   data: {
//     StatusBar: app.globalData.StatusBar,
//     CustomBar: app.globalData.CustomBar,
//     hidden: true
//   },
//   onLoad() {
//     let list = [];
//     for (let i = 0; i < 26; i++) {
//       list[i] = String.fromCharCode(65 + i)
//     }
//     this.setData({
//       list: list,
//       listCur: list[0]
//     })
//   },
//   onReady() {
//     let that = this;
//     wx.createSelectorQuery().select('.indexBar-box').boundingClientRect(function (res) {
//       that.setData({
//         boxTop: res.top
//       })
//     }).exec();
//     wx.createSelectorQuery().select('.indexes').boundingClientRect(function (res) {
//       that.setData({
//         barTop: res.top
//       })
//     }).exec()
//   },
//   //获取文字信息
//   getCur(e) {
//     this.setData({
//       hidden: false,
//       listCur: this.data.list[e.target.id],
//     })
//   },

//   setCur(e) {
//     this.setData({
//       hidden: true,
//       listCur: this.data.listCur
//     })
//   },
//   //滑动选择Item
//   tMove(e) {
//     let y = e.touches[0].clientY,
//       offsettop = this.data.boxTop,
//       that = this;
//     //判断选择区域,只有在选择区才会生效
//     if (y > offsettop) {
//       let num = parseInt((y - offsettop) / 20);
//       this.setData({
//         listCur: that.data.list[num]
//       })
//     };
//   },

//   //触发全部开始选择
//   tStart() {
//     this.setData({
//       hidden: false
//     })
//   },

//   //触发结束选择
//   tEnd() {
//     this.setData({
//       hidden: true,
//       listCurID: this.data.listCur
//     })
//   },
//   indexSelect(e) {
//     let that = this;
//     let barHeight = this.data.barHeight;
//     let list = this.data.list;
//     let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
//     for (let i = 0; i < list.length; i++) {
//       if (scrollY < i + 1) {
//         that.setData({
//           listCur: list[i],
//           movableY: i * 20
//         })
//         return false
//       }
//     }
//   }
// });
