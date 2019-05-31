// pages/MyPage/BookWords/BookWords.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagenow:1,
    pagenum:0,
    name:'',
    current:'',
    current1:[],
    wordList:[
      'abandon1', 'abandon2', 'abandon3', 'abandon4', 'abandon5', 'abandon6', 'abandon7', 'abandon8', 'abandon9', 'abandon10', 'abandon11', 'abandon12', 'abandon13', 'abandon14', 'abandon15', 'abandon16', 'abandon17', 'abandon18', 'abandon19', 'abandon20', 'abandon21', 'abandon22', 'abandon23', 'abandon24', 'abandon25', 'abandon26', 'abandon27', 'abandon28', 'abandon29', 'abandon30', 'abandon31', 'abandon32', 'abandon33',
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name:options.name,
      pagenum:parseInt(this.data.wordList.length/8+1)
    })
    console.log(this.data.name)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
})