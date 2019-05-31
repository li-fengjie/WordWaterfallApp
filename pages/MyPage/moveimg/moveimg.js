var startPoint;
Page({
  data: {
    animationData: {},
    buttonTop: 0,
    buttonLeft: 0
  },
  onShow: function () {
    this.animation = wx.createAnimation({
      duration: 0,
      timingFunction: 'ease',
    })
  },
  // button拖动的三个方法
  buttonStart: function (e) {
    startPoint = e.touches[0]
  },
  buttonMove: function (e) {
    var endPoint = e.touches[e.touches.length - 1]
    this.animation.translate(endPoint.clientX - startPoint.clientX, endPoint.clientY - startPoint.clientY).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  buttonEnd: function (e) {
    console.log(e);
    var endPoint = e.changedTouches[0]
    this.setData({
      buttonTop: (endPoint.clientY - 20),
      buttonLeft: (endPoint.clientX - 50)
    })
  }
})