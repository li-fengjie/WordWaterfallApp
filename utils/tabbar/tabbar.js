function getTabbarHeight(that) {
  const query = wx.createSelectorQuery()
  query.select('#tabbar').boundingClientRect()
  query.selectViewport().scrollOffset()
  query.exec(function (res) {
    that.setData({
      tabbarHeight: res[0].height + 10 + 'px'
    });
  })
}

function handleTabbarChange(key) {
  const urlMap = {
    "FirstPage": "../../MyPage/FirstPage/FirstPage",
    "MyWords": "../../MyPage/MyWords/MyWords",
    "MindMapping": "../../MyPage/MindMapping/MindMapping",
  };
  console.log(urlMap[key]);
  wx.redirectTo({
    url: urlMap[key],
  })
}

export { handleTabbarChange, getTabbarHeight }