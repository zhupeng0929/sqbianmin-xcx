var app = getApp();
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 5,
    listData: [],
    BackImgFilePath: "http://xiaoni.com/upload/201801/31/2018131162402007.png",
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListData(this.data.page);
  },
  getListData: function (page) {
    // var url = "api/GetData/GetList" + page + "&userid=" + this.data.userid;


    var that = this;
    // var action = "api/GetData/GetList";
    var action = "common/advert/GetList.html";
    var parameters = 'pageindex=' + page + '&pagesize=' + this.data.pageSize +'&appid=99999999';

    util.request(action, parameters, function (res) {
      var data = res.data
      if (data.length > 0) {
        for (var idx in data) {
          var subject = data[idx];
          var title = subject.Content;
          subject.CreateDate = util.getTimeText(subject.CreateDate);

          if (title.length >= 50) {
            subject.istoolong = true;
            subject.ishide = true;
          }
          else {
            subject.istoolong = false;
            subject.ishide = false;
          }
        }

        that.setData({
          listData: that.data.listData.concat(data),
          page: that.data.page + 1,
          searchLoading: true,
        });
      }
      else {
        that.setData({
          searchLoading: false ,
          searchLoadingComplete: true,
        });
      }
    });
  },
  catchtap: function (e) {
    var index = e.currentTarget.dataset.index;
    var listData = this.data.listData;
    var model = listData[index];
    model.ishide = !model.ishide;
    this.setData({
      listData: listData
    });
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
    this.setData({
      listData: [],
      page: 1,
      searchLoading: false,
      searchLoadingComplete: false,
    });
    this.getListData(this.data.page);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getListData(this.data.page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})